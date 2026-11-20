import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaFinal from "@/components/cta-final";
import { SERVICIOS, SITE_URL, TITULAR, type MotivoWhatsapp } from "@/lib/site";

/* El slug de cada servicio es también su motivo de WhatsApp — mismo nombre,
 * un solo lugar para mantenerlos sincronizados (ver lib/site.ts). */
function motivoDeServicio(slug: string): MotivoWhatsapp {
  return slug as MotivoWhatsapp;
}

/* Foto de referencia elegida por el cliente para el hero de cada servicio
 * (sources/Hero section *.png). */
const HERO_IMG: Record<string, string> = {
  "produccion-musical-completa": "/images/hero-produccion-musical-completa.webp",
  "grabacion-de-voces": "/images/hero-grabacion-de-voces.webp",
  "produccion-de-beat": "/images/hero-produccion-de-beat.webp",
  "mezcla-y-mastering": "/images/hero-mezcla-y-mastering.webp",
};

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/servicios/[slug]">) {
  const { slug } = await props.params;
  const servicio = SERVICIOS.find((s) => s.slug === slug);
  if (!servicio) return {};
  return {
    title: servicio.nombre,
    description: servicio.resumen,
    alternates: { canonical: `/servicios/${servicio.slug}` },
    openGraph: {
      title: `${servicio.nombre} · JOMA Estudio`,
      description: servicio.resumen,
      url: `/servicios/${servicio.slug}`,
      images: HERO_IMG[servicio.slug]
        ? [{ url: HERO_IMG[servicio.slug], width: 1672, height: 941 }]
        : undefined,
    },
  };
}

/**
 * Página de detalle de servicio.
 *
 * Layout calcado de JOMA Seccion.dc.html (el mockup real de Claude Design),
 * no inventado: hero de video en loop (76vh, ver wiki/brand/video-assets.md),
 * 3 bloques de texto fijos en columna única, CTA de vidrio, y FAQ propia del
 * servicio (3 preguntas) — no las 9 generales del sitio.
 */
export default async function ServicioPage(props: PageProps<"/servicios/[slug]">) {
  const { slug } = await props.params;
  const servicio = SERVICIOS.find((s) => s.slug === slug);
  if (!servicio) notFound();

  const otros = SERVICIOS.filter((s) => s.slug !== servicio.slug);

  /* Service + BreadcrumbList propios de esta página, además del
     LocalBusiness/MusicGroup global del layout — le da a un motor de
     IA/buscador la relación jerárquica (Home > Servicios > este) y la oferta
     puntual con su propio precio-modalidad, sin repetir todo lo demás. */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: servicio.nombre,
      description: servicio.resumen,
      areaServed: "Argentina",
      availableChannel: {
        "@type": "ServiceChannel",
        availableLanguage: "es-AR",
      },
      provider: {
        "@type": "Person",
        name: TITULAR.nombre,
      },
      url: `${SITE_URL}/servicios/${servicio.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: servicio.nombre, item: `${SITE_URL}/servicios/${servicio.slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero — foto de referencia como fondo real, detrás del título (no un
          bloque separado arriba). Degradé arriba para integrarla bajo el
          header flotante, degradé abajo para fundirla con la sección
          siguiente. object-position sube el encuadre para no perder la
          mitad superior de la foto. */}
      <section
        className="relative flex min-h-[72vh] items-end overflow-hidden"
        aria-label={`Servicio: ${servicio.nombre}`}
      >
        {HERO_IMG[servicio.slug] && (
          <Image
            src={HERO_IMG[servicio.slug]}
            quality={90}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1C2329 0%, rgba(28,35,41,0.25) 20%, rgba(28,35,41,0.35) 55%, rgba(28,35,41,0.88) 88%, #1C2329 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-[clamp(20px,5vw,80px)] pt-[clamp(120px,18vh,200px)] pb-[clamp(48px,7vh,88px)]">
          <h1 className="mt-0 mb-5 max-w-[900px] font-display text-[clamp(34px,6vw,84px)] leading-[0.96] tracking-[-0.035em] text-ink">
            {servicio.nombre}
          </h1>
          <p className="m-0 max-w-[640px] text-[clamp(15px,1.4vw,18px)] leading-relaxed text-pretty text-[rgba(215,230,229,0.78)]">
            {servicio.resumen}
          </p>
        </div>
      </section>

      {/* Tres bloques de texto en columna única, sin tarjetas ni fondo —
          calcado del mockup. */}
      <section className="mx-auto flex max-w-[900px] flex-col gap-[clamp(30px,4.5vh,54px)] px-[clamp(20px,5vw,80px)] pt-[clamp(56px,9vh,110px)]">
        <div>
          <h2 className="mt-0 mb-3 font-display text-[clamp(22px,2.6vw,32px)] tracking-[-0.025em] text-ink">
            Qué incluye
          </h2>
          <p className="m-0 font-serif text-[16.5px] leading-[1.7] text-pretty text-[rgba(215,230,229,0.76)]">
            {servicio.incluye}
          </p>
        </div>
        <div>
          <h2 className="mt-0 mb-3 font-display text-[clamp(22px,2.6vw,32px)] tracking-[-0.025em] text-ink">
            Plazos y revisiones
          </h2>
          <p className="m-0 font-serif text-[16.5px] leading-[1.7] text-pretty text-[rgba(215,230,229,0.76)]">
            {servicio.plazos}
          </p>
        </div>
        <div>
          <h2 className="mt-0 mb-3 font-display text-[clamp(22px,2.6vw,32px)] tracking-[-0.025em] text-ink">
            Cómo preparar el material
          </h2>
          <p className="m-0 font-serif text-[16.5px] leading-[1.7] text-pretty text-[rgba(215,230,229,0.76)]">
            {servicio.preparar}
          </p>
        </div>
      </section>

      {/* FAQ propia de este servicio — 3 preguntas, no las 9 generales. */}
      <section className="mx-auto max-w-[900px] px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        <h2 className="mt-0 mb-[26px] font-display text-[clamp(22px,2.8vw,34px)] tracking-[-0.025em] text-ink">
          FAQ de este servicio
        </h2>
        <div className="flex flex-col gap-3">
          {servicio.faq.map((item) => (
            <details
              key={item.q}
              className="group overflow-hidden rounded-[20px]"
              style={{
                background: "linear-gradient(145deg,#2C3A43,#1E272D)",
                boxShadow:
                  "12px 12px 30px rgba(10,14,17,0.55), -8px -8px 20px rgba(108,170,183,0.05)",
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[18px] px-6 py-5 text-[16.5px] font-semibold text-ink">
                {item.q}
                <span className="text-xl text-accent transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="m-0 px-6 pb-[22px] font-serif text-[15px] leading-[1.65] text-[rgba(215,230,229,0.72)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        <h2 className="mb-6 font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
          Otros servicios
        </h2>
        <div className="flex flex-wrap gap-3">
          {otros.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="rounded-[14px] px-5 py-3 text-[13.5px] font-semibold text-ink"
              style={{
                background: "linear-gradient(145deg,#33434C,#232E35)",
                boxShadow: "5px 5px 14px rgba(10,14,17,0.5)",
              }}
            >
              {s.nombre}
            </Link>
          ))}
        </div>
      </section>

      <CtaFinal motivo={motivoDeServicio(servicio.slug)} />
    </>
  );
}
