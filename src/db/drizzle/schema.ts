import { pgTable, integer, text, timestamp, foreignKey, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const userTable = pgTable("user_table", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "user_table_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userName: text("user_name"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const postTable = pgTable("post_table", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "post_table_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	message: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	userId: integer("user_id"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userTable.id],
			name: "post_table_user_id_fkey"
		}).onUpdate("cascade"),
]);
