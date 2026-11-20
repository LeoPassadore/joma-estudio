/**
 * Datos del sitio. Fuente: wiki/ (oferta/joma-servicios.md, sitio/faq.md,
 * sitio/contacto-links.md). No inventar contenido acá: si falta algo, es
 * porque el cliente todavía no lo entregó y va marcado como TODO.
 */

export const CONTACTO = {
  whatsapp: "https://api.whatsapp.com/send/?phone=5493543694388",
  whatsappNumeroLegible: "+54 9 3543 69-4388",
  instagram: "https://instagram.com/joma.estudio/",
  youtube: "https://youtube.com/@joma.estudio",
  linkedin: "https://linkedin.com/in/danel-valiente/",
  // Sin el ?si= — es un token de sesión, no va en el código.
  spotify: "https://open.spotify.com/artist/3BwnhxWXWW5K0Mu5WBtaAy", // JOMAWAV
  spotifyEstudio: "https://open.spotify.com/artist/1CnYJnEVer4IrlIbZZROFa", // Joma.Estudio
  ciudad: "Buenos Aires, Argentina",
} as const;

/** Titular real del sitio — persona física, sin razón social ni CUIT
 * declarados (confirmado con el cliente, 2026-09-16). Usado en las páginas
 * legales (privacidad, términos, cookies) y en JSON-LD (Person/schema.org).
 * WhatsApp es el único canal de contacto formal: no hay email dedicado. */
export const TITULAR = {
  nombre: "Danel Valiente",
  marca: "JOMA Estudio",
  actividad: "Producción musical",
  ciudad: "Buenos Aires, Argentina",
} as const;

/** Dominio canónico del sitio, para metadata, sitemap, robots.txt y JSON-LD.
 * Usa las env vars que Vercel inyecta en runtime (no hay que declararlas a
 * mano): VERCEL_PROJECT_PRODUCTION_URL es la URL de producción del proyecto
 * actual, estable entre deploys — a diferencia de VERCEL_URL, que cambia en
 * cada preview. En local cae a localhost. */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

/** Motivo del contacto por WhatsApp según de dónde vino el clic — cada botón
 * arma un mensaje prellenado distinto (decisión del cliente, no genérico). */
export type MotivoWhatsapp =
  | "trabajar-juntos"
  | "trabajar-a-distancia"
  | "produccion-musical-completa"
  | "grabacion-de-voces"
  | "produccion-de-beat"
  | "mezcla-y-mastering";

const MOTIVO_TEXTO: Record<MotivoWhatsapp, string> = {
  "trabajar-juntos": "para trabajar juntos",
  "trabajar-a-distancia": "para trabajar a distancia",
  "produccion-musical-completa": "para hacer una producción completa",
  "grabacion-de-voces": "para grabar voces",
  "produccion-de-beat": "para producción de beats",
  "mezcla-y-mastering": "para mezcla y mastering",
};

/** Arma el link de WhatsApp con el mensaje prellenado correspondiente. */
export function whatsappLink(motivo: MotivoWhatsapp) {
  const texto = `Hola Joma, vengo de tu sitio web, quiero agendar una sesión ${MOTIVO_TEXTO[motivo]}.`;
  return `${CONTACTO.whatsapp}&text=${encodeURIComponent(texto)}`;
}

/** WhatsApp con un mensaje libre — para lo que no es agendar una sesión
 * (por ejemplo, consultar por un plugin). */
export function whatsappMensaje(texto: string) {
  return `${CONTACTO.whatsapp}&text=${encodeURIComponent(texto)}`;
}

/** Las tres condiciones son transversales: se muestran una vez, no por servicio. */
export const CONDICIONES = [
  { valor: "2 semanas", detalle: "de entrega máxima, desde el pago y el material completo" },
  { valor: "2 revisiones", detalle: "incluidas en cada servicio" },
  { valor: "2 horas", detalle: "por canción en las sesiones de grabación" },
] as const;

export type Servicio = {
  slug: string;
  numero: string;
  nombre: string;
  resumen: string;
  modalidad: string;
  ancla?: boolean;
  /** Los 3 bloques fijos del detalle de servicio, calcados de
   * JOMA Seccion.dc.html: qué incluye, plazos, cómo preparar el material. */
  incluye: string;
  plazos: string;
  preparar: string;
  /** FAQ propia del servicio (3 preguntas) — no las 9 generales del sitio. */
  faq: { q: string; a: string }[];
};

