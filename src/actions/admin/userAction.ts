"use server";

import { db } from "@/db/db";
import { user } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";

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

export async function getCurrentUser() {
  try {
    const payload = await getCurrentSession();
    if (payload) {
      const selectedUser = await db.query.user.findFirst({
        where: eq(user.email, payload?.email),
      });
      if (!selectedUser) return null;
      return selectedUser;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByEmail({ email }: { email: string }) {
  try {
    const selectedUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    return selectedUser;
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

export async function deleteUser({ email }: { email: string }) {
  try {
    await db.delete(user).where(eq(user.email, email));
    return { result: true };
  } catch (error) {
    console.log(error);
    return { result: false, error: "Internal server error" };
  }
}
