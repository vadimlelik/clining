/** Проверка JWT HS256 без `jose` — совместимо с Edge Middleware (без Node-only API). */

function base64UrlToUint8Array(b64url: string): Uint8Array {
  const pad = "=".repeat((4 - (b64url.length % 4)) % 4);
  const base64 = b64url.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(base64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function verifyJwtHs256(token: string, secret: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [headerB64, payloadB64, sigB64] = parts;
  const signingInput = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expectedBuf = await crypto.subtle.sign("HMAC", key, signingInput);
  const expected = new Uint8Array(expectedBuf);
  const sig = base64UrlToUint8Array(sigB64);
  if (!timingSafeEqual(sig, expected)) return false;

  try {
    const payloadJson = JSON.parse(new TextDecoder().decode(base64UrlToUint8Array(payloadB64))) as { exp?: number };
    if (typeof payloadJson.exp !== "number") return false;
    return payloadJson.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export async function verifyAdminJwtEdge(token: string | undefined): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret || secret.length < 16) return false;
  return verifyJwtHs256(token, secret);
}
