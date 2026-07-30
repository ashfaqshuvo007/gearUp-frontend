import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/utils";
import { JwtPayload } from "jsonwebtoken";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/gears"];
const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathName === route || pathName.startsWith(route + "/"),
  );
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathName === route || pathName.startsWith(route + "/"),
  );

  if (!accessToken || !refreshToken) {
    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  let decodedAccessToken = verifyToken(accessToken, JWT_SECRET);
  const decodedRefreshToken = verifyToken(refreshToken, REFRESH_SECRET);

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
  }

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodedAccessToken = verifyToken(accessToken!, JWT_SECRET);
    }
  }

  const userRole = (decodedAccessToken.data as JwtPayload).role;

  if (isAuthRoute) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (userRole === "PROVIDER") {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (
    !isPublicRoute &&
    !isAuthRoute &&
    pathName.startsWith("/dashboard") &&
    userRole !== "CUSTOMER"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (
    !isPublicRoute &&
    !isAuthRoute &&
    pathName.startsWith("/admin-dashboard") &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (
    !isPublicRoute &&
    !isAuthRoute &&
    pathName.startsWith("/provider-dashboard") &&
    userRole !== "PROVIDER"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
