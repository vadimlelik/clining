import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-session";
import { verifyAdminJwtEdge } from "@/lib/jwt-edge";
const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/api/admin/login", "/api/admin/logout"]);
const INDEXNOW_KEY_PATTERN = /^[a-f0-9]{8,128}$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const indexNowKey = process.env.INDEXNOW_KEY?.trim().toLowerCase();
  if (indexNowKey && INDEXNOW_KEY_PATTERN.test(indexNowKey) && pathname === `/${indexNowKey}.txt`) {
    return new NextResponse(indexNowKey, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const ok = await verifyAdminJwtEdge(token);
    if (!ok) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Нужна авторизация" }, { status: 401 });
      }
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*", "/:keyfile(.*\\.txt)"],
};
