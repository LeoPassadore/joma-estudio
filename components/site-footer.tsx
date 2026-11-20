import Image from "next/image";
import Link from "next/link";
import { CONTACTO, SERVICIOS, whatsappLink } from "@/lib/site";

const ICON_BASE =
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons";

/* Los iconos se pintan con mask sobre un span: hereda el color del token y
   no depende de un SVG inline por cada red. */
function Social({
  href,
  label,
  icon,
  primary = false,
}: {
  href: string;
  label: string;
  icon: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-[46px] w-[46px] place-items-center rounded-full"
      style={{
        background: primary
          ? "linear-gradient(145deg,#EBC27A,#C99A50)"
          : "linear-gradient(145deg,#33434C,#232E35)",
        boxShadow: primary
          ? "5px 5px 12px rgba(10,14,17,0.55), -4px -4px 10px rgba(226,180,103,0.12)"
          : "5px 5px 12px rgba(10,14,17,0.55), -4px -4px 10px rgba(108,170,183,0.06)",
      }}
    >
      <span
        className="block h-[18px] w-[18px]"
        style={{
          backgroundColor: primary ? "#1C2329" : "#D7E6E5",
          maskImage: `url(${ICON_BASE}/${icon}.svg)`,
          WebkitMaskImage: `url(${ICON_BASE}/${icon}.svg)`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(215,230,229,0.09)] px-[clamp(20px,5vw,80px)] pt-[clamp(44px,7vh,76px)] pb-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] items-start gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span
              className="grid h-[38px] w-[38px] flex-none place-items-center rounded-xl p-[6px]"
              style={{
                background: "linear-gradient(145deg,#35464f,#212b32)",
                boxShadow:
                  "4px 4px 10px rgba(10,14,17,0.6), -3px -3px 8px rgba(108,170,183,0.07)",
              }}
            >
              <Image
                src="/images/joma-isotipo.webp"
                alt=""
                width={320}
                height={225}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-display text-sm text-ink">JOMA Estudio</span>
          </div>
          <p className="m-0 max-w-[300px] text-sm leading-relaxed text-[rgba(215,230,229,0.6)]">
            Productor musical de música urbana. Presencial en Buenos Aires y a
            distancia. Las sesiones se coordinan por WhatsApp.
          </p>
          <div className="flex flex-wrap gap-[10px]">
            <Social href={CONTACTO.instagram} label="Instagram" icon="instagram" />
            <Social href={CONTACTO.youtube} label="YouTube" icon="youtube" />
            <Social href={CONTACTO.linkedin} label="LinkedIn" icon="linkedin" />
            <Social href={whatsappLink("trabajar-juntos")} label="WhatsApp" icon="whatsapp" />
            <Social href={CONTACTO.spotify} label="Spotify" icon="spotify" primary />
          </div>
        </div>

        <div className="flex flex-col gap-0 lg:gap-3">
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
            Servicios
          </span>
          {SERVICIOS.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="inline-flex min-h-[40px] items-center text-[14.5px] text-[rgba(215,230,229,0.75)] hover:text-accent lg:min-h-0"
            >
              {s.nombre}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-0 lg:gap-3">
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
            Info
          </span>
          <Link href="/faq" className="inline-flex min-h-[40px] items-center text-[14.5px] text-[rgba(215,230,229,0.75)] hover:text-accent lg:min-h-0">
            Preguntas frecuentes
          </Link>
          <Link href="/sobre-joma" className="inline-flex min-h-[40px] items-center text-[14.5px] text-[rgba(215,230,229,0.75)] hover:text-accent lg:min-h-0">
            Sobre JOMA
          </Link>
          <Link href="/cursos" className="inline-flex min-h-[40px] items-center text-[14.5px] text-[rgba(215,230,229,0.75)] hover:text-accent lg:min-h-0">
            Cursos
          </Link>
          <Link href="/plugins" className="inline-flex min-h-[40px] items-center text-[14.5px] text-[rgba(215,230,229,0.75)] hover:text-accent lg:min-h-0">
            Plugins
          </Link>
        </div>

        <div className="flex flex-col gap-0 lg:gap-3">
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
            Contacto
          </span>
          <a
            href={whatsappLink("trabajar-juntos")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center text-[14.5px] text-[rgba(215,230,229,0.75)] hover:text-accent lg:min-h-0"
          >
            WhatsApp
          </a>
          <span className="text-[14.5px] text-[rgba(215,230,229,0.55)]">
            {CONTACTO.ciudad}
          </span>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(36px,5vh,60px)] flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[rgba(215,230,229,0.08)] pt-[22px]">
        <p className="m-0 font-mono text-[11px] tracking-[0.1em] text-[rgba(215,230,229,0.42)]">
          © Powered by Hyper Media Group LLC — 2026
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            href="/privacidad"
            className="font-mono text-[11px] tracking-[0.1em] text-[rgba(215,230,229,0.42)] hover:text-accent"
          >
            Privacidad
          </Link>
          <Link
            href="/terminos"
            className="font-mono text-[11px] tracking-[0.1em] text-[rgba(215,230,229,0.42)] hover:text-accent"
          >
            Términos
          </Link>
          <Link
            href="/cookies"
            className="font-mono text-[11px] tracking-[0.1em] text-[rgba(215,230,229,0.42)] hover:text-accent"
          >
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
