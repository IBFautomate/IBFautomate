"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BatteryFull,
  BellRing,
  CalendarDays,
  Camera,
  Cloud,
  CreditCard,
  FileText,
  Globe,
  LayoutDashboard,
  ListChecks,
  Mail,
  MessageCircle,
  MessageSquare,
  Palette,
  Phone,
  Receipt,
  Settings,
  Signal,
  Smartphone,
  StickyNote,
  TrendingUp,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "./Motion";
import { useLanguage, type Dictionary } from "./LanguageProvider";
import { FounderAvatar } from "./FounderAvatar";

const FEATURE_ICONS = [Smartphone, Palette, BellRing];

type PhoneTexts = Dictionary["mobile"]["phone"];

/** Cadre de téléphone réaliste : bord métal, Dynamic Island, barre d'état, indicateur d'accueil. */
function PhoneFrame({
  children,
  className,
  light = true,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`mobile-phone aspect-[9/19.5] rounded-[3.4em] p-[0.55em] text-[6.6px] sm:text-[9.4px] ${className ?? ""}`}
      aria-hidden
    >
      {/* boutons latéraux */}
      <span className="absolute -left-[0.25em] top-[17%] h-[6%] w-[0.3em] rounded-l bg-[#2b302d]" />
      <span className="absolute -left-[0.25em] top-[26%] h-[9%] w-[0.3em] rounded-l bg-[#2b302d]" />
      <span className="absolute -right-[0.25em] top-[22%] h-[12%] w-[0.3em] rounded-r bg-[#2b302d]" />

      <div className="relative h-full w-full overflow-hidden rounded-[2.9em] bg-black">
        {children}

        <div className="absolute left-1/2 top-[0.85em] z-30 h-[2.3em] w-[32%] -translate-x-1/2 rounded-full bg-black" />
        <div
          className={`absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[2.2em] pt-[1.25em] text-[1.1em] font-semibold ${
            light ? "text-white" : "text-[#0a0f0d]"
          }`}
        >
          <span>9:41</span>
          <span className="flex items-center gap-[0.3em]">
            <Signal className="h-[1.05em] w-[1.05em]" strokeWidth={2.6} />
            <Wifi className="h-[1.05em] w-[1.05em]" strokeWidth={2.6} />
            <BatteryFull className="h-[1.3em] w-[1.3em]" strokeWidth={2.2} />
          </span>
        </div>
        <div
          className={`absolute bottom-[0.7em] left-1/2 z-30 h-[0.45em] w-[36%] -translate-x-1/2 rounded-full ${
            light ? "bg-white/85" : "bg-black/70"
          }`}
        />
      </div>
    </div>
  );
}

