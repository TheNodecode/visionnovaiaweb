// Bloques de venta propios de cada sector: oferta adaptada, ganchos de ejemplo, preguntas del filtro,
// primer mes, objeciones y la prueba (trabajo real en dental; «así grabamos» en el resto).
// Reglas: los anuncios son «Ejemplo de enfoque», la ficha del contacto es «Ejemplo», sin cifras ni resultados.
import type { SectorSlug } from './sectors';
import type { AdAngle, Phase, Qualify, SplitColumn } from './blocks';
import type { OfferId, OfferItem, Week, Objection, Step } from './offer';

/** Bloques que puede componer una página de sector; `order` decide la secuencia de cada una. */
export type SectorBlock = 'signature' | 'pains' | 'offer' | 'angles' | 'qualify' | 'demo' | 'proof' | 'firstMonth' | 'roi' | 'guarantee' | 'objections';

export type SectorSignature =
  | { kind: 'split'; id: string; eyebrow: string; titleHtml: string; lead: string; columns: [SplitColumn, SplitColumn]; joiner?: string; note?: string }
  | { kind: 'phases'; id: string; eyebrow: string; titleHtml: string; lead: string; phases: Phase[]; note?: string };

export type SectorSales = {
  /** Secuencia de bloques de la página (cada sector la suya). */
  order: SectorBlock[];
  /** Bloque que solo tiene ese sector. */
  signature?: SectorSignature;
  /** Titular propio para la demo de la IA. */
  demo?: { titleHtml: string; lead: string };
  /** Partida de la oferta que va primero. */
  offerFirst?: OfferId;
  /** Anunciante genérico en la maqueta de anuncios. */
  brand: string;
  offer: { titleHtml: string; lead: string; patch: Partial<Record<OfferId, Partial<Omit<OfferItem, 'id'>>>> };
  angles: { lead: string; note: string; items: AdAngle[] };
  qualify: Qualify & { note?: string };
  firstMonth: { lead: string; weeks: (Partial<Week> | undefined)[] };
  /** Cuatro propias; la plantilla añade las de la garantía y el precio. */
  objections: Objection[];
  proof:
    | { kind: 'real'; titleHtml: string; lead: string; steps: Step[] }
    | { kind: 'bts'; titleHtml: string; lead: string };
};

