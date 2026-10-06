"use client";

import { Star } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Motion";
import { useLanguage } from "./LanguageProvider";

export function Testimonials() {
  const { t } = useLanguage();

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
          {t.reviews.items.map((review) => (
            <StaggerItem key={review.name}>
              <article className="island island-hover flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-bold text-night"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #00E676, #059669, #064E3B)",
                    }}
                    aria-hidden
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-display font-semibold">{review.name}</p>
                    <div
                      className="mt-0.5 flex gap-0.5"
                      aria-label="5 étoiles sur 5"
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
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
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
