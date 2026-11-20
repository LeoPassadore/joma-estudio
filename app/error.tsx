"use client";

import { useEffect } from "react";
import { CONTACTO } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Cuando entre Sentry (carril D), este es el punto de reporte.
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-[900px] flex-col items-center justify-center px-[clamp(20px,5vw,80px)] py-[clamp(120px,18vh,200px)] text-center">
      <span className="font-mono text-[10.5px] tracking-[0.24em] text-cool-hi uppercase">
        Algo falló
      </span>

      <h1 className="mt-6 mb-0 font-display text-[clamp(32px,5vw,72px)] leading-[0.95] tracking-[-0.035em] text-ink">
        Se cortó
        <br />
        <span className="text-accent">la señal</span>
      </h1>

      <p className="mt-6 mb-0 max-w-[520px] text-base leading-relaxed text-[rgba(215,230,229,0.72)]">
        Hubo un error inesperado de nuestro lado. Podés reintentar; si sigue
        pasando, escribime y lo vemos.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer rounded-2xl border-0 px-7 py-4 text-[15px] font-semibold text-night"
          style={{
            background: "linear-gradient(145deg,#EBC27A,#C99A50)",
            boxShadow: "8px 8px 22px rgba(10,14,17,0.55)",
          }}
        >
          Reintentar
        </button>
        <a
          href={CONTACTO.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl px-7 py-4 text-[15px] font-semibold text-ink"
          style={{
            background: "linear-gradient(145deg,#2C3A43,#1E272D)",
            boxShadow: "8px 8px 22px rgba(10,14,17,0.5)",
          }}
        >
          Avisame por WhatsApp
        </a>
      </div>

      {error.digest && (
        <p className="mt-8 mb-0 font-mono text-[10.5px] tracking-[0.16em] text-[rgba(215,230,229,0.35)]">
          REF {error.digest}
        </p>
      )}
    </section>
  );
}
