"use client";

import { useEffect, useRef } from "react";

/**
 * Video de fondo del home (v3). Reemplaza al scroll cuadro por cuadro de v2:
 * el movimiento de cámara corre solo, en loop, y no depende del scroll.
 *
 * Archivos generados por scripts/build-home-video.sh (loop ida y vuelta, sin
 * marca de agua ni texto alucinado en el monitor). Orden de <source>:
 *   1. celulares (<768px): H.264 854x480, liviano.
 *   2. AV1 1280x720: mejor calidad por byte donde hay soporte.
 *   3. H.264 1280x720: fallback universal.
 * El navegador toma el primero cuyo `media` y `type` puede usar.
 *
 * `position: sticky` dentro de un contenedor más alto: el video queda fijo
 * detrás del hero y de los paneles de servicios, que pasan por encima.
 */
export default function HeroVideo({ onReady }: { onReady?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    /* Movimiento reducido: no se reproduce, queda el póster. Y el gate no
       espera a un video que no va a sonar. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.removeAttribute("autoplay");
      onReady?.();
      return;
    }

    let done = false;
    const ready = () => {
      if (done) return;
      done = true;
      onReady?.();
    };
    if (v.readyState >= 4) ready();
    v.addEventListener("canplaythrough", ready);
    /* Si el autoplay quedó bloqueado (modo ahorro de batería en iOS), se
       intenta de nuevo; si falla, se ve el póster y el gate libera igual. */
    v.play().catch(() => ready());
    return () => v.removeEventListener("canplaythrough", ready);
  }, [onReady]);

  return (
    <div className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh] w-full overflow-hidden" aria-hidden="true">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/video/home-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
      >
        <source media="(max-width: 767px)" src="/video/home-720.h264.mp4" type="video/mp4" />
        <source src="/video/home-1280.av1.mp4" type='video/mp4; codecs="av01.0.08M.08"' />
        <source src="/video/home-1280.h264.mp4" type="video/mp4" />
      </video>
      {/* Oscurecimiento: el texto nunca va directo sobre la imagen. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, rgba(28,35,41,0.30) 0%, rgba(28,35,41,0.72) 70%, rgba(23,29,34,0.92) 100%)",
        }}
      />
    </div>
  );
}
