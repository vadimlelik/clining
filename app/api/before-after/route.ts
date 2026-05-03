import { NextResponse } from "next/server";
import { getBeforeAfterItems } from "@/lib/before-after-storage";

export const dynamic = "force-dynamic";

/** Публичное чтение галереи (для клиента или внешних запросов). */
export async function GET() {
  const items = await getBeforeAfterItems();
  return NextResponse.json({ items });
}
