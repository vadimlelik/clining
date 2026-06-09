#!/usr/bin/env node

const key = process.env.INDEXNOW_KEY?.trim().toLowerCase();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

if (!key || !/^[a-f0-9]{8,128}$/.test(key)) {
  console.log("IndexNow: пропуск — задайте INDEXNOW_KEY (8–128 hex-символов).");
  process.exit(0);
}

if (!siteUrl) {
  console.log("IndexNow: пропуск — задайте NEXT_PUBLIC_SITE_URL.");
  process.exit(0);
}

const staticRoutes = ["", "/uslugi", "/ceny", "/otzivi", "/blog", "/kontakty", "/voprosy", "/rayony"];
const serviceSlugs = [
  "divan-dvukhmestnyy", "divan-trekhmestnyy", "uglovoy-divan", "kover", "stulya", "podushki",
  "kreslo", "matras", "sushka", "shtory", "kozhanyy-divan", "uglovoy-kozhanyy-divan",
  "kozhanoe-kreslo", "kozhanaya-podushka",
];
const districtSlugs = [
  "frunzenskiy", "moskovskiy", "leninskiy", "zavodskoy", "partizanskiy",
  "oktyabrskiy", "sovetskiy", "pervomayskiy", "tsentralnyy",
];
const blogSlugs = [
  "kak-vybrat-kliningovuyu-kompaniyu",
  "skolko-stoit-himchistka-divana-v-minske",
  "kak-udalit-zapah-s-divana",
];

const urls = [
  ...staticRoutes.map((route) => `${siteUrl}${route}`),
  ...serviceSlugs.map((slug) => `${siteUrl}/uslugi/${slug}`),
  ...districtSlugs.map((slug) => `${siteUrl}/rayony/${slug}`),
  ...blogSlugs.map((slug) => `${siteUrl}/blog/${slug}`),
];

const host = new URL(siteUrl).host;
const payload = {
  host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: urls,
};

const headers = { "Content-Type": "application/json; charset=utf-8" };
const body = JSON.stringify(payload);

const endpoints = ["https://yandex.com/indexnow", "https://api.indexnow.org/indexnow"];
const results = await Promise.allSettled(
  endpoints.map((url) => fetch(url, { method: "POST", headers, body })),
);

let ok = false;
for (const result of results) {
  if (result.status === "fulfilled" && (result.value.status === 200 || result.value.status === 202)) {
    ok = true;
    console.log(`IndexNow: ${result.value.url} → HTTP ${result.value.status}`);
  } else if (result.status === "fulfilled") {
    console.log(`IndexNow: ${result.value.url} → HTTP ${result.value.status}`);
  } else {
    console.log(`IndexNow: ошибка сети — ${result.reason}`);
  }
}

if (!ok) {
  console.error("IndexNow: ни один endpoint не принял запрос.");
  process.exit(1);
}

console.log(`IndexNow: отправлено ${urls.length} URL.`);
