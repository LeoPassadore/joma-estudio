import PageHero from "@/components/page-hero";
import CtaFinal from "@/components/cta-final";
import { CURSOS } from "@/lib/site";

export const metadata = {
  title: "Cursos",
  description:
    "Curso inicial de FL Studio, disponible, y curso avanzado de producción musical, en desarrollo. Consultá disponibilidad por WhatsApp.",
  alternates: { canonical: "/cursos" },
};

export default function CursosPage() {
  return (
    <>
      <PageHero
        titulo="Cursos de producción musical"
        bajada="Si te interesa aprender a grabar, editar voces, producir tus propios beats y mejorar tus mix & master… entonces esta opción es la ideal para vos. Cuento con dos formaciones que te van a guiar a través de todo el proceso para que puedas terminar tu primer proyecto desde cero hasta tener el archivo final para subirlo a las plataformas."
      />

      <section className="mx-auto max-w-[1400px] px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        {/* min(320px,100%) y no 320px a secas: en pantallas de 320px el
            mínimo fijo desbordaba el ancho disponible. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-[clamp(24px,3vw,44px)]">
          {CURSOS.map((curso) => (
            <div
              key={curso.slug}
              className="flex flex-col rounded-[28px] p-[clamp(24px,3vw,40px)]"
              style={{
                background: "linear-gradient(145deg,#2C3A43,#1E272D)",
                boxShadow:
                  "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
              }}
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(226,180,103,0.3)] px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                {curso.estado}
              </span>
              <h2 className="mt-4 mb-3 font-display text-[clamp(22px,2.6vw,32px)] leading-[1.05] tracking-[-0.025em] text-ink">
                {curso.nombre}
              </h2>
              <p className="m-0 text-[15px] leading-relaxed text-[rgba(215,230,229,0.72)]">
                {curso.resumen}
              </p>

              {curso.contenidos.length > 0 && (
                <>
                  <h3 className="mt-7 mb-4 font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
                    Contenidos previstos
                  </h3>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {curso.contenidos.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-3 text-sm text-[rgba(215,230,229,0.8)]"
                      >
                        <span
                          className="mt-[7px] block h-[5px] w-[5px] flex-none rounded-full bg-cool-hi"
                          aria-hidden="true"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <CtaFinal
        titulo="Aprendé cómo llevar tu idea de 0 a 100"
        texto="Enviame un WhatsApp para consultar la disponibilidad de mis formaciones."
        boton="Consultar disponibilidad"
      />
    </>
  );
}
