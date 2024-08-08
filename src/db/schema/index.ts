import { sql, SQL } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";

export { default as user } from "./user";
export { default as item } from "./item";

export function lower(column: AnyPgColumn): SQL {
  return sql`lower(${column})`;
}
