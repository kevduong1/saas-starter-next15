import { fetchUserTableWithRelations } from "@/models/sql_core/user-table-sql-utl-gen";

export async function GET() {
  // const leases = await fetchAllUserTableWithRelation();
  const leases = await fetchUserTableWithRelations({
    filter: {
      id: {
        lt: 4,
      },
      userName: {
        like: "gr",
      }
    },
  });

  return Response.json({ leases });
}
