"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Gate de carga del home (v3): no revela la página hasta que el video de
 * fondo puede reproducirse sin cortes (`canplaythrough`), para que el home
 * arranque ya en movimiento.
 *
 * Spotify NO bloquea el ingreso — es un servicio de terceros: el evento
 * `onLoad` de un iframe cross-origin no es una señal confiable (bloqueadores
 * de contenido, cookies de terceros o una red lenta pueden hacer que nunca
 * dispare), y eso dejaba a los usuarios en una pantalla de carga eterna
 * (bug reportado 2026-09-06). Los reproductores cargan detrás de su fachada.
 *
 * Piso de 3s: la pantalla se muestra siempre al menos ese tiempo, aunque el
 * video ya esté en caché. Es una decisión del cliente (la carga es parte de
 * la puesta en escena del home), no una limitación técnica.
 *
 * Salvavidas: si el video nunca avisa (red muy lenta, autoplay bloqueado), un
 * timeout libera la página igual — se ve el póster en su lugar.
 */
const MIN_MS = 3000;
/* 12s: margen para que el video bufferee en una conexión lenta. */
const MAX_MS = 12000;

export default function HomeLoadingGate({
  children,
}: {
  children: (props: {
    ready: boolean;
    onMediaReady: () => void;
  }) => React.ReactNode;
}) {
  const [mediaReady, setMediaReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [bailout, setBailout] = useState(false);

  const onMediaReady = useCallback(() => setMediaReady(true), []);

  useEffect(() => {
    const min = setTimeout(() => setMinElapsed(true), MIN_MS);
    const max = setTimeout(() => setBailout(true), MAX_MS);
    return () => {
      clearTimeout(min);
      clearTimeout(max);
    };
  }, []);

  // El salvavidas ignora el piso: si algo falló, no hay nada que esperar.
  const ready = bailout || (mediaReady && minElapsed);

  return (
    <>
      {!ready && (
        <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-night">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url(/images/fondo-carga.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(100% 80% at 50% 50%, rgba(28,35,41,0.55) 0%, rgba(28,35,41,0.92) 70%, #1C2329 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="relative flex flex-col items-center gap-6"
            role="status"
            aria-live="polite"
          >
            <div className="flex h-12 items-end gap-[5px]" aria-hidden="true">
              {[0, 0.15, 0.3, 0.1, 0.25, 0.05].map((delay, i) => (
                <span
                  key={i}
                  className="joma-eq w-[5px] rounded-[3px]"
                  style={{
                    height: "100%",
                    background: i % 3 === 2 ? "#E2B467" : "#6CAAB7",
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-[10.5px] tracking-[0.24em] text-cool-hi uppercase">
              Cargando
            </span>
          </div>
        </div>
      )}

      <div
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
        aria-hidden={!ready}
      >
        {children({ ready, onMediaReady })}
      </div>
    </>
  );
}
