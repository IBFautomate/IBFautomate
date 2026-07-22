"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "./Motion";
import { useLanguage } from "./LanguageProvider";

function DashboardCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-[var(--bg-surface)] shadow-xl ${className ?? ""}`}
      style={{ borderColor: "var(--island-border)" }}
    >
      {children}
    </div>
  );
}

function UiCollage() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  const cards = [
    {
      className: "absolute left-[2%] top-[8%] z-10 w-[58%] -rotate-6",
      delay: 0,
      content: (
        <>
          <div className="border-b px-4 py-3" style={{ borderColor: "var(--island-border)" }}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-brand" />
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                {t.boost.automations}
              </span>
            </div>
          </div>
          <div className="space-y-3 p-4">
            <div className="flex items-end gap-1.5 h-20">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-brand/20 to-brand/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
              <span>Lun</span>
              <span>Dim</span>
            </div>
          </div>
        </>
      ),
    },
    {
      className: "absolute right-0 top-[2%] z-20 w-[52%] rotate-3",
      delay: 0.1,
      content: (
        <>
          <div className="border-b px-4 py-3" style={{ borderColor: "var(--island-border)" }}>
            <p className="text-[11px] font-semibold">{t.boost.performance}</p>
            <p className="text-gradient font-display text-2xl font-bold">+38 %</p>
          </div>
          <div className="p-4">
            <svg viewBox="0 0 200 60" className="w-full" aria-hidden>
              <path
                d="M0 45 Q40 35 80 40 T160 15 T200 25"
                fill="none"
                stroke="#00E676"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M0 45 Q40 35 80 40 T160 15 T200 25 V60 H0 Z"
                fill="url(#chartFill)"
                opacity="0.25"
              />
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#00E676" />
                  <stop offset="1" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </>
      ),
    },
    {
      className: "absolute bottom-[6%] left-[12%] z-30 w-[55%] rotate-2",
      delay: 0.2,
      content: (
        <div className="p-4 space-y-2">
          {[
            { label: t.boost.leads, value: "124", color: "bg-brand/30" },
            { label: t.boost.hours, value: "18h", color: "bg-emerald-500/20" },
            { label: t.boost.tasks, value: "47", color: "bg-brand/20" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-xl px-3 py-2"
              style={{ background: "var(--island)" }}
            >
              <div className="flex items-center gap-2">
                <div className={`h-7 w-7 rounded-lg ${row.color}`} />
                <span className="text-[11px] text-[var(--text-muted)]">{row.label}</span>
              </div>
              <span className="font-display text-sm font-bold">{row.value}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      className: "absolute bottom-[18%] right-[4%] z-0 w-[44%] -rotate-3 opacity-90",
      delay: 0.15,
      content: (
        <div className="p-4">
          <div className="mb-3 h-2 w-16 rounded-full bg-brand/50" />
          <div className="space-y-2">
            {[85, 60, 72].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-[var(--island-border)]"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="h-12 rounded-xl bg-brand/10" />
            <div className="h-12 rounded-xl bg-emerald-900/10 dark:bg-brand/5" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg scale-[0.92] sm:scale-100">
      <div
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--bg) 88%)",
        }}
        aria-hidden
      />

      {cards.map((card, i) =>
        reduce ? (
          <DashboardCard key={i} className={card.className}>
            {card.content}
          </DashboardCard>
        ) : (
          <motion.div
            key={i}
            className={card.className}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: card.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DashboardCard>{card.content}</DashboardCard>
          </motion.div>
        ),
      )}
    </div>
  );
}

export function ProjectBoost() {
  const { t } = useLanguage();

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      aria-labelledby="project-boost-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div
              className="mb-6 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border px-4 py-2 text-xs font-medium text-[var(--text-muted)]"
              style={{
                borderColor: "var(--island-border)",
                background: "var(--island)",
              }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                {t.boost.badgeLeft}
              </span>
              <span className="hidden h-3 w-px bg-[var(--island-border)] sm:block" aria-hidden />
              <span className="text-[var(--text-muted)]">
                {t.boost.badgeRight}
              </span>
            </div>

            <h2
              id="project-boost-title"
              className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]"
            >
              {t.boost.title}
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              {t.boost.subtitle}
            </p>

            <a
              href="#devis"
              className="group mt-8 inline-flex w-full items-center justify-between gap-4 rounded-full bg-night px-5 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow-brand-sm sm:w-auto sm:justify-center dark:bg-[var(--bg-surface)] dark:text-[var(--text)] dark:ring-1 dark:ring-[var(--island-border)]"
            >
              {t.boost.cta}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-night transition-transform duration-300 group-hover:scale-105 dark:bg-brand dark:text-night">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </a>
          </FadeIn>

          <FadeIn delay={0.12} className="relative">
            <UiCollage />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
