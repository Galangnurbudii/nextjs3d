import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentSession } from "./lib/auth";

const protectedRoutes = [
  "/login",
  "/register",
  "/admin",
  "/browse-inspiration",
  "/design-from-scratches",
  "/summary",
];

function checkProtectedRoutes(currentRoutes: string) {
  let isProtectedRoutes = false;

  protectedRoutes.forEach((route) => {
    if (currentRoutes.includes(route)) isProtectedRoutes = true;
    return;
  });

  return isProtectedRoutes;
}

export async function middleware(request: NextRequest) {
  const currentRoute = request.nextUrl.pathname;
  const isProtectedRoutes = checkProtectedRoutes(currentRoute);

  if (isProtectedRoutes) {
    const currentSession = await getCurrentSession();

    if (
      currentRoute.startsWith("/_next") ||
      currentRoute.startsWith("/images")
    ) {
      return NextResponse.next();
    }

    if (
      currentSession &&
      (currentRoute === "/login" || currentRoute === "/register")
    ) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (
      !currentSession &&
      (currentRoute === "/login" || currentRoute === "/register")
    ) {
      return NextResponse.next();
    }

    if (
      !currentSession &&
      currentRoute !== "/login" &&
      currentRoute !== "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (currentSession?.role !== "admin" && currentRoute.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedRoutes,
};
