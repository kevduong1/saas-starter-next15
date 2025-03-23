import os
import re

# Paths
DRIZZLE_DIR = "src/db/drizzle"
SCHEMA_FILE = os.path.join(DRIZZLE_DIR, "schema.ts")
OUTPUT_DIR = "src/models/sql_core"
TEMPLATE_FILE = "support/scripts/generate_sql_fetch_lib/template-sql-utl-gen.ts"

# Regex to locate the start of a table definition and capture the table name string
TABLE_START_PATTERN = re.compile(r'export\s+const\s+(\w+)\s*=\s*pgTable\("([^"]+)"')
# Attribute pattern:
#  - Captures the attribute name
#  - Captures the function call with its arguments and any chained method calls
ATTRIBUTE_PATTERN = re.compile(
    r"(\w+):\s*([\w\d_]+\([^)]*\)(?:\.[\w\d_]+\([^)]*\))*)",
    re.MULTILINE
)

def extract_table_block(schema_content, start_pos):
    """
    Given the schema content and the position where pgTable( starts,
    this function finds the matching closing brace for the table's object.
    It returns the entire block (from the table definition start to the closing '}').
    """
    # Find the first '{' after pgTable(
    start_brace = schema_content.find("{", start_pos)
    if start_brace == -1:
        return None

    brace_count = 0
    index = start_brace
    while index < len(schema_content):
        char = schema_content[index]
        if char == "{":
            brace_count += 1
        elif char == "}":
            brace_count -= 1
            if brace_count == 0:
                # Return the block from the start_brace to the matching '}'
                return schema_content[start_brace:index+1]
        index += 1
    return None

def collect_attributes(table_content):
    """
    Extract attribute definitions along with information about nullability.
    Uses a mapping from SQL type functions to TypeScript types.
    If the attribute definition contains `.notNull` or `.primaryKey`, it is
    considered required; otherwise it is marked as nullable.
    """
    SQL_TO_TS_TYPES = {
        "bigint": "number",
        "integer": "number",
        "text": "string",
        "timestamp": "string",
    }

    attributes = []
    for match in ATTRIBUTE_PATTERN.finditer(table_content):
        attribute_name = match.group(1)
        definition = match.group(2)
        # Check for non-nullable indicators
        is_required = False
        if ".notNull" in definition or ".primaryKey" in definition:
            is_required = True

        # Extract the base type name (e.g., "integer", "text")
        base_type_match = re.match(r"([\w\d_]+)\(", definition)
        if base_type_match:
            base_type = base_type_match.group(1)
            ts_type = SQL_TO_TS_TYPES.get(base_type, "any")
        else:
            ts_type = "any"

        attributes.append((attribute_name, ts_type, is_required))
    return attributes

def generate_file(table_const_name, table_name, attributes):
    """
    Use a template to generate an output file.
    In the generated TypeScript interface, nullable attributes will have a type union with null.
    """
    with open(TEMPLATE_FILE, "r") as template:
        template_content = template.read()

    output = template_content.replace("{{ TABLE }}", table_const_name)
    output = output.replace("{{ TABLE_NAME_SHORT }}", table_const_name.replace("Table", ""))
    output = output.replace("{{ TABLE_CAPITALIZED }}", table_const_name[0].upper() + table_const_name[1:])
    
    interface_attributes = "\n".join(
        f"  {attribute}: {ts_type if is_required else ts_type + ' | null'};"
        for attribute, ts_type, is_required in attributes
    )
    output = output.replace("{{ INTERFACE_ATTRIBUTES }}", interface_attributes)

    filter_conditions_lines = []
    for attribute, _, _ in attributes:
        filter_conditions_lines.append(f"          if (filter.{attribute}) {{")
        filter_conditions_lines.append(f"            if (filter.{attribute}.eq) conditions.push(eq({table_const_name}.{attribute}, filter.{attribute}.eq));")
        filter_conditions_lines.append(f"            if (filter.{attribute}.lt) conditions.push(lt({table_const_name}.{attribute}, filter.{attribute}.lt));")
        filter_conditions_lines.append(f"            if (filter.{attribute}.gt) conditions.push(gt({table_const_name}.{attribute}, filter.{attribute}.gt));")
        filter_conditions_lines.append(f"            if (filter.{attribute}.like) conditions.push(like({table_const_name}.{attribute}, `%${{filter.{attribute}.like}}%`));")
        filter_conditions_lines.append(f"          }}")
    filter_conditions = "\n".join(filter_conditions_lines)
    output = output.replace("{{ FILTER_CONDITIONS }}", filter_conditions)

    output_file = os.path.join(OUTPUT_DIR, f"{table_name.replace('_', '-')}-sql-utl-gen.ts")
    with open(output_file, "w") as f:
        f.write(output)

def main():
    with open(SCHEMA_FILE, "r") as schema:
        schema_content = schema.read()

    # Find all table definitions in the file
    for match in TABLE_START_PATTERN.finditer(schema_content):
        table_const_name = match.group(1)
        table_name = match.group(2)
        start_pos = match.end()  # Position right after the closing quote of the table name string
        table_block = extract_table_block(schema_content, start_pos)
        if not table_block:
            print(f"Could not extract block for table: {table_const_name}")
            continue

        # Process the block to extract attributes and nullability
        attributes = collect_attributes(table_block)
        print(f"Generating SQL fetch library for table: {table_const_name}")
        generate_file(table_const_name, table_name, attributes)

if __name__ == "__main__":
    print("Generating SQL fetch library...")
    main()
