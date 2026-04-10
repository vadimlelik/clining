import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  comment?: string;
};

function formatLeadMessage(payload: Required<LeadPayload>) {
  return [
    "Новая заявка с сайта CleanPro",
    "",
    `Имя: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Комментарий: ${payload.comment || "-"}`,
    `Дата: ${new Date().toLocaleString("ru-RU")}`,
  ].join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json()) as LeadPayload;
  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const comment = body.comment?.trim() ?? "";

  if (!name || !phone) {
    return NextResponse.json({ error: "Заполните обязательные поля: имя и телефон." }, { status: 400 });
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
  const formattedMessage = formatLeadMessage({ name, phone, comment });

  const sendTasks: Promise<Response>[] = [];

  if (telegramBotToken && telegramChatId) {
    sendTasks.push(
      fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: formattedMessage,
        }),
      }),
    );
  }

  if (crmWebhookUrl) {
    sendTasks.push(
      fetch(crmWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "website",
          name,
          phone,
          comment,
          createdAt: new Date().toISOString(),
        }),
      }),
    );
  }

  if (sendTasks.length === 0) {
    return NextResponse.json(
      { error: "Сервер не настроен для отправки заявок. Добавьте TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID или CRM_WEBHOOK_URL." },
      { status: 500 },
    );
  }

  const results = await Promise.allSettled(sendTasks);
  const hasSuccess = results.some((result) => result.status === "fulfilled" && result.value.ok);

  if (!hasSuccess) {
    return NextResponse.json({ error: "Не удалось отправить заявку в Telegram/CRM. Попробуйте позже." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
