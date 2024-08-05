"use server";

import { db } from "@/db/db";
import { user } from "@/db/schema";
import { asc, count, eq } from "drizzle-orm";

export async function getAllUsers() {
  try {
    const allUsers = await db
      .select({
        name: user.name,
        email: user.email,
        role: user.role,
        createdTime: user.createTime,
      })
      .from(user)
      .orderBy(asc(user.name));

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

export async function setAsAdmin({ email }: { email: string }) {
  try {
    await db.update(user).set({ role: "admin" }).where(eq(user.email, email));
    return { result: true };
  } catch (error) {
    console.log(error);
    return { result: false, error: "Internal server error" };
  }
}

export async function setAsUser({ email }: { email: string }) {
  try {
    await db.update(user).set({ role: "user" }).where(eq(user.email, email));
    return { result: true };
  } catch (error) {
    console.log(error);
    return { result: false, error: "Internal server error" };
  }
}
