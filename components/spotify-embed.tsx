"use client";

import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";

/**
 * Reproductor de Spotify — patrón "facade" con auto-carga (wiki/sitio/portfolio.md).
 *
 * El iframe oficial de Spotify es pesado; 6 cargando de una al entrar a la
 * home le suman peso a la carga inicial, que ya paga los frames del Hero.
 * Por eso el iframe real se monta recién cuando la tarjeta entra en el
 * viewport (IntersectionObserver) — no hace falta clic, pero tampoco cargan
 * los 6 de golpe si el usuario nunca llega a scrollear hasta acá.
 *
 * No bloquea el ingreso al home: se probó forzar la carga de los 6 antes de
 * revelar la página y quedó revertido (2026-09-06) — el evento `onLoad` de
 * un iframe cross-origin de terceros no es confiable como condición de
 * carga (un bloqueador de contenido o una red lenta lo dejan sin disparar
 * nunca, y la pantalla de carga queda trabada para siempre).
 */
export default function SpotifyEmbed({
  id,
  tipo,
  alto = 80,
  precargar = false,
  destacado = false,
}: {
  id: string;
  tipo: "track" | "artist";
  /** Alto del reproductor: 80 (una fila) o 152 (artista con sus temas). */
  alto?: 80 | 152;
  /** true: el reproductor se monta desde el primer render, sin fachada ni
   * espera de scroll (perfiles propios, lo más importante de la sección). */
  precargar?: boolean;
  destacado?: boolean;
}) {
  const [loaded, setLoaded] = useState(precargar);
  const ref = useRef<HTMLButtonElement>(null);

  // Conexión con Spotify abierta de antemano: ahorra el handshake al cargar.
  preconnect("https://open.spotify.com");
  preconnect("https://embed-cdn.spotifycdn.com");

  useEffect(() => {
    const el = ref.current;
    if (!el || loaded) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLoaded(true);
      },
      /* 800px: arranca a cargar bastante antes de que la sección entre en
         pantalla, así al llegar ya está (v3; antes 200px). */
      { rootMargin: "800px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  if (loaded) {
    return (
      <iframe
        title={`Spotify ${tipo} ${id}`}
        src={`https://open.spotify.com/embed/${tipo}/${id}?theme=0`}
        width="100%"
        height={alto}
        style={{ borderRadius: 16, border: 0, display: "block" }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading={precargar ? "eager" : "lazy"}
      />
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setLoaded(true)}
      className="flex w-full items-center gap-4 rounded-2xl px-4 py-[14px] text-left"
      style={
        destacado
          ? {
              background: "rgba(28,35,41,0.55)",
              boxShadow:
                "inset 4px 4px 10px rgba(10,14,17,0.55), inset -3px -3px 8px rgba(108,170,183,0.05)",
            }
          : { background: "rgba(28,35,41,0.32)" }
      }
    >
      <span
        className="grid h-9 w-9 flex-none place-items-center rounded-[11px] text-xs"
        style={
          destacado
            ? { background: "linear-gradient(145deg,#EBC27A,#C99A50)", color: "#1C2329" }
            : { background: "linear-gradient(145deg,#33434C,#232E35)", color: "#D7E6E5" }
        }
        aria-hidden="true"
      >
        {/* SVG y no "▶": en Windows ese carácter se dibuja como emoji azul. */}
        <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor">
          <path d="M1 1.2v9.6a.6.6 0 0 0 .9.5l8-4.8a.6.6 0 0 0 0-1L1.9.7A.6.6 0 0 0 1 1.2Z" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="text-[15px] font-semibold text-ink">
          {tipo === "artist" ? "Ver artista en Spotify" : "Reproducir en Spotify"}
        </span>
        <span className="truncate font-mono text-[11px] text-[rgba(215,230,229,0.5)]">
          Cargar reproductor
        </span>
      </span>
    </button>
  );
}
