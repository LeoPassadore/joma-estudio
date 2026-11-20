/**
 * Pantalla de carga.
 *
 * Deliberadamente NO carga la secuencia de frames: una pantalla de carga que
 * descarga 6 MB retrasa justo lo que debería aliviar (ver
 * wiki/tecnico/scroll-frames.md). Usa una sola imagen de fondo más animación
 * CSS.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-night">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url(/images/fondo-carga.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 80% at 50% 50%, rgba(28,35,41,0.55) 0%, rgba(28,35,41,0.92) 70%, #1C2329 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative flex flex-col items-center gap-6"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-12 items-end gap-[5px]" aria-hidden="true">
          {[0, 0.15, 0.3, 0.1, 0.25, 0.05].map((delay, i) => (
            <span
              key={i}
              className="joma-eq w-[5px] rounded-[3px]"
              style={{
                height: "100%",
                background: i % 3 === 2 ? "#E2B467" : "#6CAAB7",
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.24em] text-cool-hi uppercase">
          Cargando
        </span>
      </div>
    </div>
  );
}