export const SECTOR_SALES: Record<SectorSlug, SectorSales> = {
  // ───────────────────────────── Clínicas dentales
  'clinicas-dentales': {
    order: ['pains', 'proof', 'demo', 'offer', 'angles', 'qualify', 'firstMonth', 'roi', 'guarantee', 'objections'],
    brand: 'Tu clínica dental',
    offer: {
      titleHtml: 'NovaScale para <span class="text-gold">clínicas dentales.</span>',
      lead: 'Lo mismo que montamos en cualquier negocio, pensado para una clínica: el doctor delante de la cámara, anuncios para tratamientos de importe alto y una IA que sabe hasta dónde puede hablar y cuándo pasarle el paciente a recepción.',
      patch: {
        grabacion: {
          title: 'Una jornada de grabación al mes en tu clínica',
          outcome: 'Grabamos a tus doctores en gabinete, en recepción y en la sala de espera, con guiones sobre las dudas que oyes cada semana: implantes, ortodoncia y primera visita.',
          tags: ['Doctores a cámara', 'Gabinete y recepción', 'Subtítulos'],
        },
        redes: { outcome: 'Quien te encuentra en Instagram ve a tu equipo explicando tratamientos, no sonrisas sacadas de un banco de imágenes.' },
        ads: {
          title: 'Campañas de Meta Ads por tratamiento',
          outcome: 'Una campaña para cada tratamiento que quieras empujar, dirigida a tu zona y escrita sin prometer resultados clínicos.',
        },
        whatsapp: { outcome: 'Contesta también a las diez de la noche a quien pregunta por alineadores, y está configurada para hacerle las preguntas de tu recepción y proponerle una primera visita.' },
        voz: { outcome: 'Las llamadas que entran en plena consulta, mientras recepción cobra o confirma citas, se atienden y quedan apuntadas.' },
        crm: { outcome: 'Cada paciente potencial con su tratamiento de interés, su plazo y el anuncio del que viene, y también los presupuestos que siguen sin respuesta.' },
        aviso: { outcome: 'Si alguien escribe por un dolor, una urgencia o una duda clínica, la IA está configurada para no opinar y avisar a tu equipo al momento.' },
      },
    },
    angles: {
      lead: 'En una clínica no vende la oferta más agresiva, vende la confianza en quien te va a tratar. Así enfocaríamos tus primeros anuncios, siempre con tu doctor delante de la cámara.',
      note: 'Son ejemplos de enfoque, no campañas publicadas. En publicidad sanitaria no prometemos resultados clínicos, y cada texto lo revisa tu clínica antes de salir.',
      items: [
        {
          hook: 'Antes de decidir nada, te enseño cómo es una primera visita aquí.',
          angle: 'Quitar el miedo a lo desconocido: qué pasa desde que entras hasta que sales.',
          format: 'Reel de 30 a 40 segundos con el doctor en el gabinete.',
          audience: 'Gente de tu zona que lleva tiempo aplazando ir al dentista.',
        },
        {
          hook: '¿Implantes? Las tres preguntas que deberías hacer en cualquier clínica.',
          angle: 'Educar antes de vender: quien compara llega mejor informado y te elige por criterio.',
          format: 'Vídeo a cámara con subtítulos y tres cortes.',
          audience: 'Personas que ya están pidiendo presupuestos de implantes.',
        },
        {
          hook: 'Así planificamos un tratamiento con alineadores, paso a paso.',
          angle: 'Enseñar el proceso real en lugar de prometer el resultado.',
          format: 'Historia en varias partes desde la consulta de ortodoncia.',
          audience: 'Adultos que se plantean una ortodoncia invisible.',
        },
      ],
    },
    qualify: {
      lead: 'Recepción no tiene tiempo de hacer cinco preguntas a cada persona que escribe. La IA sí, con tu tono y a cualquier hora. Estas son las que dejaríamos configuradas en una clínica dental:',
      questions: [
        { q: '¿Qué tratamiento te interesa o qué te gustaría mejorar?', why: 'Separa a quien busca una limpieza de quien viene por un implante o una ortodoncia, que necesitan otra conversación.' },
        { q: '¿Es para ti o para alguien de tu familia?', why: 'Cambia quién vendrá a la cita y, si es un menor, quién tiene que acompañarle.' },
        { q: '¿Te has hecho ya alguna valoración o tienes presupuesto de otra clínica?', why: 'Quien ya compara necesita que le expliquen la diferencia, no la información básica.' },
        { q: '¿Cuándo te gustaría empezar?', why: 'Marca la urgencia real y ayuda a recepción a decidir a quién llama primero.' },
        { q: '¿Qué día y qué franja te vienen mejor para la primera visita?', why: 'Con eso la IA propone huecos concretos en lugar de dejar la conversación abierta.' },
      ],
      card: {
        name: 'Marta G.',
        source: 'WhatsApp · anuncio de implantes · 22:14',
        fields: [
          { k: 'Tratamiento', v: 'Implante en una pieza' },
          { k: 'Para', v: 'Ella misma' },
          { k: 'Comparando', v: 'Tiene presupuesto de otra clínica' },
          { k: 'Plazo', v: 'Este mes' },
          { k: 'Cita', v: 'Jueves, 17:30 (propuesta)' },
        ],
        status: 'Filtrada · lista para que recepción confirme',
      },
      note: 'La IA no diagnostica ni da precios médicos cerrados: las consultas clínicas pasan a tu equipo.',
    },
    firstMonth: {
      lead: 'Así es el primer mes en una clínica dental, sin parar la agenda de tus doctores.',
      weeks: [
        { text: 'Revisamos cómo se atienden hoy las llamadas en recepción, qué tratamientos quieres empujar y cómo se sigue cada presupuesto. Con eso escribimos los guiones.', deliverable: 'Guiones revisados por el doctor' },
        { title: 'Grabación en la clínica', text: 'Grabamos entre pacientes, en los huecos que nos marques: el doctor en gabinete, recepción y la sala de espera. Nadie tiene que anular citas.' },
        { text: 'Salen las campañas por tratamiento. La IA contesta WhatsApp con la información que ha aprobado la clínica y el agente de voz coge las llamadas que recepción no puede atender.' },
        { text: 'Recepción empieza a llamar a pacientes que ya han dicho qué tratamiento buscan y cuándo quieren empezar. Cerramos con el primer informe, tratamiento a tratamiento.' },
      ],
    },
    objections: [
      {
        q: 'Mis pacientes vienen por recomendación.',
        short: 'Y seguirán viniendo: el boca a boca no se toca.',
        a: 'Lo que añadimos es que quien busca clínica en tu zona sin que nadie se la recomiende vea a tu equipo antes que a la competencia. Y que el paciente recomendado que escribe a deshoras reciba respuesta al momento.',
      },
      {
        q: 'No quiero parecer una clínica de ofertas.',
        short: 'Nosotros tampoco: no hacemos campañas de revisión a precio de saldo.',
        a: 'Los anuncios se apoyan en tus doctores explicando cómo trabajan. Atraen a menos curiosos y a más gente con un motivo real para venir, que es lo que necesita un tratamiento de importe alto.',
      },
      {
        q: 'La publicidad sanitaria es delicada.',
        short: 'Lo es, y por eso nada sale sin que lo revise la clínica.',
        a: 'Escribimos sin prometer resultados clínicos ni usar comparativas engañosas, respetamos las normas de Meta y adaptamos los textos a lo que exija tu comunidad autónoma.',
      },
      {
        q: 'Mi recepción ya va a tope.',
        short: 'Precisamente por eso el filtro lo hace la IA.',
        a: 'Recepción deja de contestar cada mensaje y de repetir las mismas explicaciones. Le llegan los pacientes con el tratamiento, el plazo y una cita propuesta, y solo tiene que confirmar.',
      },
    ],
    proof: {
      kind: 'real',
      titleHtml: 'Lo que ya hacemos para <span class="text-gold">una clínica dental como la tuya.</span>',
      lead: 'CEM Valderas es cliente actual: grabamos a su doctor y llevamos sus anuncios. Esto es lo que se ve hoy en su Instagram, sin retocar nada para esta web.',
      steps: [
        { title: 'El doctor explica, no vende', text: 'Cada vídeo responde a una duda concreta de sus pacientes, contada por quien va a hacer el tratamiento.' },
        { title: 'Grabado en su propia clínica', text: 'Recepción, despacho y consulta: el paciente ve el sitio al que va a ir antes de pedir cita.' },
        { title: 'Del vídeo al anuncio con botón de reserva', text: 'Las mismas piezas salen en historias y reels como anuncios, con un botón para pedir cita sin pasos de más.' },
      ],
    },
  },

  // ───────────────────────────── Medicina estética
  'medicina-estetica': {
    order: ['pains', 'signature', 'demo', 'qualify', 'angles', 'offer', 'firstMonth', 'proof', 'roi', 'guarantee', 'objections'],
    signature: {
      kind: 'split',
      id: 'tratamiento-explicado',
      eyebrow: 'El tratamiento, explicado',
      titleHtml: 'Qué responde la IA <span class="text-gold">y qué pasa a la doctora.</span>',
      lead: 'En medicina estética la línea está clara: la IA resuelve lo práctico y acerca la valoración; todo lo que tenga que ver con la salud o el caso concreto de cada paciente lo responde una profesional.',
      joiner: 'o',
      columns: [
        {
          icon: 'chat', label: 'Lo contesta la IA', title: 'Las dudas prácticas',
          text: 'Con la información que ha aprobado tu clínica, a cualquier hora.',
          items: ['Cómo es una primera valoración y cuánto dura.', 'Horarios, dirección y cómo llegar.', 'Qué tratamientos ofrece la clínica, en términos generales.', 'Cómo reservar, cambiar o anular una cita.'],
        },
        {
          icon: 'users', label: 'Pasa a la profesional', title: 'Todo lo que es médico',
          text: 'La IA está configurada para no responder estas preguntas y avisar a tu equipo al momento.',
          items: ['Si un tratamiento es adecuado para su caso.', 'Contraindicaciones, medicación o embarazo.', 'Molestias o dudas después de un tratamiento.', 'Un precio cerrado sin haber pasado por valoración.'],
        },
      ],
      note: 'Las dos listas se cierran contigo antes de activar la IA, y puedes moverlas cuando quieras.',
    },
    brand: 'Tu clínica estética',
    offer: {
      titleHtml: 'NovaScale para <span class="text-gold">medicina estética.</span>',
      lead: 'Pensado para una clínica que quiere que la elijan por su equipo médico y no por el descuento del mes: contenido que explica, anuncios que dan confianza y una IA que convierte cada consulta de precio en una valoración.',
      patch: {
        grabacion: {
          title: 'Una jornada de grabación al mes en tu clínica estética',
          outcome: 'Grabamos a la doctora y al equipo contando cómo valoran, cómo preparan la cabina y qué no recomiendan nunca sin ver antes al paciente.',
          tags: ['Equipo médico', 'Cabina', 'Consentimientos'],
        },
        redes: { outcome: 'Un perfil que, además de verse bien, explica quién te va a tratar, qué formación tiene y cómo es una primera valoración.' },
        ads: {
          title: 'Campañas de Meta Ads por tratamiento y temporada',
          outcome: 'Anuncios para los tratamientos que quieras mover en cada época, con tu equipo dando la cara y sin entrar en la guerra de precios.',
        },
        whatsapp: { outcome: 'A quien pregunta «¿cuánto cuesta?» a medianoche le contesta con lo que tú hayas aprobado: está configurada para proponer una valoración en vez de soltar un precio.' },
        crm: { outcome: 'Cada consulta con el tratamiento que le interesa, si se ha tratado antes y en qué punto está: valoración propuesta, hecha o pendiente.' },
        aviso: { outcome: 'Ante una pregunta médica o el mensaje de alguien preocupado tras un tratamiento, la IA está configurada para no responder en automático y avisar a tu equipo al instante.' },
      },
    },
    angles: {
      lead: 'En estética el paciente compara durante semanas. Los anuncios que proponemos no compiten en precio: hacen que llegue a la valoración conociendo ya a tu equipo.',
      note: 'Son ejemplos de enfoque, no anuncios publicados. Sin antes y después sin consentimiento, sin promesas de resultado y con la revisión de tu equipo médico antes de publicar.',
      items: [
        {
          hook: 'Lo que revisamos en una primera valoración, y por qué no recomendamos nada sin ella.',
          angle: 'Autoridad médica: el criterio por delante del tratamiento.',
          format: 'Reel con la doctora en consulta, subtitulado.',
          audience: 'Personas que llevan tiempo mirando perfiles de clínicas en tu ciudad.',
        },
        {
          hook: 'Tres mitos sobre los tratamientos faciales que oímos cada semana.',
          angle: 'Resolver dudas en lugar de vender: abre conversación y comentarios.',
          format: 'Vídeo corto en tres cortes, uno por mito.',
          audience: 'Público de tu zona interesado en el cuidado facial.',
        },
        {
          hook: 'Así preparamos la cabina antes de cada paciente.',
          angle: 'Enseñar protocolo e higiene: lo que nadie muestra y todo el mundo valora.',
          format: 'Historia detrás de cámaras con el equipo.',
          audience: 'Quien ya ha visitado tu perfil y todavía no ha reservado.',
        },
      ],
    },
    qualify: {
      lead: 'La mayoría de mensajes empiezan con un precio. La IA está configurada para no quedarse ahí: pregunta lo justo para que la valoración tenga sentido y la propone.',
      questions: [
        { q: '¿Qué zona o qué te gustaría tratar?', why: 'Orienta la valoración y evita que la doctora empiece de cero en la consulta.' },
        { q: '¿Te has hecho antes algún tratamiento parecido?', why: 'Quien repite sabe lo que busca; quien empieza necesita más explicación y más confianza.' },
        { q: '¿Tienes alguna fecha o algún evento en mente?', why: 'Una boda o el verano marcan el plazo y permiten planificar con margen.' },
        { q: '¿Te va bien pasar por una valoración con la doctora?', why: 'Convierte la pregunta de precio en una cita, que es donde se decide de verdad.' },
      ],
      card: {
        name: 'Laura M.',
        source: 'Instagram · anuncio de valoración facial · 23:40',
        fields: [
          { k: 'Quiere tratar', v: 'Manchas en la cara' },
          { k: 'Antes', v: 'Nunca se las ha tratado' },
          { k: 'Fecha', v: 'Antes del verano' },
          { k: 'Valoración', v: 'Martes, 12:00 (propuesta)' },
        ],
        status: 'Filtrada · valoración pendiente de confirmar',
      },
      note: 'Nuestra IA no hace diagnósticos ni cierra precios de tratamientos médicos; cualquier pregunta clínica la deriva a tu equipo.',
    },
    firstMonth: {
      lead: 'El primer mes en una clínica estética, con la agenda de cabina siempre por delante.',
      weeks: [
        { text: 'Revisamos tu perfil, qué contesta hoy recepción cuando le preguntan precios y qué tratamientos quieres impulsar esta temporada, y de ahí salen los guiones.' },
        { title: 'Grabación con tu equipo médico', text: 'Grabamos a la doctora y al equipo en consulta y en cabina, sin pacientes salvo que haya un consentimiento firmado.' },
        { text: 'Salen los anuncios de valoración. La IA atiende Instagram y WhatsApp con las respuestas aprobadas, y cada consulta entra en CRM Nova.' },
        { text: 'Tu equipo empieza a confirmar valoraciones de personas que ya han contado qué quieren tratar y para cuándo. Primer informe por tratamiento.' },
      ],
    },
    objections: [
      {
        q: 'Mi clientela ya me encuentra por Instagram.',
        short: 'Entonces ya sabes que allí se decide casi todo.',
        a: 'Lo que solemos ver es un perfil cuidado que no explica quién trata ni cómo, y mensajes de precio que nadie convierte en cita. Grabamos al equipo para lo primero y dejamos a la IA con lo segundo.',
      },
      {
        q: 'No quiero bajar precios para competir.',
        short: 'No te lo vamos a pedir.',
        a: 'Los anuncios giran en torno a la valoración con tu equipo médico, no al descuento. Atraen a menos gente que solo compara cifras y a más gente que busca en quién confiar.',
      },
      {
        q: '¿Y las fotos de antes y después?',
        short: 'Se usan poco, con cuidado y solo con consentimiento.',
        a: 'Las normas sanitarias y las de Meta limitan mucho cómo se enseñan. La confianza la construimos con el equipo, el proceso y las explicaciones, que no dependen de mostrar a ningún paciente.',
      },
      {
        q: 'La gente escribe y luego no viene.',
        short: 'Por eso la conversación acaba en una valoración propuesta.',
        a: 'La IA está configurada para no quedarse en la respuesta: pregunta lo necesario, propone día y hora y deja la cita registrada. En CRM Nova ves quién ha confirmado y a quién toca recordárselo.',
      },
    ],
    proof: {
      kind: 'bts',
      titleHtml: 'Así grabaríamos <span class="text-gold">en tu clínica estética.</span>',
      lead: 'Vamos con guiones, luz y sonido, y grabamos a tu equipo en consulta y en cabina. La foto es de una jornada real; la lista, lo que prepararíamos para ti.',
    },
  },

  // ───────────────────────────── Inmobiliarias
  inmobiliarias: {
    order: ['signature', 'pains', 'offer', 'angles', 'qualify', 'demo', 'proof', 'firstMonth', 'roi', 'guarantee', 'objections'],
    signature: {
      kind: 'split',
      id: 'dos-frentes',
      eyebrow: 'Dos frentes',
      titleHtml: 'Compradores que deciden <span class="text-gold">y propietarios que venden.</span>',
      lead: 'Una inmobiliaria vive de los dos lados. Por eso el sistema trabaja ambos a la vez, con contenido, anuncios y preguntas distintas para cada uno.',
      joiner: 'y',
      columns: [
        {
          icon: 'target', label: 'Captar compradores', title: 'Que lleguen a la visita decididos',
          text: 'Para quien busca vivienda en tu zona y quiere ver el piso antes de llamar.',
          items: ['Grabamos recorridos en un solo plano de los inmuebles con más tirón.', 'Anunciamos cada piso a quien busca en ese barrio y en ese rango.', 'La IA pregunta uso, presupuesto, financiación y plazo.', 'Te llega una visita propuesta con esos datos recogidos.'],
        },
        {
          icon: 'users', label: 'Captar propietarios', title: 'Que te elijan para vender',
          text: 'Para quien se plantea vender y todavía no ha decidido con qué agencia.',
          items: ['Grabamos a tus agentes contando cómo preparan y venden una vivienda.', 'Anunciamos tu forma de trabajar a propietarios de tu zona.', 'La IA pregunta qué vivienda tienen, dónde y cuándo quieren vender.', 'Te llega un propietario listo para una visita de valoración.'],
        },
      ],
    },
    brand: 'Tu inmobiliaria',
    offer: {
      titleHtml: 'NovaScale para <span class="text-gold">inmobiliarias.</span>',
      lead: 'Pensado para una agencia que necesita dos cosas a la vez: compradores que lleguen a la visita con la financiación hablada y propietarios que te conozcan antes de decidir con quién vender.',
      patch: {
        grabacion: {
          title: 'Una jornada de grabación al mes en tus inmuebles',
          outcome: 'Recorridos en vídeo de los pisos con más tirón y piezas de marca con tus agentes, grabados en una sola jornada y con guion.',
          tags: ['Recorridos', 'Agentes a cámara', 'Barrio'],
        },
        redes: { outcome: 'Tu perfil deja de ser un escaparate de fotos: se ve quién lleva cada zona y cómo acompaña a quien compra o vende.' },
        ads: {
          title: 'Campañas para compradores y para propietarios',
          outcome: 'Dos frentes con tus vídeos: anuncios de inmuebles para quien busca y anuncios de captación para quien se plantea vender en tu zona.',
        },
        whatsapp: { outcome: 'Está configurada para responder al momento a quien escribe por el piso del anuncio y preguntarle para qué busca, en qué plazo y cómo piensa pagar.' },
        voz: { outcome: 'Las llamadas que entran mientras tus agentes enseñan pisos se atienden y quedan apuntadas, con el inmueble por el que preguntan.' },
        crm: { outcome: 'Cada contacto con el inmueble del que viene, si compra o vende, su plazo y su financiación. Sabes a quién enseñar el piso primero.' },
        aviso: { outcome: 'Si un comprador pide hablar ya con un agente, la IA está configurada para no retenerle y avisar al agente de esa zona al instante.' },
      },
    },
    angles: {
      lead: 'Una inmobiliaria anuncia dos cosas distintas: pisos para quien compra y confianza para quien vende. Así empezaríamos con cada una.',
      note: 'Ejemplos de enfoque, todavía sin publicar: los anuncios reales se hacen con inmuebles de tu cartera y con los datos que tú confirmes.',
      items: [
        {
          hook: 'Entra con nosotros: tres habitaciones y luz de mañana, sin moverte del sofá.',
          angle: 'El recorrido en un solo plano que deja ver el piso de verdad.',
          format: 'Reel vertical narrado por el agente que lo lleva.',
          audience: 'Compradores que buscan en ese barrio y en ese rango de precio.',
        },
        {
          hook: '¿Vas a vender tu casa este año? Esto es lo primero que miramos.',
          angle: 'Captar propietarios enseñando método antes de pedir la exclusiva.',
          format: 'Vídeo a cámara con el agente, dentro de una vivienda de tu cartera.',
          audience: 'Propietarios de tu zona que todavía no han elegido agencia.',
        },
        {
          hook: 'Lo que revisa un comprador primerizo antes de dar la señal.',
          angle: 'Ser útil antes de vender: quien aprende contigo vuelve contigo.',
          format: 'Carrusel o vídeo de un minuto con cinco puntos.',
          audience: 'Gente joven de tu ciudad que busca su primera vivienda.',
        },
      ],
    },
    qualify: {
      lead: 'Cada piso publicado trae decenas de «¿sigue disponible?». La IA hace las preguntas que tus agentes no tienen tiempo de hacer y solo les pasa a quien puede comprar.',
      questions: [
        { q: '¿Buscas para vivir o para invertir?', why: 'Cambia qué inmuebles enseñar y cómo hablarle a esa persona.' },
        { q: '¿En qué zona y con qué presupuesto aproximado?', why: 'Evita visitas a pisos que no encajan con lo que puede o quiere pagar.' },
        { q: '¿Tienes la financiación hablada con el banco?', why: 'Es la diferencia entre un comprador con prisa y alguien que solo está mirando.' },
        { q: '¿En qué plazo te gustaría mudarte?', why: 'Ayuda al agente a decidir a quién enseña el piso primero.' },
        { q: '¿Tienes que vender antes tu vivienda actual?', why: 'Si la respuesta es sí, también es un propietario al que puedes captar.' },
      ],
      card: {
        name: 'Javier R.',
        source: 'WhatsApp · anuncio del piso de tres habitaciones · 20:05',
        fields: [
          { k: 'Busca', v: 'Para vivir' },
          { k: 'Presupuesto', v: 'Dentro del rango del piso' },
          { k: 'Financiación', v: 'Hipoteca preaprobada' },
          { k: 'Plazo', v: 'Dos o tres meses' },
          { k: 'Vende antes', v: 'No' },
          { k: 'Visita', v: 'Sábado, 11:00 (propuesta)' },
        ],
        status: 'Filtrado · visita pendiente de confirmar con el agente',
      },
      note: 'Contesta con los datos de cartera que tú validas; lo que no sabe, se lo pasa al agente.',
    },
    firstMonth: {
      lead: 'El primer mes en una inmobiliaria: inmuebles grabados, dos campañas en marcha y agentes que dejan de enseñar pisos a ciegas.',
      weeks: [
        { text: 'Revisamos tu cartera, qué inmuebles tienen más tirón, cómo te llegan hoy los contactos de los portales y cómo se reparten entre tus agentes.' },
        { title: 'Grabación de inmuebles y agentes', text: 'En una jornada recorremos los pisos elegidos y grabamos a tus agentes presentando su zona, con las visitas ordenadas para no perder horas en desplazamientos.' },
        { text: 'Salen las campañas de compradores y de propietarios. La IA atiende cada mensaje con los datos del inmueble y cada contacto entra en CRM Nova con su origen.' },
        { text: 'Tus agentes llaman a compradores que ya han contado plazo y financiación, y a propietarios que han dicho qué quieren vender. Primer informe por campaña.' },
      ],
    },
    objections: [
      {
        q: 'Ya tengo los portales.',
        short: 'Y los vas a seguir teniendo.',
        a: 'Los portales traen a quien ya busca. Los anuncios con tus agentes llegan también a quien todavía no ha empezado y, sobre todo, a propietarios. Y la IA puede atender los mensajes de ambos lados.',
      },
      {
        q: 'Mis agentes no quieren salir en vídeo.',
        short: 'Empezamos con quien se sienta cómodo.',
        a: 'Para arrancar suele bastar con uno o dos agentes que den la cara; el resto puede aparecer en los recorridos sin hablar a cámara. Dirigimos cada toma con frases cortas.',
      },
      {
        q: 'Mi cartera cambia cada semana; la IA se quedará desfasada.',
        short: 'Solo contesta con lo que tú validas.',
        a: 'Cargamos los inmuebles que apruebas y acordamos contigo cómo se actualiza cuando entra o sale uno. Si le preguntan algo que no tiene, lo anota y avisa al agente.',
      },
      {
        q: 'Lo que me falta es producto, no compradores.',
        short: 'Entonces empezamos por los propietarios.',
        a: 'La campaña de captación se monta con tus agentes contando cómo trabajan una venta. La IA pregunta qué vivienda tienen y cuándo quieren vender antes de pasarte el contacto.',
      },
    ],
    proof: {
      kind: 'bts',
      titleHtml: 'Así grabaríamos <span class="text-gold">tu cartera y tu equipo.</span>',
      lead: 'Una jornada bien organizada da para varios inmuebles y para presentar a tus agentes. La foto es de un rodaje real; la lista, lo que prepararíamos en tu inmobiliaria.',
    },
  },

  // ───────────────────────────── Reformas y construcción
  reformas: {
    order: ['demo', 'signature', 'pains', 'offer', 'angles', 'qualify', 'firstMonth', 'proof', 'roi', 'guarantee', 'objections'],
    demo: {
      titleHtml: 'Mientras estás en obra, <span class="text-gold">el teléfono se atiende.</span>',
      lead: 'Escucha al agente de voz en una llamada de prueba para una constructora y mira cómo la IA filtra por WhatsApp una petición de reforma fuera de horario.',
    },
    offerFirst: 'voz',
    signature: {
      kind: 'phases',
      id: 'obra-en-fases',
      eyebrow: 'La obra en fases',
      titleHtml: 'Antes, durante y después: <span class="text-gold">tres momentos que venden.</span>',
      lead: 'Cada obra da contenido para semanas si se graba a tiempo. No hace falta esperar al resultado final: el proceso es lo que convence a quien duda.',
      phases: [
        {
          label: 'Antes', title: 'El punto de partida',
          text: 'El espacio tal y como está y lo que el cliente quiere cambiar. Es lo que reconoce quien vive con una cocina o un baño parecidos.',
          shots: ['Estado inicial', 'Medición', 'Lo que pide el cliente'],
        },
        {
          label: 'Durante', title: 'El oficio que no se ve',
          text: 'Instalaciones, impermeabilización, protección de la vivienda y limpieza diaria: lo que separa tu trabajo del presupuesto más barato.',
          shots: ['Instalaciones', 'Impermeabilización', 'Jefe de obra a cámara'],
        },
        {
          label: 'Después', title: 'El resultado, explicado',
          text: 'La obra terminada, con el encargado contando cada decisión: materiales, distribución y remates.',
          shots: ['Recorrido final', 'Detalles y remates', 'Antes y después'],
        },
      ],
      note: 'Siempre con permiso del propietario. Si prefiere no salir, grabamos el espacio y al equipo sin nada que identifique la vivienda.',
    },
    brand: 'Tu empresa de reformas',
    offer: {
      titleHtml: 'NovaScale para <span class="text-gold">empresas de reformas.</span>',
      lead: 'Pensado para quien pasa el día en obra: tus trabajos convertidos en anuncios, el teléfono atendido mientras tienes las manos ocupadas y cada petición de presupuesto filtrada antes de que muevas la furgoneta.',
      patch: {
        grabacion: {
          title: 'Una jornada de grabación al mes en tus obras',
          outcome: 'Grabamos tus obras en distintas fases y al jefe de obra explicando cada decisión, para que se vea cómo trabajáis y no solo el resultado.',
          tags: ['Obras en curso', 'Antes y después', 'Jefe de obra'],
        },
        redes: { outcome: 'Tus cocinas y baños terminados dejan de quedarse en el móvil del encargado y enseñan a quien te busca cómo trabajáis.' },
        ads: {
          title: 'Campañas de Meta Ads en el radio en el que trabajas',
          outcome: 'Anuncios con tus propias obras, limitados a la zona a la que te compensa desplazarte.',
        },
        whatsapp: { outcome: 'A quien pide presupuesto con una foto y dos líneas, la IA está configurada para preguntarle metros, tipo de trabajo, plazo y presupuesto aproximado antes de que vayas a medir.' },
        voz: {
          title: 'Agente de voz que atiende mientras estás en obra',
          outcome: 'Con la radial en la mano no se coge el móvil. El agente está configurado para atender, recoger qué necesitan y dejarte la llamada resumida.',
        },
        crm: { outcome: 'Cada petición con su tipo de obra, sus medidas, la población y el plazo. Decides de un vistazo a qué visitas merece la pena ir.' },
        aviso: { outcome: 'Si un cliente con obra en marcha necesita hablar contigo, o alguien pide algo fuera de lo habitual, te llega el aviso al momento.' },
      },
    },
    angles: {
      lead: 'En reformas nadie se fía de un render: se fía de obras reales y de quien las hace. Así enfocaríamos los primeros anuncios con tu propio material.',
      note: 'Ninguno de estos ganchos es una campaña publicada: los anuncios reales salen de tus obras, con permiso de cada propietario.',
      items: [
        {
          hook: 'Esta cocina no se tocaba desde hacía décadas. Te contamos cada decisión.',
          angle: 'El antes y el después con el porqué: oficio en lugar de fotos bonitas.',
          format: 'Reel con el encargado en la obra terminada.',
          audience: 'Propietarios de tu zona que se plantean reformar la cocina.',
        },
        {
          hook: 'Lo que no se ve en una reforma barata.',
          angle: 'Diferenciarte del presupuesto más bajo enseñando impermeabilización, instalaciones y remates.',
          format: 'Vídeo a mitad de obra, con tres planos cerrados.',
          audience: 'Gente que ya está pidiendo varios presupuestos.',
        },
        {
          hook: '¿Cuánto se tarda en reformar un baño? Te lo explica nuestro jefe de obra.',
          angle: 'Responder la duda de siempre con honestidad y plazos realistas.',
          format: 'Vídeo corto a cámara, en un baño en obra.',
          audience: 'Quien piensa reformar el baño en los próximos meses.',
        },
      ],
    },
    qualify: {
      lead: 'Antes de que alguien de tu equipo pierda una mañana midiendo, la IA hace por WhatsApp o por teléfono las preguntas que separan una obra real de una consulta de precio.',
      questions: [
        { q: '¿Qué quieres reformar y cuántos metros tiene, más o menos?', why: 'Distingue un cambio de grifería de una reforma integral y da una idea del tamaño del trabajo.' },
        { q: '¿En qué población está la vivienda o el local?', why: 'Si cae fuera del radio en el que trabajas, lo sabes antes de comprometerte a ir.' },
        { q: '¿Para cuándo te gustaría tenerlo terminado?', why: 'Te dice si encaja en tu calendario de obras o si hay que hablar de fechas.' },
        { q: '¿Tienes pensado un presupuesto aproximado?', why: 'Evita preparar un presupuesto detallado para alguien que buscaba otra cosa.' },
        { q: '¿Nos puedes mandar unas fotos del espacio?', why: 'Con fotos claras llegas a la visita técnica sabiendo lo que te vas a encontrar.' },
      ],
      card: {
        name: 'Antonio L.',
        source: 'WhatsApp · anuncio de reforma de baño · 19:48',
        fields: [
          { k: 'Obra', v: 'Baño completo, unos 5 m²' },
          { k: 'Población', v: 'Dentro de tu radio' },
          { k: 'Plazo', v: 'Antes de Navidad' },
          { k: 'Presupuesto', v: 'Tiene una cifra pensada' },
          { k: 'Fotos', v: 'Enviadas' },
          { k: 'Visita', v: 'Lunes, 9:00 (propuesta)' },
        ],
        status: 'Filtrado · merece visita técnica',
      },
      note: 'Si no quieres que la IA hable de precios, la configuramos para que no lo haga: recoge los datos y te los deja ordenados.',
    },
    firstMonth: {
      lead: 'El primer mes en una empresa de reformas, organizado alrededor de tus obras y no al revés.',
      weeks: [
        { text: 'Revisamos qué tipo de obra quieres captar, en qué radio trabajas, qué fotos y vídeos tienes ya y cómo te llegan hoy las peticiones de presupuesto.' },
        { title: 'Grabación en tus obras', text: 'Vamos a una o varias obras en marcha y a alguna terminada, con permiso del propietario. Grabamos al equipo trabajando y al jefe de obra explicando cada fase.' },
        { text: 'Salen los anuncios en tu radio. La IA atiende cada petición por WhatsApp y el agente de voz coge las llamadas que entran mientras estás en obra.' },
        { text: 'Empiezas a decidir a qué visitas ir con las medidas, la población, el plazo y las fotos delante. Primer informe con las peticiones filtradas y las descartadas.' },
      ],
    },
    objections: [
      {
        q: 'Trabajo por boca a boca y no doy abasto.',
        short: 'Entonces no necesitas más contactos, sino mejores.',
        a: 'El filtro sirve justo para eso: elegir a qué obras vas. Puedes enfocar los anuncios en el tipo de trabajo que más te compensa y dejar que la IA descarte lo que no encaja.',
      },
      {
        q: 'No tengo tiempo para grabar, estoy en obra.',
        short: 'Grabamos en tu obra, mientras trabajas.',
        a: 'No hace falta parar: el equipo sigue con lo suyo y nosotros grabamos el proceso. Solo necesitamos unos minutos del jefe de obra para explicar lo que se está haciendo.',
      },
      {
        q: 'Mis clientes solo miran el precio.',
        short: 'Porque nadie les ha enseñado la diferencia.',
        a: 'Cuando alguien ha visto cómo trabajas por dentro, impermeabilización y remates incluidos, deja de compararte solo por la cifra final. Ese es el trabajo de los vídeos.',
      },
      {
        q: 'Me piden presupuestos que nunca firman.',
        short: 'Por eso preguntamos antes de que vayas.',
        a: 'La IA recoge medidas, población, plazo y fotos. Con esos datos decides si merece la visita, en lugar de descubrirlo después de haber perdido la mañana.',
      },
    ],
    proof: {
      kind: 'bts',
      titleHtml: 'Así grabaríamos <span class="text-gold">en tus obras.</span>',
      lead: 'Llegamos con el plan de rodaje hecho y grabamos sin frenar la obra. La foto es de una jornada real; estas son las piezas que prepararíamos con tu equipo.',
    },
  },
};
