"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { PromoStart } from "./PromoStart";

/* Vidéo promo : deux vrais fichiers MP4 (H.264 + AAC), lus par le lecteur vidéo du navigateur.
   Téléphone tenu droit (arrivée par QR code) : version verticale, à l'endroit.
   Bouton plein écran : version horizontale en plein écran (sur le côté si le téléphone reste droit).
   Téléphone en paysage : plein écran directement. Ordinateur : version horizontale en grand.
   Passer d'une version à l'autre reprend au même instant, sans relancer la vidéo. */
const SOURCES = {
  v: "/video/promo-verticale.mp4", // 1072 × 1920
  h: "/video/promo-horizontale.mp4", // 1920 × 816
} as const;
type Format = keyof typeof SOURCES;

const PORTRAIT_PHONE = "(orientation: portrait) and (max-width: 1024px)";
const LANDSCAPE_PHONE = "(orientation: landscape) and (max-height: 500px)";
type Device = "portrait" | "landscape" | "desktop";

/* Tailles du cadre en CSS (mêmes requêtes que ci-dessus) : la page s'affiche d'emblée au bon format */
const SHELL_SIZE =
  "max-w-[min(100%,calc((100svh_-_10rem)*1920/816))] [@media(orientation:portrait)_and_(max-width:1024px)]:max-w-[min(100%,calc((100svh_-_8.5rem)*1072/1920))] [@media(orientation:landscape)_and_(max-height:500px)]:max-w-[min(100%,calc((100svh_-_6rem)*1920/816))]";
const FRAME_SIZE = "aspect-[1920/816] [@media(orientation:portrait)_and_(max-width:1024px)]:aspect-[1072/1920]";
const ON_PORTRAIT_PHONE = "hidden [@media(orientation:portrait)_and_(max-width:1024px)]:flex";
const OFF_PORTRAIT_PHONE = "flex [@media(orientation:portrait)_and_(max-width:1024px)]:hidden";

const HIDE_BAR_AFTER = 2600;
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/* iPhone / iPad : une vidéo ne peut démarrer avec le son qu'après un toucher sur elle-même */
const isAppleTouch = () =>
  /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/* Place une vidéo à l'instant voulu, même si elle n'est pas encore chargée */
function seekTo(v: HTMLVideoElement, at: number) {
  if (v.readyState < 1) {
    v.addEventListener(
      "loadedmetadata",
      () => {
        if (Math.abs(v.currentTime - at) > 0.05) v.currentTime = at;
      },
      { once: true },
    );
  }
  try {
    v.currentTime = at;
  } catch {
    /* appliqué au chargement */
  }
}

type FullscreenDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => void;
};
type LockableOrientation = ScreenOrientation & { lock?: (o: string) => Promise<void>; unlock?: () => void };
type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void; webkitDisplayingFullscreen?: boolean };

/* iPhone : Safari ne met pas un bloc de page en plein écran (ses barres resteraient visibles),
   mais son lecteur vidéo, lui, passe en vrai plein écran : plus rien d'autre que la vidéo. */
function iosVideoFullscreen() {
  if (typeof document === "undefined") return false;
  const d = document as FullscreenDoc;
  return (
    !(document.fullscreenEnabled || d.webkitFullscreenEnabled) &&
    typeof (HTMLVideoElement.prototype as IOSVideo).webkitEnterFullscreen === "function"
  );
}

/* Plein écran du navigateur quand il existe (Android, ordinateur, iPad), en paysage sur téléphone.
   iPhone : pas de plein écran pour un bloc de page, l'affichage plein cadre (et tourné) suffit. */
