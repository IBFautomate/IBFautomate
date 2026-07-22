"use client";

import { Mail, Phone } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#processus", label: t.nav.process },
    { href: "#avis", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
    { href: "#devis", label: t.footer.quote },
  ];

  return (
    <footer
      className="relative border-t pb-8 pt-16"
      style={{ borderColor: "var(--island-border)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a
              href="#top"
              className="font-display flex h-7 items-center text-base font-bold tracking-tight sm:text-lg"
            >
              IBF<span className="text-gradient">automate</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              {t.footer.blurb}
            </p>
          </div>

          <div>
            <p className="font-display flex h-7 items-center text-sm font-semibold uppercase tracking-[0.15em]">
              {t.footer.services}
            </p>
            <ul className="mt-4 space-y-2">
              {t.services.items.map((item) => (
                <li key={item.title}>
                  <a
                    href="#devis"
                    className="text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display flex h-7 items-center text-sm font-semibold uppercase tracking-[0.15em]">
              {t.footer.quick}
            </p>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display flex h-7 items-center text-sm font-semibold uppercase tracking-[0.15em]">
              {t.footer.contact}
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:IBFautomate@outlook.com"
                  className="inline-flex max-w-full items-center gap-2 break-all text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-brand-deep dark:text-brand"
                    aria-hidden
                  />
                  IBFautomate@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33762129949"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                >
                  <Phone
                    className="h-4 w-4 text-brand-deep dark:text-brand"
                    aria-hidden
                  />
                  07 62 12 99 49
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-3 border-t pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--island-border)" }}
        >
          <p>{t.footer.rights}</p>
          <p>
            <a
              href="#devis"
              className="transition-colors duration-300 hover:text-[var(--text)]"
            >
              {t.footer.legal}
            </a>
            <span className="mx-2">·</span>
            <a
              href="#devis"
              className="transition-colors duration-300 hover:text-[var(--text)]"
            >
              {t.footer.privacy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
