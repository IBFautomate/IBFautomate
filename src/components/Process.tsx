"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "./Motion";
import { useLanguage } from "./LanguageProvider";

export function Process() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="processus"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="process-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">{t.process.label}</p>
          <h2 id="process-title" className="section-title">
            {t.process.title}
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">{t.process.subtitle}</p>
        </FadeIn>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-4 left-[23px] top-4 w-px sm:left-[31px]"
            style={{ background: "var(--island-border)" }}
            aria-hidden
          />
          <motion.div
            className="absolute left-[23px] top-4 w-px origin-top sm:left-[31px]"
            style={{
              height: reduce ? "100%" : height,
              backgroundImage:
                "linear-gradient(180deg, #00E676, #059669, #064E3B)",
            }}
            aria-hidden
          />

          <Stagger className="relative space-y-4 sm:space-y-5" stagger={0.1}>
            {t.process.steps.map((step) => (
              <StaggerItem key={step.num}>
                <article className="island island-hover relative flex gap-3.5 p-4 sm:gap-6 sm:p-6">
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-[var(--bg)] sm:h-16 sm:w-16 sm:rounded-2xl"
                    style={{ borderColor: "var(--island-border)" }}
                  >
                    <span className="text-gradient font-display text-lg font-bold sm:text-2xl">
                      {step.num}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold tracking-tight sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)] sm:mt-2">
                      {step.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
