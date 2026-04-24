import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "../lib/auth";
import { getRedis } from "../lib/redis";

export async function proxy(request: NextRequest) {
  const pathList = ["/favicon.ico", "/_next"];
  const path = request.nextUrl.pathname;
  const baseHeaders = new Headers(request.headers);
  baseHeaders.set("x-pathname", path);
  if (pathList.some((p) => path.startsWith(p))) {
    return NextResponse.next({
      request: {
        headers: baseHeaders,
      },
    });
  }

  if (path === "/") {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.redirect(new URL("/auth/login", request.url));
    if (token) {
      const verify = verifyToken(token);
      if (!(verify as any).success) {
        const response = NextResponse.redirect(
          new URL("/auth/login", request.url),
        );
        response.cookies.delete("token");
        return response;
      }
      const redirectDash = NextResponse.redirect(
        new URL("/dashboard", request.url),
      );
      redirectDash.headers.set("Authorization", `Bearer ${token}`);
      return redirectDash;
    }
  }

  if (path.startsWith("/auth")) {
    if (request.nextUrl.searchParams.get("logout") === "1") {
      const url = request.nextUrl.clone();
      url.searchParams.delete("logout");
      const response = NextResponse.redirect(url,{
        headers: baseHeaders,
      });
      response.cookies.delete("token");
      return response;
    }
    const token = request.cookies.get("token")?.value;
    if (token) {
      const verify = verifyToken(token);
      if ((verify as any).success) {
        const redirectDash = NextResponse.redirect(
          new URL("/dashboard", request.url),
        );
        redirectDash.headers.set("Authorization", `Bearer ${token}`);
        return redirectDash;
      } else {
        const response = NextResponse.next({
          request: {
            headers: baseHeaders,
          },
        });
        response.cookies.delete("token");
        return response;
      }
    }
    return NextResponse.next({
      request: {
        headers: baseHeaders,
      },
    });
  }

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
    return NextResponse.next({
      request: {
        headers: baseHeaders,
      },
    });
  }

  if (path.startsWith("/api/")) {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const headers = new Headers(request.headers);
    headers.set("x-pathname", path);
    headers.set("Authorization", `Bearer ${token}`);
    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  const cookietoken = request.cookies.get("token")?.value;
  if (!cookietoken)
    return NextResponse.redirect(new URL("/auth/login", request.url));
  const verifycookie = verifyToken(cookietoken);
  if (!(verifycookie as any).success) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    return response;
  }
  const requestheaders = new Headers(request.headers);
  requestheaders.set("x-pathname", path);
  requestheaders.set("Authorization", `Bearer ${cookietoken}`);
  return NextResponse.next({
    request: {
      headers: requestheaders,
    },
  });
}

export const config = {
  matcher: "/(.*)",
};
