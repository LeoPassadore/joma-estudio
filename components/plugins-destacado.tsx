import Link from "next/link";
import { PLUGINS } from "@/lib/site";

/**
 * Panel de Plugins en el home (v3), debajo de los servicios y sobre el mismo
 * video de fondo. Muestra el primer plugin y lleva a /plugins.
 */
export default function PluginsDestacado() {
  const p = PLUGINS[0];
  if (!p) return null;
  return (
    <section className="relative mx-auto max-w-[1400px] px-[clamp(20px,5vw,80px)] pb-[clamp(80px,12vh,140px)]">
      <div className="mb-[clamp(28px,4vh,48px)] flex flex-wrap items-baseline gap-5">
        <h2 className="m-0 font-display text-[clamp(32px,5vw,68px)] leading-none tracking-[-0.035em] text-ink">
          Plugins
        </h2>
        <span className="font-mono text-[11px] tracking-[0.2em] text-cool-hi uppercase">
          Descargables
        </span>
      </div>

      <Link
        href={`/plugins#${p.slug}`}
        className="group flex flex-col gap-6 rounded-[24px] border border-[rgba(108,170,183,0.28)] bg-[rgba(40,54,62,0.6)] p-[clamp(22px,2.6vw,38px)] backdrop-blur-[18px] backdrop-saturate-150 transition-transform duration-300 ease-out hover:-translate-y-1 md:flex-row md:items-end md:justify-between"
        style={{ boxShadow: "0 20px 44px rgba(10,14,17,0.5), inset 0 1px 0 rgba(215,230,229,0.08)" }}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[rgba(226,180,103,0.35)] px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
              {p.estado}
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-cool-hi uppercase">
              {p.tipo}
            </span>
          </div>
          <h3 className="mt-4 mb-3 font-display text-[clamp(30px,4vw,56px)] leading-none tracking-[-0.03em] text-ink">
            {p.nombre}
          </h3>
          <p className="m-0 max-w-[560px] text-[15px] leading-relaxed text-pretty text-[rgba(215,230,229,0.78)]">
            {p.resumen}
          </p>
        </div>
        <span className="text-[14px] font-semibold whitespace-nowrap text-accent transition-transform duration-300 group-hover:translate-x-1">
          Ver plugins →
        </span>
      </Link>
    </section>
  );
}
