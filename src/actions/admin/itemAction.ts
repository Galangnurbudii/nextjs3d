"use server";

import { db } from "@/db/db";
import { item } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getAllItems() {
  try {
    const allItems = await db.select().from(item).orderBy(asc(item.name));
    return allItems;
  } catch (error) {
    console.log(error);
  }
}
