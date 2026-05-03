import { createHash, timingSafeEqual } from "crypto";

/** Сравнение пароля с ADMIN_PASSWORD без зависимости от длины строки (SHA-256 → фиксированная длина). */
export function verifyAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}
