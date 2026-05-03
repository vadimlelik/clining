import { ImageResponse } from "next/og";

/** Node runtime стабильнее Edge для @vercel/og в части окружений и снижает риск 5xx при генерации превью. */
export const runtime = "nodejs";

const ogSize = { width: 1200, height: 630 };

function OgLayout({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #e0f2fe 0%, #dcfce7 100%)",
        padding: "64px",
        fontFamily: "system-ui, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#0369a1" }}>CleanPro</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", fontSize: 66, lineHeight: 1.08, fontWeight: 800, color: "#0f172a", maxWidth: "980px" }}>{title}</div>
        <div style={{ display: "flex", fontSize: 36, lineHeight: 1.2, color: "#334155", maxWidth: "980px" }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#065f46" }}>Выезд по Минску | Фиксированная цена | Гарантия результата</div>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 60) || "CleanPro";
  const subtitle = searchParams.get("subtitle")?.slice(0, 100) || "Химчистка мебели в Минске";

  try {
    return new ImageResponse(<OgLayout title={title} subtitle={subtitle} />, ogSize);
  } catch (error) {
    console.error("[api/og]", error);
    return new ImageResponse(<OgLayout title="CleanPro" subtitle="Химчистка мебели в Минске" />, ogSize);
  }
}
