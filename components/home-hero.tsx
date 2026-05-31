import Image from "next/image";
import Link from "next/link";
import { IconShield, IconSparkles, IconTruck } from "@/components/icons";
import { siteImages } from "@/lib/site-images";

const perks = [
  { icon: IconTruck, text: "Выезд в день обращения" },
  { icon: IconShield, text: "Безопасно для детей и питомцев" },
  { icon: IconSparkles, text: "Цена до выезда — без сюрпризов" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-brand-100/80 bg-hero-mesh bg-white shadow-glow">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-sky-200/25 blur-3xl" />

      <div className="grid items-center gap-10 p-8 md:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12">
        <div className="relative">
          <p className="badge-soft w-fit">
            <IconSparkles className="h-3.5 w-3.5 text-brand-600" />
            Минск и Минская область
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
            Свежая мебель без пятен и запахов —{" "}
            <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
              химчистка у вас дома
            </span>
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-700">
            Мастер приезжает с экстрактором и профхимией: диваны, матрасы, ковры и шторы — без везения в цех.
          </p>
          <p className="mt-3 max-w-xl text-slate-600">
            Прозрачный прайс, бережная обработка ткани и кожи, ускоренная сушка по запросу.
          </p>

          <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#calculator" className="btn-primary">
              Рассчитать стоимость
            </Link>
            <Link href="/uslugi" className="btn-secondary">
              Смотреть услуги
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-brand-100/80 pt-8">
            {[
              { value: "4 800+", label: "клиентов" },
              { value: "9 лет", label: "опыта" },
              { value: "16 000+", label: "заказов" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-brand-50/80 p-3 text-center ring-1 ring-brand-100/80">
                <p className="text-xl font-extrabold text-brand-700 md:text-2xl">{item.value}</p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500 md:text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-glow ring-1 ring-brand-100/80 sm:aspect-[5/6]">
            <Image
              src={siteImages.hero.main}
              alt="Чистый диван в гостиной после химчистки"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 540px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 backdrop-blur md:text-sm">
              Выездная химчистка · результат в тот же день
            </p>
          </div>

          <div className="absolute -bottom-4 -left-2 z-10 hidden w-36 overflow-hidden rounded-2xl border-2 border-white shadow-lg sm:block md:-left-6 md:w-44">
            <div className="relative aspect-square">
              <Image
                src={siteImages.hero.accent}
                alt="Профессиональная обработка мебели"
                fill
                className="object-cover"
                sizes="176px"
              />
            </div>
            <p className="bg-brand-700 px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide text-white">
              Проф. оборудование
            </p>
          </div>

          <div className="absolute -right-2 -top-3 z-10 hidden w-32 overflow-hidden rounded-2xl border-2 border-white shadow-lg sm:block md:-right-4 md:w-40">
            <div className="relative aspect-[4/3]">
              <Image
                src={siteImages.hero.cleanRoom}
                alt="Светлая комната после уборки"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <p className="bg-white px-2 py-1.5 text-center text-[10px] font-semibold text-brand-800">Свежесть дома</p>
          </div>
        </div>
      </div>
    </section>
  );
}
