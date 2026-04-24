import { getRedis } from "../../../../../lib/redis";
import { generateToken } from "../../../../../lib/auth";
import { cookies } from 'next/headers'
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { email, otp } = await request.json();

    if (!email || typeof email !== "string") return new Response(JSON.stringify({ error: "Email is required" }), { status: 200 });
    const redis = getRedis();
    let storedOtp = await redis.get(email)
    if (!otp || !otp?.length || typeof otp !== "string" || otp.length !== 6) return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 200 });
    if (otp !== storedOtp) return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 200 });
    await redis.del(email);
    const getData = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!getData) {
        await prisma.user.create({
            data: {
                email: email,
                role: "USER"
            }
        })
    }
    const token = generateToken(email);
    if (!token) return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    if (typeof token === "object" && token !== null && "code" in token && token.code === 404) return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    if (typeof token === "object" && token !== null && "code" in token && token.code === 200) return new Response(JSON.stringify({ error: "Invalid Email" }), { status: 200 });
    if (typeof token === "object" && token !== null && "code" in token && token.code === 202 && "token" in token) {
        const cookieStore = await cookies();
        cookieStore.set("token", token.token as string, { path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 2 });
        return new Response(JSON.stringify({ token: token.token }), { status: 202 });
    }
}