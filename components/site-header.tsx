"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, whatsappLink, type NavItem } from "@/lib/site";

/** Un grupo está activo si alguna de sus páginas hijas lo está. */
function isActive(item: NavItem, pathname: string) {
  if (item.children) return item.children.some((c) => pathname === c.href);
  return pathname.startsWith(item.href);
}

/* Header flotante con glasmorfismo — el vidrio va acá, en HTML, sobre el
   canvas. Es la combinación que definimos: 3D real abajo, vidrio arriba.
   La sección activa se resalta en ámbar tenue, como en JOMA Seccion.dc.html. */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  /** Desplegable abierto en desktop (label del grupo), o null. */
  const [sub, setSub] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Cierre con Escape y foco de vuelta al botón (menú mobile accesible).
  useEffect(() => {
    if (!open && !sub) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSub(null);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, sub]);

  return (
    <>
      <header
        className="fixed top-[18px] left-1/2 z-[60] flex w-[min(1320px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-6 rounded-[20px] border border-[rgba(215,230,229,0.14)] bg-[rgba(48,64,73,0.42)] py-3 pr-[14px] pl-[18px] backdrop-blur-[20px] backdrop-saturate-150"
        style={{
          boxShadow:
            "0 18px 40px rgba(10,14,17,0.55), inset 0 1px 0 rgba(215,230,229,0.10)",
        }}
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* Isotipo real del cliente (sources/marca/Logo Joma.jpg), con el
              negro convertido a transparencia para integrarse en cualquier
              fondo. Todavía dice "AUDIOVISUALES" en el arco — tensión sin
              resolver con el cliente, ver wiki/sitio/bloqueos.md. */}
          <span
            className="grid h-[42px] w-[42px] flex-none place-items-center rounded-[13px] p-2"
            style={{
              background: "linear-gradient(145deg,#35464f,#212b32)",
              boxShadow:
                "5px 5px 12px rgba(10,14,17,0.6), -4px -4px 10px rgba(108,170,183,0.07)",
            }}
          >
            <Image
              src="/images/joma-isotipo.webp"
              alt=""
              width={320}
              height={225}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col leading-[1.05]">
            <span className="font-display text-[15px] tracking-[0.02em] text-ink">
              JOMA
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-cool-hi uppercase">
              Estudio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-[2px] lg:flex">
          {NAV.map((item) => {
            const active = isActive(item, pathname);
            const linkStyle = {
              color: active ? "#E2B467" : "#D7E6E5",
              fontWeight: active ? 600 : 500,
              background: active ? "rgba(226,180,103,0.10)" : "transparent",
            };
            if (item.children) {
              const isOpen = sub === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setSub(item.label)}
                  onMouseLeave={() => setSub(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setSub(isOpen ? null : item.label)}
                    className="flex cursor-pointer items-center gap-[6px] rounded-[11px] border-0 px-3 py-[9px] text-[13.5px] whitespace-nowrap transition-colors duration-200"
                    style={linkStyle}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="text-[9px] transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    /* pt: puente invisible entre botón y panel, para que el
                       hover no se corte al bajar el mouse. */
                    <div className="absolute top-full left-0 pt-3">
                      <div
                        className="animate-glass-in flex min-w-[260px] flex-col gap-[2px] rounded-[18px] border border-[rgba(215,230,229,0.14)] bg-[rgba(40,54,62,0.82)] p-2 backdrop-blur-[24px] backdrop-saturate-150"
                        style={{ boxShadow: "0 22px 50px rgba(10,14,17,0.6)" }}
                      >
                        {item.children.map((c) => {
                          const on = pathname === c.href;
                          return (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={() => setSub(null)}
                              aria-current={on ? "page" : undefined}
                              className="rounded-[12px] px-4 py-3 text-[14px] font-medium transition-colors duration-200 hover:bg-[rgba(215,230,229,0.07)]"
                              style={{ color: on ? "#E2B467" : "#D7E6E5" }}
                            >
                              {c.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="rounded-[11px] px-3 py-[9px] text-[13.5px] whitespace-nowrap transition-colors duration-200"
                style={linkStyle}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={whatsappLink("trabajar-juntos")}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-[13px] px-5 py-[11px] text-[13.5px] font-semibold whitespace-nowrap"
            style={{
              background: "linear-gradient(145deg,#EBC27A,#C99A50)",
              color: "#1C2329",
              boxShadow:
                "4px 4px 12px rgba(10,14,17,0.55), -3px -3px 9px rgba(226,180,103,0.14)",
            }}
          >
            Agendar sesión
          </a>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="grid h-12 w-12 flex-none cursor-pointer place-items-center rounded-[14px] border border-[rgba(215,230,229,0.12)] p-0 lg:hidden"
          style={{
            background: "linear-gradient(145deg,#33434C,#232E35)",
            boxShadow:
              "4px 4px 12px rgba(10,14,17,0.5), -3px -3px 9px rgba(108,170,183,0.06)",
          }}
        >
          <span className="flex flex-col gap-[5px]">
            <span className="block h-[2px] w-5 rounded-[2px] bg-accent" />
            <span className="block h-[2px] w-5 rounded-[2px] bg-ink" />
            <span className="block h-[2px] w-[14px] rounded-[2px] bg-ink" />
          </span>
        </button>
      </header>

      {open && (
        <div
          id="menu-mobile"
          ref={panelRef}
          className="animate-glass-in fixed top-[82px] left-1/2 z-[59] flex w-[min(520px,calc(100%-32px))] -translate-x-1/2 flex-col gap-[6px] rounded-[22px] border border-[rgba(215,230,229,0.14)] bg-[rgba(40,54,62,0.74)] p-[14px] backdrop-blur-[24px] backdrop-saturate-150 lg:hidden"
          style={{ boxShadow: "0 26px 60px rgba(10,14,17,0.65)" }}
        >
          {NAV.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="flex flex-col gap-[4px] rounded-[14px] bg-[rgba(28,35,41,0.35)] p-2">
                  <span className="px-2 pt-2 pb-1 font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
                    {item.label}
                  </span>
                  {item.children.map((c) => {
                    const on = pathname === c.href;
                    return (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        aria-current={on ? "page" : undefined}
                        className="rounded-[11px] px-3 py-[12px] text-[15px] font-semibold"
                        style={{
                          color: on ? "#E2B467" : "#D7E6E5",
                          background: on ? "rgba(226,180,103,0.12)" : "transparent",
                        }}
                      >
                        {c.label}
                      </Link>
                    );
                  })}
                </div>
              );
            }
            const active = isActive(item, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className="rounded-[14px] px-4 py-[15px] text-base font-semibold"
                style={{
                  color: active ? "#E2B467" : "#D7E6E5",
                  background: active ? "rgba(226,180,103,0.12)" : "rgba(28,35,41,0.35)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={whatsappLink("trabajar-juntos")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-[15px] p-4 text-center text-base font-semibold"
            style={{
              background: "linear-gradient(145deg,#EBC27A,#C99A50)",
              color: "#1C2329",
              boxShadow: "6px 6px 16px rgba(10,14,17,0.5)",
            }}
          >
            Agendar sesión
          </a>
        </div>
      )}
    </>
  );
}
