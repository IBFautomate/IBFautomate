"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { FadeIn } from "./Motion";
import { useLanguage } from "./LanguageProvider";

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="faq"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeIn className="mb-12 text-center">
          <p className="section-label">{t.faq.label}</p>
          <h2 id="faq-title" className="section-title">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">{t.faq.subtitle}</p>
        </FadeIn>

        <ul className="space-y-3">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.q}>
                <FadeIn delay={index * 0.05}>
                  <div className="island overflow-hidden">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="font-display text-sm font-semibold sm:text-base">
                        {item.q}
                      </span>
                      <span className="icon-box !h-9 !w-9 shrink-0">
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex"
                        >
                          {isOpen ? (
                            <Minus className="h-4 w-4" aria-hidden />
                          ) : (
                            <Plus className="h-4 w-4" aria-hidden />
                          )}
                        </motion.span>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={
                            reduce
                              ? { height: "auto", opacity: 1 }
                              : { height: 0, opacity: 0 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={
                            reduce
                              ? { height: 0, opacity: 0 }
                              : { height: 0, opacity: 0 }
                          }
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p
                            className="border-t px-5 pb-5 pt-3 text-sm leading-relaxed text-[var(--text-muted)]"
                            style={{ borderColor: "var(--island-border)" }}
                          >
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
