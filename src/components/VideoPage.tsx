"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const PROMO_SRC = "/video/promo-corail.html?embed";

/* Téléphone tenu droit (arrivée par QR code) : la vidéo s'affiche à l'endroit, au format vertical 9:16.
   Le bouton plein écran du lecteur la passe à l'horizontale (21:9), plein écran.
   Téléphone en paysage : la vidéo s'ouvre directement en plein écran.
   Ordinateur : vidéo 21:9 en grand.
   Le lecteur choisit lui-même son format (vertical ou horizontal) selon la forme du cadre ;
   un seul cadre (iframe) est utilisé partout : changer d'orientation ne relance pas la vidéo. */
const PORTRAIT_PHONE = "(orientation: portrait) and (max-width: 1024px)";
const LANDSCAPE_PHONE = "(orientation: landscape) and (max-height: 500px)";

type Device = "portrait" | "landscape" | "desktop";

type FullscreenTarget = HTMLElement & { webkitRequestFullscreen?: () => void };
type LockableOrientation = ScreenOrientation & { lock?: (o: string) => Promise<void>; unlock?: () => void };

export function VideoPage() {
  const { t } = useLanguage();
  const shellRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const [fs, setFs] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const prevDevice = useRef<Device | null>(null);

  /* Type d'écran + taille de la fenêtre */
  useEffect(() => {
    const portrait = window.matchMedia(PORTRAIT_PHONE);
    const landscape = window.matchMedia(LANDSCAPE_PHONE);
    const update = () => {
      const next: Device = portrait.matches ? "portrait" : landscape.matches ? "landscape" : "desktop";
      const prev = prevDevice.current;
      // Téléphone qu'on vient de tourner en paysage : plein écran directement.
      if (next === "landscape" && prev !== "landscape") setFs(true);
      // Retour en portrait : la vidéo reprend sa place, au format vertical.
      if (next === "portrait" && prev === "landscape") setFs(false);
      prevDevice.current = next;
      setDevice(next);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    portrait.addEventListener("change", update);
    landscape.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      portrait.removeEventListener("change", update);
      landscape.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Plein écran natif quand le navigateur le permet (Android, ordinateur), en paysage sur téléphone */
  const enterNative = useCallback((phone: boolean) => {
    const el = shellRef.current as FullscreenTarget | null;
    if (!el || document.fullscreenElement) return;
    const lock = () => {
      const o = screen.orientation as LockableOrientation | undefined;
      if (phone && o?.lock) o.lock("landscape").catch(() => {});
    };
    try {
      if (el.requestFullscreen) el.requestFullscreen().then(lock).catch(() => {});
      else el.webkitRequestFullscreen?.();
    } catch {
      /* plein écran indisponible (iPhone) : l'affichage plein cadre suffit */
    }
  }, []);
  const exitNative = useCallback(() => {
    try {
      (screen.orientation as LockableOrientation | undefined)?.unlock?.();
    } catch {
      /* rien */
    }
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  const openFullscreen = useCallback(() => {
    setFs(true);
    enterNative(device !== "desktop");
  }, [device, enterNative]);
  const closeFullscreen = useCallback(() => {
    setFs(false);
    exitNative();
  }, [exitNative]);

  /* Messages du lecteur (bouton plein écran) */
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const d = e.data as { ibfVideo?: string; on?: boolean } | null;
      if (d?.ibfVideo === "fullscreen") (d.on ? openFullscreen : closeFullscreen)();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [openFullscreen, closeFullscreen]);

  /* Sortie du plein écran natif (geste retour, Échap) */
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFs(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /* Le lecteur affiche l'icône « quitter le plein écran » ; la page ne défile plus */
  const overlay = fs && device !== null;
  const postState = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({ ibfVideo: "fs", on: overlay }, window.location.origin);
  }, [overlay]);
  useEffect(() => {
    postState();
    const root = document.documentElement;
    root.style.overflow = overlay ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [overlay, postState]);

  const portrait = device === "portrait";
  const rotate = overlay && viewport.h > viewport.w; // plein écran demandé, téléphone encore droit : vidéo à l'horizontale

  const shellStyle: CSSProperties = overlay
    ? { position: "fixed", inset: 0, zIndex: 200, background: "#000", padding: 0, borderRadius: 0 }
    : {
        position: "relative",
        width: "100%",
        maxWidth: portrait
          ? "min(100%, calc((100svh - 8.5rem) * 9 / 16))"
          : device === "landscape"
            ? "min(100%, calc((100svh - 6rem) * 21 / 9))"
            : "min(100%, calc((100svh - 10rem) * 21 / 9))",
      };

  const frameStyle: CSSProperties = overlay
    ? rotate
      ? { position: "absolute", left: "50%", top: "50%", width: viewport.h, height: viewport.w, transform: "translate(-50%, -50%) rotate(90deg)" }
      : { position: "absolute", inset: 0 }
    : { position: "relative", width: "100%", aspectRatio: portrait ? "9 / 16" : "21 / 9" };

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col items-center justify-center px-3 sm:px-6 lg:px-8 ${
        device === "landscape" ? "pb-4 pt-20" : portrait ? "pb-6 pt-24" : "pb-10 pt-24 sm:pt-28"
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

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center">
        <div
          ref={shellRef}
          className={overlay ? "" : "island overflow-hidden p-1 sm:p-2"}
          style={shellStyle}
        >
          <div
            className={overlay ? "" : "overflow-hidden rounded-[14px] bg-[#050807] sm:rounded-[18px]"}
            style={frameStyle}
          >
            {device && (
              <iframe
                ref={iframeRef}
                className="absolute inset-0 h-full w-full border-0"
                src={PROMO_SRC}
                title={t.video.iframeTitle}
                allow="autoplay; fullscreen"
                allowFullScreen
                onLoad={postState}
              />
            )}
            {overlay && (
              <button
                type="button"
                onClick={closeFullscreen}
                aria-label={t.video.close}
                className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            )}
          </div>
        </div>

        <div className={portrait ? "mt-4 flex justify-center" : "mt-6 flex justify-center sm:mt-8"}>
          <Link href="/" className={portrait ? "text-sm font-medium text-[var(--text-muted)] underline-offset-4 hover:underline" : "btn-primary !w-auto"}>
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t.video.back}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
