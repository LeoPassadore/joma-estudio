import type { Plugin } from "@/lib/site";

function BotonComprar({
  href,
  label,
  primario = false,
}: {
  href: string | null;
  label: string;
  primario?: boolean;
}) {
  const className =
    "inline-block w-full rounded-[14px] px-[26px] py-[14px] text-center text-[14px] font-semibold sm:w-auto";
  const style = primario
    ? {
        background: "linear-gradient(145deg,#EBC27A,#C99A50)",
        color: "#1C2329",
        boxShadow: "5px 5px 14px rgba(10,14,17,0.5)",
      }
    : {
        background: "linear-gradient(145deg,#33434C,#232E35)",
        color: "#D7E6E5",
        boxShadow: "5px 5px 14px rgba(10,14,17,0.5)",
      };
  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Link de pago pendiente"
        className={`${className} cursor-not-allowed opacity-45`}
        style={style}
      >
        {label}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {label}
    </a>
  );
}

/** Tarjeta de un plugin — misma superficie que las de /cursos. */
export default function PluginCard({ plugin }: { plugin: Plugin }) {
  return (
    <article
      id={plugin.slug}
      className="flex scroll-mt-28 flex-col rounded-[28px] p-[clamp(24px,3vw,40px)]"
      style={{
        background: "linear-gradient(145deg,#2C3A43,#1E272D)",
        boxShadow:
          "18px 18px 40px rgba(10,14,17,0.6), -11px -11px 28px rgba(108,170,183,0.05)",
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex w-fit items-center rounded-full border border-[rgba(226,180,103,0.3)] px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
          {plugin.estado}
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-cool-hi uppercase">
          {plugin.tipo}
        </span>
      </div>

      <h2 className="mt-4 mb-3 font-display text-[clamp(28px,3.4vw,44px)] leading-[1.02] tracking-[-0.025em] text-ink">
        {plugin.nombre}
      </h2>
      <p className="m-0 text-[15px] leading-relaxed text-pretty text-[rgba(215,230,229,0.75)]">
        {plugin.resumen}
      </p>

      <h3 className="mt-7 mb-3 font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
        Compatibilidad
      </h3>
      {plugin.compatibilidad.length > 0 ? (
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {plugin.compatibilidad.map((c) => (
            <li
              key={c}
              className="rounded-[10px] px-3 py-[6px] text-[13px] text-[rgba(215,230,229,0.85)]"
              style={{ background: "rgba(28,35,41,0.45)" }}
            >
              {c}
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 text-sm text-[rgba(215,230,229,0.55)]">A confirmar.</p>
      )}

      {/* Compra en pasarela externa, un botón por moneda. Sin link cargado,
          el botón se ve pero queda deshabilitado (nunca un link muerto). */}
      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        <BotonComprar href={plugin.comprar.ars} label="Comprar en AR$" primario />
        <BotonComprar href={plugin.comprar.usd} label="Comprar en U$D" />
      </div>
    </article>
  );
}
