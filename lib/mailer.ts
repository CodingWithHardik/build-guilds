import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function getEmailTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PWD,
      },
      service: "Gmail",
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });
  }
  return transporter;
}
