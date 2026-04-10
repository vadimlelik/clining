"use client";

import { useState } from "react";

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorText("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, comment }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setStatus("error");
        setErrorText(data.error ?? "Не удалось отправить заявку. Попробуйте еще раз.");
        return;
      }

      setStatus("success");
      setName("");
      setPhone("");
      setComment("");
    } catch {
      setStatus("error");
      setErrorText("Ошибка сети. Проверьте подключение и повторите попытку.");
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900">Оставьте заявку</h3>
      <p className="mt-2 text-sm text-slate-600">Перезвоним в течение 10 минут и подберем удобное время.</p>
      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          className="rounded-xl border border-slate-300 p-3"
        />
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          className="rounded-xl border border-slate-300 p-3"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Комментарий"
          className="min-h-24 rounded-xl border border-slate-300 p-3"
        />
        <button
          className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Отправляем..." : "Отправить заявку"}
        </button>
      </form>
      {status === "success" && <p className="mt-3 text-sm text-emerald-700">Спасибо! Мы скоро с вами свяжемся.</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-600">{errorText}</p>}
    </div>
  );
}
