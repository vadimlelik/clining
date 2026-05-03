import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminSessionToken } from "@/lib/admin-session";
import { verifyAdminPassword } from "@/lib/admin-password";

export async function POST(request: Request) {
  try {
    let body: { password?: string };
    try {
      body = (await request.json()) as { password?: string };
    } catch {
      return NextResponse.json({ error: "Некорректный JSON." }, { status: 400 });
    }

    const password = body.password ?? "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Неверный пароль." }, { status: 401 });
    }

    const token = await createAdminSessionToken();
    if (!token) {
      return NextResponse.json(
        { error: "Задайте ADMIN_SESSION_SECRET (не короче 16 символов) в переменных окружения." },
        { status: 503 },
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    console.error("[api/admin/login]", e);
    return NextResponse.json({ error: "Ошибка сервера." }, { status: 500 });
  }
}
