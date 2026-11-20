import PageHero from "@/components/page-hero";
import { CONTACTO, TITULAR, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Política de Privacidad",
  description:
    "Qué datos personales trata JOMA Estudio, con qué fin y cómo ejercer tus derechos de acceso, rectificación y supresión.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

/* Ley 25.326 (Protección de Datos Personales, Argentina) + disposiciones de
 * la AAIP. Alcance real del sitio, no genérico: no hay formulario propio, no
 * hay cuenta de usuario, no hay analytics ni pixels instalados hoy — el
 * único dato que se trata es el que el visitante manda por WhatsApp al
 * hacer clic en un botón de contacto (ver TODO en app/contacto/page.tsx:
 * no hay backend propio hasta que el cliente decida uno). Si se agrega
 * analytics o un formulario con backend, esta página vuelve a revisarse. */
const P = "m-0 font-serif text-[16.5px] leading-[1.7] text-pretty text-[rgba(215,230,229,0.78)]";
const H2 = "mt-0 mb-3 font-display text-[clamp(20px,2.4vw,28px)] tracking-[-0.02em] text-ink";

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        titulo="Política de Privacidad"
        bajada="Qué información se trata en este sitio, con qué fin, y cómo pedís que se elimine."
      />
      <section className="mx-auto flex max-w-[860px] flex-col gap-10 px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        <div>
          <h2 className={H2}>Responsable</h2>
          <p className={P}>
            {TITULAR.nombre}, bajo el nombre comercial {TITULAR.marca}, con
            actividad de {TITULAR.actividad.toLowerCase()} en {TITULAR.ciudad}, es
            el responsable del tratamiento de los datos personales que se
            recaban a través de este sitio.
          </p>
        </div>

        <div>
          <h2 className={H2}>Qué datos se tratan</h2>
          <p className={P}>
            Este sitio no tiene formulario de contacto propio ni sistema de
            cuentas de usuario: cada botón de contacto abre WhatsApp con un
            mensaje prellenado. Los únicos datos personales que llegan a{" "}
            {TITULAR.nombre} son los que vos mismo decidís compartir en esa
            conversación de WhatsApp — típicamente nombre, número de
            teléfono y el contenido del mensaje.
          </p>
        </div>

        <div>
          <h2 className={H2}>Con qué finalidad</h2>
          <p className={P}>
            Esos datos se usan exclusivamente para responder tu consulta,
            coordinar sesiones de trabajo y, si contratás un servicio, dar
            seguimiento al proyecto. No se ceden a terceros ni se usan con
            fines publicitarios ajenos a este vínculo.
          </p>
        </div>

        <div>
          <h2 className={H2}>Servicios de terceros embebidos</h2>
          <p className={P}>
            Algunas páginas incluyen reproductores de Spotify. Al hacer clic
            para cargarlos, tu navegador establece una conexión directa con
            Spotify y queda sujeto a su propia política de privacidad — este
            sitio no controla ni recibe esos datos. El reproductor no carga
            automáticamente: solo se activa si elegís reproducir un tema.
          </p>
        </div>

        <div>
          <h2 className={H2}>Cookies</h2>
          <p className={P}>
            Este sitio no instala cookies propias de seguimiento ni
            analytics. Ver el detalle completo en{" "}
            <a href="/cookies" className="underline">
              Política de Cookies
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className={H2}>Tus derechos</h2>
          <p className={P}>
            Como titular de tus datos, tenés derecho de acceso, rectificación
            y supresión, conforme la Ley 25.326. La Agencia de Acceso a la
            Información Pública, órgano de control de esa ley, tiene la
            atribución de atender denuncias y reclamos que interpongan
            quienes resulten afectados en sus derechos por incumplimiento de
            las normas vigentes.
          </p>
        </div>

        <div>
          <h2 className={H2}>Cómo ejercerlos</h2>
          <p className={P}>
            Escribí por WhatsApp al{" "}
            <a href={CONTACTO.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">
              {CONTACTO.whatsappNumeroLegible}
            </a>{" "}
            pidiendo acceder, corregir o eliminar tus datos. Se responde
            dentro de los plazos que establece la normativa vigente.
          </p>
        </div>

        <div>
          <h2 className={H2}>Cambios a esta política</h2>
          <p className={P}>
            Si el sitio incorpora un formulario propio, analytics u otro
            tratamiento de datos que no esté descripto acá, esta página se
            actualiza antes de que ese cambio entre en vigencia. Última
            actualización: septiembre de 2026.
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
