/*==================================================
#  
 * NOTE: THIS FILE IS AUTO-GENERATED from
 * support/scripts/generate_sql_fetch_lib/gen_sql_fetch_lib.py
 * DO NOT MODIFY THIS FILE MANUALLY UNLESS CHANGES
 * ARE IN THE PRESERVE TAGS.
 * 
 * post
 ==================================================*/

"use server";

import { db } from "@/db";
import { postTable } from "@/db/drizzle/schema";
import { and, eq, count, lt, gt, like } from "drizzle-orm";

/**
 * Interface representing a postTable record.
 */
export interface IPostTable {
  id: number;
  message: string | null;
  createdAt: string;
  userId: number | null;
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
 * Count total number of post
 * @returns Promise resolving to the count as number
 ==================================================*/
export const countPostTable = async (): Promise<number> => {
  const data = await db.select({ count: count(postTable.id) }).from(postTable);
  return Number(data[0]?.count ?? 0);
};


/*==================================================
 * Fetch postTable with related data (Advanced Filtering)
 * Allows advanced filtering (eq, lt, gt, like) on the related data.
 * @param filter - Advanced filter object to narrow down postTable
 * @returns Promise resolving to an array of Ipost with related data
 ==================================================*/
 export const fetchPostTableWithRelations = async ({
  filter,
  // relations = []
}:
{
  filter?: AdvancedFilter<IPostTable>,
  //relations?: {}
}): Promise<IPostTable[]> => {
  const postTableDataData = await db.query.postTable.findMany({
    where: (postTable, { eq, lt, gt, like }) => {
      const conditions = [];
      if (filter) {
          if (filter.id) {
            if (filter.id.eq) conditions.push(eq(postTable.id, filter.id.eq));
            if (filter.id.lt) conditions.push(lt(postTable.id, filter.id.lt));
            if (filter.id.gt) conditions.push(gt(postTable.id, filter.id.gt));
            if (filter.id.like) conditions.push(like(postTable.id, `%${filter.id.like}%`));
          }
          if (filter.message) {
            if (filter.message.eq) conditions.push(eq(postTable.message, filter.message.eq));
            if (filter.message.lt) conditions.push(lt(postTable.message, filter.message.lt));
            if (filter.message.gt) conditions.push(gt(postTable.message, filter.message.gt));
            if (filter.message.like) conditions.push(like(postTable.message, `%${filter.message.like}%`));
          }
          if (filter.createdAt) {
            if (filter.createdAt.eq) conditions.push(eq(postTable.createdAt, filter.createdAt.eq));
            if (filter.createdAt.lt) conditions.push(lt(postTable.createdAt, filter.createdAt.lt));
            if (filter.createdAt.gt) conditions.push(gt(postTable.createdAt, filter.createdAt.gt));
            if (filter.createdAt.like) conditions.push(like(postTable.createdAt, `%${filter.createdAt.like}%`));
          }
          if (filter.userId) {
            if (filter.userId.eq) conditions.push(eq(postTable.userId, filter.userId.eq));
            if (filter.userId.lt) conditions.push(lt(postTable.userId, filter.userId.lt));
            if (filter.userId.gt) conditions.push(gt(postTable.userId, filter.userId.gt));
            if (filter.userId.like) conditions.push(like(postTable.userId, `%${filter.userId.like}%`));
          }
      }
      return conditions.length ? and(...conditions) : undefined;
    },
    with: {
      // Add related tables here based on your schema
    },
  });
  return postTableDataData;
};
/*==================================================
 * Create a new post
 * @param data - Ipost object (without id, if auto-generated)
 * @returns Promise resolving to the newly created Ipost
 ==================================================*/

/*==================================================
 * Update an existing post by ID
 * @param id - post identifier
 * @param data - partial Ipost data to update
 * @returns Promise resolving to the updated Ipost or null if not found
 * TODO: 
 ==================================================*/

/*==================================================
 * Delete a post by ID
 * @param id - post identifier
 * @returns Promise resolving to true if deletion was successful
 * TODO: 
 ==================================================*/

/*--------------- {{ PRESERVE_START_FUNCTIONS }} ---------------*/

/*--------------- {{ PRESERVE_END_FUNCTIONS }} -----------------*/
