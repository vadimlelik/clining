"use client";

import { useMemo, useState } from "react";

type ServiceType = "sofa" | "corner-sofa" | "mattress" | "carpet";

const basePrices: Record<ServiceType, number> = {
  sofa: 50,
  "corner-sofa": 70,
  mattress: 20,
  carpet: 9,
};

const labels: Record<ServiceType, string> = {
  sofa: "Диван",
  "corner-sofa": "Угловой диван",
  mattress: "Матрас",
  carpet: "Ковер (за м²)",
};

export function CostCalculator() {
  const [service, setService] = useState<ServiceType>("sofa");
  const [units, setUnits] = useState(1);
  const [odorRemoval, setOdorRemoval] = useState(false);
  const [express, setExpress] = useState(false);

  const total = useMemo(() => {
    let sum = basePrices[service] * units;
    if (odorRemoval) sum += 20;
    if (express) sum += 20;
    return sum;
  }, [service, units, odorRemoval, express]);

  return (
    <div id="calculator" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900">Калькулятор стоимости</h3>
      <p className="mt-2 text-sm text-slate-600">Оценка за 30 секунд. Финальная цена подтверждается менеджером после фото.</p>
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
          Количество
          <input type="number" min={1} max={20} value={units} onChange={(e) => setUnits(Number(e.target.value) || 1)} className="mt-1 w-full rounded-xl border border-slate-300 p-3" />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
        <label className="flex items-center gap-2"><input type="checkbox" checked={odorRemoval} onChange={(e) => setOdorRemoval(e.target.checked)} />Удаление запаха (+20 BYN)</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={express} onChange={(e) => setExpress(e.target.checked)} />Срочный выезд (+20 BYN)</label>
      </div>
      <div className="mt-6 rounded-2xl bg-sky-50 p-4">
        <p className="text-sm text-slate-600">Предварительная стоимость</p>
        <p className="mt-1 text-3xl font-extrabold text-sky-700">{total.toLocaleString("ru-RU")} BYN</p>
      </div>
    </div>
  );
}