function AppIcon({
  icon: Icon,
  bg,
  label,
  badge,
  children,
}: {
  icon?: LucideIcon;
  bg: string;
  label?: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-[0.45em]">
      <div
        className="relative flex aspect-square w-full items-center justify-center rounded-[24%] shadow-[0_0.25em_0.6em_rgba(0,0,0,0.35)]"
        style={{ background: bg }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-[24%] bg-gradient-to-b from-white/25 via-transparent to-transparent" />
        {children ?? (Icon && <Icon className="relative h-[50%] w-[50%] text-white" strokeWidth={2.2} />)}
        {badge && (
          <span className="absolute -right-[0.45em] -top-[0.45em] flex h-[1.7em] min-w-[1.7em] items-center justify-center rounded-full bg-[#FF3B30] px-[0.35em] text-[0.95em] font-semibold text-white ring-[0.15em] ring-black/20">
            {badge}
          </span>
        )}
      </div>
      {label && (
        <span className="w-full truncate text-center text-[0.95em] font-medium leading-none text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
          {label}
        </span>
      )}
    </div>
  );
}

const BRAND_BG = "linear-gradient(135deg, #00E676 0%, #059669 55%, #064E3B 100%)";

function IbfMark() {
  return (
    <span className="relative font-display text-[1.25em] font-bold tracking-tight text-[#03140C]">
      IBF
    </span>
  );
}

/** Écran d'accueil : widget IBF CRM, grille d'apps, dock. */
function HomeScreen({ p }: { p: PhoneTexts }) {
  const a = p.apps;
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 25% 18%, rgba(16,185,129,0.85), transparent 45%), radial-gradient(circle at 85% 75%, rgba(4,120,87,0.9), transparent 55%), linear-gradient(180deg, #03140C, #021009)",
      }}
    >
      <div className="px-[1.6em] pt-[4.6em]">
        {/* widget */}
        <div className="rounded-[1.9em] bg-white/15 p-[1.2em] ring-1 ring-white/15 backdrop-blur-md">
          <div className="flex items-center gap-[0.5em]">
            <span
              className="flex h-[1.9em] w-[1.9em] items-center justify-center rounded-[0.5em] text-[0.8em]"
              style={{ background: BRAND_BG }}
            >
              <span className="font-display text-[0.75em] font-bold text-[#03140C]">IBF</span>
            </span>
            <span className="text-[0.95em] font-semibold uppercase tracking-wide text-white/80">
              {a.crm}
            </span>
          </div>
          <p className="mt-[0.5em] font-display text-[3.1em] font-bold leading-none text-white">3</p>
          <p className="mt-[0.2em] text-[1em] font-medium text-white/85">{p.widgetCount}</p>
          <p className="mt-[0.7em] flex items-center gap-[0.4em] text-[0.95em] text-white/70">
            <CalendarDays className="h-[1.1em] w-[1.1em]" />
            {p.widgetNext}
          </p>
        </div>

        {/* apps */}
        <div className="mt-[1.6em] grid grid-cols-4 gap-x-[1.25em] gap-y-[1.3em]">
          <AppIcon bg={BRAND_BG} label={a.crm} badge="3">
            <IbfMark />
          </AppIcon>
          <AppIcon icon={FileText} bg="linear-gradient(160deg,#60A5FA,#1D4ED8)" label={a.quotes} />
          <AppIcon icon={Receipt} bg="linear-gradient(160deg,#FDBA74,#EA580C)" label={a.invoices} />
          <AppIcon bg="#ffffff" label={a.calendar}>
            <span className="flex flex-col items-center leading-none">
              <span className="text-[0.75em] font-semibold text-[#EF4444]">{a.calendarDay}</span>
              <span className="mt-[0.1em] text-[2em] font-light text-[#111]">4</span>
            </span>
          </AppIcon>
          <AppIcon icon={Users} bg="linear-gradient(160deg,#C4B5FD,#7C3AED)" label={a.clients} />
          <AppIcon icon={BarChart3} bg="linear-gradient(160deg,#5EEAD4,#0F766E)" label={a.stats} />
          <AppIcon icon={CreditCard} bg="linear-gradient(160deg,#374151,#030712)" label={a.payments} />
          <AppIcon icon={ListChecks} bg="linear-gradient(160deg,#FB7185,#E11D48)" label={a.tasks} badge="2" />
          <AppIcon icon={StickyNote} bg="linear-gradient(160deg,#FDE68A,#F59E0B)" label={a.notes} />
          <AppIcon icon={Cloud} bg="linear-gradient(160deg,#7DD3FC,#0EA5E9)" label={a.drive} />
          <AppIcon icon={Camera} bg="linear-gradient(160deg,#D1D5DB,#6B7280)" label={a.camera} />
          <AppIcon icon={Settings} bg="linear-gradient(160deg,#9CA3AF,#374151)" label={a.settings} />
        </div>

        <div className="mt-[1.4em] flex justify-center gap-[0.5em]">
          <span className="h-[0.55em] w-[0.55em] rounded-full bg-white" />
          <span className="h-[0.55em] w-[0.55em] rounded-full bg-white/40" />
        </div>
      </div>

      {/* dock */}
      <div className="absolute inset-x-[1em] bottom-[1.7em] grid grid-cols-4 gap-x-[1.25em] rounded-[2.2em] bg-white/20 px-[1.1em] py-[1em] ring-1 ring-white/15 backdrop-blur-md">
        <AppIcon icon={Phone} bg="linear-gradient(160deg,#86EFAC,#16A34A)" />
        <AppIcon icon={MessageCircle} bg="linear-gradient(160deg,#4ADE80,#15803D)" />
        <AppIcon icon={Mail} bg="linear-gradient(160deg,#93C5FD,#2563EB)" />
        <AppIcon icon={Globe} bg="linear-gradient(160deg,#E0F2FE,#38BDF8)" />
      </div>
    </div>
  );
}

const LEADS = [
  { name: "Boulangerie Martin", initials: "BM", color: "#10B981", status: "new" },
  { name: "Garage Dupuis", initials: "GD", color: "#F59E0B", status: "quote" },
  { name: "Cabinet Leroy", initials: "CL", color: "#8B5CF6", status: "won" },
] as const;

const BARS = [42, 66, 50, 82, 61, 94, 74];