export const SERVICIOS: Servicio[] = [
  {
    slug: "produccion-musical-completa",
    numero: "01",
    nombre: "Producción musical completa",
    resumen:
      "De la idea inicial a un resultado final listo para publicar. Componemos la instrumental, grabamos las voces, y vos recibís la mezcla y master profesional.",
    modalidad: "Presencial o remoto",
    ancla: true,
    incluye:
      "Desarrollo de la idea musical, producción del beat, arreglos y estructura, dirección y producción artística, grabación de voces, edición y afinación vocal, producción vocal, mezcla, mastering y exportación de archivos finales. Recibís la canción en WAV y MP3, más el instrumental y los stems cuando corresponda.",
    plazos:
      "Dos semanas de entrega desde que confirmás el pago y me hacés llegar todo el material necesario, dos revisiones sobre el resultado y, si hay grabación de voces, dos horas de estudio por canción. Si tenés fecha de lanzamiento, avisame antes de empezar.",
    preparar:
      "Si ya tenés letra, referencias o una idea de dirección, mandámelas de entrada — acelera la primera propuesta. Si vas a grabar en el estudio, coordinamos el turno por WhatsApp; si es a distancia, arrancamos directo con una llamada para definir el rumbo.",
    faq: [
      {
        q: "¿Puedo empezar sin tener nada armado todavía?",
        a: "Sí. Puedo desarrollar la producción musical desde cero a partir de una idea, una referencia o un concepto.",
      },
      {
        q: "¿Tengo que grabar en el estudio?",
        a: "No necesariamente. La grabación de voces es presencial en Buenos Aires, pero el resto del proceso puede coordinarse a distancia.",
      },
      {
        q: "¿Qué pasa si no me gusta el resultado?",
        a: "Para eso están las dos revisiones. Juntá todos los comentarios y los aplico en una sola vuelta.",
      },
    ],
  },
  {
    slug: "grabacion-de-voces",
    numero: "02",
    nombre: "Grabación de voces",
    resumen:
      "Si ya tenés tu beat y solo falta añadirle voces a nivel profesional, agendá tu sesión y las grabamos juntos.",
    modalidad: "Solo presencial · máximo 2 horas por canción",
    incluye:
      "Grabación de voces, dirección durante la grabación, selección de tomas, edición y afinación, producción vocal y procesamiento de voces.",
    plazos:
      "El turno se coordina por canción, con un máximo de dos horas por canción. El plazo de entrega es de dos semanas desde la sesión y la confirmación del pago, con dos revisiones incluidas.",
    preparar:
      "Llegá con la letra memorizada o escrita, y el beat ya elegido si lo trajiste vos. El turno rinde más si no perdés tiempo de estudio terminando la letra ahí mismo.",
    faq: [
      {
        q: "¿Tengo que traer mi propio beat?",
        a: "No es obligatorio. Si no tenés uno, podemos desarrollarlo antes de la sesión o trabajar sobre una base del estudio.",
      },
      {
        q: "¿Qué pasa si necesito más de dos horas?",
        a: "Se puede coordinar una sesión adicional. Avisame antes del turno si la canción es especialmente compleja.",
      },
      {
        q: "¿Puedo venir acompañado a la sesión?",
        a: "Sí, sin problema. Solo avisame con anticipación para organizar el estudio.",
      },
    ],
  },
  {
    slug: "produccion-de-beat",
    numero: "03",
    nombre: "Producción de beat",
    resumen:
      "Instrumentales personalizados, adaptados a lo que necesita tu canción. Me mostrás las referencias que tenés o la letra que escribiste y armamos desde cero una composición que refleje la esencia de tu canción.",
    modalidad: "Presencial o a distancia",
    incluye:
      "Creación del instrumental, diseño sonoro, selección y programación de sonidos, arreglos y estructura, adaptación a tus necesidades y exportación del beat final.",
    plazos:
      "Dos semanas de entrega desde que recibo tu referencia y confirmás el pago, y dos revisiones sobre el instrumental. Si tenés fecha de lanzamiento, avisame antes de empezar.",
    preparar:
      "Mandame una referencia del sonido que buscás — un tema parecido, una descripción del clima que querés, o una idea de estructura. Cuanto más clara la dirección, menos vueltas necesita el beat.",
    faq: [
      {
        q: "¿Puedo pedir un beat sin tener la letra todavía?",
        a: "Sí, es lo más común. El instrumental sale primero y la letra se escribe sobre él.",
      },
      {
        q: "¿Quién tiene los derechos del beat?",
        a: "Depende del tipo de producción y el acuerdo con vos. Lo definimos antes de arrancar, según tu proyecto.",
      },
      {
        q: "¿Trabajás con géneros fuera del urbano?",
        a: "Mi especialidad es la música urbana. Si tu tema va por otro lado, escribime y te digo con franqueza si soy la persona.",
      },
    ],
  },
  {
    slug: "mezcla-y-mastering",
    numero: "04",
    nombre: "Mezcla y mastering",
    resumen:
      "Tu canción balanceada, con volumen competitivo y lista para subir a plataformas. La diferencia entre sonar mal o despacio muchas veces se encuentra en un buen mastering.",
    modalidad: "A distancia",
    incluye:
      "Balance de niveles, ecualización, compresión, efectos y automatizaciones sobre tus pistas separadas. El master final se entrega en WAV y en la versión comprimida que necesites para distribución.",
    plazos:
      "Dos semanas de entrega desde que recibo los archivos ordenados, dos revisiones por canción y dos horas de trabajo dedicadas a cada tema. Si tenés fecha de lanzamiento, avisame antes de empezar.",
    preparar:
      "Pistas separadas en WAV, todas desde el mismo punto de inicio, sin procesamiento de master. Nombrá cada archivo por instrumento y mandá una referencia del sonido que buscás.",
    faq: [
      {
        q: "¿Puedo mandar un solo archivo ya mezclado?",
        a: "Sí, en ese caso es solo mastering. Para mezclar necesito las pistas separadas.",
      },
      {
        q: "¿Trabajás con géneros fuera del urbano?",
        a: "Mi especialidad es la música urbana. Si tu tema va por otro lado, escribime y te digo con franqueza si soy la persona.",
      },
      {
        q: "¿Qué pasa si no me gusta el resultado?",
        a: "Para eso están las dos revisiones. Juntá todos los comentarios y los aplico en una sola vuelta.",
      },
    ],
  },
];

