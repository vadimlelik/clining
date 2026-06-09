const steps = [
  { title: "Заявка", text: "Оставляете контакты на сайте или звоните" },
  { title: "Оценка", text: "Присылаете фото мебели — фиксируем цену" },
  { title: "Выезд", text: "Мастер приезжает в согласованное время" },
  { title: "Результат", text: "Химчистка и проверка по чек-листу" },
];

export function ProcessSteps() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <article key={step.title} className="relative card-surface p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-sm">
            {index + 1}
          </span>
          <p className="mt-4 font-bold text-slate-900">{step.title}</p>
          <p className="mt-2 text-sm text-slate-600">{step.text}</p>
          {index < steps.length - 1 ? (
            <span className="absolute -right-2 top-8 hidden h-0.5 w-4 bg-brand-200 lg:block" aria-hidden />
          ) : null}
        </article>
      ))}
    </div>
  );
}
