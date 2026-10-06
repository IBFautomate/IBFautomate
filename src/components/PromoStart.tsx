"use client";

import { Play } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

/* Écran de départ de la vidéo promo : logo, titre, bouton lecture.
   À placer dans un cadre en `[container-type:size]` : les tailles suivent celles du cadre.
   `compact` : sur téléphone, seuls le logo et le bouton restent (petit cadre). */
export function PromoStart({ onStart, touch, compact = false }: { onStart: () => void; touch: boolean; compact?: boolean }) {
  const { t } = useLanguage();
  const hideOnPhone = compact ? "hidden sm:block" : "";

  return (
    <button
      type="button"
      onClick={onStart}
      aria-label={t.video.play}
      className="group absolute inset-0 z-10 flex flex-col items-center justify-center gap-[3cqmin] bg-[#FBFBFC] text-[#15171C]"
      style={{ backgroundImage: "radial-gradient(60% 55% at 50% 42%, rgba(16,185,129,0.12), transparent 70%)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/video/logo-ibfautomate.svg" alt="" className="h-auto w-[30cqmin] max-w-[40%]" />
      <span className={`px-4 text-center font-display text-[clamp(16px,5.4cqmin,34px)] font-bold tracking-[-0.02em] ${hideOnPhone}`}>
        {t.video.title}
      </span>
      <span className="flex h-[clamp(56px,17cqmin,96px)] w-[clamp(56px,17cqmin,96px)] items-center justify-center rounded-full bg-[#10B981] text-[#0A0F0D] shadow-[0_18px_40px_-12px_rgba(16,185,129,0.65)] transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
        <Play aria-hidden fill="currentColor" className="ml-[6%] h-[38%] w-[38%]" />
      </span>
      <span className={`font-sans text-[clamp(12px,3.2cqmin,16px)] font-medium text-[#646A79] ${hideOnPhone}`}>
        {touch ? t.video.tapToPlay : t.video.clickToPlay}
      </span>
    </button>
  );
}
