"use client";

import { useMemo, useState } from "react";

type ServiceType = "apartment" | "office" | "general" | "post-renovation";

const basePrices: Record<ServiceType, number> = {
  apartment: 2500,
  office: 4500,
  general: 7900,
  "post-renovation": 9900,
};

const labels: Record<ServiceType, string> = {
  apartment: "Уборка квартиры",
  office: "Уборка офиса",
  general: "Генеральная уборка",
  "post-renovation": "После ремонта",
};

export function CostCalculator() {
  const [service, setService] = useState<ServiceType>("apartment");
  const [area, setArea] = useState(50);
  const [windows, setWindows] = useState(false);
  const [express, setExpress] = useState(false);

  const total = useMemo(() => {
    let sum = basePrices[service] + area * 40;
    if (windows) sum += 1200;
    if (express) sum += 1800;
    return sum;
  }, [service, area, windows, express]);

  return (
    <div id="calculator" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900">Калькулятор стоимости</h3>
      <p className="mt-2 text-sm text-slate-600">Оценка за 30 секунд. Финальная цена подтверждается менеджером.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Тип услуги
          <select className="mt-1 w-full rounded-xl border border-slate-300 p-3" value={service} onChange={(e) => setService(e.target.value as ServiceType)}>
            {(Object.keys(labels) as ServiceType[]).map((key) => (
              <option key={key} value={key}>{labels[key]}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Площадь (м²)
          <input type="number" min={20} max={500} value={area} onChange={(e) => setArea(Number(e.target.value) || 20)} className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
        <label className="flex items-center gap-2"><input type="checkbox" checked={windows} onChange={(e) => setWindows(e.target.checked)} />Мойка окон</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={express} onChange={(e) => setExpress(e.target.checked)} />Срочный выезд</label>
      </div>
      <div className="mt-6 rounded-2xl bg-sky-50 p-4">
        <p className="text-sm text-slate-600">Предварительная стоимость</p>
        <p className="mt-1 text-3xl font-extrabold text-sky-700">{total.toLocaleString("ru-RU")} ₽</p>
      </div>
    </div>
  );
}
