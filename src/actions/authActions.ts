"use server";

import { db } from "@/db/db";
import { user } from "@/db/schema";
import { loginAuth } from "@/lib/auth";
import { hash, compare } from "bcrypt";
import { cookies } from "next/headers";

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ result: boolean; error?: string }> {
  try {
    const isDuplicateEmailExist = await db.query.user.findFirst({
      where: (table, fn) => fn.eq(table.email, email),
    });

    if (isDuplicateEmailExist)
      return { result: false, error: "Email already exist !" };

    const hashedPassword = await hash(password, 10);

    await db.insert(user).values({
      email: email,
      password: hashedPassword,
    });

    return { result: true };
  } catch (error) {
    return { result: false, error: "Internal server error" };
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ result: boolean; error?: string }> {
  try {
    const user = await db.query.user.findFirst({
      where: (table, fn) => fn.eq(table.email, email),
    });

    if (!user) return { result: false, error: "User not found" };

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) return { result: false, error: "Incorrect password" };

    await loginAuth({ id: user.id, email: user.email, role: user.role });

    return { result: true };
  } catch (error) {
    return { result: false, error: "Internal server error" };
  }
}

export async function logoutUser() {
  cookies().delete("token");
}
