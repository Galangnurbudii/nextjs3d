import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentSession, updateExpiredCurrentSession } from "./lib/auth";
import { getUserByEmail } from "./actions/admin/userAction";

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
    // const currentUser = currentSession
    //   ? await getUserByEmail({ email: currentSession?.email })
    //   : null;

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
  }

  return await updateExpiredCurrentSession();
}

export const config = {
  matcher: protectedRoutes,
};
