import PageHero from "@/components/page-hero";
import { whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Política de Cookies",
  description:
    "Este sitio no instala cookies propias de seguimiento. Detalle de lo que sí puede llegar a través de servicios embebidos como Spotify.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

/* Honesta con el estado real del sitio, no una plantilla genérica de
 * "usamos cookies para mejorar tu experiencia" sin verificar qué corre
 * realmente. Si se agrega analytics (Vercel Analytics, PostHog, etc.) o un
 * pixel de conversión, esta página se actualiza y ahí sí corresponde un
 * banner de consentimiento — hoy no hace falta porque no hay nada que
 * consentir. */
const P = "m-0 font-serif text-[16.5px] leading-[1.7] text-pretty text-[rgba(215,230,229,0.78)]";
const H2 = "mt-0 mb-3 font-display text-[clamp(20px,2.4vw,28px)] tracking-[-0.02em] text-ink";

export default function CookiesPage() {
  return (
    <>
      <PageHero
        titulo="Política de Cookies"
        bajada="Qué guarda este sitio en tu navegador — y qué no."
      />
      <section className="mx-auto flex max-w-[860px] flex-col gap-10 px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        <div>
          <h2 className={H2}>Este sitio no usa cookies propias</h2>
          <p className={P}>
            JOMA Estudio no instala cookies de seguimiento, analytics ni
            publicidad. No hay sistema de cuentas de usuario ni carrito de
            compra que requiera guardar una sesión.
          </p>
        </div>

        <div>
          <h2 className={H2}>Reproductor de Spotify</h2>
          <p className={P}>
            Algunas páginas incluyen un reproductor de Spotify incrustado.
            No se carga automáticamente al abrir la página: solo se activa
            cuando hacés clic para reproducir un tema. Al activarlo, Spotify
            puede instalar sus propias cookies según su política — este
            sitio no tiene control sobre ellas. Podés revisar la política de
            cookies de Spotify directamente en su sitio.
          </p>
        </div>

        <div>
          <h2 className={H2}>Fuentes tipográficas</h2>
          <p className={P}>
            Las tipografías del sitio están alojadas en el propio servidor
            (no se piden a Google Fonts ni a otro servicio externo en cada
            visita), así que no generan ninguna conexión de terceros ni
            cookie asociada.
          </p>
        </div>

        <div>
          <h2 className={H2}>Si esto cambia</h2>
          <p className={P}>
            Si en el futuro se agrega una herramienta de analytics para
            entender el tráfico del sitio, esta página se actualiza antes de
            ese cambio y, si corresponde, se agrega un aviso para pedir tu
            consentimiento. Última actualización: septiembre de 2026.
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
