"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { PromoStart } from "./PromoStart";

/* Vidéo promo (version horizontale, MP4) : rien n'est téléchargé avant le clic sur lecture.
   Ensuite, commandes du lecteur du navigateur (plein écran natif, iPhone compris). */
const PROMO_SRC = "/video/promo-horizontale.mp4";

export function HeroPromoVideo() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {});
  };

  return (
    <motion.div
      className="mt-8 w-full max-w-5xl sm:mt-10"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="island overflow-hidden p-1.5 sm:p-2">
        <div className="relative aspect-[1920/816] w-full overflow-hidden rounded-[16px] bg-[#FBFBFC] [container-type:size] sm:rounded-[18px]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            src={PROMO_SRC}
            preload="none"
            playsInline
            controls={started}
            controlsList="nodownload"
            aria-label={t.video.heroLabel}
          />
          {!started && <PromoStart onStart={start} touch={touch} compact />}
        </div>
      </div>
    </motion.div>
  );
}
