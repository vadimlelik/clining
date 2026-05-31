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
    <div id="calculator" className="card-surface overflow-hidden">
      <div className="border-b border-brand-100 bg-gradient-to-r from-brand-50 to-white px-6 py-5 md:px-8">
        <h3 className="text-2xl font-extrabold text-slate-900">Калькулятор стоимости</h3>
        <p className="mt-1 text-sm text-slate-600">Оценка за 30 секунд. Финальную цену подтвердим после фото в мессенджере.</p>
      </div>
      <div className="p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Тип услуги
            <select className="input-field mt-1.5" value={service} onChange={(e) => setService(e.target.value as ServiceType)}>
              {(Object.keys(labels) as ServiceType[]).map((key) => (
                <option key={key} value={key}>
                  {labels[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Количество
            <input
              type="number"
              min={1}
              max={20}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value) || 1)}
              className="input-field mt-1.5"
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-700">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 has-[:checked]:border-brand-300 has-[:checked]:bg-brand-50">
            <input type="checkbox" checked={odorRemoval} onChange={(e) => setOdorRemoval(e.target.checked)} className="accent-brand-600" />
            Удаление запаха (+20 BYN)
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 has-[:checked]:border-brand-300 has-[:checked]:bg-brand-50">
            <input type="checkbox" checked={express} onChange={(e) => setExpress(e.target.checked)} className="accent-brand-600" />
            Срочный выезд (+20 BYN)
          </label>
        </div>
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-glow">
          <p className="text-sm text-brand-100">Предварительная стоимость</p>
          <p className="mt-1 text-4xl font-extrabold tracking-tight">{total.toLocaleString("ru-RU")} BYN</p>
          <p className="mt-2 text-xs text-brand-100">Точная сумма после оценки фото — без скрытых доплат</p>
        </div>
      </div>
    </div>
  );
}
