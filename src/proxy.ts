import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "../lib/auth";
import { getRedis } from "../lib/redis";

export async function proxy(request: NextRequest) {
  const pathList = ["/api/auth", "/favicon.ico", "/_next", "/auth"];
  const path = request.nextUrl.pathname;
  if (pathList.some((p) => path.startsWith(p))) {
    if (path.startsWith("/api/auth/")) {
      const redis = getRedis();
      const ip = request.headers.get("x-forwarded-for") || "unknown";
      const current = Number((await redis.get(`limit:${path}:${ip}`)) ?? 0);
      if (current >= 100) {
        return new Response(JSON.stringify({ error: "Too many requests" }), {
          status: 429,
        });
      }
      const newCount = await redis.incr(`limit:${path}:${ip}`);
      if (newCount === 1) {
        await redis.expire(`limit:${path}:${ip}`, 600);
      }
    } else if (path.startsWith("/auth/")) {
      const token = request.cookies.get("token")?.value;
      if (token) {
        const verify = verifyToken(token);
        if ((verify as any).success)
          return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));
  const verify = verifyToken(token);
  if (!(verify as any).success)
    return NextResponse.redirect(new URL("/auth/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};
