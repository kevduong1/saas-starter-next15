"use client"

import { useState, useEffect } from "react";
import { fetchUserTableWithRelations, countUserTable } from "@/models/sql_core/user-table-sql-utl-gen";
export default function DataFetchingExamplePage() {
  const [userTableData, setUserTableData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      // const data = await fetchUserTableWithRelation();
      const data = await countUserTable({
        id: 1,
      });
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Data Fetching Example</h1>

    </div>
  );
}
    