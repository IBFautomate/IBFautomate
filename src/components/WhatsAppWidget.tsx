"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

/** Numéro WhatsApp (modifiable) */
const WHATSAPP_NUMBER = "33762129949";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const BUBBLE_KEY = "ibf-wa-bubble-dismissed";
const WIDGET_KEY = "ibf-wa-widget-dismissed";

export function WhatsAppWidget() {
  const { t } = useLanguage();
  const [showBubble, setShowBubble] = useState(false);
  const [showWidget, setShowWidget] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(WIDGET_KEY) === "1") {
      setShowWidget(false);
      return;
    }
    if (sessionStorage.getItem(BUBBLE_KEY) === "1") return;

    const timer = window.setTimeout(
      () => setShowBubble(true),
      window.matchMedia("(max-width: 639px)").matches ? 6000 : 3000,
    );
    return () => window.clearTimeout(timer);
  }, []);

  const dismissBubble = () => {
    setShowBubble(false);
    sessionStorage.setItem(BUBBLE_KEY, "1");
  };

  const dismissWidget = () => {
    setShowBubble(false);
    setShowWidget(false);
    sessionStorage.setItem(WIDGET_KEY, "1");
    sessionStorage.setItem(BUBBLE_KEY, "1");
  };

  const openChat = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  if (!showWidget) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 safe-bottom sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            role="dialog"
            aria-label="Contact WhatsApp"
            className="island relative w-[min(100vw-2rem,280px)] p-4 pr-10 shadow-glow-brand-sm sm:w-[min(100vw-2.5rem,300px)]"
            initial={
              reduce ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }
            }
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <button
              type="button"
              aria-label={t.whatsapp.close}
              onClick={dismissBubble}
              className="absolute right-2 top-2 rounded-md p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="mb-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {t.whatsapp.bubble}
            </p>
            <button
              type="button"
              onClick={openChat}
              className="btn-primary w-full text-sm"
            >
              {t.whatsapp.chat}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-brand/40 animate-pulse-ring"
        />
        <button
          type="button"
          onClick={openChat}
          aria-label={t.whatsapp.open}
          className="relative flex h-12 w-12 items-center justify-center rounded-full text-night shadow-glow-brand transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:h-14 sm:w-14"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #00E676, #059669, #064E3B)",
          }}
        >
          <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
        </button>

        <AnimatePresence>
          {hovered && (
            <motion.button
              type="button"
              aria-label={t.whatsapp.hide}
              onClick={(e) => {
                e.stopPropagation();
                dismissWidget();
              }}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-[var(--bg-surface)] text-[var(--text)] shadow-md"
              style={{ borderColor: "var(--island-border)" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
