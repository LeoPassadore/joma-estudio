"use client";

import { useEffect, useRef } from "react";

/**
 * Barra de progreso de scroll, fija arriba de toda la página — reemplaza el
 * indicador "Scrolleá / %" que vivía abajo del hero (pedido del cliente:
 * demasiado abajo, texto de más, y solo cubría el hero en vez del sitio).
 *
 * Mide el scroll de la página completa (documentElement), no el progreso del
 * track del hero — son cosas distintas. Sutil a propósito: 2px, sin texto,
 * sin ícono, solo referencia visual del avance.
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-[rgba(215,230,229,0.08)]"
      aria-hidden="true"
    >
      <span
        ref={barRef}
        className="block h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
