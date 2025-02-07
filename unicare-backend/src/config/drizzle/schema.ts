import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey()
})