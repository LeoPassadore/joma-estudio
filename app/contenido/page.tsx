import PageHero from "@/components/page-hero";
import CtaFinal from "@/components/cta-final";
import { CONTACTO } from "@/lib/site";

export const metadata = {
  title: "Contenido",
  description:
    "Contenido sobre producción musical, mezcla y trabajo de estudio.",
  alternates: { canonical: "/contenido" },
};

/* TODO (cliente): definir el formato de esta sección — ¿blog, grilla de
   videos, feed de Instagram? Los temas están definidos, el formato no, y de
   eso depende si hace falta un CMS. Ver wiki/sitio/sitio-estructura.md,
   carril A1. Hasta entonces la página deriva a los canales que ya existen. */

export default function ContenidoPage() {
  return (
    <>
      <PageHero
        titulo="Cómo se hace, por dentro"
        bajada="Publico contenido sobre producción, mezcla y trabajo de estudio en mis canales."
      />

      <section className="mx-auto max-w-[1100px] px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[clamp(20px,2.4vw,32px)]">
          <a
            href={CONTACTO.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-[24px] p-8 transition-transform hover:-translate-y-1"
            style={{
              background: "linear-gradient(145deg,#2C3A43,#1E272D)",
              boxShadow:
                "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
            }}
          >
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-cool-hi uppercase">
              YouTube
            </span>
            <span className="mt-3 font-display text-[clamp(20px,2.2vw,26px)] tracking-[-0.02em] text-ink">
              Videos y sesiones
            </span>
            <span className="mt-2 text-[15px] leading-relaxed text-[rgba(215,230,229,0.72)]">
              Procesos completos y contenido sobre producción musical.
            </span>
          </a>

          <a
            href={CONTACTO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-[24px] p-8 transition-transform hover:-translate-y-1"
            style={{
              background: "linear-gradient(145deg,#2C3A43,#1E272D)",
              boxShadow:
                "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
            }}
          >
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-cool-hi uppercase">
              Instagram
            </span>
            <span className="mt-3 font-display text-[clamp(20px,2.2vw,26px)] tracking-[-0.02em] text-ink">
              Día a día del estudio
            </span>
            <span className="mt-2 text-[15px] leading-relaxed text-[rgba(215,230,229,0.72)]">
              Sesiones, adelantos y detrás de escena.
            </span>
          </a>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
