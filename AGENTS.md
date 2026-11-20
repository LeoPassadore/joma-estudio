# AGENTS.md — Contexto para el agente que continúa el proyecto JOMA Estudio

Este documento es para vos, el agente de IA que va a seguir trabajando en este
sitio. Lo escribió el equipo de Hyper Media Group, que construyó el sitio hasta
la versión 3 (v3). Leelo entero antes de tocar código.

---

## 1. Qué es el proyecto

Sitio web de **JOMA Estudio** (marca de Danel Valiente): producción musical de
música urbana. Presencial en **Buenos Aires** y a distancia. El canal de
contacto y venta es **WhatsApp**: no hay formulario, email, login ni pagos
dentro del sitio.

Servicios: Producción musical completa (servicio principal), Grabación de
voces, Producción de beats, Mezcla y mastering. Además: Cursos y Plugins
(primer plugin: **Joma Vox**).

## 2. Tu primera tarea: deploy propio en el Vercel de JOMA

El sitio que existe hoy en `joma-estudio-v3.vercel.app` es una **vista previa
de la agencia** en la cuenta de Vercel de Hyper Media. **No es el sitio
oficial** y no está conectado a este repositorio. Tenés que publicarlo en la
cuenta de Vercel del cliente:

1. Este repo tiene que estar en la cuenta de GitHub del cliente.
2. En la cuenta de Vercel del cliente: **Add New → Project → Import** este repo.
3. **Framework Preset: Next.js.** Verificalo. Si el proyecto se crea por CLI
   (`vercel project add`) suele quedar en "Other" y todas las rutas dan 404.
   Se arregla con `vercel project update <proyecto> --framework nextjs` o
   desde Settings → General.
4. Sin variables de entorno. Build command y output por defecto.
5. Si la URL pide login de Vercel: Settings → Deployment Protection →
   desactivar Vercel Authentication (los proyectos nuevos la traen activa).
6. Cuando el cliente tenga dominio propio: Settings → Domains. No hay que
   tocar código: `SITE_URL` (en `lib/site.ts`) se arma solo con
   `VERCEL_PROJECT_PRODUCTION_URL`, que Vercel inyecta con el dominio de
   producción.
7. Google Search Console: propiedad tipo Dominio verificada por DNS, y enviar
   `/sitemap.xml`.

## 3. Stack y comandos

- Next.js **16.3** (App Router) · React **19.2** · TypeScript · Tailwind CSS
  **v4** · pnpm **11** · Node ≥ 20.9
- Sitio **100% estático** (salvo `/llms.txt`, que se genera en el servidor).
  Sin base de datos, sin API propia, sin variables de entorno.
- `pnpm dev` · `pnpm build` · `pnpm start` · `pnpm lint`

## 4. Mapa del código

```
app/
  layout.tsx            Fuentes, metadata global (SEO/OpenGraph), header y footer
  page.tsx              HOME: video de fondo + servicios + plugins + Spotify
  servicios/[slug]/     Una página por servicio (datos desde lib/site.ts)
  plugins/              Página de plugins (hero neón de Joma Vox)
  cursos/  faq/  sobre-joma/  contacto/
  portfolio/  contenido/  Existen pero NO están en el menú (ver §8)
  privacidad/ terminos/ cookies/   Páginas legales
  sitemap.ts robots.ts manifest.ts llms.txt/   SEO y descubrimiento por IA
  loading.tsx not-found.tsx error.tsx
components/
  hero-video.tsx        Video de fondo (sticky detrás del hero y los paneles)
  home-loading-gate.tsx Pantalla de carga del home
  servicios-panels.tsx  Paneles de servicios del home
  plugins-destacado.tsx Panel de Plugins del home
  plugin-card.tsx       Tarjeta de plugin con botones de compra
  spotify-embed.tsx     Reproductor de Spotify (fachada + carga diferida)
  site-header.tsx       Header con desplegable "Servicios" y menú mobile
  json-ld.tsx           Datos estructurados para Google (LocalBusiness)
lib/site.ts             FUENTE ÚNICA DE CONTENIDO (ver §5)
public/images/          Imágenes (webp, calidad 90)
public/video/           Video del home (generado, ver §7)
scripts/                Pipeline del video
assets-fuente/          Video original (no se despliega)
```

## 5. Regla principal: el contenido vive en `lib/site.ts`

Todo el texto y los datos del negocio están en `lib/site.ts`: `CONTACTO`,
`TITULAR`, `SERVICIOS`, `FAQ`, `NAV`, `PLUGINS`, `CURSOS`, `PROCESO`. El
header, el footer, el sitemap, `llms.txt` y el JSON-LD leen de ahí. **Cambiá
el dato en `lib/site.ts`, no en cada página.** El menú de "Servicios" se arma
solo desde `SERVICIOS`.

**No inventes contenido.** Todo lo que está publicado lo entregó el cliente.
Si falta un dato, dejá un `TODO (cliente)` y preguntá; no lo completes con
texto plausible.

## 6. Decisiones importantes (y por qué)

**Home con video, no con scroll.** v2 tenía una animación cuadro por cuadro
atada al scroll. En v3 se reemplazó por un `<video>` en loop (pedido del
cliente). El video queda `sticky` detrás del hero, los servicios y Plugins,
que pasan por encima con efecto vidrio.

**Pantalla de carga con piso de 3 s.** `home-loading-gate.tsx` muestra la
carga al menos 3 s aunque el video ya esté listo. **Es decisión del cliente**
(parte de la puesta en escena), no un bug. Tiene un salvavidas de 12 s.

