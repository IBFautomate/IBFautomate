"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "./Motion";
import { useLanguage } from "./LanguageProvider";

function AnimatedNumber({
  value,
  suffix,
  staticValue,
}: {
  value: number | null;
  suffix: string;
  staticValue?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduce]);

  const staticParts = staticValue?.split(/\s+/) ?? [];

  return (
    <span
      ref={ref}
      className={`text-gradient font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${
        staticValue ? "block text-left leading-[1.1]" : ""
      }`}
    >
      {staticValue && staticParts.length > 0 ? (
        <>
          {staticParts[0]}
          <br />
          {staticParts.slice(1).join("\u00A0")}
        </>
      ) : (
        `${display}${suffix}`
      )}
    </span>
  );
}

export function Stats() {
  const { t } = useLanguage();

  const stats = [
    {
      value: 40 as number | null,
      suffix: " %",
      label: t.stats.items[0].label,
    },
    {
      value: 10 as number | null,
      suffix: "h",
      label: t.stats.items[1].label,
    },
    {
      value: null as number | null,
      suffix: "",
      label: t.stats.items[2].label,
      staticValue: t.stats.items[2].staticValue,
    },
  ];

  return (
    <section className="relative py-20 sm:py-24" aria-labelledby="stats-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">{t.stats.label}</p>
          <h2 id="stats-title" className="section-title">
            {t.stats.title}
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">{t.stats.subtitle}</p>
        </FadeIn>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <article className="island island-hover flex h-full flex-col items-center gap-4 p-6 text-center sm:p-8">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  staticValue={stat.staticValue}
                />
                <p className="text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  {stat.label}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
