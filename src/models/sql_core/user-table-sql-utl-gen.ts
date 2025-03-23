/*==================================================
#  
 * NOTE: THIS FILE IS AUTO-GENERATED from
 * support/scripts/generate_sql_fetch_lib/gen_sql_fetch_lib.py
 * DO NOT MODIFY THIS FILE MANUALLY UNLESS CHANGES
 * ARE IN THE PRESERVE TAGS.
 * 
 * user
 ==================================================*/

"use server";

import { db } from "@/db";
import { userTable } from "@/db/drizzle/schema";
import { and, eq, count, lt, gt, like } from "drizzle-orm";

/**
 * Interface representing a userTable record.
 */
export interface IUserTable {
  id: number;
  userName: string | null;
  createdAt: string;
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
 * Count total number of user
 * @returns Promise resolving to the count as number
 ==================================================*/
export const countUserTable = async (): Promise<number> => {
  const data = await db.select({ count: count(userTable.id) }).from(userTable);
  return Number(data[0]?.count ?? 0);
};


/*==================================================
 * Fetch userTable with related data (Advanced Filtering)
 * Allows advanced filtering (eq, lt, gt, like) on the related data.
 * @param filter - Advanced filter object to narrow down userTable
 * @returns Promise resolving to an array of Iuser with related data
 ==================================================*/
 export const fetchUserTableWithRelations = async ({
  filter,
  // relations = []
}:
{
  filter?: AdvancedFilter<IUserTable>,
  //relations?: {}
}): Promise<IUserTable[]> => {
  const userTableDataData = await db.query.userTable.findMany({
    where: (userTable, { eq, lt, gt, like }) => {
      const conditions = [];
      if (filter) {
          if (filter.id) {
            if (filter.id.eq) conditions.push(eq(userTable.id, filter.id.eq));
            if (filter.id.lt) conditions.push(lt(userTable.id, filter.id.lt));
            if (filter.id.gt) conditions.push(gt(userTable.id, filter.id.gt));
            if (filter.id.like) conditions.push(like(userTable.id, `%${filter.id.like}%`));
          }
          if (filter.userName) {
            if (filter.userName.eq) conditions.push(eq(userTable.userName, filter.userName.eq));
            if (filter.userName.lt) conditions.push(lt(userTable.userName, filter.userName.lt));
            if (filter.userName.gt) conditions.push(gt(userTable.userName, filter.userName.gt));
            if (filter.userName.like) conditions.push(like(userTable.userName, `%${filter.userName.like}%`));
          }
          if (filter.createdAt) {
            if (filter.createdAt.eq) conditions.push(eq(userTable.createdAt, filter.createdAt.eq));
            if (filter.createdAt.lt) conditions.push(lt(userTable.createdAt, filter.createdAt.lt));
            if (filter.createdAt.gt) conditions.push(gt(userTable.createdAt, filter.createdAt.gt));
            if (filter.createdAt.like) conditions.push(like(userTable.createdAt, `%${filter.createdAt.like}%`));
          }
      }
      return conditions.length ? and(...conditions) : undefined;
    },
    with: {
      // Add related tables here based on your schema
    },
  });
  return userTableDataData;
};
/*==================================================
 * Create a new user
 * @param data - Iuser object (without id, if auto-generated)
 * @returns Promise resolving to the newly created Iuser
 ==================================================*/

/*==================================================
 * Update an existing user by ID
 * @param id - user identifier
 * @param data - partial Iuser data to update
 * @returns Promise resolving to the updated Iuser or null if not found
 * TODO: 
 ==================================================*/

/*==================================================
 * Delete a user by ID
 * @param id - user identifier
 * @returns Promise resolving to true if deletion was successful
 * TODO: 
 ==================================================*/

/*--------------- {{ PRESERVE_START_FUNCTIONS }} ---------------*/

/*--------------- {{ PRESERVE_END_FUNCTIONS }} -----------------*/
