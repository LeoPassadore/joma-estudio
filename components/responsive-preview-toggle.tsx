"use client";

import { useState } from "react";

/**
 * Toggle de preview Web/Móvil — solo development (ver app/layout.tsx, mismo
 * patrón que Agentation). Envuelve TODO el body (header + main + footer) en
 * un frame de ancho fijo (390px, ancho estándar de iPhone) para simular el
 * layout responsive sin salir del navegador ni abrir devtools.
 *
 * El header es `position: fixed`, que normalmente se posiciona respecto al
 * viewport completo, no a un contenedor angosto — por eso el wrapper lleva
 * `transform` (aunque sea neutro): cualquier ancestro con transform crea un
 * nuevo "containing block", y ahí el fixed del header pasa a posicionarse
 * respecto a ESTE div en vez del viewport. Sin este truco, el header
 * quedaría centrado en toda la ventana mientras el resto del contenido se
 * angosta a 390px, rompiendo el preview. No existe en producción.
 */
const MOBILE_WIDTH = 390;

export default function ResponsivePreviewToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"web" | "movil">("web");

  return (
    <>
      <div
        style={
          mode === "movil"
            ? {
                width: MOBILE_WIDTH,
                marginInline: "auto",
                boxShadow: "0 0 0 1px rgba(226,180,103,0.3), 0 30px 60px rgba(0,0,0,0.5)",
                overflowX: "hidden",
                transform: "translateZ(0)",
              }
            : undefined
        }
      >
        {children}
      </div>

      <div
        className="fixed right-4 bottom-4 z-[999] flex gap-1 rounded-full border border-[rgba(226,180,103,0.3)] p-1"
        style={{
          background: "rgba(28,35,41,0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <button
          type="button"
          onClick={() => setMode("web")}
          className="rounded-full px-3 py-2 text-[12px] font-semibold"
          style={{
            background: mode === "web" ? "#E2B467" : "transparent",
            color: mode === "web" ? "#1C2329" : "#D7E6E5",
          }}
        >
          Web
        </button>
        <button
          type="button"
          onClick={() => setMode("movil")}
          className="rounded-full px-3 py-2 text-[12px] font-semibold"
          style={{
            background: mode === "movil" ? "#E2B467" : "transparent",
            color: mode === "movil" ? "#1C2329" : "#D7E6E5",
          }}
        >
          Móvil
        </button>
      </div>
    </>
  );
}
