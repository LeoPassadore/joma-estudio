import { whatsappLink, type MotivoWhatsapp } from "@/lib/site";

export default function CtaFinal({
  motivo = "trabajar-juntos",
  titulo = (
    <>
      <span className="text-accent">Si no se intenta, no se llega.</span>
      <br />
      Comencemos hoy mismo.
    </>
  ),
  texto = "Enviame un WhatsApp y le damos forma a tu proyecto.",
  boton = "Agendar sesión",
}: {
  motivo?: MotivoWhatsapp;
  /** Override de copy — solo /cursos lo usa hoy, el resto de las páginas
   * comparte el mensaje genérico de "trabajar juntos". */
  titulo?: React.ReactNode;
  texto?: string;
  boton?: string;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
      <div
        className="flex flex-wrap items-center justify-between gap-8 rounded-[32px] p-[clamp(24px,5vw,72px)]"
        style={{
          background: "linear-gradient(145deg,#2C3A43,#1B2429)",
          boxShadow:
            "20px 20px 48px rgba(10,14,17,0.6), -12px -12px 30px rgba(108,170,183,0.05)",
        }}
      >
        <div className="max-w-[640px] flex-1 [container-type:inline-size]">
          {/* Cada frase del título entra en UNA sola línea. El tamaño no
              puede salir de un clamp sobre el viewport: a ~768px el botón
              pasa a compartir la fila y el ancho disponible se desploma justo
              cuando la fuente crece. Con `cqi` se calcula sobre el ancho real
              de este bloque, que ya contempla ese salto.

              Sin `nowrap` a propósito: por debajo de ~360px la frase más
              larga no entra en una línea a ningún tamaño legible, y ahí es
              preferible que se parta antes que desbordar la tarjeta. */}
          <h2 className="mt-0 mb-[14px] font-display text-[clamp(17px,6.2cqi,40px)] leading-[1.06] tracking-[-0.03em] text-balance text-ink">
            {titulo}
          </h2>
          <p className="m-0 text-base leading-relaxed text-[rgba(215,230,229,0.7)]">
            {texto}
          </p>
        </div>
        <a
          href={whatsappLink(motivo)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-[18px] px-[34px] py-[18px] text-center text-base font-semibold sm:w-auto"
          style={{
            background: "linear-gradient(145deg,#EBC27A,#C99A50)",
            color: "#1C2329",
            boxShadow:
              "8px 8px 22px rgba(10,14,17,0.55), -5px -5px 14px rgba(226,180,103,0.14)",
          }}
        >
          {boton}
        </a>
      </div>
    </section>
  );
}
