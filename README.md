# JOMA Estudio — sitio web

Sitio de **JOMA Estudio**: producción musical de música urbana, presencial en
Buenos Aires y a distancia. Next.js 16 + React 19 + Tailwind CSS v4.

> ¿Sos un agente de IA (Claude, Cursor, Codex…) que va a seguir el trabajo?
> Leé primero **[AGENTS.md](AGENTS.md)**: ahí está todo el contexto del
> proyecto, las decisiones tomadas y lo que falta hacer.

## Requisitos

- Node.js **20.9 o superior**
- pnpm **11** (`npm i -g pnpm` o `corepack enable`)

## Correrlo en tu computadora

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Para probar la versión de producción:

```bash
pnpm build
pnpm start
```

No hace falta ninguna variable de entorno ni base de datos: es un sitio
estático.

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| WhatsApp, redes, ciudad, Spotify | `lib/site.ts` → `CONTACTO` |
| Datos legales del titular | `lib/site.ts` → `TITULAR` |
| Servicios (textos, plazos, FAQ de cada uno) | `lib/site.ts` → `SERVICIOS` |
| Preguntas frecuentes | `lib/site.ts` → `FAQ` |
| Plugins (Joma Vox y los que vengan) | `lib/site.ts` → `PLUGINS` |
| Cursos | `lib/site.ts` → `CURSOS` |
| Menú del header | `lib/site.ts` → `NAV` |
| Perfiles y temas de Spotify del home | `app/page.tsx` → `PERFILES` y `PRODUCCIONES` |
| Imágenes | `public/images/` |
| Video de fondo del home | `public/video/` (ver abajo) |

### Cargar los links de pago de un plugin

En `lib/site.ts`, dentro de `PLUGINS`, completá `comprar` con los links de tu
pasarela de pago y cambiá el estado a `"Disponible"`:

```ts
estado: "Disponible",
comprar: {
  ars: "https://link-de-pago-en-pesos",
  usd: "https://link-de-pago-en-dolares",
},
```

Mientras un link esté en `null`, su botón se ve atenuado y no hace nada.

## Publicarlo en tu propio Vercel

1. Subí este repositorio a tu cuenta de GitHub.
2. Entrá a [vercel.com/new](https://vercel.com/new) e importá el repositorio.
3. Verificá que **Framework Preset** diga **Next.js** (si dice "Other", el
   sitio da 404 en todas las páginas). No hace falta configurar nada más.
4. Deploy. Desde ahí, cada `git push` a la rama principal publica solo.
5. En **Settings → Domains** agregá tu dominio. El sitio toma ese dominio
   automáticamente para el sitemap, el SEO y los datos para Google.

Si la URL pide iniciar sesión en Vercel al abrirla, desactivá
**Settings → Deployment Protection → Vercel Authentication**.

## Google Search Console

1. En [search.google.com/search-console](https://search.google.com/search-console)
   agregá una propiedad de tipo **Dominio** con tu dominio y verificala por
   DNS (registro TXT en tu proveedor de dominio).
2. En **Sitemaps**, enviá `https://tu-dominio/sitemap.xml`.

## Regenerar el video del home

El video de `public/video/` se genera desde `assets-fuente/home-video-fuente.mp4`
(recorta la marca de agua, limpia un texto del monitor y arma el loop):

```bash
bash scripts/build-home-video.sh
```

Necesita `ffmpeg` (con `libsvtav1` y `libx264`) y Python 3 con `Pillow`.
