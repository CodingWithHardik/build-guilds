import crypot from "crypto";
import { render } from "@react-email/components";
import VerificationOTP from "../../../../../emails/otp";
import nodemailer from "nodemailer";
import { getEmailTransporter } from "../../../../../lib/mailer";
import { getRedis } from "../../../../../lib/redis";

export async function POST(
  request: Request,
  { params }: { params: { event: string } },
) {
  const { email } = await request.json();

  if (!email || typeof email !== "string")
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  if (!email.endsWith("@blueprint.hackclub.com"))
    return new Response(
      JSON.stringify({ error: "Email must be a blueprint email" }),
      { status: 200 },
    );
  const redis = getRedis();
  const current = Number((await redis.get(`limit:otp:${email}`)) ?? 0);
  if (current >= 10) {
    return new Response(JSON.stringify({ error: "Too many otp requests" }), {
      status: 229,
    });
  }
  const newCount = await redis.incr(`limit:otp:${email}`);
  if (newCount === 1) {
    await redis.expire(`limit:otp:${email}`, 86400);
  }
  let otp = await redis.get(email);
  if (!otp || !otp?.length) {
    otp = Array.from(
      { length: 6 },
      () =>
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[
          crypot.randomInt(0, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length)
        ],
    ).join("");
    await redis.set(email, otp, "EX", 60 * 10);
  }
  const emailHtml = await render(VerificationOTP(otp));
  const emailTransporter = getEmailTransporter();
  await emailTransporter.sendMail({
    from: `"Build Guilds" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your Build Guilds OTP",
    html: emailHtml,
    priority: "high",
  });
  return new Response(JSON.stringify({ message: "OTP sent successfully" }), { status: 202 });
}
