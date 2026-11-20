/**
 * Encabezado de subpágina.
 *
 * Acá va el video en loop del hero cuando llegue el material del cliente
 * (wiki/brand/video-assets.md): <video autoplay muted loop playsinline> con
 * poster WebP y respeto de prefers-reduced-motion. Por ahora el degradé
 * cumple la misma función sin pesar nada.
 */
export default function PageHero({
  titulo,
  bajada,
}: {
  titulo: React.ReactNode;
  bajada?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 120% at 20% 0%, rgba(64,119,133,0.30) 0%, rgba(28,35,41,0) 60%), radial-gradient(70% 90% at 90% 20%, rgba(226,180,103,0.14) 0%, rgba(28,35,41,0) 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1400px] px-[clamp(20px,5vw,80px)] pt-[clamp(140px,20vh,220px)] pb-[clamp(48px,7vh,90px)]">
        <h1 className="mt-0 mb-0 max-w-[16ch] font-display text-[clamp(34px,6vw,84px)] leading-[0.95] tracking-[-0.035em] text-balance text-ink">
          {titulo}
        </h1>
        {bajada && (
          <p className="mt-6 mb-0 max-w-[620px] text-[clamp(15px,1.8vw,19px)] leading-relaxed text-pretty text-[rgba(215,230,229,0.75)]">
            {bajada}
          </p>
        )}
      </div>
    </section>
  );
}
