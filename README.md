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

В Vercel обязательно добавь переменные:

```bash
NEXT_PUBLIC_SITE_URL=https://www.chistkaminsk.ru
NEXT_PUBLIC_CONTACT_PHONE=+375 (29) 123-45-67
NEXT_PUBLIC_CONTACT_EMAIL=info@chistkaminsk.ru
INDEXNOW_KEY=ваш_ключ_32_hex_символа
```

Ключ IndexNow сгенерируй так: `openssl rand -hex 16`. На сайте появится файл `https://www.chistkaminsk.ru/<ключ>.txt` — Яндекс проверяет его при уведомлениях.

### Ускорение индексирования (Яндекс)

Уже настроено в коде:

- **Sitemap** — `https://www.chistkaminsk.ru/sitemap.xml` (указан в `robots.txt`)
- **Яндекс.Метрика** — счётчик на всех страницах
- **IndexNow** — кнопка «Уведомить Яндекс» в `/admin` или команда `npm run indexnow:submit`

В [Яндекс.Вебмастере](https://webmaster.yandex.ru/) дополнительно:

1. Добавьте сайт и подтвердите права
2. **Индексирование → Файлы Sitemap** → укажите `https://www.chistkaminsk.ru/sitemap.xml`
3. Для отдельных страниц: **Индексирование → Переобход страниц**

После публикации карточек в каталогах добавьте их URL в `siteConfig.sameAs` в `lib/site.ts` (Google, Яндекс, 2ГИС).

```bash
npm run build
npm run start
```
