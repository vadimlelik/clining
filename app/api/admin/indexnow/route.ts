import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session";
import { submitIndexNow } from "@/lib/indexnow";
import { getSiteUrl } from "@/lib/site";
import { getSitemapUrls } from "@/lib/sitemap-urls";

async function assertAdmin() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminSessionToken(token))) {
    return NextResponse.json({ error: "Нужна авторизация" }, { status: 401 });
  }
  return null;
}

export async function POST() {
  const denied = await assertAdmin();
  if (denied) return denied;

  const result = await submitIndexNow(getSitemapUrls());
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    submitted: result.submitted,
    keyLocation: `${getSiteUrl()}/${process.env.INDEXNOW_KEY?.trim().toLowerCase()}.txt`,
  });
}
