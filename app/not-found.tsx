import Link from "next/link";
import { CONTACTO } from "@/lib/site";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-[900px] flex-col items-center justify-center px-[clamp(20px,5vw,80px)] py-[clamp(120px,18vh,200px)] text-center">
      {/* La identidad de la 404 sale del mismo lenguaje: mono, ámbar, ecualizador. */}
      <span className="font-mono text-[10.5px] tracking-[0.24em] text-cool-hi uppercase">
        Error 404
      </span>

      <div className="my-8 flex h-16 items-end gap-[6px]" aria-hidden="true">
        {[0, 0.2, 0.4, 0.1, 0.3, 0.15, 0.35].map((delay, i) => (
          <span
            key={i}
            className="joma-eq w-[6px] rounded-[3px]"
            style={{
              height: "100%",
              background: i % 3 === 2 ? "#E2B467" : "#6CAAB7",
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      <h1 className="m-0 font-display text-[clamp(36px,6vw,86px)] leading-[0.95] tracking-[-0.035em] text-ink">
        Esta pista
        <br />
        <span className="text-accent">no existe</span>
      </h1>

      <p className="mt-6 mb-0 max-w-[520px] text-base leading-relaxed text-[rgba(215,230,229,0.72)]">
        El link no lleva a ningún lado. Puede que la página haya cambiado de
        nombre o que la dirección tenga un error de tipeo.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-2xl px-7 py-4 text-[15px] font-semibold text-night"
          style={{
            background: "linear-gradient(145deg,#EBC27A,#C99A50)",
            boxShadow: "8px 8px 22px rgba(10,14,17,0.55)",
          }}
        >
          Volver al inicio
        </Link>
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
          Escribime por WhatsApp
        </a>
      </div>
    </section>
  );
}
