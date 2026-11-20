import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JOMA Estudio — Producción musical en Buenos Aires",
    short_name: "JOMA Estudio",
    description:
      "Producción musical completa, mezcla y mastering, y beats. Presencial en Buenos Aires y a distancia.",
    start_url: "/",
    display: "standalone",
    background_color: "#1c2329",
    theme_color: "#1c2329",
    lang: "es-AR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
