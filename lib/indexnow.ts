import { getSiteUrl } from "@/lib/site";

const INDEXNOW_KEY_PATTERN = /^[a-f0-9]{8,128}$/i;
const MAX_URLS_PER_REQUEST = 10_000;

export function getIndexNowKey(): string | undefined {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key || !INDEXNOW_KEY_PATTERN.test(key)) return undefined;
  return key.toLowerCase();
}

export function getIndexNowKeyPath(): string | undefined {
  const key = getIndexNowKey();
  return key ? `/${key}.txt` : undefined;
}

export function getIndexNowKeyLocation(): string | undefined {
  const key = getIndexNowKey();
  if (!key) return undefined;
  return `${getSiteUrl()}/${key}.txt`;
}

type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

function buildPayload(urls: string[]): IndexNowPayload | null {
  const key = getIndexNowKey();
  const keyLocation = getIndexNowKeyLocation();
  if (!key || !keyLocation) return null;

  const host = new URL(getSiteUrl()).host;
  const urlList = [...new Set(urls.map((url) => url.trim()).filter(Boolean))].slice(0, MAX_URLS_PER_REQUEST);
  if (urlList.length === 0) return null;

  return { host, key, keyLocation, urlList };
}

/** Уведомляет Яндекс и IndexNow (Bing и др.) об изменении URL. */
export async function submitIndexNow(urls: string[]): Promise<{ ok: boolean; submitted: number; error?: string }> {
  const payload = buildPayload(urls);
  if (!payload) {
    return {
      ok: false,
      submitted: 0,
      error: "Задайте INDEXNOW_KEY (8–128 hex-символов) и NEXT_PUBLIC_SITE_URL в переменных окружения.",
    };
  }

  const body = JSON.stringify(payload);
  const headers = { "Content-Type": "application/json; charset=utf-8" };

  const results = await Promise.allSettled([
    fetch("https://yandex.com/indexnow", { method: "POST", headers, body }),
    fetch("https://api.indexnow.org/indexnow", { method: "POST", headers, body }),
  ]);

  const responses = results
    .filter((result): result is PromiseFulfilledResult<Response> => result.status === "fulfilled")
    .map((result) => result.value);

  const accepted = responses.some((res) => res.status === 200 || res.status === 202);
  if (!accepted) {
    const status = responses.map((res) => res.status).join(", ") || "network error";
    return { ok: false, submitted: 0, error: `IndexNow отклонил запрос (HTTP ${status}).` };
  }

  return { ok: true, submitted: payload.urlList.length };
}
