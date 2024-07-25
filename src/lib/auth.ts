"use server";

import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;

function generateToken(payload: any) {
  if (secretKey) {
    const token = sign(payload, secretKey);
    return token;
  }
  return null;
}

function decryptPayload(currentToken: string) {
  if (secretKey) {
    const payload = verify(currentToken, secretKey);
    return payload;
  }
  return null;
}

export async function getCurrentSession() {
  const currentToken = cookies().get("token")?.value;
  if (!currentToken) return null;
  const payload = decryptPayload(currentToken) as { id: string; email: string };
  return payload;
}

export async function loginAuth({ id, email }: { id: string; email: string }) {
  if (!id || !email) throw new Error("User not found");

  const token = generateToken({ id, email });
  const expires = new Date(Date.now() + 30000 * 50);

  if (token) {
    cookies().set("token", token, { expires, httpOnly: true });
  }
}
