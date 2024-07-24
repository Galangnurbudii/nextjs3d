"use server";

import { db } from "@/db/db";
import { UserTable } from "@/db/schema";
import { loginAuth } from "@/lib/auth";
import { hash, compare } from "bcrypt";

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ result: boolean; error?: string }> {
  try {
    const isDuplicateEmailExist = await db.query.UserTable.findFirst({
      where: (table, fn) => fn.eq(table.email, email),
    });

    if (isDuplicateEmailExist)
      return { result: false, error: "Email already exist !" };

    const hashedPassword = await hash(password, 10);

    await db.insert(UserTable).values({
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
    const user = await db.query.UserTable.findFirst({
      where: (table, fn) => fn.eq(table.email, email),
    });

    if (!user) return { result: false, error: "User not found" };

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) return { result: false, error: "Incorrect password" };

    await loginAuth({ id: user.id, email: user.email });

    return { result: true };
  } catch (error) {
    return { result: false, error: "Internal server error" };
  }
}