export type FaqGrupo = { grupo: string; items: { q: string; a: string }[] };

/** Las 9 preguntas, agrupadas por tema (no lista plana). Ver wiki/sitio/faq.md. */
export const FAQ: FaqGrupo[] = [
  {
    grupo: "Modalidad de trabajo",
    items: [
      {
        q: "¿Trabajás presencialmente o a distancia?",
        a: "Ambas. Si estás en Buenos Aires podés trabajar presencialmente en el estudio, y varios servicios están disponibles de forma remota para artistas de otras localidades o países.",
      },
    ],
  },
  {
    grupo: "Qué necesito para empezar",
    items: [
      {
        q: "¿Necesito tener el beat?",
        a: "No. Puedo desarrollar la producción musical desde cero a partir de una idea, una referencia o un concepto.",
      },
      {
        q: "¿Puedo llevar mi propio beat?",
        a: "Sí. En ese caso trabajamos la grabación, la producción vocal, la mezcla y el mastering.",
      },
      {
        q: "¿Puedo enviar mis voces ya grabadas?",
        a: "Sí. Para trabajos a distancia tenés que enviar las voces en crudo junto con los archivos necesarios para trabajar la canción.",
      },
    ],
  },
  {
    grupo: "Tiempos y condiciones",
    items: [
      {
        q: "¿Cuánto tarda el trabajo?",
        a: "Máximo 2 semanas desde la confirmación del pago, siempre que tenga todo el material necesario para empezar.",
      },
      {
        q: "¿Cuántas revisiones puedo hacer?",
        a: "Cada servicio incluye un máximo de 2 intervenciones o revisiones.",
      },
      {
        q: "¿Cuánto dura una sesión de grabación?",
        a: "Se coordina por canción, con un máximo de 2 horas por canción.",
      },
      {
        q: "¿Los precios están publicados?",
        a: "No. Cada proyecto puede tener necesidades diferentes, así que el presupuesto lo definimos directamente.",
      },
    ],
  },
  {
    grupo: "Derechos y créditos",
    items: [
      {
        q: "¿Quién tiene los derechos de la canción?",
        a: "Depende de la naturaleza del trabajo y de la participación de cada persona en la creación de la obra. En mezcla y mastering no adquiero derechos de composición por realizar el servicio. En producción musical o beat, la participación sobre la composición se define según el aporte creativo y el acuerdo con el artista.",
      },
      {
        q: "¿Cómo aparecen los créditos?",
        a: "Cuando participo como productor, pido ser acreditado en el lanzamiento — por ejemplo «Producción: JOMA / JOMA.ESTUDIO». En plataformas y distribuidores que permiten cargar créditos, podés agregarlo cuando corresponda.",
      },
    ],
  },
];

/* Portfolio no va en el nav: ya está integrado en el home ("Mis trabajos").
 * v3: los servicios se agrupan en un desplegable "Servicios" (pedido del
 * cliente). Los hijos salen de SERVICIOS, así que no se desincronizan. */
