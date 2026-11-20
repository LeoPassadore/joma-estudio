import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next solo permite servir las calidades declaradas acá (default: [75]
       — pedir cualquier otro valor da 400). 75 se mantiene para todo el
       sitio; 90 se suma únicamente para el hero de /sobre-joma, la única
       foto que muestra al cliente en primer plano donde la compresión
       estándar se nota. No es un cambio de calidad global. */
    qualities: [75, 90],
  },
};

export default nextConfig;
