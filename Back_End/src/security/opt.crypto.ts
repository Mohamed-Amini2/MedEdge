import { createHmac, randomInt } from "crypto";

function getOtpSecret(): string {
  const secret = process.env.OTP_SECRET || process.env.OTP_PASSWORD;
  if (!secret) {
    throw new Error("OTP_SECRET or OTP_PASSWORD environment variable is not set");
  }
  return secret;
}

export function generate6DigitOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function hashOtp(userId: string, purpose: string, code: string): string {
  return createHmac("sha256", getOtpSecret())
    .update(`${userId}:${purpose}:${code}`, "utf8")
    .digest("hex");
}