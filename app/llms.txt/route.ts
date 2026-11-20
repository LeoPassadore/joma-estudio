import { CONDICIONES, CONTACTO, SERVICIOS, SITE_URL, TITULAR } from "@/lib/site";

/**
 * llms.txt (propuesta llmstxt.org, adoptada por varios motores de IA en
 * 2025-2026): un resumen en Markdown, pensado para que un LLM entienda de
 * qué trata el sitio sin tener que crawlear y parsear cada página HTML.
 * Complementa al JSON-LD (que describe datos estructurados) con contexto en
 * prosa — el formato que mejor entienden los modelos de lenguaje.
 *
 * Ruta programática y no un archivo estático en /public: así el contenido
 * sale de la misma fuente que el resto del sitio (lib/site.ts) y nunca
 * queda desactualizado respecto a los servicios o condiciones reales.
 */
export async function GET() {
  const lines: string[] = [
    `# ${TITULAR.marca}`,
    "",
    `> ${TITULAR.nombre} — ${TITULAR.actividad} en ${TITULAR.ciudad}. Producción musical completa, mezcla y mastering, y beats. Presencial en Buenos Aires y a distancia.`,
    "",
    "## Servicios",
    "",
    ...SERVICIOS.flatMap((s) => [
      `### ${s.nombre}`,
      s.resumen,
      `Modalidad: ${s.modalidad}.`,
      `URL: ${SITE_URL}/servicios/${s.slug}`,
      "",
    ]),
    "## Condiciones",
    "",
    ...CONDICIONES.map((c) => `- ${c.valor}: ${c.detalle}.`),
    "",
    "## Contacto",
    "",
    `Todo el contacto se coordina por WhatsApp: ${CONTACTO.whatsapp}`,
    `Instagram: ${CONTACTO.instagram}`,
    `Spotify (artista, JOMAWAV): ${CONTACTO.spotify}`,
    `Spotify (estudio, Joma.Estudio): ${CONTACTO.spotifyEstudio}`,
    "",
    "## Páginas",
    "",
    `- ${SITE_URL}/ — Home`,
    `- ${SITE_URL}/sobre-joma — Sobre el productor`,
    `- ${SITE_URL}/portfolio — Trabajos publicados`,
    `- ${SITE_URL}/cursos — Cursos de producción`,
    `- ${SITE_URL}/plugins — Plugins y paquetes descargables (Joma Vox)`,
    `- ${SITE_URL}/faq — Preguntas frecuentes`,
    `- ${SITE_URL}/contacto — Contacto`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
