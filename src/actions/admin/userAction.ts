"use server";

import { db } from "@/db/db";
import { user } from "@/db/schema";
import { count } from "drizzle-orm";

export async function getAllUsers() {
  try {
    const allUsers = await db
      .select({
        name: user.name,
        email: user.email,
        role: user.role,
        createdTime: user.createTime,
      })
      .from(user);

    return allUsers;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsersCount() {
  try {
    const usersCount = await db.select({ count: count() }).from(user);
    return usersCount[0].count;
  } catch (error) {
    console.log(error);
  }
}
