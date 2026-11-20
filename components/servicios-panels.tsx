import Link from "next/link";
import { SERVICIOS } from "@/lib/site";

/** Títulos cortos solo para los paneles del home — el nombre completo del
 * servicio (usado en /servicios, footer y SEO) no cambia. */
const TITULO_CORTO: Record<string, string> = {
  "produccion-musical-completa": "Producción completa",
  "produccion-de-beat": "Creación de beats",
};

/**
 * Servicios del home (v3): paneles fijos, ya visibles, sobre el video de
 * fondo. Vidrio (blur + borde claro) como el header — el video sigue
 * moviéndose detrás. El servicio ancla ocupa la fila completa.
 */
export default function ServiciosPanels() {
  return (
    <section
      id="servicios"
      className="relative mx-auto max-w-[1400px] scroll-mt-28 px-[clamp(20px,5vw,80px)] pt-[clamp(40px,8vh,90px)] pb-[clamp(80px,12vh,140px)]"
    >
      <div className="mb-[clamp(28px,4vh,48px)] flex flex-wrap items-baseline gap-5">
        <h2 className="m-0 font-display text-[clamp(32px,5vw,68px)] leading-none tracking-[-0.035em] text-ink">
          Servicios
        </h2>
        <span className="font-mono text-[11px] tracking-[0.2em] text-cool-hi uppercase">
          Presencial · A distancia
        </span>
      </div>

      <div className="grid grid-cols-1 gap-[clamp(14px,1.6vw,22px)] md:grid-cols-2 lg:grid-cols-3">
        {SERVICIOS.map((s) => {
          const ancla = !!s.ancla;
          return (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className={[
                "group relative flex flex-col overflow-hidden rounded-[24px] border p-[clamp(22px,2.4vw,34px)]",
                "backdrop-blur-[18px] backdrop-saturate-150 transition-[transform,border-color] duration-300 ease-out",
                "hover:-translate-y-1 focus-visible:-translate-y-1",
                ancla
                  ? "border-[rgba(226,180,103,0.32)] bg-[rgba(40,54,62,0.62)] md:col-span-2 lg:col-span-3 lg:flex-row lg:items-end lg:gap-12"
                  : "border-[rgba(215,230,229,0.13)] bg-[rgba(40,54,62,0.55)] hover:border-[rgba(215,230,229,0.28)]",
              ].join(" ")}
              style={{ boxShadow: "0 20px 44px rgba(10,14,17,0.5), inset 0 1px 0 rgba(215,230,229,0.08)" }}
            >
              <div className={ancla ? "lg:flex-1" : undefined}>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 flex-none place-items-center rounded-[12px] font-mono text-[12px] font-medium"
                    style={
                      ancla
                        ? { background: "linear-gradient(145deg,#EBC27A,#C99A50)", color: "#1C2329" }
                        : {
                            background: "linear-gradient(145deg,#33434C,#232E35)",
                            color: "#D7E6E5",
                            boxShadow: "4px 4px 10px rgba(10,14,17,0.45)",
                          }
                    }
                  >
                    {s.numero}
                  </span>
                  {ancla && (
                    <span className="rounded-full border border-[rgba(226,180,103,0.35)] px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                      Servicio principal
                    </span>
                  )}
                </div>
                <h3
                  className={[
                    "mt-5 mb-3 font-display leading-[1.02] tracking-[-0.025em] text-ink",
                    ancla ? "text-[clamp(28px,3.6vw,48px)]" : "text-[clamp(22px,2.2vw,28px)]",
                  ].join(" ")}
                >
                  {TITULO_CORTO[s.slug] ?? s.nombre}
                </h3>
                <p
                  className={[
                    "m-0 leading-relaxed text-pretty text-[rgba(215,230,229,0.78)]",
                    ancla ? "max-w-[640px] text-[clamp(15px,1.3vw,17px)]" : "text-[15px]",
                  ].join(" ")}
                >
                  {s.resumen}
                </p>
              </div>

              <div
                className={[
                  "mt-auto flex flex-wrap items-center justify-between gap-3 pt-6",
                  ancla ? "lg:mt-0 lg:flex-col lg:items-end lg:pt-0" : "",
                ].join(" ")}
              >
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-cool-hi uppercase">
                  {s.modalidad}
                </span>
                <span
                  className={[
                    "text-[13.5px] font-semibold transition-transform duration-300 group-hover:translate-x-1",
                    ancla ? "text-accent" : "text-ink",
                  ].join(" ")}
                >
                  Conocé más →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
