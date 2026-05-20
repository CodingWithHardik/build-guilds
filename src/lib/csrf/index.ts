import crypto from "crypto"
import { safeEqualString } from "../../../lib/secureCompare";
const secret = process.env.CSRF_SECRET;

type generateSuccess = {
  success: true;
  token: string;
  id: string;
}

type generateFailed = {
  success: false;
  token: null;
  id: null;
}

type generateResponse = generateSuccess | generateFailed;

export function generateCsrfToken(): generateResponse {
  if (!secret || !secret.length) return { success: false, token: null, id: null };
  const data = crypto.randomBytes(18).toString("hex")
  const token = crypto.createHmac("sha256", secret).update(data).digest("hex")
  return { success: true, token, id: data };
}

export function verifyCsrfToken(token: string, id: string) {
  if (!secret || !secret.length) return { success: false };
  if (!token || !id) return { success: false };
  const expectedToken = crypto.createHmac("sha256", secret).update(id).digest("hex");
  const success = safeEqualString(token, expectedToken);
  return { success };
}