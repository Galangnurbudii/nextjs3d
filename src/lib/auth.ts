"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

interface UserPayload {
  email: string;
}

async function generateToken(payload: any) {
  if (secretKey) {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10 min from now")
      .sign(key);
    return token;
  }
  return null;
}

async function decryptPayload(currentToken: string) {
  try {
    if (key) {
      const { payload } = await jwtVerify(currentToken, key, {
        algorithms: ["HS256"],
      });
      console.log(payload);

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      } as UserPayload;
    }
  } catch (error) {
    return null;
  }
}

export async function getCurrentSession() {
  const currentToken = cookies().get("token")?.value;
  if (!currentToken) return null;
  const payload = await decryptPayload(currentToken);
  return payload;
}

export async function updateExpiredCurrentSession() {
  const currentPayload = await getCurrentSession();
  if (!currentPayload) return null;
  const res = NextResponse.next();
  const token = await generateToken({
    email: currentPayload.email,
  });
  if (token) {
    res.cookies.set("token", token, {
      expires: new Date(Date.now() + 30000 * 50),
      httpOnly: true,
    });
  }
  return res;
}

export async function loginAuth({ email }: UserPayload) {
  if (!email) throw new Error("User not found");

  const token = await generateToken({ email });
  const expires = new Date(Date.now() + 30000 * 50);

  if (token) {
    cookies().set("token", token, { expires, httpOnly: true });
  }
}
