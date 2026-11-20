import PageHero from "@/components/page-hero";
import FaqList from "@/components/faq-list";
import CtaFinal from "@/components/cta-final";
import { FAQ } from "@/lib/site";

export const metadata = {
  title: "Preguntas frecuentes",
  description:
    "Modalidad de trabajo, qué necesitás para empezar, tiempos, revisiones, derechos y créditos.",
  alternates: { canonical: "/faq" },
};

/* schema.org/FAQPage — es contenido de FAQ real y bien formado; marcarlo
   mejora cómo aparece en buscadores (wiki/sitio/faq.md). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.flatMap((g) =>
    g.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        titulo="Preguntas frecuentes"
        bajada="Lo que más me preguntan antes de arrancar un proyecto."
      />
      <section className="mx-auto max-w-[960px] px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        <FaqList />
      </section>
      <CtaFinal />
    </>
  );
}
