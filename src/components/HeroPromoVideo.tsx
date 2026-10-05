"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const PROMO_SRC = "/video/promo.html?embed";

export function HeroPromoVideo() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <motion.div
      className="mt-8 w-full max-w-5xl sm:mt-10"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="island overflow-hidden p-1.5 sm:p-2">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[16px] bg-[#050807] sm:rounded-[18px]">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src={PROMO_SRC}
            title={t.video.heroLabel}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}
