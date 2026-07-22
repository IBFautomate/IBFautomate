"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "./Motion";
import { useLanguage } from "./LanguageProvider";

export function QuoteForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const reduce = useReducedMotion();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="devis"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="devis-title"
    >
      <div
        className="orb right-[10%] top-20 h-[360px] w-[360px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,230,118,0.35), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">{t.quote.label}</p>
          <h2 id="devis-title" className="section-title">
            {t.quote.title}
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">{t.quote.subtitle}</p>
        </FadeIn>

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn className="h-full">
            <div className="flex h-full flex-col justify-between gap-5">
              <a
                href="mailto:IBFautomate@outlook.com"
                className="island island-hover flex flex-1 items-center gap-4 p-5"
              >
                <span className="icon-box">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.quote.email}
                  </p>
                  <p className="font-display font-semibold">
                    IBFautomate@outlook.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+33762129949"
                className="island island-hover flex flex-1 items-center gap-4 p-5"
              >
                <span className="icon-box">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.quote.phone}
                  </p>
                  <p className="font-display font-semibold">07 62 12 99 49</p>
                </div>
              </a>
              <div className="island flex flex-1 items-center gap-4 p-5">
                <span className="icon-box">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.quote.delay}
                  </p>
                  <p className="font-display font-semibold">{t.quote.delayValue}</p>
                </div>
              </div>
              <div className="island flex flex-1 items-center gap-4 p-5">
                <span className="icon-box">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {t.quote.zone}
                  </p>
                  <p className="font-display font-semibold">{t.quote.zoneValue}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <div className="island flex h-full flex-col p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-1 flex-col items-center justify-center py-12 text-center"
                    initial={
                      reduce ? { opacity: 1 } : { opacity: 0, scale: 0.92 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <span className="icon-box mb-4 !h-16 !w-16">
                      <CheckCircle2 className="h-8 w-8" aria-hidden />
                    </span>
                    <p className="font-display text-2xl font-bold">
                      {t.quote.successTitle}
                    </p>
                    <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
                      {t.quote.successText}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className="flex h-full flex-col justify-between gap-4"
                    initial={false}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {t.quote.name}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {t.quote.email}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {t.quote.phone}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {t.quote.subject}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{
                          borderColor: "var(--island-border)",
                          color: "var(--text)",
                        }}
                      >
                        <option value="" disabled>
                          {t.quote.selectSubject}
                        </option>
                        {t.quote.subjects.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-[var(--bg)] text-[var(--text)]"
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {t.quote.message}{" "}
                        <span className="text-brand-deep dark:text-brand">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full resize-y rounded-xl border bg-transparent px-4 py-3 text-base outline-none transition-shadow duration-300 focus:shadow-glow-brand-sm focus:ring-1 focus:ring-brand sm:text-sm"
                        style={{ borderColor: "var(--island-border)" }}
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      {t.quote.submit}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
