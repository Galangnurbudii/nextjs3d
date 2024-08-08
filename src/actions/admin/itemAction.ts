"use server";

import { Item } from "@/app/(dashboard)/admin/item/columns";
import { db } from "@/db/db";
import { item, lower } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getAllItems() {
  try {
    const allItems = await db.select().from(item).orderBy(asc(item.name));
    return allItems;
  } catch (error) {
    console.log(error);
  }
}

export async function addItem({ name, code, description, price }: Item) {
  try {
    const isDuplicateName = await db.query.item.findFirst({
      where: eq(lower(item.name), name.toLowerCase()),
    });

    if (isDuplicateName)
      return { result: false, error: "Item name can't be duplicate" };

    const isDuplicateCode = await db.query.item.findFirst({
      where: eq(lower(item.code), code.toLowerCase()),
    });

    if (isDuplicateCode)
      return { result: false, error: "Item code can't be duplicate" };

    await db.insert(item).values({ name, code, description, price });

    return { result: true };
  } catch (error: any) {
    console.log(error.message);
    return { result: false, error: "Internal server error" };
  }
}

export async function editItem({ name, code, description, price }: Item) {
  try {
    const checkCode = await db.query.item.findFirst({
      where: eq(item.code, code),
    });

    if (!checkCode) {
      await db
        .update(item)
        .set({ code, description, price })
        .where(eq(item.name, name));

      return { result: true };
    }
    return { result: false, error: "Item code can't be duplicate" };
  } catch (error: any) {
    console.log(error.message);
    return { result: false, error: "Internal server error" };
  }
}

export async function deleteItem({ name }: { name: string }) {
  try {
    await db.delete(item).where(eq(item.name, name));
    return { result: true };
  } catch (error: any) {
    console.log(error.message);
    return { result: false, error: "Internal server error" };
  }
}