/** Écran de l'app IBF CRM ouverte. */
function CrmScreen({ p, title }: { p: PhoneTexts; title: string }) {
  const statusLabel = { new: p.statusNew, quote: p.statusQuote, won: p.statusWon };
  const statusStyle = {
    new: "bg-[#00E676]/15 text-[#00E676]",
    quote: "bg-amber-400/15 text-amber-300",
    won: "bg-emerald-400/20 text-emerald-200",
  };
  return (
    <div className="absolute inset-0 bg-[#07100C] text-white">
      <div className="px-[1.6em] pt-[4.6em]">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-[1em] text-white/55">{p.hello}</p>
            <p className="truncate font-display text-[1.75em] font-bold leading-tight">{title}</p>
          </div>
          <FounderAvatar className="h-[3.2em] w-[3.2em] ring-[0.15em] ring-[#00E676]/70" initialsClassName="text-[1em]" alt="" />
        </div>

        <div className="mt-[1.2em] grid grid-cols-2 gap-[0.8em]">
          {[
            { label: p.leads, value: "128", delta: "+12 %" },
            { label: p.revenue, value: "24,6 k€", delta: "+8 %" },
          ].map((k) => (
            <div key={k.label} className="rounded-[1.2em] bg-white/[0.06] p-[1em] ring-1 ring-white/10">
              <p className="truncate text-[0.85em] text-white/55">{k.label}</p>
              <p className="mt-[0.25em] font-display text-[1.6em] font-bold leading-none">{k.value}</p>
              <p className="mt-[0.45em] inline-flex items-center gap-[0.25em] rounded-full bg-[#00E676]/15 px-[0.5em] py-[0.15em] text-[0.8em] font-semibold text-[#00E676]">
                <TrendingUp className="h-[1em] w-[1em]" />
                {k.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[0.8em] rounded-[1.2em] bg-white/[0.06] p-[1em] ring-1 ring-white/10">
          <p className="text-[0.95em] font-semibold">{p.activity}</p>
          <div className="mt-[0.8em] flex h-[6.5em] items-end gap-[0.55em]">
            {BARS.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-[0.35em]">
                <div
                  className="w-full rounded-[0.35em]"
                  style={{
                    height: `${h * 0.05}em`,
                    background:
                      i === 5
                        ? "linear-gradient(180deg,#00E676,#059669)"
                        : "linear-gradient(180deg,rgba(0,230,118,0.55),rgba(5,150,105,0.25))",
                  }}
                />
                <span className="text-[0.75em] text-white/45">{p.days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[1em] flex items-center justify-between">
          <p className="text-[1em] font-semibold">{p.recent}</p>
          <p className="text-[0.85em] font-medium text-[#00E676]">{p.seeAll}</p>
        </div>
        <div className="mt-[0.5em] space-y-[0.5em]">
          {LEADS.map((l) => (
            <div key={l.name} className="flex items-center gap-[0.7em] rounded-[1em] bg-white/[0.04] p-[0.6em] ring-1 ring-white/[0.07]">
              <span
                className="flex h-[2.5em] w-[2.5em] shrink-0 items-center justify-center rounded-full text-[0.85em] font-bold text-white"
                style={{ background: l.color }}
              >
                {l.initials}
              </span>
              <p className="min-w-0 flex-1 truncate text-[0.95em] font-medium">{l.name}</p>
              <span className={`shrink-0 rounded-full px-[0.55em] py-[0.2em] text-[0.75em] font-semibold ${statusStyle[l.status]}`}>
                {statusLabel[l.status]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* barre d'onglets */}
      <div className="absolute inset-x-0 bottom-0 flex items-start justify-around border-t border-white/10 bg-[#07100C]/90 px-[1em] pb-[2.6em] pt-[0.9em] backdrop-blur">
        {[LayoutDashboard, Users, CalendarDays, MessageSquare, Settings].map((Icon, i) => (
          <Icon
            key={i}
            className={`h-[1.8em] w-[1.8em] ${i === 0 ? "text-[#00E676]" : "text-white/45"}`}
            strokeWidth={2}
          />
        ))}
      </div>
    </div>
  );
}

function Floating({
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
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 5 + delay,
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
              {t.mobile.features.map((feature, i) => {
                const Icon = FEATURE_ICONS[i] ?? Smartphone;
                return (
                <StaggerItem key={feature.title}>
                  <article
                    className="island flex gap-4 p-4 sm:p-5"
                  >
                    <div className="icon-box shrink-0">
                      <Icon className="h-5 w-5 text-brand-deep dark:text-brand" aria-hidden />
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
                );
              })}
            </Stagger>

            <a href="#devis" className="btn-primary mt-8 sm:!w-auto">
              {t.mobile.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </FadeIn>

          <FadeIn delay={0.15} className="relative mx-auto w-full max-w-[320px] sm:max-w-[480px] lg:max-w-none">
            <div className="relative mx-auto h-[370px] w-full max-w-[320px] sm:h-[560px] sm:max-w-[480px]">
              <PhoneFrame className="absolute right-[2%] top-0 z-10 w-[150px] rotate-[5deg] sm:right-0 sm:w-[232px]">
                <HomeScreen p={t.mobile.phone} />
              </PhoneFrame>
              <PhoneFrame className="absolute left-[2%] top-[30px] z-20 w-[150px] -rotate-[4deg] sm:left-0 sm:top-[44px] sm:w-[232px]">
                <CrmScreen p={t.mobile.phone} title={t.mobile.dashboard} />
              </PhoneFrame>

              <Floating
                className="absolute -right-2 bottom-[2%] z-30 hidden w-[230px] sm:block lg:-right-8"
                delay={0.4}
              >
                <div className="island flex items-center gap-3 p-3 shadow-xl" aria-hidden>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ background: BRAND_BG }}
                  >
                    <span className="font-display text-[10px] font-bold text-[#03140C]">IBF</span>
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="flex items-center justify-between gap-2 text-[11px] text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text)]">{t.mobile.phone.apps.crm}</span>
                      {t.mobile.phone.notifTime}
                    </p>
                    <p className="truncate text-xs font-medium">{t.mobile.phone.notifText}</p>
                  </div>
                </div>
              </Floating>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
