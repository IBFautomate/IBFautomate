"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

export function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#processus", label: t.nav.process },
    { href: "#avis", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-4 ${
          open ? "z-[70]" : "z-50"
        }`}
      >
        <nav
          className={`island mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 transition-shadow duration-300 sm:gap-4 sm:px-5 sm:py-3 ${
            scrolled ? "shadow-glow-brand-sm" : ""
          }`}
          aria-label={t.nav.aria}
        >
          <a
            href="#top"
            className="font-display shrink-0 text-base font-bold tracking-tight sm:text-xl"
            onClick={close}
          >
            IBF
            <span className="text-gradient">automate</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <a href="#devis" className="btn-primary !w-auto hidden sm:inline-flex">
              {t.nav.quote}
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden"
              style={{
                borderColor: "var(--island-border)",
                background: "var(--island)",
              }}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--bg)] lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-6 pb-10 pt-28">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl"
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#devis"
                onClick={close}
                className="btn-primary mt-8 w-full"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                {t.nav.quote}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
