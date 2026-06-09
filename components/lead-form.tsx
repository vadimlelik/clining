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
        headers: { "Content-Type": "application/json" },
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
    <div className="card-surface h-full p-6 md:p-8">
      <h3 className="text-2xl font-extrabold text-slate-900">Оставьте заявку</h3>
      <p className="mt-2 text-sm text-slate-600">Перезвоним в течение 10 минут и подберём удобное время выезда.</p>
      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className="input-field" />
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          className="input-field"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Что нужно почистить? (диван, ковёр…)"
          className="input-field min-h-24 resize-y"
        />
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
          {status === "loading" ? "Отправляем…" : "Отправить заявку"}
        </button>
      </form>
      {status === "success" ? (
        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">Спасибо! Мы скоро свяжемся с вами.</p>
      ) : null}
      {status === "error" ? <p className="mt-3 text-sm text-red-600">{errorText}</p> : null}
    </div>
  );
}
