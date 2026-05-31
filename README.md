## CleanPro Website

Сайт клининговой компании на `Next.js 14` + `Tailwind CSS`.

## Локальный запуск

```bash
npm install
npm run dev
```

## Отправка заявок в Telegram/CRM

Форма отправляет данные в `POST /api/lead`.
Настрой переменные окружения в `.env.local`:

```bash
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=-1001234567890
CRM_WEBHOOK_URL=https://your-crm.example/webhook/lead
```

- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` — отправка в Telegram.
- `CRM_WEBHOOK_URL` — опционально, параллельная отправка в CRM.
- Если Telegram и CRM одновременно настроены, форма отправляет в оба канала.

## Продакшен

В Vercel обязательно добавь переменную (чтобы `sitemap.xml`, `robots.txt` и canonical всегда указывали на твой основной домен):

```bash
NEXT_PUBLIC_SITE_URL=https://www.chistkaminsk.ru
NEXT_PUBLIC_CONTACT_PHONE=+375 (29) 123-45-67
NEXT_PUBLIC_CONTACT_EMAIL=info@chistkaminsk.ru
```

После публикации карточек в каталогах добавьте их URL в `siteConfig.sameAs` в `lib/site.ts` (Google, Яндекс, 2ГИС).

```bash
npm run build
npm run start
```
