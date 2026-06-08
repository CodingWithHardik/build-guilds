import { getRedis } from "../../../../../lib/redis";
import { generateToken } from "../../../../../lib/auth";
import { safeEqualString } from "../../../../../lib/secureCompare";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCsrfToken } from "@/lib/csrf";
import { sanitizeInput } from "@/lib/functions/sanitization";

export async function POST(request: NextRequest) {
  const { email, otp } = await request.json();
  const emailfilter = sanitizeInput(email);
  const otpfilter = sanitizeInput(otp);
  if (!emailfilter || typeof emailfilter !== "string")
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 200,
    });
  const redis = getRedis();
  const current = Number((await redis.get(`limit:login:${emailfilter}`)) ?? 0);
  if (current >= 50) {
    return new Response(JSON.stringify({ error: "Too many login requests" }), {
      status: 229,
    });
  }
  const newCount = await redis.incr(`limit:login:${emailfilter}`);
  if (newCount === 1) {
    await redis.expire(`limit:login:${emailfilter}`, 86400);
  }
  let storedOtp = await redis.get(`otp:${emailfilter}`);
  if (!otpfilter || !otpfilter?.length || typeof otpfilter !== "string" || otpfilter.length !== 6)
    return new Response(JSON.stringify({ error: "Invalid OTP" }), {
      status: 200,
    });
  if (!safeEqualString(otpfilter, storedOtp))
    return new Response(JSON.stringify({ error: "Invalid OTP" }), {
      status: 200,
    });
  await redis.del(`otp:${emailfilter}`);
  const checkuserextistance = await prisma.user.findUnique({
    where: {
      email: emailfilter,
    },
  });
  const isNew = !checkuserextistance;
  const getData = await prisma.user.upsert({
    where: {
      email: emailfilter,
    },
    update: {},
    create: {
      role: "USER",
      email: emailfilter,
    },
  });
  const getcsrf = generateCsrfToken();
  if (!getcsrf.success)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  const token = generateToken(emailfilter, getcsrf.id);
  if (!token)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  if (
    typeof token === "object" &&
    token !== null &&
    "code" in token &&
    token.code === 404
  )
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  if (
    typeof token === "object" &&
    token !== null &&
    "code" in token &&
    token.code === 200
  )
    return new Response(JSON.stringify({ error: "Invalid Email" }), {
      status: 200,
    });
  if (
    typeof token === "object" &&
    token !== null &&
    "code" in token &&
    token.code === 202 &&
    "token" in token
  ) {
    const cookieStore = await cookies();
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const secureFlag =
      process.env.FORCE_SECURE === "1" ||
      forwardedProto === "https" ||
      process.env.NODE_ENV === "production";
    cookieStore.set("token", token.token as string, {
      path: "/",
      httpOnly: true,
      secure: secureFlag,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 2,
    });
    cookieStore.set("csrf_token", getcsrf.token, {
      path: "/",
      httpOnly: false,
      secure: secureFlag,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 2,
    });
    return new Response(
      JSON.stringify({
        token: token.token,
        isNew: isNew,
        name: getData?.name || null,
        email: getData?.email || null,
        avatar: getData?.avatar || null,
      }),
      { status: 202, headers: { "x-csrf-token": getcsrf.token } },
    );
  }
  return new Response(JSON.stringify({ error: "Internal Server Error" }), {
    status: 500,
  });
}