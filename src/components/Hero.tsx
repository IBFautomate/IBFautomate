"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { HeroPromoVideo } from "./HeroPromoVideo";

type ToolLogo = {
  name: string;
  icon: ReactNode;
};

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path fill="#EA4335" d="M2 6.5V18a2 2 0 0 0 2 2h2.5V9.8L12 14.2l5.5-4.4V20H20a2 2 0 0 0 2-2V6.5L12 14 2 6.5Z" />
      <path fill="#34A853" d="M2 6.5 12 14l10-7.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1.5Z" opacity=".9" />
      <path fill="#FBBC04" d="M2 6.5V18l4.5-3.5V9.8L2 6.5Z" />
      <path fill="#4285F4" d="M22 6.5 17.5 9.8V14.5L22 18V6.5Z" />
    </svg>
  );
}

function SheetsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path fill="#0F9D58" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path fill="#87CEAC" d="M14 2v6h6L14 2Z" />
      <path fill="#fff" d="M8 11h8v8H8v-8Zm1 1v2.5h2.5V12H9Zm3.5 0v2.5H15V12h-2.5ZM9 15.5V18h2.5v-2.5H9Zm3.5 0V18H15v-2.5h-2.5Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path
        fill="#25D366"
        d="M12 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z"
      />
      <path
        fill="#25D366"
        d="M16.6 13.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.3 0-.4.1-.5l.4-.4.1-.3c0-.1 0-.3-.1-.4s-.5-1.3-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a8.8 8.8 0 0 0 3.4 2.7c1.3.5 1.8.5 2.1.5.3 0 1-.2 1.1-.4s.5-.4.6-.6.1-.4 0-.5-.2-.2-.4-.3Z"
      />
    </svg>
  );
}

function SlackIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/slack.png"
      alt=""
      className="h-7 w-7 object-contain sm:h-9 sm:w-9"
    />
  );
}

function NotionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path
        fill="currentColor"
        className="text-[var(--text)]"
        d="M4.5 3.5h12.2L19.5 6v14.5H7.3L4.5 17.7V3.5Zm2 1.8v11.8l1.7 1.4h9.3V7.2l-1.8-1.9H6.5Zm3.2 2.2h1.6l3.7 5.2V7.5h1.5v8.2h-1.5l-3.8-5.3v5.3H9.7V7.5Z"
      />
    </svg>
  );
}

function StripeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#635BFF" />
      <path
        fill="#fff"
        d="M11.4 9.3c0-.6.5-.8 1.3-.8 1.2 0 2.6.4 3.8 1V6.7A9.7 9.7 0 0 0 12.6 6c-2.9 0-4.9 1.5-4.9 4.1 0 4 5.5 3.4 5.5 5.1 0 .7-.6.9-1.5.9-1.3 0-2.9-.5-4.2-1.3v2.9A10.5 10.5 0 0 0 12.7 19c3.1 0 5.1-1.5 5.1-4.1-.1-4.3-5.5-3.5-5.5-5.1v-.5.1-.2-.1.2Z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/Calendar.png"
      alt=""
      className="h-7 w-7 object-contain sm:h-9 sm:w-9"
    />
  );
}

const TOOLS: ToolLogo[] = [
  { name: "Gmail", icon: <GmailIcon /> },
  { name: "Sheets", icon: <SheetsIcon /> },
  { name: "WhatsApp", icon: <WhatsAppIcon /> },
  { name: "Slack", icon: <SlackIcon /> },
  { name: "Notion", icon: <NotionIcon /> },
  { name: "Stripe", icon: <StripeIcon /> },
  { name: "Calendar", icon: <CalendarIcon /> },
];

function ToolsMarquee() {
  const reduce = useReducedMotion();
  const loop = [...TOOLS, ...TOOLS];

  return (
    <div
      className="relative z-10 mt-10 overflow-hidden border-y py-4 sm:mt-14 sm:py-6"
      style={{ borderColor: "var(--island-border)" }}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--bg)] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--bg)] to-transparent sm:w-28" />

      <div
        className={`marquee-track flex w-max items-center gap-8 whitespace-nowrap px-4 sm:gap-16 sm:px-6 ${
          reduce ? "" : "is-running"
        }`}
      >
        {loop.map((tool, i) => (
          <span
            key={`${tool.name}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 opacity-90 transition-opacity duration-300 hover:opacity-100 sm:gap-3"
          >
            <span className="flex h-7 w-7 items-center justify-center sm:h-9 sm:w-9">
              {tool.icon}
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-[var(--text)] sm:text-lg">
              {tool.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.3em] inline-block last:mr-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.12 + i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-10 pt-24 sm:pb-20 sm:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div
        className="orb left-[-20%] top-16 h-[280px] w-[280px] animate-float sm:left-[-10%] sm:top-20 sm:h-[420px] sm:w-[420px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,230,118,0.55), transparent 70%)",
        }}
      />
      <div
        className="orb right-[-15%] top-32 h-[240px] w-[240px] animate-float-alt sm:right-[-5%] sm:top-40 sm:h-[380px] sm:w-[380px]"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.45), transparent 70%)",
        }}
      />
      <div
        className="orb bottom-10 left-1/3 hidden h-[300px] w-[300px] animate-float sm:block"
        style={{
          background:
            "radial-gradient(circle, rgba(6,78,59,0.5), transparent 70%)",
          animationDelay: "-4s",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex max-w-full items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
          style={{
            borderColor: "var(--island-border)",
            background: "var(--island)",
            color: "#047857",
          }}
        >
          <span className="dark:text-brand">{t.hero.badge}</span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-[1.85rem] font-bold leading-[1.15] tracking-tight xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          <WordReveal text={t.hero.title1} />
          <br />
          <span className="text-gradient">
            <WordReveal text={t.hero.title2} />
          </span>
        </h1>

        <motion.p
          className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] sm:mt-6 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="#devis" className="btn-primary sm:!w-auto">
            {t.hero.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#services" className="btn-ghost sm:!w-auto">
            {t.hero.secondary}
          </a>
        </motion.div>

        <motion.p
          className="mt-6 px-2 text-xs leading-relaxed text-[var(--text-muted)] sm:mt-8 sm:text-sm"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {t.hero.trust}
        </motion.p>

        <HeroPromoVideo />
      </div>

      <ToolsMarquee />
    </section>
  );
}
