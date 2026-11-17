"use client";

import { Fragment, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import {
  getLegalNotice,
  getLegalUi,
  getPrivacyPolicy,
  TODO_EN,
  TODO_FR,
} from "@/content/legal";

const TOKEN = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+|\[à compléter\]|\[to be completed\])/g;

/** Rend les URL et emails cliquables, et surligne les champs à compléter. */
function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (part === TODO_FR || part === TODO_EN) {
          return (
            <mark key={i} className="rounded bg-amber-300/40 px-1 font-semibold text-[var(--text)]">
              {part}
            </mark>
          );
        }
        const trail = part.match(/[.,;:)]+$/)?.[0] ?? "";
        const core = trail ? part.slice(0, -trail.length) : part;
        if (/^https?:\/\//.test(core)) {
          const internal = core.startsWith("https://ibfautomate.com");
          return (
            <Fragment key={i}>
              <a
                href={internal ? core.replace("https://ibfautomate.com", "") || "/" : core}
                {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="break-all font-medium text-brand-deep underline underline-offset-2 dark:text-brand"
              >
                {core}
              </a>
              {trail}
            </Fragment>
          );
        }
        if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(core)) {
          return (
            <Fragment key={i}>
              <a
                href={`mailto:${core}`}
                className="font-medium text-brand-deep underline underline-offset-2 dark:text-brand"
              >
                {core}
              </a>
              {trail}
            </Fragment>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const ui = getLegalUi(locale);
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <header className="relative z-10 px-3 pt-4 sm:px-6">
        <nav className="island mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <a href="/" className="font-display text-base font-bold tracking-tight sm:text-xl">
            IBF<span className="text-gradient">automate</span>
          </a>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {ui.back}
        </a>
        {children}
      </main>

      <footer
        className="relative z-10 border-t py-6 text-xs text-[var(--text-muted)]"
        style={{ borderColor: "var(--island-border)" }}
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 sm:flex-row sm:justify-between sm:px-6">
          <p>{ui.rights}</p>
          <p>
            <a href="/mentions-legales" className="hover:text-[var(--text)]">
              {ui.notice}
            </a>
            <span className="mx-2">·</span>
            <a href="/confidentialite" className="hover:text-[var(--text)]">
              {ui.privacy}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "notice" }) {
  const { locale } = useLanguage();
  const ui = getLegalUi(locale);
  const doc = kind === "privacy" ? getPrivacyPolicy(locale) : getLegalNotice(locale);

  return (
    <Shell>
      <h1 className="section-title mt-6">{doc.title}</h1>
      <p className="mt-3 text-sm text-[var(--text-muted)]">{ui.updated}</p>
      {ui.langNote && (
        <p className="mt-1 text-xs italic text-[var(--text-muted)]">{ui.langNote}</p>
      )}
      <p className="mt-6 leading-relaxed text-[var(--text-muted)]">
        <RichText text={doc.intro} />
      </p>

      <div className="mt-10 space-y-5">
        {doc.sections.map((section) => (
          <section key={section.title} className="island p-5 sm:p-7">
            <h2 className="font-display text-lg font-bold tracking-tight sm:text-xl">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
              {section.blocks.map((block, i) =>
                Array.isArray(block) ? (
                  <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-brand-deep dark:marker:text-brand">
                    {block.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>
                    <RichText text={block} />
                  </p>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </Shell>
  );
}
