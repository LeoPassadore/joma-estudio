import Image from "next/image";
import CtaFinal from "@/components/cta-final";
import PluginCard from "@/components/plugin-card";
import { PLUGINS } from "@/lib/site";

export const metadata = {
  title: "Plugins",
  description:
    "Plugins y paquetes descargables de JOMA Estudio para producción musical urbana. El primero: Joma Vox.",
  alternates: { canonical: "/plugins" },
  openGraph: {
    images: [{ url: "/images/hero-plugins.webp", width: 1600, height: 900 }],
  },
};

export default function PluginsPage() {
  return (
    <>
      {/* Hero — interfaz neón de Joma Vox como fondo, mismo patrón que los
          heroes de servicio: degradé arriba (header) y abajo (fundido). */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden" aria-label="Plugins">
        <Image
          src="/images/hero-plugins.webp"
          quality={90}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1C2329 0%, rgba(28,35,41,0.25) 20%, rgba(28,35,41,0.35) 55%, rgba(28,35,41,0.9) 88%, #1C2329 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1400px] px-[clamp(20px,5vw,80px)] pt-[clamp(120px,18vh,200px)] pb-[clamp(48px,7vh,88px)]">
          <h1 className="mt-0 mb-5 max-w-[900px] font-display text-[clamp(34px,6vw,84px)] leading-[0.96] tracking-[-0.035em] text-ink">
            Plugins
          </h1>
          <p className="m-0 max-w-[640px] text-[clamp(15px,1.4vw,18px)] leading-relaxed text-pretty text-[rgba(215,230,229,0.82)]">
            Las herramientas que uso en mis producciones, empaquetadas para que
            las uses en las tuyas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-[clamp(20px,5vw,80px)] pt-[clamp(40px,6vh,70px)] pb-[clamp(70px,10vh,120px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-[clamp(24px,3vw,44px)]">
          {PLUGINS.map((p) => (
            <PluginCard key={p.slug} plugin={p} />
          ))}
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
