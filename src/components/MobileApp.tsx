"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "./Motion";
import { useLanguage } from "./LanguageProvider";

function ClayRocket({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="72" rx="18" ry="5" fill="rgba(0,0,0,0.12)" />
      <path
        d="M40 8c-8 14-12 28-12 42 0 6 5 10 12 10s12-4 12-10c0-14-4-28-12-42Z"
        fill="url(#clayRocketBody)"
      />
      <circle cx="40" cy="32" r="7" fill="url(#clayRocketWindow)" />
      <path
        d="M28 48 18 58l10 4 6-10Zm24 0 10 10-10 4-6-10Z"
        fill="url(#clayRocketFin)"
      />
      <path
        d="M36 58c0 4 2 8 4 10 2-2 4-6 4-10H36Z"
        fill="url(#clayRocketFlame)"
      />
      <defs>
        <linearGradient id="clayRocketBody" x1="28" y1="8" x2="52" y2="60">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="clayRocketWindow" x1="33" y1="25" x2="47" y2="39">
          <stop stopColor="#a7f3d0" />
          <stop offset="1" stopColor="#6ee7b7" />
        </linearGradient>
        <linearGradient id="clayRocketFin" x1="18" y1="48" x2="62" y2="62">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="clayRocketFlame" x1="36" y1="58" x2="44" y2="68">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClayChatBubble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="68" rx="20" ry="5" fill="rgba(0,0,0,0.1)" />
      <path
        d="M14 18h52a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10H36l-12 12v-12H14a10 10 0 0 1-10-10V28a10 10 0 0 1 10-10Z"
        fill="url(#clayChatBody)"
      />
      <circle cx="28" cy="39" r="4" fill="#ecfdf5" />
      <circle cx="40" cy="39" r="4" fill="#ecfdf5" />
      <circle cx="52" cy="39" r="4" fill="#ecfdf5" />
      <defs>
        <linearGradient id="clayChatBody" x1="14" y1="18" x2="66" y2="60">
          <stop stopColor="#6ee7b7" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClayBell({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="70" rx="16" ry="4" fill="rgba(0,0,0,0.1)" />
      <path
        d="M40 12c-12 0-20 10-20 22v16l-6 8h52l-6-8V34c0-12-8-22-20-22Z"
        fill="url(#clayBellBody)"
      />
      <rect x="34" y="8" width="12" height="8" rx="4" fill="#047857" />
      <circle cx="40" cy="62" r="6" fill="url(#clayBellClapper)" />
      <defs>
        <linearGradient id="clayBellBody" x1="20" y1="12" x2="60" y2="58">
          <stop stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="clayBellClapper" x1="34" y1="56" x2="46" y2="68">
          <stop stopColor="#fde68a" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClayCompass({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="68" rx="22" ry="5" fill="rgba(0,0,0,0.1)" />
      <circle cx="40" cy="38" r="26" fill="url(#clayCompassRing)" />
      <circle cx="40" cy="38" r="18" fill="url(#clayCompassFace)" />
      <path d="M40 24 44 38 40 52 36 38Z" fill="url(#clayCompassNeedle)" />
      <circle cx="40" cy="38" r="3" fill="#ecfdf5" />
      <defs>
        <linearGradient id="clayCompassRing" x1="14" y1="12" x2="66" y2="64">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="clayCompassFace" x1="22" y1="20" x2="58" y2="56">
          <stop stopColor="#ede9fe" />
          <stop offset="1" stopColor="#c4b5fd" />
        </linearGradient>
        <linearGradient id="clayCompassNeedle" x1="36" y1="24" x2="44" y2="52">
          <stop stopColor="#00e676" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClayStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="40" cy="68" rx="18" ry="4" fill="rgba(0,0,0,0.1)" />
      <path
        d="M40 10 46 30l20 2-15 12 5 19-16-10-16 10 5-19-15-12 20-2Z"
        fill="url(#clayStarBody)"
      />
      <defs>
        <linearGradient id="clayStarBody" x1="24" y1="10" x2="56" y2="53">
          <stop stopColor="#f472b6" />
          <stop offset="1" stopColor="#db2777" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PhoneMockup({
  variant,
  className,
  dashboardLabel,
}: {
  variant: "dashboard" | "profile";
  className?: string;
  dashboardLabel: string;
}) {
  return (
    <div
      className={`mobile-phone relative overflow-hidden rounded-[2rem] border p-2 shadow-2xl ${className ?? ""}`}
      style={{
        borderColor: "var(--island-border)",
        background: "var(--bg-surface)",
      }}
    >
      <div
        className="relative overflow-hidden rounded-[1.6rem]"
        style={{ background: "linear-gradient(160deg, #0a0f0d 0%, #064e3b 100%)" }}
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-3">
          <span className="text-[10px] font-medium text-white/70">9:41</span>
          <div className="mx-auto h-4 w-16 rounded-full bg-black/40" />
          <span className="text-[10px] font-medium text-white/70">100%</span>
        </div>

        {variant === "dashboard" ? (
          <div className="space-y-3 px-4 pb-6 pt-2">
            <p className="font-display text-sm font-bold text-white">
              {dashboardLabel}
            </p>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <div className="h-2 w-16 rounded-full bg-brand/80" />
              <div className="mt-3 h-16 rounded-xl bg-gradient-to-r from-brand/30 to-emerald-900/40" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/8 p-2">
                <div className="h-8 w-8 rounded-lg bg-brand/40" />
                <div className="mt-2 h-1.5 w-10 rounded-full bg-white/30" />
              </div>
              <div className="rounded-xl bg-white/8 p-2">
                <div className="h-8 w-8 rounded-lg bg-pink-400/40" />
                <div className="mt-2 h-1.5 w-10 rounded-full bg-white/30" />
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 flex-1 rounded-xl bg-white/6"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 px-4 pb-6 pt-2">
            <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-brand to-emerald-800" />
            <div className="mx-auto h-2 w-20 rounded-full bg-white/40" />
            <div className="mx-auto h-1.5 w-14 rounded-full bg-white/20" />
            <div className="mt-4 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl bg-white/8 p-2"
                >
                  <div className="h-7 w-7 rounded-lg bg-brand/30" />
                  <div className="h-1.5 flex-1 rounded-full bg-white/25" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FloatingClay({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function MobileApp() {
  const { t } = useLanguage();

  return (
    <section
      id="application-mobile"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:scroll-mt-28 sm:py-24"
      aria-labelledby="mobile-app-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(0,230,118,0.08), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="section-label">{t.mobile.label}</p>
            <h2 id="mobile-app-title" className="section-title">
              {t.mobile.title}
            </h2>
            <p className="mt-4 text-[var(--text-muted)]">{t.mobile.subtitle}</p>

            <Stagger className="mt-8 space-y-4">
              {t.mobile.features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <article
                    className="island flex gap-4 p-4 sm:p-5"
                  >
                    <div className="icon-box shrink-0">
                      <span className="font-display text-sm font-bold">+</span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>

            <a href="#devis" className="btn-primary mt-8 sm:!w-auto">
              {t.mobile.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </FadeIn>

          <FadeIn delay={0.15} className="relative mx-auto w-full max-w-[300px] overflow-hidden sm:max-w-md sm:overflow-visible lg:max-w-none">
            <div className="mobile-showcase relative mx-auto aspect-[4/5] max-h-[320px] w-full max-w-[380px] sm:max-h-[520px]">
              <PhoneMockup
                variant="dashboard"
                dashboardLabel={t.mobile.dashboard}
                className="absolute left-[2%] top-8 z-20 w-[44%] -rotate-6 sm:left-0 sm:w-[46%]"
              />
              <PhoneMockup
                variant="profile"
                dashboardLabel={t.mobile.dashboard}
                className="absolute right-[2%] top-0 z-10 w-[44%] rotate-6 sm:right-0 sm:w-[46%]"
              />

              <FloatingClay
                className="clay-illustration absolute -left-1 top-0 z-30 hidden w-16 sm:block sm:w-20"
                delay={0}
              >
                <ClayRocket />
              </FloatingClay>
              <FloatingClay
                className="clay-illustration absolute right-0 top-14 z-30 w-10 sm:right-0 sm:top-16 sm:w-[4.5rem]"
                delay={0.5}
              >
                <ClayBell />
              </FloatingClay>
              <FloatingClay
                className="clay-illustration absolute bottom-28 left-0 z-30 w-10 sm:bottom-32 sm:-left-3 sm:w-16"
                delay={1}
              >
                <ClayChatBubble />
              </FloatingClay>
              <FloatingClay
                className="clay-illustration absolute bottom-20 right-0 z-30 hidden w-14 sm:block sm:w-[4.5rem]"
                delay={1.5}
              >
                <ClayCompass />
              </FloatingClay>
              <FloatingClay
                className="clay-illustration absolute bottom-4 left-1/3 z-30 w-9 sm:w-14"
                delay={0.8}
              >
                <ClayStar />
              </FloatingClay>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
