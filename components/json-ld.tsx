import { CONTACTO, SERVICIOS, SITE_URL, TITULAR } from "@/lib/site";

/**
 * JSON-LD global (schema.org), en todas las páginas vía el layout.
 *
 * No es solo SEO clásico: es la pieza central de GEO/AEO (Generative/Answer
 * Engine Optimization) — cuando alguien le pregunta a ChatGPT, Perplexity o
 * al AI Overview de Google "¿quién hace producción musical en Buenos Aires?", el
 * modelo arma la respuesta a partir de datos estructurados verificables, no
 * de prosa suelta. `@type: ["LocalBusiness", "MusicGroup"]` describe mejor a
 * JOMA que "Organization" genérico: es un servicio local con oferta musical.
 *
 * `Person` separado porque el titular (Danel Valiente) y la marca (JOMA
 * Estudio) son entidades distintas que un motor puede necesitar enlazar por
 * separado (autor de contenido vs. negocio que presta el servicio).
 */
export default function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MusicGroup"],
    name: TITULAR.marca,
    url: SITE_URL,
    image: `${SITE_URL}/images/joma-isotipo.webp`,
    description:
      "Producción musical completa, mezcla y mastering, y beats. Presencial en Buenos Aires y a distancia.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    founder: {
      "@type": "Person",
      name: TITULAR.nombre,
    },
    sameAs: [
      CONTACTO.instagram,
      CONTACTO.youtube,
      CONTACTO.linkedin,
      CONTACTO.spotify,
      CONTACTO.spotifyEstudio,
    ],
    makesOffer: SERVICIOS.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.nombre,
        description: s.resumen,
        url: `${SITE_URL}/servicios/${s.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
    />
  );
}
