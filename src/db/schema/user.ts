import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull().default("user"),
  createTime: timestamp("create_time", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
});

export default UserTable;
