import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

const ItemTable = pgTable("item", {
  name: varchar("name", { length: 255 }).primaryKey(),
  description: varchar("description", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  code: varchar("code", { length: 255 }).notNull().unique(),
  image: text("image").notNull(),
});

export default ItemTable;
