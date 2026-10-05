"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const PROMO_SRC = "/video/promo.html?embed";

export function VideoPage() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,230,118,0.18), transparent 70%)",
            opacity: "var(--orb-opacity)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <div className="island overflow-hidden p-1.5 sm:p-2">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[16px] bg-[#050807] sm:rounded-[18px]">
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={PROMO_SRC}
              title={t.video.iframeTitle}
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-primary !w-auto">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t.video.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
