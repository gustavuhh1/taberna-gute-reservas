import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "taberna-gute.session_token";

function getAuthFromRequest(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  return { hasSession: true };
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/authentication") ||
    pathname.startsWith("/authentication/request-password") ||
    pathname.startsWith("/api/auth/request-password") ||
    pathname.startsWith("/api/auth/reset-password") ||
    pathname.startsWith("/api/auth")

  if (isPublic) return NextResponse.next();
  const auth = getAuthFromRequest(req);
  if (!auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/authentication";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)",
  ],
};
