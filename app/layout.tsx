import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollProgressBar from "@/components/scroll-progress-bar";
import ResponsivePreviewToggle from "@/components/responsive-preview-toggle";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

/* next/font auto-hospeda las tipografías: evita el salto de texto y el
   pedido a Google en runtime. */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

/* Subjectivity — display de títulos (sources/Subjectivity.zip, OFL).
   Reemplaza a Archivo Black: mismo rol (H1/H2/números grandes), trazo más
   grueso y con más carácter. */
const subjectivity = localFont({
  src: [
    { path: "../public/fonts/subjectivity/Subjectivity-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/subjectivity/Subjectivity-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/subjectivity/Subjectivity-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-subjectivity",
  display: "swap",
});

/* Subjectivity Serif — prosa editorial larga (FAQ, formación, "qué incluye").
   Misma familia que el display: combinan por diseño, no por casualidad. */
const subjectivitySerif = localFont({
  src: [
    { path: "../public/fonts/subjectivity-serif/SubjectivitySerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/subjectivity-serif/SubjectivitySerif-Regular-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/subjectivity-serif/SubjectivitySerif-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/subjectivity-serif/SubjectivitySerif-Medium-Italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-subjectivity-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JOMA Estudio — Producción musical en Buenos Aires",
    template: "%s · JOMA Estudio",
  },
  description:
    "Producción musical completa, mezcla y mastering, y beats. Presencial en Buenos Aires y a distancia. Entrega en 2 semanas, 2 revisiones.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "JOMA Estudio",
    description:
      "Producción musical completa, mezcla y mastering, y beats. Presencial en Buenos Aires y a distancia.",
    url: SITE_URL,
    siteName: "JOMA Estudio",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "JOMA Estudio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JOMA Estudio",
    description:
      "Producción musical completa, mezcla y mastering, y beats. Presencial en Buenos Aires y a distancia.",
    images: ["/images/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = (
    <>
      <ScrollProgressBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );

  return (
    <html lang="es-AR">
      <body
        className={`${archivo.variable} ${subjectivity.variable} ${subjectivitySerif.variable} ${jetbrains.variable}`}
      >
        <JsonLd />
        {process.env.NODE_ENV === "development" ? (
          <ResponsivePreviewToggle>{site}</ResponsivePreviewToggle>
        ) : (
          site
        )}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
