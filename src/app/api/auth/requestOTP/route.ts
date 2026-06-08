import crypto from "crypto";
import { render } from "@react-email/components";
import VerificationOTP from "../../../../../emails/otp";
import nodemailer from "nodemailer";
import { getEmailTransporter } from "../../../../../lib/mailer";
import { getRedis } from "../../../../../lib/redis";
import { NextRequest } from "next/server";
import { sanitizeInput } from "@/lib/functions/sanitization";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const emailfilter = sanitizeInput(email);
  if (!emailfilter || typeof emailfilter !== "string")
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  const redis = getRedis();
  const current = Number((await redis.get(`limit:otp:${emailfilter}`)) ?? 0);
  if (current >= 10) {
    return new Response(JSON.stringify({ error: "Too many otp requests" }), {
      status: 229,
    });
  }
  const newCount = await redis.incr(`limit:otp:${emailfilter}`);
  if (newCount === 1) {
    await redis.expire(`limit:otp:${emailfilter}`, 86400);
  }
  const otp = Array.from(
    { length: 6 },
    () =>
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[
        crypto.randomInt(0, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length)
      ],
  ).join("");
  const existingOtp = await redis.get(`otp:${emailfilter}`);
  await redis.set(`otp:${emailfilter}`, otp, "EX", 60 * 10, "NX");
  const finalOtp = existingOtp ? existingOtp : otp;
  const emailHtml = await render(VerificationOTP(finalOtp));
  const emailTransporter = getEmailTransporter();
  await emailTransporter.sendMail({
    from: `"Build Guilds" <${process.env.GMAIL_USER}>`,
    to: emailfilter,
    subject: "Your Build Guilds OTP",
    html: emailHtml,
    priority: "high",
  });
  return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
    status: 202,
  });
}
