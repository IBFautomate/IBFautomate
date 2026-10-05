"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const PROMO_SRC = "/video/promo-corail.html?embed";

/* Téléphone tenu droit (arrivée par QR code) : la vidéo 21:9 est affichée pivotée
   pour occuper tout l'écran — on tourne le téléphone pour la regarder, même si la
   rotation automatique est bloquée. Téléphone en paysage : plein cadre.
   Le même cadre est réutilisé dans tous les cas : tourner le téléphone pendant la
   lecture ne relance pas la vidéo. */
const PORTRAIT_QUERY = "(orientation: portrait) and (max-width: 1024px)";
const SHORT_LANDSCAPE_QUERY = "(orientation: landscape) and (max-height: 500px)";

type Layout = "portrait" | "short" | "desktop";

const ROTATED_LENGTH = "min(calc(100svh - 9.5rem), calc((100vw - 1.5rem) * 21 / 9))";

export function VideoPage() {
  const { t } = useLanguage();
  const [layout, setLayout] = useState<Layout | null>(null);

  useEffect(() => {
    const portrait = window.matchMedia(PORTRAIT_QUERY);
    const short = window.matchMedia(SHORT_LANDSCAPE_QUERY);
    const update = () =>
      setLayout(portrait.matches ? "portrait" : short.matches ? "short" : "desktop");
    update();
    portrait.addEventListener("change", update);
    short.addEventListener("change", update);
    return () => {
      portrait.removeEventListener("change", update);
      short.removeEventListener("change", update);
    };
  }, []);

  const rotated = layout === "portrait";

  const stageStyle: CSSProperties = rotated
    ? { height: "calc(100svh - 9.5rem)" }
    : { maxWidth: layout === "short" ? "min(100%, calc((100svh - 6rem) * 21 / 9))" : "min(100%, calc((100svh - 10rem) * 21 / 9))" };

  const frameStyle: CSSProperties = rotated
    ? {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: ROTATED_LENGTH,
        transform: "translate(-50%, -50%) rotate(90deg)",
        transition: "none",
      }
    : { position: "relative", width: "100%" };

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col items-center justify-center px-3 sm:px-6 lg:px-8 ${
        layout === "short" ? "pb-4 pt-20" : "pb-10 pt-24 sm:pt-28"
      }`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0,230,118,0.18), transparent 70%)",
            opacity: "var(--orb-opacity)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center">
        {rotated && (
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
            <RotateCcw className="h-4 w-4" aria-hidden />
            {t.video.rotateHint}
          </p>
        )}

        <div className="relative w-full" style={stageStyle}>
          <div className="island overflow-hidden p-1 sm:p-2" style={frameStyle}>
            <div
              className="relative w-full overflow-hidden rounded-[14px] bg-[#050807] sm:rounded-[18px]"
              style={{ aspectRatio: "21 / 9" }}
            >
              {layout && (
                <iframe
                  className="absolute inset-0 h-full w-full border-0"
                  src={PROMO_SRC}
                  title={t.video.iframeTitle}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <Link href="/" className="btn-primary !w-auto">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t.video.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
