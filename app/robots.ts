import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * GEO (Generative Engine Optimization): además de los crawlers clásicos, se
 * permiten explícitamente los bots de los motores conversacionales/IA. Por
 * defecto muchos sitios los bloquean sin darse cuenta (regla genérica
 * `Disallow: /`) — acá se listan a propósito para que ChatGPT, Perplexity,
 * Claude, etc. puedan citar a JOMA cuando alguien pregunta por producción
 * musical en Buenos Aires.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