export type NavItem = {
  href: string;
  label: string;
  children?: readonly { href: string; label: string }[];
};

export const NAV: readonly NavItem[] = [
  {
    href: "/#servicios",
    label: "Servicios",
    children: SERVICIOS.map((s) => ({ href: `/servicios/${s.slug}`, label: s.nombre })),
  },
  { href: "/plugins", label: "Plugins" },
  { href: "/cursos", label: "Cursos" },
  { href: "/sobre-joma", label: "Sobre JOMA" },
  { href: "/faq", label: "Preguntas frecuentes" },
];

/** Plugins y paquetes descargables. Joma Vox es el primero.
 * Los datos de cada plugin (descripción, compatibilidad, links de compra)
 * los completa el cliente desde el repo. */
export type Plugin = {
  slug: string;
  nombre: string;
  tipo: string;
  estado: "Disponible" | "Próximamente";
  resumen: string;
  /** Compatibilidad (DAW, formato). Vacío = el cliente todavía no lo pasó. */
  compatibilidad: readonly string[];
  /** Links a la pasarela de pago externa, uno por moneda. null = todavía no
   * hay link (el botón se muestra deshabilitado). Los completa el cliente. */
  comprar: { ars: string | null; usd: string | null };
  imagen?: string;
};

export const PLUGINS: readonly Plugin[] = [
  {
    slug: "joma-vox",
    nombre: "Joma Vox",
    tipo: "Plugin de voces",
    estado: "Próximamente",
    resumen:
      "El primer paquete descargable de JOMA, pensado para el procesamiento de voces en música urbana.",
    compatibilidad: [],
    imagen: "/images/hero-plugins.webp",
    comprar: { ars: null, usd: null },
  },
];

/** Los 7 pasos. Fuente: wiki/oferta/proceso.md. */
export const PROCESO = [
  {
    numero: "01",
    titulo: "Contacto",
    texto:
      "Me escribís y me contás qué proyecto querés hacer, qué necesitás y en qué etapa estás.",
  },
  {
    numero: "02",
    titulo: "Propuesta",
    texto:
      "Analizo el proyecto y definimos juntos qué servicio corresponde. Acá definimos el presupuesto, directamente con vos.",
  },
  {
    numero: "03",
    titulo: "Confirmación",
    texto:
      "Aceptada la propuesta, se confirma el pago y coordinamos el comienzo del trabajo o el turno de grabación.",
  },
  {
    numero: "04",
    titulo: "Producción",
    texto:
      "Se trabaja según el servicio contratado: idea, beat, grabación, producción vocal, mezcla y master.",
  },
  {
    numero: "05",
    titulo: "Entrega",
    texto:
      "Recibís una primera versión para revisar. Máximo 2 semanas desde el pago, siempre que tenga todo el material.",
  },
  {
    numero: "06",
    titulo: "Revisiones",
    texto: "Máximo 2 intervenciones para pedir modificaciones.",
  },
  {
    numero: "07",
    titulo: "Entrega final",
    texto:
      "Aprobado el trabajo, hago las exportaciones finales y te entrego los archivos.",
  },
] as const;

/** Cursos: los dos están EN DESARROLLO. No se construye plataforma todavía. */
export const CURSOS = [
  {
    slug: "fl-studio-inicial",
    nombre: "Curso inicial de FL Studio",
    estado: "Disponible",
    resumen:
      "Para arrancar de cero. Dividido en capítulos, progresivo, desde las herramientas básicas hasta producir de forma autónoma.",
    contenidos: [
      "Introducción a FL Studio",
      "Interfaz y herramientas principales",
      "Creación de proyectos",
      "Channel Rack y Piano Roll",
      "Sampler y plugins",
      "MIDI, ritmos y patrones",
      "Organización del proyecto",
      "Introducción a la mezcla",
      "Flujo de trabajo",
    ],
  },
  {
    slug: "produccion-avanzada",
    nombre: "Curso avanzado de producción musical",
    estado: "En desarrollo",
    resumen:
      "Para quienes ya tienen base y quieren profundizar. Incluye técnicas de producción que uso en mi propio trabajo.",
    contenidos: [
      "Arreglos y composición avanzada de beats",
      "Diseño sonoro y sound design",
      "Dirección vocal y producción de voces",
      "Afinación y edición vocal profesional",
      "Mezcla avanzada: EQ, compresión y automatizaciones",
      "Mastering y preparación para distribución",
      "Referencias sonoras y toma de decisiones creativas",
      "Flujo de trabajo profesional, de la idea a la publicación",
    ],
  },
] as const;
