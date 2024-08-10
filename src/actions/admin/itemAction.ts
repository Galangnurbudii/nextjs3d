"use server";

import { Item } from "@/app/(dashboard)/admin/item/columns";
import { db } from "@/db/db";
import { item, lower } from "@/db/schema";
import { and, asc, eq, ne } from "drizzle-orm";

export async function getAllItems() {
  try {
    const allItems = await db.select().from(item).orderBy(asc(item.name));
    return allItems;
  } catch (error) {
    console.log(error);
  }
}

export async function addItem({
  name,
  code,
  description,
  price,
  image,
}: {
  name: string;
  code: string;
  description: string;
  price: number;
  image?: string;
}) {
  try {
    if (!image) return { result: false, error: "Image is required" };

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

    await db.insert(item).values({ name, code, description, price, image });

    return { result: true };
  } catch (error: any) {
    console.log(error.message);
    return { result: false, error: "Internal server error" };
  }
}

export async function editItem(submittedData: {
  name: string;
  code: string;
  description: string;
  price: number;
  image?: string;
}) {
  try {
    const checkCode = await db.query.item.findFirst({
      where: and(
        eq(item.code, submittedData.code),
        ne(item.name, submittedData.name)
      ),
    });

    if (!checkCode) {
      await db
        .update(item)
        .set(submittedData)
        .where(eq(item.name, submittedData.name));

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

export async function calculateCartItem(
  cartList: { itemName: string; quantity: number }[]
) {
  try {
    let cartSummary: {
      image: string;
      name: string;
      code: string;
      description: string;
      quantity: number;
      pricePerItem: number;
      totalPrice: number;
    }[] = [];

    for (const cart of cartList) {
      const getItem = await db.query.item.findFirst({
        where: eq(item.name, cart.itemName),
      });

      if (getItem) {
        cartSummary.push({
          image: getItem.image,
          name: getItem.name,
          code: getItem.code,
          description: getItem.description,
          quantity: cart.quantity,
          pricePerItem: getItem.price,
          totalPrice: getItem.price * cart.quantity,
        });
      }
    }

    return cartSummary;
  } catch (error) {
    console.log(error);
  }
}
