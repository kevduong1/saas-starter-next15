/*==================================================
#  
 * NOTE: THIS FILE IS AUTO-GENERATED from
 * support/scripts/generate_sql_fetch_lib/gen_sql_fetch_lib.py
 * DO NOT MODIFY THIS FILE MANUALLY UNLESS CHANGES
 * ARE IN THE PRESERVE TAGS.
 * 
 * {{ TABLE_NAME_SHORT }}
 ==================================================*/

"use server";

import { db } from "@/db";
import { {{ TABLE }} } from "@/db/drizzle/schema";
import { and, eq, count, lt, gt, like } from "drizzle-orm";

/**
 * Interface representing a {{ TABLE }} record.
 */
export interface I{{ TABLE_CAPITALIZED }} {
{{ INTERFACE_ATTRIBUTES }}
}

/*==================================================
 * Advanced filtering types
 ==================================================*/
/**
 * FilterOperator defines allowed operators for a column.
 */
export type FilterOperator<T> = {
  eq?: T;
  lt?: T;
  gt?: T;
  like?: T extends string ? string : never;
};

/**
 * AdvancedFilter defines a shape for providing per-column filtering.
 */
export type AdvancedFilter<T> = {
  [P in keyof T]?: FilterOperator<T[P]>;
};

/*==================================================
 * Count total number of {{ TABLE_NAME_SHORT }}
 * @returns Promise resolving to the count as number
 ==================================================*/
export const count{{ TABLE_CAPITALIZED }} = async (): Promise<number> => {
  const data = await db.select({ count: count({{ TABLE }}.id) }).from({{ TABLE }});
  return Number(data[0]?.count ?? 0);
};


/*==================================================
 * Fetch {{ TABLE }} with related data (Advanced Filtering)
 * Allows advanced filtering (eq, lt, gt, like) on the related data.
 * @param filter - Advanced filter object to narrow down {{ TABLE }}
 * @returns Promise resolving to an array of I{{ TABLE_NAME_SHORT }} with related data
 ==================================================*/
 export const fetch{{ TABLE_CAPITALIZED }}WithRelations = async ({
  filter,
  // relations = []
}:
{
  filter?: AdvancedFilter<I{{ TABLE_CAPITALIZED }}>,
  //relations?: {}
}): Promise<I{{ TABLE_CAPITALIZED }}[]> => {
  const {{ TABLE }}DataData = await db.query.{{ TABLE }}.findMany({
    where: ({{ TABLE }}, { eq, lt, gt, like }) => {
      const conditions = [];
      if (filter) {
{{ FILTER_CONDITIONS }}
      }
      return conditions.length ? and(...conditions) : undefined;
    },
    with: {
      // Add related tables here based on your schema
    },
  });
  return {{ TABLE }}DataData;
};
/*==================================================
 * Create a new {{ TABLE_NAME_SHORT }}
 * @param data - I{{ TABLE_NAME_SHORT }} object (without id, if auto-generated)
 * @returns Promise resolving to the newly created I{{ TABLE_NAME_SHORT }}
 ==================================================*/

/*==================================================
 * Update an existing {{ TABLE_NAME_SHORT }} by ID
 * @param id - {{ TABLE_NAME_SHORT }} identifier
 * @param data - partial I{{ TABLE_NAME_SHORT }} data to update
 * @returns Promise resolving to the updated I{{ TABLE_NAME_SHORT }} or null if not found
 * TODO: 
 ==================================================*/

/*==================================================
 * Delete a {{ TABLE_NAME_SHORT }} by ID
 * @param id - {{ TABLE_NAME_SHORT }} identifier
 * @returns Promise resolving to true if deletion was successful
 * TODO: 
 ==================================================*/

/*--------------- {{ PRESERVE_START_FUNCTIONS }} ---------------*/

/*--------------- {{ PRESERVE_END_FUNCTIONS }} -----------------*/
