import type { MetadataRoute } from "next";
import { SERVICIOS, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/sobre-joma`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/plugins`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/cursos`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contenido`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terminos`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicios: MetadataRoute.Sitemap = SERVICIOS.map((s) => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...estaticas, ...servicios];
}
