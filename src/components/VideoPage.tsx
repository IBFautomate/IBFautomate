"use client";

import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

/**
 * Colle ici l'ID YouTube (ex. "dQw4w9WgXcQ") pour afficher l'embed.
 * Laisse vide pour le message « bientôt disponible ».
 */
const YOUTUBE_VIDEO_ID = "";

export function VideoPage() {
  const { t } = useLanguage();
  const hasVideo = YOUTUBE_VIDEO_ID.trim().length > 0;

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

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <div className="island overflow-hidden p-2 sm:p-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-[var(--bg-surface)]">
            {hasVideo ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID.trim()}?rel=0`}
                title={t.video.iframeTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--island-border)] bg-[var(--island)]">
                  <Play
                    className="ml-1 h-7 w-7 text-[#00e676]"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
                    <span className="text-gradient">{t.video.title}</span>
                  </h1>
                  <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
                    {t.video.subtitle}
                  </p>
                </div>
              </div>
            )}
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
