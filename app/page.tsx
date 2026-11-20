"use client";

import HeroVideo from "@/components/hero-video";
import ServiciosPanels from "@/components/servicios-panels";
import PluginsDestacado from "@/components/plugins-destacado";
import CtaFinal from "@/components/cta-final";
import SpotifyEmbed from "@/components/spotify-embed";
import HomeLoadingGate from "@/components/home-loading-gate";
import { CONTACTO, whatsappLink } from "@/lib/site";

/* Los links son reales (wiki/sitio/portfolio.md — el cliente los entregó).
   Primero los perfiles propios — lo más importante: reproductor de artista
   de Spotify (152px, muestra sus temas más escuchados), precargado. Después
   las producciones, en reproductor compacto con carga diferida (v2). */
const PERFILES = [
  "3BwnhxWXWW5K0Mu5WBtaAy", // JOMAWAV (artista)
  "1CnYJnEVer4IrlIbZZROFa", // Joma.Estudio (estudio)
];

/** Producciones: tracks + un artista producido (BNNJ). */
const PRODUCCIONES: { id: string; tipo: "track" | "artist" }[] = [
  { id: "4vRqXuHeLDfygA6bUtLZDj", tipo: "track" }, // FvckDrvg
  { id: "0ZVOrzeTx5TTZRKY7HsQ36", tipo: "track" }, // Acabo de soltarme
  { id: "6Rci1mXtpUHhH0fJOMcKwp", tipo: "track" }, // SUEÑO
  { id: "2PeTzaEfk0w7FpgePMnTg6", tipo: "track" }, // VOLVER A EMPEZAR
  { id: "1Vk6ogK3CO9zKnZhLeEXoP", tipo: "track" }, // NO HAY PLAN B #1
  { id: "16MOhs30t4i0kQ0Z3YuWoz", tipo: "artist" }, // BNNJ (artista producido)
];

export default function Home() {
  return (
    <HomeLoadingGate>
      {({ onMediaReady }) => (
        <>
          {/* Video fijo de fondo detrás del hero y de los paneles de
              servicios: el movimiento sigue mientras se scrollea por encima. */}
          <div className="relative">
            <HeroVideo onReady={onMediaReady} />

            <section className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-start justify-center px-[clamp(20px,5vw,80px)] pt-[clamp(110px,14vh,150px)] pb-[clamp(80px,12vh,120px)]">
              <h1 className="m-0 font-display text-[clamp(38px,min(8.2vw,8.4vh),132px)] leading-[0.94] tracking-[-0.035em] text-balance text-ink">
                Producción musical integral.
                <br />
                <span className="text-accent">De tu idea a Spotify</span>
              </h1>

              <p className="mt-[clamp(14px,2.6vh,28px)] mb-0 max-w-[560px] text-[clamp(15px,min(1.6vw,2.2vh),19px)] leading-relaxed text-pretty text-[rgba(215,230,229,0.82)]">
                El plus que se merecen tus canciones para destacar.
                <br />
                Trabajos presenciales o a distancia.
              </p>

              <div className="mt-[clamp(18px,3.4vh,36px)] flex flex-wrap items-center gap-3">
                <a
                  href={whatsappLink("trabajar-juntos")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-2xl px-[30px] py-4 text-center text-[15px] font-semibold sm:w-auto"
                  style={{
                    background: "linear-gradient(145deg,#EBC27A,#C99A50)",
                    color: "#1C2329",
                    boxShadow:
                      "8px 8px 22px rgba(10,14,17,0.6), -5px -5px 14px rgba(226,180,103,0.12)",
                  }}
                >
                  Agendar sesión
                </a>
                <a
                  href={whatsappLink("trabajar-a-distancia")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-2xl px-7 py-4 text-center text-[15px] font-semibold text-ink sm:w-auto"
                  style={{
                    background: "linear-gradient(145deg,#2C3A43,#1E272D)",
                    boxShadow:
                      "8px 8px 22px rgba(10,14,17,0.55), -5px -5px 14px rgba(108,170,183,0.06)",
                  }}
                >
                  Trabajar a distancia
                </a>
              </div>

              <a
                href="#servicios"
                className="absolute bottom-[clamp(24px,5vh,44px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-cool-hi uppercase"
              >
                Servicios
                <span className="joma-scroll-cue block h-8 w-[2px] rounded-[2px] bg-[linear-gradient(180deg,#6CAAB7,transparent)]" aria-hidden="true" />
              </a>
            </section>

            <ServiciosPanels />
            <PluginsDestacado />
          </div>

          {/* Mis trabajos — calcado de JOMA Estudio.dc.html: Spotify a la
              izquierda, Instagram a la derecha. Fondo: foto real del estudio
              (sources/1666862211821.png), estática, sin animación. */}
          <section className="relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/images/estudio-mis-trabajos.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            />
            {/* Oscurecimiento: el texto nunca va directo sobre la foto. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(28,35,41,0.88) 0%, rgba(28,35,41,0.94) 100%)",
              }}
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-[1400px] px-[clamp(20px,5vw,80px)] pt-[clamp(80px,12vh,150px)] pb-[clamp(70px,10vh,120px)]">
              <div className="mb-[clamp(34px,5vh,60px)] flex flex-wrap items-baseline gap-5">
                <h2 className="m-0 font-display text-[clamp(32px,5vw,68px)] leading-none tracking-[-0.035em] text-ink">
                  Mis trabajos
                </h2>
                <span className="font-mono text-[11px] tracking-[0.2em] text-cool-hi uppercase">
                  Spotify
                </span>
              </div>

              {/* Perfiles + producciones. Ocupa todo el ancho: la
                  tarjeta de Instagram/Contenido se retiró (ver
                  wiki/sitio/sitio-estructura.md para reincorporarla). */}
              <div
                className="rounded-[28px] px-[clamp(20px,2.4vw,32px)] py-[34px]"
                style={{
                  background: "linear-gradient(145deg,#2C3A43,#1E272D)",
                  boxShadow:
                    "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
                }}
              >
                <h3 className="mt-0 mb-[18px] font-display text-[clamp(20px,2.2vw,26px)] tracking-[-0.025em] text-ink">
                  Mis perfiles
                </h3>
                <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
                  {PERFILES.map((id) => (
                    <SpotifyEmbed key={id} id={id} tipo="artist" alto={152} precargar />
                  ))}
                </div>

                <div className="mt-[clamp(26px,4vh,38px)] mb-[18px] flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="m-0 font-display text-[clamp(20px,2.2vw,26px)] tracking-[-0.025em] text-ink">
                    Producciones
                  </h3>
                  <span className="font-mono text-[10.5px] tracking-[0.18em] text-cool-hi uppercase">
                    Spotify
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
                  {PRODUCCIONES.map((t) => (
                    <SpotifyEmbed key={t.id} id={t.id} tipo={t.tipo} />
                  ))}
                </div>

                <a
                  href={CONTACTO.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-2xl px-[22px] py-[13px] text-[13.5px] font-semibold text-ink"
                  style={{
                    background: "linear-gradient(145deg,#33434C,#232E35)",
                    boxShadow:
                      "5px 5px 14px rgba(10,14,17,0.5), -4px -4px 11px rgba(108,170,183,0.06)",
                  }}
                >
                  Escuchar en Spotify
                </a>
              </div>
            </div>
          </section>

          <CtaFinal />
        </>
      )}
    </HomeLoadingGate>
  );
}
