"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Photo du fondateur. Déposer le fichier dans `public/fondateur.jpg`.
 * Tant que le fichier n'existe pas, on affiche les initiales.
 */
export const FOUNDER_PHOTO = "/fondateur.jpg";
export const FOUNDER_NAME = "Imrane Ben Fakir";

export function FounderAvatar({
  className = "",
  initialsClassName = "text-sm",
  alt = FOUNDER_NAME,
}: {
  className?: string;
  initialsClassName?: string;
  alt?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // L'image peut échouer avant l'hydratation : on vérifie son état au montage.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{
        backgroundImage: "linear-gradient(135deg, #00E676, #059669, #064E3B)",
      }}
    >
      {failed ? (
        <span
          className={`font-display font-bold text-night ${initialsClassName}`}
          aria-label={alt}
          role="img"
        >
          IB
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={FOUNDER_PHOTO}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
