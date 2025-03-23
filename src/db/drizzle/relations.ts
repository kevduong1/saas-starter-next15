import { relations } from "drizzle-orm/relations";
import { userTable, postTable } from "./schema";

export const postTableRelations = relations(postTable, ({one}) => ({
	userTable: one(userTable, {
		fields: [postTable.userId],
		references: [userTable.id]
	}),
}));

export const userTableRelations = relations(userTable, ({many}) => ({
	postTables: many(postTable),
}));