import PageHero from "@/components/page-hero";
import { CONDICIONES, CONTACTO, PROCESO, TITULAR, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de contratación de los servicios de JOMA Estudio: proceso, plazos, revisiones y derechos sobre el material entregado.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

const P = "m-0 font-serif text-[16.5px] leading-[1.7] text-pretty text-[rgba(215,230,229,0.78)]";
const H2 = "mt-0 mb-3 font-display text-[clamp(20px,2.4vw,28px)] tracking-[-0.02em] text-ink";

export default function TerminosPage() {
  return (
    <>
      <PageHero
        titulo="Términos y Condiciones"
        bajada="Cómo se trabaja, qué incluye cada servicio y qué pasa con lo que entregás y lo que recibís."
      />
      <section className="mx-auto flex max-w-[860px] flex-col gap-10 px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        <div>
          <h2 className={H2}>Quién presta el servicio</h2>
          <p className={P}>
            Los servicios descriptos en este sitio son prestados por{" "}
            {TITULAR.nombre}, bajo el nombre comercial {TITULAR.marca}, en{" "}
            {TITULAR.ciudad}. Al contratar un servicio a través de este sitio
            o de WhatsApp, aceptás estas condiciones.
          </p>
        </div>

        <div>
          <h2 className={H2}>Cómo se coordina el trabajo</h2>
          <p className={P}>
            El proceso tiene cinco pasos: te escribís para contar el
            proyecto, se define juntos qué servicio corresponde y el
            presupuesto, se confirma el pago y el turno o inicio del
            trabajo, se produce según el servicio contratado, y se entrega
            una primera versión para revisar.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {PROCESO.map((p) => (
              <div
                key={p.numero}
                className="rounded-2xl px-4 py-3"
                style={{
                  background: "rgba(40,54,62,0.5)",
                  boxShadow: "inset 4px 4px 10px rgba(10,14,17,0.4)",
                }}
              >
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-accent">
                  {p.numero}
                </span>{" "}
                <span className="font-display text-[14.5px] tracking-[-0.01em] text-ink">
                  {p.titulo}
                </span>
                <p className="mt-1 mb-0 text-[13px] leading-snug text-[rgba(215,230,229,0.68)]">
                  {p.texto}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={H2}>Plazos y revisiones</h2>
          <p className={P}>
            Estas condiciones son transversales a todos los servicios, salvo
            que se acuerde algo distinto por escrito antes de empezar:
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CONDICIONES.map((c) => (
              <div
                key={c.valor}
                className="rounded-2xl px-4 py-4"
                style={{
                  background: "rgba(40,54,62,0.5)",
                  boxShadow: "inset 4px 4px 10px rgba(10,14,17,0.4)",
                }}
              >
                <span className="font-display text-[20px] tracking-[-0.02em] text-accent">
                  {c.valor}
                </span>
                <p className="mt-1 mb-0 text-[13px] leading-snug text-[rgba(215,230,229,0.68)]">
                  {c.detalle}
                </p>
              </div>
            ))}
          </div>
          <p className={`${P} mt-5`}>
            El plazo de entrega corre desde que se confirma el pago y se
            recibe todo el material necesario para empezar — no antes. Un
            pedido de cambios que exceda las dos revisiones incluidas se
            coordina y cotiza aparte.
          </p>
        </div>

        <div>
          <h2 className={H2}>Pagos</h2>
          <p className={P}>
            El presupuesto se define caso por caso según el servicio y el
            alcance del proyecto, y se coordina directamente por WhatsApp. El
            trabajo empieza una vez confirmado el pago acordado.
          </p>
        </div>

        <div>
          <h2 className={H2}>Derechos sobre el material</h2>
          <p className={P}>
            El material que vos aportás (letras, voces, referencias) sigue
            siendo tuyo. La producción musical, beat, mezcla o master
            entregado como resultado del servicio contratado queda para tu
            uso conforme lo acordado en cada proyecto — créditos, autoría y
            cualquier condición particular se definen antes de empezar el
            trabajo, no después de entregado.
          </p>
        </div>

        <div>
          <h2 className={H2}>Cancelaciones</h2>
          <p className={P}>
            Si necesitás cancelar o reprogramar una sesión de grabación
            presencial, avisá con la mayor anticipación posible por
            WhatsApp para reorganizar la agenda del estudio.
          </p>
        </div>

        <div>
          <h2 className={H2}>Contacto</h2>
          <p className={P}>
            Cualquier consulta sobre estas condiciones se resuelve por
            WhatsApp al{" "}
            <a href={CONTACTO.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">
              {CONTACTO.whatsappNumeroLegible}
            </a>
            .
          </p>
        </div>

        <a
          href={whatsappLink("trabajar-juntos")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block w-fit rounded-[15px] px-6 py-4 text-center text-[15px] font-semibold"
          style={{
            background: "linear-gradient(145deg,#EBC27A,#C99A50)",
            color: "#1C2329",
          }}
        >
          Consultar por WhatsApp
        </a>
      </section>
    </>
  );
}
