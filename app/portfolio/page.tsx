import PageHero from "@/components/page-hero";
import CtaFinal from "@/components/cta-final";
import { CONTACTO } from "@/lib/site";

export const metadata = {
  title: "Portfolio",
  description: "Producciones, mezclas y masters publicados en plataformas.",
  alternates: { canonical: "/portfolio" },
};

/* TODO (cliente): identificar los 6 tracks — artista, título y sobre todo qué
   hizo JOMA en cada uno (wiki/sitio/portfolio.md, carril A1). Hasta entonces
   la página lleva al perfil de Spotify en vez de inventar nombres. */

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        titulo="Trabajos publicados"
        bajada="Producciones, mezclas y masters que hice para artistas de música urbana."
      />

      <section className="mx-auto max-w-[1400px] px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        {/* min(320px,100%): un mínimo fijo desbordaba en pantallas de 320px. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-[clamp(24px,3vw,44px)]">
          <div
            className="rounded-[28px] p-[clamp(24px,3vw,40px)]"
            style={{
              background: "linear-gradient(145deg,#2C3A43,#1E272D)",
              boxShadow:
                "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
            }}
          >
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-cool-hi uppercase">
              Spotify
            </span>
            <h2 className="mt-3 mb-4 font-display text-[clamp(22px,2.4vw,30px)] tracking-[-0.025em] text-ink">
              Producciones
            </h2>
            <p className="m-0 text-[15px] leading-relaxed text-[rgba(215,230,229,0.72)]">
              Escuchá los temas producidos, mezclados y masterizados en el
              estudio.
            </p>
            <a
              href={CONTACTO.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-[14px] px-[22px] py-[13px] text-[13.5px] font-semibold text-night"
              style={{
                background: "linear-gradient(145deg,#EBC27A,#C99A50)",
                boxShadow: "5px 5px 14px rgba(10,14,17,0.5)",
              }}
            >
              Abrir en Spotify
            </a>
          </div>

          <div
            className="rounded-[28px] p-[clamp(24px,3vw,40px)]"
            style={{
              background: "linear-gradient(145deg,#2C3A43,#1E272D)",
              boxShadow:
                "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
            }}
          >
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-cool-hi uppercase">
              YouTube · Instagram
            </span>
            <h2 className="mt-3 mb-4 font-display text-[clamp(22px,2.4vw,30px)] tracking-[-0.025em] text-ink">
              Detrás de las sesiones
            </h2>
            <p className="m-0 text-[15px] leading-relaxed text-[rgba(215,230,229,0.72)]">
              Cómo trabajo, sesiones de grabación y contenido sobre producción.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={CONTACTO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[14px] px-[22px] py-[13px] text-[13.5px] font-semibold text-ink"
                style={{
                  background: "linear-gradient(145deg,#33434C,#232E35)",
                  boxShadow: "5px 5px 14px rgba(10,14,17,0.5)",
                }}
              >
                YouTube
              </a>
              <a
                href={CONTACTO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[14px] px-[22px] py-[13px] text-[13.5px] font-semibold text-ink"
                style={{
                  background: "linear-gradient(145deg,#33434C,#232E35)",
                  boxShadow: "5px 5px 14px rgba(10,14,17,0.5)",
                }}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
