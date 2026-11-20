import PageHero from "@/components/page-hero";
import { CONTACTO, PROCESO, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Contacto",
  description:
    "Escribime por WhatsApp y coordinamos. Estudio en Buenos Aires, y trabajo a distancia.",
  alternates: { canonical: "/contacto" },
};

/* TODO (cliente): destino del formulario de contacto. Hasta que se defina
   (casilla propia, o todo a WhatsApp) NO se publica un formulario: uno que no
   llega a ningún lado pierde consultas reales. Si se confirma que guarda
   datos, entra Supabase con RLS activo + validación Zod.
   Ver wiki/sitio/contacto-links.md, carril A1. */

const CANALES = [
  {
    label: "WhatsApp",
    detalle: "La vía más rápida. Contame tu proyecto y coordinamos.",
    href: whatsappLink("trabajar-juntos"),
    primary: true,
  },
  {
    label: "Instagram",
    detalle: "@joma.estudio",
    href: CONTACTO.instagram,
  },
  {
    label: "YouTube",
    detalle: "@joma.estudio",
    href: CONTACTO.youtube,
  },
  {
    label: "Spotify",
    detalle: "Escuchá los trabajos publicados",
    href: CONTACTO.spotify,
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHero
        titulo="Hablemos de tu proyecto"
        bajada="Contame en qué etapa estás y qué querés lograr. Te respondo y armamos la propuesta."
      />

      <section className="mx-auto max-w-[1100px] px-[clamp(20px,5vw,80px)] pb-[clamp(70px,10vh,120px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[clamp(20px,2.4vw,32px)]">
          {CANALES.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-[24px] p-8 transition-transform hover:-translate-y-1"
              style={{
                background: c.primary
                  ? "linear-gradient(145deg,#35464f,#212b32)"
                  : "linear-gradient(145deg,#2C3A43,#1E272D)",
                boxShadow:
                  "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
              }}
            >
              <span className="font-display text-[clamp(20px,2.2vw,26px)] tracking-[-0.02em] text-ink">
                {c.label}
              </span>
              <span className="mt-2 text-[15px] leading-relaxed text-[rgba(215,230,229,0.72)]">
                {c.detalle}
              </span>
              {c.primary && (
                <span className="mt-5 font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                  Canal principal →
                </span>
              )}
            </a>
          ))}
        </div>

        <div
          className="mt-[clamp(32px,5vh,56px)] rounded-[24px] p-[clamp(24px,3vw,40px)]"
          style={{
            background: "rgba(40,54,62,0.5)",
            boxShadow: "inset 4px 4px 10px rgba(10,14,17,0.4)",
          }}
        >
          <h2 className="mt-0 mb-4 font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
            Qué pasa después
          </h2>
          <ol className="m-0 flex list-none flex-col gap-3 p-0">
            {PROCESO.slice(0, 3).map((p) => (
              <li key={p.numero} className="flex gap-4 text-[15px] text-ink">
                <span className="font-mono text-[11px] text-accent">
                  {p.numero}
                </span>
                <span>
                  <strong className="font-semibold">{p.titulo}.</strong>{" "}
                  <span className="text-[rgba(215,230,229,0.72)]">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-8 mb-0 text-center font-mono text-[10.5px] tracking-[0.16em] text-[rgba(215,230,229,0.5)] uppercase">
          {CONTACTO.ciudad} · presencial y a distancia
        </p>
      </section>
    </>
  );
}
