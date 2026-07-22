"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextLabel = locale === "fr" ? t.lang.switchToEn : t.lang.switchToFr;

  return (
    <button
      type="button"
      aria-label={nextLabel}
      onClick={toggleLocale}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:shadow-glow-brand-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      style={{
        borderColor: "var(--island-border)",
        background: "var(--island)",
      }}
    >
      {!mounted ? (
        <span className="h-5 w-5" />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={locale}
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center font-display text-[11px] font-bold tracking-wide text-brand-deep dark:text-brand"
          >
            {locale === "fr" ? "EN" : "FR"}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
