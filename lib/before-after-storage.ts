import { del, head, put } from "@vercel/blob";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { BeforeAfterItem } from "@/lib/before-after-types";

const MANIFEST_PATHNAME = "before-after/manifest.json";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

const localManifestPath = () => path.join(process.cwd(), "data", "before-after.json");
const localUploadDir = () => path.join(process.cwd(), "public", "uploads", "before-after");

function blobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function extFromMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

function validateImage(file: File): string | null {
  if (!ALLOWED.has(file.type)) return "Допустимы только JPEG, PNG или WebP.";
  if (file.size > MAX_BYTES) return "Размер каждого файла не больше 5 МБ.";
  return null;
}

async function readManifestBlob(): Promise<BeforeAfterItem[]> {
  const token = process.env.BLOB_READ_WRITE_TOKEN!;
  try {
    const meta = await head(MANIFEST_PATHNAME, { token });
    const res = await fetch(meta.url);
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as BeforeAfterItem[]) : [];
  } catch {
    return [];
  }
}

async function writeManifestBlob(items: BeforeAfterItem[]): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN!;
  await put(MANIFEST_PATHNAME, JSON.stringify(items), {
    access: "public",
    token,
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

async function readManifestLocal(): Promise<BeforeAfterItem[]> {
  try {
    const raw = await readFile(localManifestPath(), "utf8");
    const data = JSON.parse(raw) as unknown;
    return Array.isArray(data) ? (data as BeforeAfterItem[]) : [];
  } catch {
    return [];
  }
}

async function writeManifestLocal(items: BeforeAfterItem[]): Promise<void> {
  const p = localManifestPath();
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, JSON.stringify(items, null, 2), "utf8");
}

export async function getBeforeAfterItems(): Promise<BeforeAfterItem[]> {
  if (blobStorageEnabled()) return readManifestBlob();
  return readManifestLocal();
}

async function appendItem(item: BeforeAfterItem): Promise<void> {
  const items = await getBeforeAfterItems();
  items.unshift(item);
  if (blobStorageEnabled()) await writeManifestBlob(items);
  else await writeManifestLocal(items);
}

export async function addBeforeAfterPair(before: File, after: File, caption?: string): Promise<{ ok: true; item: BeforeAfterItem } | { ok: false; error: string }> {
  const errBefore = validateImage(before);
  if (errBefore) return { ok: false, error: errBefore };
  const errAfter = validateImage(after);
  if (errAfter) return { ok: false, error: errAfter };

  const id = randomUUID();
  const cap = caption?.trim().slice(0, 280) || undefined;
  const createdAt = new Date().toISOString();

  if (blobStorageEnabled()) {
    const token = process.env.BLOB_READ_WRITE_TOKEN!;
    const beforeExt = extFromMime(before.type);
    const afterExt = extFromMime(after.type);
    const beforeBuf = Buffer.from(await before.arrayBuffer());
    const afterBuf = Buffer.from(await after.arrayBuffer());
    const [bPut, aPut] = await Promise.all([
      put(`before-after/${id}/before.${beforeExt}`, beforeBuf, {
        access: "public",
        token,
        contentType: before.type,
        addRandomSuffix: false,
      }),
      put(`before-after/${id}/after.${afterExt}`, afterBuf, {
        access: "public",
        token,
        contentType: after.type,
        addRandomSuffix: false,
      }),
    ]);
    const item: BeforeAfterItem = {
      id,
      beforeUrl: bPut.url,
      afterUrl: aPut.url,
      caption: cap,
      createdAt,
    };
    await appendItem(item);
    return { ok: true, item };
  }

  await mkdir(localUploadDir(), { recursive: true });
  const beforeExt = extFromMime(before.type);
  const afterExt = extFromMime(after.type);
  const beforeName = `${id}-before.${beforeExt}`;
  const afterName = `${id}-after.${afterExt}`;
  const dir = localUploadDir();
  await Promise.all([
    writeFile(path.join(dir, beforeName), Buffer.from(await before.arrayBuffer())),
    writeFile(path.join(dir, afterName), Buffer.from(await after.arrayBuffer())),
  ]);
  const item: BeforeAfterItem = {
    id,
    beforeUrl: `/uploads/before-after/${beforeName}`,
    afterUrl: `/uploads/before-after/${afterName}`,
    caption: cap,
    createdAt,
  };
  await appendItem(item);
  return { ok: true, item };
}

export async function removeBeforeAfterItem(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const items = await getBeforeAfterItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return { ok: false, error: "Элемент не найден." };
  const [removed] = items.splice(idx, 1);

  if (blobStorageEnabled()) {
    const token = process.env.BLOB_READ_WRITE_TOKEN!;
    try {
      await del([removed.beforeUrl, removed.afterUrl], { token });
    } catch {
      /* продолжаем — манифест всё равно обновим */
    }
    await writeManifestBlob(items);
    return { ok: true };
  }

  try {
    const beforePath = path.join(process.cwd(), "public", removed.beforeUrl.replace(/^\//, ""));
    const afterPath = path.join(process.cwd(), "public", removed.afterUrl.replace(/^\//, ""));
    await Promise.all([unlink(beforePath).catch(() => {}), unlink(afterPath).catch(() => {})]);
  } catch {
    /* ignore */
  }
  await writeManifestLocal(items);
  return { ok: true };
}
