import Image from "next/image";
import CtaFinal from "@/components/cta-final";

export const metadata = {
  title: "Sobre JOMA",
  description:
    "+6 años produciendo música urbana. Especializado en producción vocal y beatmaking, con estudio en Buenos Aires y trabajo a distancia con artistas de cualquier parte del mundo.",
  alternates: { canonical: "/sobre-joma" },
};

/* TODO (cliente): decidir si firma como "Danel Valiente" o solo como marca
   "JOMA" — el nombre real solo aparece en la URL del LinkedIn, nunca en el
   cuerpo del material. Es decisión de identidad, no se asume: acá va solo
   "JOMA". Ver wiki/negocio/joma-formacion.md. */

const TRAYECTORIA = [
  {
    anios: "2019–2021",
    donde: "COLLEGIUM",
    que: "Profesorado en Música — teoría y armonía.",
  },
  {
    anios: "2022",
    donde: "MAD Escuela",
    que: "Producción Musical & Audio — grabación y procesamiento vocal.",
  },
  {
    anios: "2015–hoy",
    donde: "Autodidacta",
    que: "Producción de música urbana, beatmaking, mezcla y mastering.",
  },
];

export default function SobreJomaPage() {
  return (
    <>
      {/* Hero — foto recortada (public/images/sobre-mi-hero.webp, ratio
          1672×941, generada desde sources/NUEVOS ACTIVOS/hero 4k sobre mi.png
          — 2026-09-17, mismo grado de color más contrastado).

          Desktop: contenedor con aspect-ratio fijo y texto encima. `fill` +
          `min-h-vh` dependía del alto real de viewport y daba resultados
          distintos entre localhost y el deploy (bug reportado 2026-09-06) —
          con una ventana más alta que ancha, "cover" escala por alto y el
          sujeto queda chico en una esquina. El aspect-ratio es determinístico.

          Mobile: el mismo ratio deja una franja de ~220px donde el título no
          entra y taparía la cara, así que la foto toma alto propio (68svh, con
          el sujeto a la derecha visible) y el texto va debajo, no encima.

          quality={90}: es la única foto del sitio con el cliente en primer
          plano donde la compresión se nota (2026-09-16). Next recomprime todo
          <Image> a q=75 salvo que el valor esté en next.config.ts
          (images.qualities) — sin eso, pedir más calidad da 400. */}
      {/* max-w-[1672px] en el propio <section>, no solo en la foto: la fuente
          mide 1672px de ancho, su techo real. Sin este límite, en un monitor
          más ancho "cover" agranda la imagen para cubrir todo el viewport y
          se nota la pérdida de nitidez (reportado 2026-09-17). El aspect-ratio
          sigue fijando el alto en desktop; lo que cambia es que el <section>
          entero deja de estirarse a 100vw — arriba de 1672px quedan franjas
          del fondo de la página a los costados en vez de estirar la foto. */}
      <section className="relative mx-auto w-full max-w-[1672px] overflow-hidden lg:aspect-[1672/941]">
        <div className="relative h-[68svh] min-h-[340px] w-full lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
          <Image
            src="/images/sobre-mi-hero.webp"
            alt="JOMA en el estudio"
            fill
            sizes="(min-width: 1672px) 1672px, 100vw"
            priority
            quality={90}
            className="object-cover object-[72%_center] lg:object-center"
          />
          {/* El degradé de mobile es propio (no el mismo que desktop): con
              68svh la foto es mucho más baja en términos absolutos que el
              aspect-ratio de escritorio, y el degradé viejo llegaba al negro
              sólido a mitad de foto — se veía un corte duro seguido de un
              bloque de espacio muerto antes del texto (bug reportado en el
              deploy, 2026-09-16). Este funde recién en el último tramo. */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,35,41,0.25) 0%, rgba(28,35,41,0) 15%, rgba(28,35,41,0) 70%, #1C2329 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,35,41,0.35) 0%, rgba(28,35,41,0) 20%, rgba(28,35,41,0) 55%, rgba(28,35,41,0.92) 88%, #1C2329 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* En lg el bloque se superpone a la foto, centrado y corrido hacia
            arriba con pb en % del propio hero (no en vh) para alinear con la
            cara del sujeto en cualquier viewport. En mobile el pt es chico:
            el degradé de arriba ya funde con #1C2329 justo antes de este
            bloque, no hace falta separación extra. */}
        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-[clamp(20px,5vw,80px)] pt-3 pb-[clamp(36px,6vh,64px)] text-left lg:absolute lg:inset-0 lg:justify-center lg:pt-0 lg:pb-[18%]">
          <h1 className="mt-0 mb-0 max-w-[14ch] font-display text-[clamp(34px,6vw,84px)] leading-[0.95] tracking-[-0.035em] text-balance text-ink">
            +6 años produciendo música urbana.
          </h1>
          <p className="mt-6 mb-0 max-w-[560px] text-[clamp(15px,1.8vw,19px)] leading-relaxed text-pretty text-[rgba(215,230,229,0.78)]">
            Especializado en producción vocal y beatmaking.
            <br />
            Cuento con estudio para sesiones presenciales y trabajo a
            distancia con artistas de cualquier parte del mundo.
          </p>
        </div>
      </section>

      {/* Formación — compacta, a la derecha; foto de JOMA (la misma que antes
          iba en el hero) de fondo a la izquierda, sin deformarse. */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-[clamp(20px,5vw,80px)] py-[clamp(56px,9vh,100px)] lg:grid-cols-[1fr_1fr]">
          <div
            className="relative order-2 mx-auto block aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[28px] lg:order-1 lg:max-w-none"
            style={{
              boxShadow:
                "20px 20px 48px rgba(10,14,17,0.55), -12px -12px 30px rgba(108,170,183,0.05)",
            }}
          >
            <Image
              src="/images/joma-sobre-mi.webp"
              alt="JOMA en el estudio"
              fill
              quality={90}
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p
              className="m-0 mb-8 font-serif text-[15px] leading-relaxed text-pretty text-[rgba(215,230,229,0.82)]"
              style={{
                background: "linear-gradient(145deg,#2C3A43,#1E272D)",
                boxShadow:
                  "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
                borderRadius: 20,
                padding: "clamp(20px,2.6vw,28px)",
              }}
            >
              Comencé mi formación de forma autodidacta porque me apasiona la
              música, y luego mejoré mis habilidades a nivel profesional
              estudiando en las mejores instituciones del país. Ese enfoque de
              pasión y profesionalismo es lo que aporto en cada nuevo
              proyecto. No se trata solo de la formación académica en teoría y
              armonía: mi mayor logro es la práctica sostenida desde 2015
              ayudando a los artistas a llevar sus proyectos a una versión
              mejorada, porque{" "}
              <span className="text-accent">
                «si no se intenta, no se llega».
              </span>
            </p>

            <div className="flex flex-col gap-2">
              {TRAYECTORIA.map((t) => (
                <div
                  key={t.donde}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-2xl px-4 py-3"
                  style={{
                    background: "rgba(40,54,62,0.5)",
                    boxShadow: "inset 4px 4px 10px rgba(10,14,17,0.4)",
                  }}
                >
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-accent">
                    {t.anios}
                  </span>
                  <span className="font-display text-[14.5px] tracking-[-0.01em] text-ink">
                    {t.donde}
                  </span>
                  <span className="w-full text-[13px] leading-snug text-[rgba(215,230,229,0.68)]">
                    {t.que}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
