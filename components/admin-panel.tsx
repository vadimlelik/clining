"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { BeforeAfterItem } from "@/lib/before-after-types";

export function AdminPanel() {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [caption, setCaption] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/before-after", { credentials: "include" });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Не удалось загрузить список");
      }
      const data = (await res.json()) as { items: BeforeAfterItem[] };
      setItems(data.items ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    window.location.href = "/admin/login";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (caption.trim()) fd.set("caption", caption.trim());

    try {
      const res = await fetch("/api/admin/before-after", { method: "POST", body: fd, credentials: "include" });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Ошибка загрузки");
      form.reset();
      setCaption("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить эту пару фото?")) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/before-after?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Не удалось удалить");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка удаления");
    }
  }

  return (
    <div className="mt-8 space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Хранилище: на Vercel включите <code className="rounded bg-slate-100 px-1">BLOB_READ_WRITE_TOKEN</code>. Локально файлы пишутся в{" "}
          <code className="rounded bg-slate-100 px-1">public/uploads/before-after</code>.
        </p>
        <div className="flex gap-2">
          <Link href="/#do-posle" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
            Смотреть на главной →
          </Link>
          <button type="button" onClick={() => handleLogout()} className="text-sm font-semibold text-slate-600 underline hover:text-slate-900">
            Выйти
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-bold text-slate-900">Добавить пару «до / после»</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-medium text-slate-700">Фото «до» (JPEG, PNG, WebP, до 5 МБ)</span>
            <input name="before" type="file" accept="image/jpeg,image/png,image/webp" required className="rounded-lg border border-slate-300 bg-white p-2" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium text-slate-700">Фото «после»</span>
            <input name="after" type="file" accept="image/jpeg,image/png,image/webp" required className="rounded-lg border border-slate-300 bg-white p-2" />
          </label>
        </div>
        <label className="mt-4 grid gap-1 text-sm">
          <span className="font-medium text-slate-700">Подпись (необязательно)</span>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Например: угловой диван, ткань велюр"
            maxLength={280}
            className="rounded-lg border border-slate-300 bg-white p-3"
          />
        </label>
        <button
          type="submit"
          disabled={uploading}
          className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {uploading ? "Загрузка…" : "Загрузить"}
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div>
        <h2 className="text-lg font-bold text-slate-900">Загруженные пары</h2>
        {loading ? (
          <p className="mt-3 text-slate-600">Загрузка…</p>
        ) : items.length === 0 ? (
          <p className="mt-3 text-slate-600">Пока нет ни одной пары. Добавьте фото выше.</p>
        ) : (
          <ul className="mt-4 grid gap-6">
            {items.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.beforeUrl} alt="" className="aspect-video w-full rounded-lg object-cover" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.afterUrl} alt="" className="aspect-video w-full rounded-lg object-cover" />
                </div>
                {item.caption ? <p className="mt-2 text-sm text-slate-600">{item.caption}</p> : null}
                <p className="mt-1 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString("ru-RU")}</p>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
