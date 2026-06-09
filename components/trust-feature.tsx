import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function TrustFeature({ icon, title, description }: Props) {
  return (
    <article className="card-surface flex gap-4 p-5 md:p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-100">
        {icon}
      </div>
      <div>
        <p className="font-bold text-slate-900">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </article>
  );
}
