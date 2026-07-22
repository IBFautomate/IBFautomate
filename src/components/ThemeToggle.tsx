"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? t.theme.toLight : t.theme.toDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
            key={isDark ? "sun" : "moon"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-brand-deep dark:text-brand"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