function enterNativeFullscreen(el: HTMLElement | null, landscape: boolean) {
  const d = document as FullscreenDoc;
  if (!el || d.fullscreenElement || d.webkitFullscreenElement) return;
  const lock = () => {
    const o = screen.orientation as LockableOrientation | undefined;
    if (landscape && o?.lock) o.lock("landscape").catch(() => {});
  };
  try {
    if (el.requestFullscreen && document.fullscreenEnabled !== false) {
      const p = el.requestFullscreen({ navigationUI: "hide" }) as Promise<void> | undefined;
      if (p && typeof p.then === "function") p.then(lock).catch(() => {});
    } else {
      (el as HTMLElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen?.();
    }
  } catch {
    /* refusé : l'affichage plein cadre reste en place */
  }
}
function exitNativeFullscreen() {
  const d = document as FullscreenDoc;
  try {
    (screen.orientation as LockableOrientation | undefined)?.unlock?.();
  } catch {
    /* rien */
  }
  try {
    if (d.fullscreenElement) d.exitFullscreen().catch(() => {});
    else if (d.webkitFullscreenElement) d.webkitExitFullscreen?.();
  } catch {
    /* rien */
  }
}

export function VideoPage() {
  const { t } = useLanguage();
  const shellRef = useRef<HTMLDivElement>(null);
  const videos = useRef<Record<Format, HTMLVideoElement | null>>({ v: null, h: null });
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const knobRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const active = useRef<Format>("h");
  const prevDevice = useRef<Device | null>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const revealTimer = useRef<number | undefined>(undefined);
  const drag = useRef<{ on: boolean; at: number; resume: boolean }>({ on: false, at: 0, resume: false });

  const [device, setDevice] = useState<Device | null>(null);
  const [coarse, setCoarse] = useState(false);
  const [fs, setFs] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [barOn, setBarOn] = useState(true);
  const [revealed, setRevealed] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [nativeVideo, setNativeVideo] = useState(false); // iPhone : lecteur plein écran du téléphone affiché
  const nativeTimer = useRef<number | undefined>(undefined);
  const nativeOpen = useRef(false);

  const overlay = fs && device !== null;
  const fmt: Format = device === "portrait" && !fs && !nativeVideo ? "v" : "h";
  const current = () => videos.current[active.current];

  /* ---- Barre de progression et temps, mis à jour sans re-rendu ---- */
  const paint = useCallback(() => {
    const v = videos.current[active.current];
    if (!v) return;
    const d = Number.isFinite(v.duration) ? v.duration : 0;
    const c = drag.current.on ? drag.current.at : v.currentTime;
    const p = d ? Math.min(1, Math.max(0, c / d)) : 0;
    if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
    if (knobRef.current) knobRef.current.style.left = `${p * 100}%`;
    if (timeRef.current) timeRef.current.textContent = `${mmss(c)} / ${mmss(d || 40)}`;
    trackRef.current?.setAttribute("aria-valuenow", String(Math.round(c)));
  }, []);
  useEffect(() => {
    if (!playing) {
      paint();
      return;
    }
    let raf = 0;
    const loop = () => {
      paint();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [playing, paint]);

  /* ---- Commandes : visibles à l'arrêt, masquées pendant la lecture ---- */
  const poke = useCallback(() => {
    setBarOn(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (!drag.current.on) setBarOn(false);
    }, HIDE_BAR_AFTER);
  }, []);

  /* ---- Passage d'une version à l'autre (vertical ⇄ horizontal), au même instant ---- */
  const switchTo = useCallback((next: Format) => {
    if (active.current === next) return;
    const from = videos.current[active.current];
    const to = videos.current[next];
    if (!to) return;
    active.current = next;
    if (!from) return;
    const at = from.currentTime;
    const wasPlaying = !from.paused && !from.ended;
    from.pause();
    to.muted = from.muted;
    if (Math.abs(to.currentTime - at) > 0.05) {
      // la nouvelle version apparaît une fois calée sur la bonne image (fondu court)
      setRevealed(false);
      window.clearTimeout(revealTimer.current);
      revealTimer.current = window.setTimeout(() => setRevealed(true), 1500);
      seekTo(to, at);
    }
    if (wasPlaying) to.play().catch(() => setPlaying(false));
    else setPlaying(false);
  }, []);

  /* ---- Type d'écran + taille de la fenêtre ---- */
  useEffect(() => {
    const portrait = window.matchMedia(PORTRAIT_PHONE);
    const landscape = window.matchMedia(LANDSCAPE_PHONE);
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    const update = () => {
      const next: Device = portrait.matches ? "portrait" : landscape.matches ? "landscape" : "desktop";
      const prev = prevDevice.current;
      // Téléphone qu'on vient de tourner en paysage : plein écran directement.
      if (next === "landscape" && prev !== "landscape") setFs(true);
      // Retour en portrait : la vidéo reprend sa place, au format vertical.
      if (next === "portrait" && prev === "landscape") {
        setFs(false);
        exitNativeFullscreen();
      }
      prevDevice.current = next;
      setDevice(next);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    portrait.addEventListener("change", update);
    landscape.addEventListener("change", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    screen.orientation?.addEventListener?.("change", update);
    return () => {
      portrait.removeEventListener("change", update);
      landscape.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      screen.orientation?.removeEventListener?.("change", update);
    };
  }, []);

  /* Bonne version selon l'écran (rotation du téléphone, sortie du plein écran…) */
  useEffect(() => {
    if (device) switchTo(fmt);
  }, [fmt, device, switchTo]);

  /* ---- Lecture ---- */
  const start = () => {
    const a = current();
    if (!a) return;
    /* iPhone : on « débloque » aussi l'autre version pendant ce toucher, pour pouvoir y basculer
       plus tard (rotation) sans nouveau toucher. Avant la lecture, car l'iPhone ne joue qu'une vidéo à la fois. */
    const o = videos.current[active.current === "v" ? "h" : "v"];
    if (o && o.paused && isAppleTouch()) {
      o.muted = muted;
      const p = o.play();
      o.pause();
      p?.catch(() => {});
    }
    a.muted = muted;
    setStarted(true);
    setEnded(false);
    a.play().catch(() => setPlaying(false));
    // iPhone tenu en paysage : la vidéo s'ouvre directement dans le lecteur plein écran du téléphone
    if (device === "landscape" && active.current === "h") enterIOSVideoFullscreen();
    poke();
  };
  const togglePlay = () => {
    const a = current();
    if (!a) return;
    if (!started) return start();
    if (a.paused || a.ended) {
      if (a.ended) a.currentTime = 0;
      a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
    poke();
  };
  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    (["v", "h"] as const).forEach((f) => {
      const v = videos.current[f];
      if (v) v.muted = m;
    });
    poke();
  };
  const seekBy = (s: number) => {
    const a = current();
    if (!a) return;
    a.currentTime = Math.min(Math.max(0, a.currentTime + s), Number.isFinite(a.duration) ? a.duration : 40);
    paint();
    poke();
  };

  /* ---- Plein écran ---- */
  /* iPhone : la version horizontale s'ouvre dans le lecteur plein écran du téléphone.
     Renvoie false si ce lecteur n'a pas pu s'ouvrir (vidéo pas encore prête). */
  const enterIOSVideoFullscreen = () => {
    const h = videos.current.h as IOSVideo | null;
    if (!h || !iosVideoFullscreen() || typeof h.webkitEnterFullscreen !== "function") return false;
    setNativeVideo(true); // garde la version horizontale active pendant l'ouverture
    try {
      h.webkitEnterFullscreen();
    } catch {
      setNativeVideo(false);
      return false;
    }
    window.clearTimeout(nativeTimer.current);
    nativeTimer.current = window.setTimeout(() => {
      // le lecteur ne s'est pas ouvert : affichage plein cadre à la place
      if (!nativeOpen.current && !h.webkitDisplayingFullscreen) {
        setNativeVideo(false);
        setFs(true);
      }
    }, 1500);
    return true;
  };
  const openFullscreen = () => {
    switchTo("h"); // dans le toucher : la version horizontale démarre aussitôt (iPhone compris)
    if (enterIOSVideoFullscreen()) return;
    setFs(true);
    enterNativeFullscreen(shellRef.current, device !== "desktop");
    poke();
  };
  const closeFullscreen = () => {
    setFs(false);
    exitNativeFullscreen();
    if (device === "portrait") switchTo("v");
    poke();
  };
  /* iPhone : le bouton ouvre toujours le lecteur plein écran (l'affichage plein cadre se ferme avec la croix) */
  const toggleFullscreen = () => (fs && !iosVideoFullscreen() ? closeFullscreen() : openFullscreen());
  const showExit = fs && !iosVideoFullscreen();

  /* Sortie du plein écran par le navigateur (geste retour, Échap) */
  useEffect(() => {
    const onChange = () => {
      const d = document as FullscreenDoc;
      if (!d.fullscreenElement && !d.webkitFullscreenElement) setFs(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  /* iPhone : ouverture / fermeture du lecteur plein écran du téléphone.
     À la fermeture, la vidéo reprend dans la page au même instant (version verticale si le téléphone est droit). */
  useEffect(() => {
    const h = videos.current.h;
    if (!h) return;
    const begin = () => {
      nativeOpen.current = true;
      setNativeVideo(true);
    };
    const end = () => {
      nativeOpen.current = false;
      window.clearTimeout(nativeTimer.current);
      setNativeVideo(false);
    };
    h.addEventListener("webkitbeginfullscreen", begin);
    h.addEventListener("webkitendfullscreen", end);
    return () => {
      h.removeEventListener("webkitbeginfullscreen", begin);
      h.removeEventListener("webkitendfullscreen", end);
    };
  }, [device]);

  /* La page ne défile plus pendant le plein écran */
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = overlay ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [overlay]);

  /* ---- Barre de progression (souris et doigt) ---- */
  const trackTime = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const a = current();
    const d = a && Number.isFinite(a.duration) ? a.duration : 40;
    // dans le plein écran tourné, la barre est verticale à l'écran
    const p = r.width >= r.height ? (e.clientX - r.left) / r.width : (e.clientY - r.top) / r.height;
    return Math.min(1, Math.max(0, p)) * d;
  };
  const onTrackDown = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const a = current();
    if (!a) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { on: true, at: trackTime(e), resume: !a.paused && !a.ended };
    setDragging(true);
    a.pause();
    paint();
    poke();
  };
  const onTrackMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    drag.current.at = trackTime(e);
    paint();
  };
  const onTrackUp = () => {
    if (!drag.current.on) return;
    const a = current();
    drag.current.on = false;
    setDragging(false);
    if (a) {
      a.currentTime = drag.current.at;
      setEnded(false);
      if (drag.current.resume) a.play().catch(() => setPlaying(false));
    }
    paint();
    poke();
  };
  const onTrackKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      seekBy(e.key === "ArrowLeft" ? -5 : 5);
    }
  };

  /* ---- Toucher / clic sur l'image : au doigt, le premier toucher affiche les commandes ---- */
  const onSurface = () => {
    if (!started) return start();
    if (coarse && playing && !barOn) return poke();
    togglePlay();
  };

  /* ---- Clavier ---- */
  const keyRef = useRef<(e: globalThis.KeyboardEvent) => void>(() => {});
  keyRef.current = (e) => {
    const el = e.target instanceof Element ? e.target : null;
    if (e.ctrlKey || e.metaKey || e.altKey || el?.closest("input, textarea, select, [contenteditable]")) return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") {
      if (el?.closest("button, a, [role=slider]")) return;
      e.preventDefault();
      togglePlay();
    } else if (k === "f") toggleFullscreen();
    else if (k === "m") toggleMute();
    else if (k === "escape" && fs) closeFullscreen();
    else if (started && (k === "arrowleft" || k === "arrowright")) {
      if (el?.closest("[role=slider]")) return;
      seekBy(k === "arrowleft" ? -5 : 5);
    }
  };
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => keyRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(revealTimer.current);
      window.clearTimeout(nativeTimer.current);
    },
    [],
  );

  /* ---- Événements des deux vidéos (seule la version affichée compte) ---- */
  const events = (f: Format) => ({
    onPlay: () => {
      if (active.current !== f) return;
      setPlaying(true);
      setEnded(false);
    },
    onPause: () => {
      if (active.current === f) setPlaying(false);
    },
    onEnded: () => {
      if (active.current !== f) return;
      setPlaying(false);
      setEnded(true);
      setBarOn(true);
    },
    onWaiting: () => {
      if (active.current === f) setWaiting(true);
    },
    onPlaying: () => {
      if (active.current !== f) return;
      setWaiting(false);
      setRevealed(true);
    },
    onCanPlay: () => {
      if (active.current === f) setWaiting(false);
    },
    onSeeked: () => {
      if (active.current !== f) return;
      setRevealed(true);
      paint();
    },
    onLoadedMetadata: paint,
    onTimeUpdate: paint,
  });

  /* ---- Mise en page : en ligne (cadre arrondi) ou plein écran (noir, tourné si le téléphone reste droit) ---- */
  const rotate = overlay && viewport.h > viewport.w;
  const shellStyle: CSSProperties | undefined = overlay
    ? { position: "fixed", inset: 0, zIndex: 200, background: "#000", padding: 0, borderRadius: 0, maxWidth: "none" }
    : undefined;
  const frameStyle: CSSProperties | undefined = overlay
    ? rotate
      ? { position: "absolute", left: "50%", top: "50%", width: viewport.h, height: viewport.w, transform: "translate(-50%, -50%) rotate(90deg)" }
      : { position: "absolute", inset: 0 }
    : undefined;
  const barVisible = started && (!playing || barOn || dragging);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-3 pb-6 pt-24 sm:px-6 sm:pb-10 lg:px-8 lg:pt-28 [@media(orientation:landscape)_and_(max-height:500px)]:pb-4 [@media(orientation:landscape)_and_(max-height:500px)]:pt-20">
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
          className={overlay ? "" : `island relative w-full overflow-hidden p-1 sm:p-2 ${SHELL_SIZE}`}
          style={shellStyle}
        >
          <div
            className={
              overlay
                ? "overflow-hidden bg-black [container-type:size]"
                : `relative w-full overflow-hidden rounded-[14px] bg-[#FBFBFC] [container-type:size] sm:rounded-[18px] ${FRAME_SIZE}`
            }
            style={frameStyle}
            onPointerMove={(e) => {
              if (started && e.pointerType === "mouse") poke();
            }}
          >
            {device &&
              (device === "desktop" ? (["h"] as const) : (["v", "h"] as const)).map((f) => (
                <video
                  key={f}
                  ref={(n) => {
                    videos.current[f] = n;
                  }}
                  src={SOURCES[f]}
                  preload={f === fmt ? "auto" : "metadata"}
                  playsInline
                  aria-label={t.video.label}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${
                    f === fmt && revealed ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  {...events(f)}
                />
              ))}

            {/* Surface de toucher / clic */}
            <div className="absolute inset-0 z-[5]" onClick={onSurface} aria-hidden />

            {started && waiting && (
              <Loader2 aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-spin text-[#10B981]" />
            )}

            {/* Écran de départ */}
            {!started && <PromoStart onStart={start} touch={coarse} />}

            {/* Barre de commandes */}
            <div
              className={`absolute inset-x-0 bottom-0 z-20 flex justify-center p-[clamp(8px,2.4cqmin,18px)] transition duration-300 ${
                barVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              <div className="flex w-full max-w-[680px] items-center gap-0.5 rounded-full bg-[rgba(17,19,26,0.66)] px-1.5 py-1 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <button type="button" onClick={togglePlay} aria-label={ended ? t.video.replay : playing ? t.video.pause : t.video.play} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-white/15">
                  {ended ? <RotateCcw aria-hidden className="h-5 w-5" /> : playing ? <Pause aria-hidden fill="currentColor" className="h-5 w-5" /> : <Play aria-hidden fill="currentColor" className="ml-0.5 h-5 w-5" />}
                </button>
                <span ref={timeRef} className="min-w-[74px] shrink-0 px-1 text-center text-[12px] font-medium tabular-nums text-white/90" />
                <div
                  ref={trackRef}
                  role="slider"
                  tabIndex={0}
                  aria-label={t.video.seek}
                  aria-valuemin={0}
                  aria-valuemax={41}
                  aria-valuenow={0}
                  onPointerDown={onTrackDown}
                  onPointerMove={onTrackMove}
                  onPointerUp={onTrackUp}
                  onPointerCancel={onTrackUp}
                  onKeyDown={onTrackKey}
                  className="relative mx-1.5 h-10 min-w-[48px] flex-1 cursor-pointer touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/25" />
                  <span ref={fillRef} className="absolute left-0 top-1/2 h-1 w-0 -translate-y-1/2 rounded-full bg-brand" />
                  <span ref={knobRef} className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow" />
                </div>
                <button type="button" onClick={toggleMute} aria-label={muted ? t.video.unmute : t.video.mute} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-white/15">
                  {muted ? <VolumeX aria-hidden className="h-5 w-5" /> : <Volume2 aria-hidden className="h-5 w-5" />}
                </button>
                <button type="button" onClick={toggleFullscreen} aria-label={showExit ? t.video.exitFullscreen : t.video.fullscreen} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-white/15">
                  {showExit ? <Minimize aria-hidden className="h-5 w-5" /> : <Maximize aria-hidden className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {overlay && (
              <button
                type="button"
                onClick={closeFullscreen}
                aria-label={t.video.close}
                className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            )}
          </div>
        </div>

        <div className={`mt-4 justify-center ${ON_PORTRAIT_PHONE}`}>
          <Link href="/" className="text-sm font-medium text-[var(--text-muted)] underline-offset-4 hover:underline">
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t.video.back}
            </span>
          </Link>
        </div>
        <div className={`mt-6 justify-center sm:mt-8 ${OFF_PORTRAIT_PHONE}`}>
          <Link href="/" className="btn-primary !w-auto">
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
