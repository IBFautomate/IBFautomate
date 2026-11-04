"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck, UserRound } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Motion";
import { useLanguage } from "./LanguageProvider";
import { FOUNDER_NAME, FounderAvatar } from "./FounderAvatar";

const WHATSAPP_URL = "https://wa.me/33762129949";
const ICONS = [UserRound, MessageCircle, ShieldCheck];

export function Founder() {
  const { t } = useLanguage();

  return (
    <section
      id="fondateur"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="fondateur-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <FadeIn className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="island relative p-3 sm:p-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/fondateur-bureau.jpg"
                  alt={t.founder.sceneAlt}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 90vw"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(6,78,59,0.45))",
                  }}
                  aria-hidden
                />
              </div>
              <div
                className="island absolute -bottom-6 left-1/2 flex w-[calc(100%-2.5rem)] -translate-x-1/2 items-center gap-3 px-4 py-3"
                style={{ background: "var(--bg)" }}
              >
                <FounderAvatar
                  className="h-12 w-12 ring-2 ring-brand/60"
                  alt={t.founder.photoAlt}
                />
                <div className="min-w-0">
                  <p className="font-display truncate font-semibold">{FOUNDER_NAME}</p>
                  <p className="truncate text-xs text-[var(--text-muted)]">
                    {t.founder.role}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="pt-4 lg:pt-0">
            <FadeIn>
              <p className="section-label">{t.founder.label}</p>
              <h2 id="fondateur-title" className="section-title">
                {t.founder.title}
              </h2>
              {t.founder.paragraphs.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-[var(--text-muted)]">
                  {p}
                </p>
              ))}
            </FadeIn>

            <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
              {t.founder.commitments.map((item, i) => {
                const Icon = ICONS[i] ?? UserRound;
                return (
                  <StaggerItem key={item.title}>
                    <div className="island h-full p-4">
                      <Icon className="h-5 w-5 text-brand-deep dark:text-brand" aria-hidden />
                      <p className="font-display mt-3 text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                        {item.text}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <FadeIn delay={0.1}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#devis" className="btn-primary sm:!w-auto">
                  {t.founder.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost sm:!w-auto"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t.founder.whatsapp}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
