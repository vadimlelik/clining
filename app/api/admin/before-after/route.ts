import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session";
import { addBeforeAfterPair, getBeforeAfterItems, removeBeforeAfterItem } from "@/lib/before-after-storage";

async function assertAdmin() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminSessionToken(token))) {
    return NextResponse.json({ error: "Нужна авторизация" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await assertAdmin();
  if (denied) return denied;
  const items = await getBeforeAfterItems();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Ожидается multipart/form-data." }, { status: 400 });
  }

  const before = formData.get("before");
  const after = formData.get("after");
  const captionRaw = formData.get("caption");

  if (!(before instanceof File) || !(after instanceof File)) {
    return NextResponse.json({ error: "Загрузите два файла: до и после." }, { status: 400 });
  }

  const caption = typeof captionRaw === "string" ? captionRaw : undefined;
  const result = await addBeforeAfterPair(before, after, caption);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, item: result.item });
}

export async function DELETE(request: Request) {
  const denied = await assertAdmin();
  if (denied) return denied;

  const id = new URL(request.url).searchParams.get("id");
  if (!id?.trim()) {
    return NextResponse.json({ error: "Укажите id." }, { status: 400 });
  }

  const result = await removeBeforeAfterItem(id.trim());
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