**Spotify nunca bloquea la carga.** Se probó esperar a que carguen los
reproductores antes de mostrar el home y quedó revertido: el `onLoad` de un
iframe de terceros no es confiable (bloqueadores, red lenta) y dejaba gente
trabada en la pantalla de carga. No lo vuelvas a intentar.

**Spotify: perfiles primero.** En el home ("Mis trabajos"):
- *Mis perfiles*: JOMAWAV (artista) y Joma.Estudio (estudio). Reproductor de
  artista de 152 px, **precargado** (`precargar`), porque es lo más importante.
- *Producciones*: temas producidos + BNNJ (artista producido), reproductor
  compacto de 80 px con carga diferida (arranca 800 px antes de verse).
- No uses el reproductor de artista de 352 px: el cliente lo rechazó por
  demasiado grande.
- Guardá solo el ID de Spotify. Los links compartidos traen `?si=...`, que es
  un token de sesión de quien compartió: no va al código.

**Plugins.** Cada plugin tiene dos botones, "Comprar en AR$" y "Comprar en
U$D", que llevan a una pasarela de pago externa. Los links van en
`PLUGINS[].comprar.ars` / `.usd`. Con `null`, el botón se ve deshabilitado
(nunca un link muerto). El cliente va a completar los datos de Joma Vox: no
agregues descripción ni compatibilidad por tu cuenta.

**Imágenes.** `next/image` solo sirve las calidades declaradas en
`next.config.ts` (`qualities: [75, 90]`); pedir otra da error 400. Los heroes
fotográficos usan 90.

## 7. Video del home

- Fuente: `assets-fuente/home-video-fuente.mp4`, generada con IA (Veo),
  **1280×720**. Esa es la resolución máxima real; reescalar sin IA no agrega
  detalle.
- `bash scripts/build-home-video.sh` genera en `public/video/`: AV1 1280
  (principal), H.264 1280 (compatibilidad), H.264 854×480 (mobile) y el póster.
- El script recorta la marca de agua de Gemini (coordenadas fijas para esta
  fuente) y borra un texto mal generado bajo el logo del monitor
  (`scripts/clean-monitor-text.py`, que busca archivos `frame-*.png`). **Si
  cambiás el video fuente, revisá esas dos cosas a mano.**
- Arma un loop ida y vuelta para que no se note el salto al reiniciar.
- Requiere `ffmpeg` con `libsvtav1` y `libx264`, y Python 3 con Pillow.

## 8. Trampas conocidas (ya nos costaron tiempo)

1. **Tailwind v4 y CSS global.** Una regla en `globals.css` fuera de una capa
   le gana a **todas** las utilidades de Tailwind. Por eso los estilos base de
   `a` están dentro de `@layer base`. Cualquier estilo global nuevo va en
   `@layer base`.
2. **z-index en Tailwind v4:** `z-59` o `z-70` sin corchetes no generan CSS.
   Usá `z-[60]`.
3. **Keyframes vs. utilidades de transform:** un `@keyframes` que anima
   `transform` pisa `-translate-x-1/2`. Si un elemento está centrado con
   translate, que la animación no toque `transform` horizontal.
4. **Caracteres que Windows dibuja como emoji** (↗, ▶): usá SVG.
5. `html` tiene `scroll-behavior: smooth`. Si automatizás el navegador
   (Playwright), scrolleá con `behavior: 'instant'` o las capturas mienten.
6. `/portfolio` y `/contenido` existen pero están fuera del menú (el portfolio
   vive en el home; `/contenido` tiene formato sin definir, ver su `TODO`).
   Siguen en el sitemap: decidí con el cliente si se quedan o se quitan.

## 9. SEO, GEO y AEO (ya hecho)

- Metadata global en `app/layout.tsx`; cada página define title, description
  y canonical.
- `sitemap.ts`, `robots.ts` (crawlers de IA permitidos explícitamente:
  GPTBot, ClaudeBot, PerplexityBot, Google-Extended…), `manifest.ts`.
- `/llms.txt` se genera desde `lib/site.ts`, así nunca queda desactualizado.
- JSON-LD `LocalBusiness` + `MusicGroup` global, y `Service` +
  `BreadcrumbList` por servicio.
- Falta: verificación en Google Search Console (ver §2).

## 10. Herramientas solo de desarrollo

En `pnpm dev` aparecen la barra de **Agentation** (anotaciones visuales para
agentes) y un botón **Web/Móvil** para ver el layout a 390 px. Las dos están
condicionadas a `NODE_ENV === "development"` y no salen en producción.

## 11. Pendientes para confirmar con el cliente

- [ ] **Joma Vox:** descripción, compatibilidad (DAW/formato), links de pago
      AR$ y U$D, y pasar `estado` a `"Disponible"`.
- [ ] **Páginas legales:** el titular figura en Buenos Aires. Confirmar que es
      su domicilio actual. Los textos **no fueron revisados por un abogado**
      (Ley 25.326 de datos personales).
- [ ] **WhatsApp:** el número tiene característica de Córdoba (3543). Confirmar
      si sigue vigente después de la mudanza.
- [ ] **Años de experiencia:** Sobre JOMA dice "+6 años", pero la formación
      dice "Autodidacta 2015–hoy". Aclarar el texto.
- [ ] **Logo:** el isotipo dice "AUDIOVISUALES" y el servicio audiovisual ya
      no se ofrece. Falta versión vectorial (SVG).
- [ ] **Dominio propio** y **Google Search Console**.
- [ ] Footer: "Powered by Hyper Media Group LLC". Consultar con el cliente si
      se mantiene.

## 12. Nota sobre comentarios en el código

Algunos comentarios citan rutas como `wiki/...` o `sources/...`. Son
documentos internos de la agencia que **no** forman parte de este repo. Lo
relevante de esos documentos está resumido acá.
