"use client";

import { MapPin, Star } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Motion";
import { useLanguage } from "./LanguageProvider";

/** Une pastille différente par avis, toujours dans la palette verte du site. */
const BADGES = [
  { bg: "linear-gradient(135deg, #00E676, #059669)", fg: "#03140C" },
  { bg: "linear-gradient(135deg, #047857, #064E3B)", fg: "#ECFDF5" },
  { bg: "linear-gradient(135deg, #A7F3D0, #34D399)", fg: "#064E3B" },
  { bg: "linear-gradient(160deg, #10B981, #0F766E)", fg: "#ECFDF5" },
  { bg: "linear-gradient(135deg, #D1FAE5, #6EE7B7)", fg: "#065F46" },
  { bg: "linear-gradient(200deg, #064E3B, #10B981)", fg: "#ECFDF5" },
];

export function Testimonials() {
  const { t, locale } = useLanguage();

  return (
    <section
      id="avis"
      className="relative scroll-mt-28 py-20 sm:py-24"
      aria-labelledby="avis-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="section-label">{t.reviews.label}</p>
          <h2 id="avis-title" className="section-title">
            {t.reviews.title}
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">{t.reviews.subtitle}</p>
        </FadeIn>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.reviews.items.map((review, i) => {
            const badge = BADGES[i % BADGES.length];
            const meta = [review.role, review.city].filter(Boolean);
            return (
              <StaggerItem key={review.name}>
                <article className="island island-hover flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold"
                      style={{ backgroundImage: badge.bg, color: badge.fg }}
                      aria-hidden
                    >
                      {review.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-semibold">{review.name}</p>
                      {meta.length > 0 && (
                        <p className="flex items-center gap-1 truncate text-xs text-[var(--text-muted)]">
                          {review.city && (
                            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                          )}
                          {meta.join(" · ")}
                        </p>
                      )}
                      <div
                        className="mt-0.5 flex gap-0.5"
                        role="img"
                        aria-label={locale === "en" ? "5 out of 5 stars" : "5 étoiles sur 5"}
                      >
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className="h-3.5 w-3.5 fill-brand text-brand"
                            aria-hidden
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {review.text}
                  </p>
                  {(review.service || review.date) && (
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                      {review.service && (
                        <span
                          className="rounded-full border px-2.5 py-1 text-[11px] font-semibold text-brand-deep dark:text-brand"
                          style={{
                            borderColor: "var(--island-border)",
                            background: "rgba(0, 230, 118, 0.08)",
                          }}
                        >
                          {review.service}
                        </span>
                      )}
                      {review.date && (
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {review.date}
                        </span>
                      )}
                    </div>
                  )}
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
