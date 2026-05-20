import { verifyCsrfToken } from "@/lib/csrf";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_KEY;

export const generateToken = (email: string, id: string): object => {
  if (!secretKey) return { code: 404 };
  return {
    code: 202,
    token: jwt.sign({ email, id, timestamp: Date.now() }, secretKey!, {
      expiresIn: "2d",
    }),
  };
};

type data = {
  email: string;
  id: string;
  timestamp: number;
};

type verifySuccess = {
  success: true;
  email: string;
  code: number;
};
type verifyFailed = {
  success: false;
  message: string;
  code: number;
};

export type verifyResponse = verifyFailed | verifySuccess;

export const verifyToken = (
  token: string,
  requiredcsrf: boolean,
  csrfToken?: string,
): verifyResponse => {
  if (!secretKey)
    return { code: 404, success: false, message: "Internal Server Error" };
  if (!requiredcsrf) {
    try {
      const decoded = jwt.verify(token, secretKey) as data;
      return { code: 202, email: decoded.email, success: true };
    } catch (err) {
      return { code: 200, message: "Invalid token", success: false };
    }
  } else {
    if (!csrfToken) return { code: 403, message: "Invalid CSRF Token", success: false }
    try {
      const decoded = jwt.verify(token, secretKey) as data;
      const verify = verifyCsrfToken(csrfToken, decoded.id);
      if (!verify.success)
        return { code: 403, message: "Invalid CSRF Token", success: false };
      return { code: 202, email: decoded.email, success: true };
    } catch (err) {
      return { code: 200, message: "Invalid token", success: false };
    }
  }
};
