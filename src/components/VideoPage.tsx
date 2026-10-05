"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

/* Téléphone / tablette tenus droits : vidéo verticale 9:16 (arrivée par QR code).
   Ordinateur et écrans en paysage : vidéo 21:9. */
const MOBILE_QUERY = "(orientation: portrait) and (max-width: 1024px)";
const SOURCES = {
  mobile: { src: "/video/promo-vertical.html?embed", ratio: 9 / 16 },
  desktop: { src: "/video/promo-corail.html?embed", ratio: 21 / 9 },
} as const;

type Variant = keyof typeof SOURCES;

export function VideoPage() {
  const { t } = useLanguage();
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setVariant(mq.matches ? "mobile" : "desktop");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const isMobile = variant === "mobile";
  // Le cadre tient toujours en entier dans l'écran (hauteur visible moins la barre de navigation).
  const frameWidth = isMobile
    ? "min(100%, calc((100svh - 7.5rem) * 9 / 16))"
    : "min(100%, calc((100svh - 10rem) * 21 / 9))";

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-3 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
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
        <div
          className="island w-full overflow-hidden p-1 sm:p-2"
          style={{ maxWidth: frameWidth }}
        >
          <div
            className="relative w-full overflow-hidden rounded-[14px] bg-[#050807] sm:rounded-[18px]"
            style={{ aspectRatio: variant ? String(SOURCES[variant].ratio) : "21 / 9" }}
          >
            {variant && (
              <iframe
                key={variant}
                className="absolute inset-0 h-full w-full border-0"
                src={SOURCES[variant].src}
                title={t.video.iframeTitle}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
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
