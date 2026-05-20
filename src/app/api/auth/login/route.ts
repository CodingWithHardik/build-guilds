import { getRedis } from "../../../../../lib/redis";
import { generateToken } from "../../../../../lib/auth";
import { safeEqualString } from "../../../../../lib/secureCompare";
import { cookies } from 'next/headers'
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { email, otp } = await request.json();
    if (!email || typeof email !== "string") return new Response(JSON.stringify({ error: "Email is required" }), { status: 200 });
    const redis = getRedis();
    const emailfilter = email.toLowerCase().trim();
    let storedOtp = await redis.get(`otp:${emailfilter}`);
    if (!otp || !otp?.length || typeof otp !== "string" || otp.length !== 6) return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 200 });
    if (!safeEqualString(otp, storedOtp)) return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 200 });
    await redis.del(`otp:${emailfilter}`);
    const checkuserextistance = await prisma.user.findUnique({
        where: {
            email: emailfilter
        }
    })
    const isNew = !checkuserextistance;
    const getData = await prisma.user.upsert({
        where: {
            email: emailfilter
        },
        update: {},
        create: {
            role: "USER",
            email: emailfilter,
        }

    })
    const token = generateToken(emailfilter);
    if (!token) return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    if (typeof token === "object" && token !== null && "code" in token && token.code === 404) return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    if (typeof token === "object" && token !== null && "code" in token && token.code === 200) return new Response(JSON.stringify({ error: "Invalid Email" }), { status: 200 });
    if (typeof token === "object" && token !== null && "code" in token && token.code === 202 && "token" in token) {
        const cookieStore = await cookies();
        const forwardedProto = request.headers.get("x-forwarded-proto");
        const secureFlag = process.env.FORCE_SECURE === "1" || forwardedProto === "https" || process.env.NODE_ENV === "production";
        cookieStore.set("token", token.token as string, { path: "/", httpOnly: true, secure: secureFlag, sameSite: "strict", maxAge: 60 * 60 * 24 * 2 });
        return new Response(JSON.stringify({ token: token.token, isNew: isNew, name: getData?.name || null, email: getData?.email || null, avatar: getData?.avatar || null }), { status: 202 });
    }
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
}