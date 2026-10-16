// Bloques propios de cada página de servicio. Cada servicio tiene su composición en [slug].astro:
// contenido → jornada de rodaje, trabajo real y lo que te llevas; redes → calendario y bandeja;
// Meta Ads → anuncios reales y embudo; sistema IA → filtro, CRM y aviso; WhatsApp API → comparativa
// y «tu número es tuyo»; diseño web → qué hace cada parte de la web y dónde encaja.
// Todos cierran con la oferta compacta (el servicio va dentro de NovaScale) y la garantía.
import type { ServiceSlug } from './services';
import type { OfferId, OfferItem, Step } from './offer';
import type { CalendarPost, CompareRow, FunnelStep, Numbered, Point, PostKind, Qualify, ShootSlot, TriageItem } from './blocks';

export interface ServiceSales {
  /** Oferta compacta: el servicio de la página va primero, con su texto propio. */
  offer: { titleHtml: string; lead: string; first: OfferId; patch: Partial<Omit<OfferItem, 'id'>>; omit: OfferId };
  shootDay?: { titleHtml: string; lead: string; note: string; slots: ShootSlot[] };
  realWork?: { titleHtml: string; lead: string; steps: Step[] };
  calendar?: { titleHtml: string; lead: string; note: string; posts: CalendarPost[]; kinds: Partial<Record<PostKind, string>> };
  inbox?: { titleHtml: string; lead: string; bullets: string[]; items: TriageItem[] };
  adAnatomy?: { titleHtml: string; lead: string; notes: Numbered[] };
  funnel?: { eyebrow?: string; titleHtml: string; lead: string; note?: string; steps: FunnelStep[] };
  qualify?: Qualify;
  handoff?: { titleHtml: string; lead: string; triggers: string[]; alert: { title: string; text: string; context: string } };
  compare?: { titleHtml: string; lead: string; caption: string; columns: [string, string]; rows: CompareRow[]; note: string };
  statement?: { eyebrow: string; titleHtml: string; lead: string; points: Point[] };
  anatomy?: { titleHtml: string; lead: string; blocks: Numbered[] };
}

export const SERVICE_SALES: Record<ServiceSlug, ServiceSales> = {
  // ───────────────────────────── Creación de contenido
  'creacion-de-contenido': {
    offer: {
      titleHtml: 'El contenido, <span class="text-gold">dentro de un sistema que vende.</span>',
      lead: 'La grabación es la primera pieza de NovaScale. Sola, llena tus redes; con el resto del sistema, cada vídeo se convierte en anuncio, en conversación y en cliente filtrado.',
      first: 'grabacion',
      patch: { outcome: 'Cada mes te llevas los reels, las historias y los creativos para anuncios, grabados en tu local y editados para publicar.' },
      omit: 'informe',
    },
    shootDay: {
      titleHtml: 'Así es un día de rodaje <span class="text-gold">en tu negocio.</span>',
      lead: 'Una jornada de grabación no es improvisar con el móvil. Llegamos con todo decidido y la repartimos en bloques cortos para que tu negocio siga funcionando.',
      note: 'Horario de ejemplo: lo ajustamos a tus horas más tranquilas y a lo que toque grabar ese mes.',
      slots: [
        { time: '09:00', title: 'Llegada y montaje', text: 'Cámara, luz y micrófonos de solapa en el rincón que elegimos en el plan de rodaje. En media hora está todo listo y sin cables por medio.' },
        { time: '09:30', title: 'Las piezas a cámara', text: 'Primero lo que exige más concentración: quien habla a cámara graba sus guiones en frases cortas, con nosotros dirigiendo y repitiendo lo que haga falta.' },
        { time: '11:30', title: 'Tu negocio en marcha', text: 'Grabamos el día a día real: el equipo atendiendo, el servicio en proceso y los detalles. Es el material que da vida a los reels y a los anuncios.' },
        { time: '13:00', title: 'Versiones para anuncios', text: 'De cada idea sacamos varios arranques y llamadas a la acción distintas, para que en Meta Ads se pueda probar qué conecta mejor.' },
        { time: '14:00', title: 'Recogemos y nos vamos', text: 'Dejamos el local como estaba. La edición empieza al día siguiente y las primeras piezas te llegan para revisarlas antes de publicar.' },
      ],
    },
    realWork: {
      titleHtml: 'Lo que sale de esas jornadas, <span class="text-gold">en un cliente real.</span>',
      lead: 'Estos vídeos los grabamos en la clínica de CEM Valderas, cliente actual: el doctor a cámara, su consulta de fondo y subtítulos para verlos sin sonido.',
      steps: [
        { title: 'Un guion por cada duda', text: 'Antes de ir escribimos qué va a contar en cada vídeo, a partir de lo que de verdad le preguntan sus pacientes.' },
        { title: 'Tres espacios, una jornada', text: 'Recepción, despacho y consulta en el mismo día, para tener variedad de planos sin volver otra vez.' },
        { title: 'Editado para el móvil', text: 'Formato vertical, arranque directo y subtítulos grandes: cada pieza está pensada para verse con el pulgar, no en una pantalla de cine.' },
      ],
    },
  },

  // ───────────────────────────── Gestión de redes sociales
  'gestion-redes-sociales': {
    offer: {
      titleHtml: 'Tus redes, <span class="text-gold">conectadas al resto del sistema.</span>',
      lead: 'Gestionar redes es una parte de NovaScale. Lo que publicamos sale del rodaje mensual, los mensajes que llegan los filtra la IA y lo que funciona en orgánico pasa a anuncios.',
      first: 'redes',
      patch: { outcome: 'Calendario mensual aprobado por ti, publicación, respuesta a comentarios y privados, y la IA separando a quien quiere comprar.' },
      omit: 'voz',
    },
    calendar: {
      titleHtml: 'Un mes de tus redes, <span class="text-gold">aprobado de una vez.</span>',
      lead: 'Te enviamos el mes completo antes de que empiece: qué se publica, qué día y para qué. Lo revisas, nos dices qué cambiar y a partir de ahí no tienes que pensar en qué subir.',
      note: 'Ejemplo orientativo: el número y el tipo de publicaciones se fijan en tu propuesta, según tu negocio.',
      posts: [
        { day: 1, kind: 'Reel', title: 'Presentación del equipo' },
        { day: 3, kind: 'Carrusel', title: 'Las dudas que más nos hacéis' },
        { day: 5, kind: 'Historia', title: 'Detrás de cámaras del rodaje' },
        { day: 8, kind: 'Reel', title: 'Un servicio explicado en 30 segundos' },
        { day: 10, kind: 'Carrusel', title: 'Qué incluye y qué no' },
        { day: 12, kind: 'Historia', title: 'Encuesta: ¿qué quieres ver?' },
        { day: 15, kind: 'Reel', title: 'Respuesta a una pregunta real' },
        { day: 17, kind: 'Carrusel', title: 'Lo que conviene saber antes de venir' },
        { day: 19, kind: 'Historia', title: 'Un día normal en el local' },
        { day: 22, kind: 'Reel', title: 'El proceso de principio a fin' },
        { day: 24, kind: 'Carrusel', title: 'Mitos de tu sector, aclarados' },
        { day: 26, kind: 'Historia', title: 'Recordatorio: cómo pedir cita' },
      ],
      kinds: {
        Reel: 'Vídeos verticales del rodaje mensual, con subtítulos y un arranque pensado para los primeros segundos.',
        Carrusel: 'Varias imágenes con texto para explicar un servicio o resolver dudas: se guardan y se comparten.',
        Historia: 'El día a día, encuestas y recordatorios, para que el perfil siga vivo entre publicación y publicación.',
      },
    },
    inbox: {
      titleHtml: 'Contestamos a todos. <span class="text-gold">Te pasamos a quien quiere comprar.</span>',
      lead: 'La gestión de redes no acaba al publicar. Respondemos comentarios y mensajes privados, y la IA separa las oportunidades de venta del resto de la bandeja.',
      bullets: [
        'Respuesta a comentarios con el tono de tu marca, sin dejar preguntas colgadas.',
        'Mensajes privados atendidos al momento con la información que tú apruebas.',
        'Las oportunidades entran en CRM Nova con la conversación completa.',
        'Las quejas y los temas delicados pasan siempre a una persona de tu equipo.',
      ],
      items: [
        { from: 'Carla', text: '¿Cuánto cuesta y tenéis hueco esta semana?', tag: 'Oportunidad', action: 'Responde con lo aprobado, pide sus datos y la manda a CRM Nova como posible cliente.' },
        { from: 'Diego', text: '¿Abrís los sábados por la mañana?', tag: 'Duda', action: 'Contesta con tu horario al momento, sin que nadie del equipo tenga que intervenir.' },
        { from: 'Nuria', text: '¡Qué bien quedó! Enhorabuena al equipo.', tag: 'Comentario', action: 'Agradecemos el comentario con el tono de tu marca.' },
        { from: 'Raúl', text: 'Tuve un problema con mi última cita y nadie me ha llamado.', tag: 'Para una persona', action: 'Está configurada para no responder en automático: te avisa al instante para que lo lleve alguien de tu equipo.' },
      ],
    },
  },

  // ───────────────────────────── Meta Ads
  'publicidad-meta-ads': {
    offer: {
      titleHtml: 'Los anuncios, <span class="text-gold">con todo lo que los hace rentables.</span>',
      lead: 'Una campaña sin buen contenido ni respuesta rápida se queda en clics caros. Por eso Meta Ads va dentro de NovaScale, junto a la grabación, la IA y el CRM.',
      first: 'ads',
      patch: { outcome: 'Estrategia, montaje y optimización semanal de tus campañas, con creativos grabados en tu negocio y la inversión pagada por ti directamente a Meta.' },
      omit: 'redes',
    },
    adAnatomy: {
      titleHtml: 'Anuncios que ya están en marcha, <span class="text-gold">y por qué están hechos así.</span>',
      lead: 'Llevamos los anuncios de CEM Valderas, una clínica dental que es cliente actual. Estas son sus creatividades tal y como las ve un paciente en Instagram.',
      notes: [
        { title: 'El gancho en la primera línea', text: 'Lo primero que se lee es lo que el paciente quiere conseguir, no el nombre de la clínica.' },
        { title: 'Una cara conocida', text: 'El doctor habla a cámara en su propia consulta: quien ve el anuncio ya sabe quién le va a atender.' },
        { title: 'Un solo paso siguiente', text: 'Cada anuncio termina en una acción concreta, reservar o escribir, sin pasos de más.' },
      ],
    },
    funnel: {
      titleHtml: 'Del anuncio a la cita, <span class="text-gold">sin que nadie se pierda por el camino.</span>',
      lead: 'La mayoría de campañas se miden hasta el clic. Nosotros seguimos a cada contacto hasta que tiene una cita en tu agenda, porque ahí es donde se gana o se pierde lo invertido.',
      note: 'Así se ve qué campañas traen clientes y cuáles solo traen clics: cada cita queda unida en CRM Nova al anuncio del que salió.',
      steps: [
        { icon: 'megaphone', title: 'Anuncio', text: 'Tus vídeos en Facebook e Instagram, para la gente de tu zona que encaja con tu cliente.' },
        { icon: 'chat', title: 'WhatsApp o llamada', text: 'El anuncio abre una conversación de WhatsApp o una llamada, sin formularios largos de por medio.' },
        { icon: 'target', title: 'La IA filtra', text: 'Responde en menos de 60 segundos y pregunta necesidad, plazo e intención antes de pasarte a nadie.' },
        { icon: 'crm', title: 'CRM Nova', text: 'El contacto queda registrado con el anuncio del que viene y todo lo que ha contestado.' },
        { icon: 'calendar', title: 'Cita', text: 'Quien está listo sale con día y hora propuestos. Tu equipo confirma y atiende.' },
      ],
    },
  },

  // ───────────────────────────── Sistema IA
  'sistema-ia': {
    offer: {
      titleHtml: 'La IA, <span class="text-gold">con contactos que atender desde el primer día.</span>',
      lead: 'Puedes usar Nova por tu cuenta, pero rinde más dentro de NovaScale: el contenido y los anuncios traen las conversaciones y la IA las convierte en citas filtradas.',
      first: 'whatsapp',
      patch: { outcome: 'Contesta en menos de 60 segundos, a cualquier hora, con las respuestas que tú apruebas, y está configurada para proponer cita a quien está listo.' },
      omit: 'informe',
    },
    qualify: {
      lead: 'Las preguntas se configuran para cada negocio. Estas son las que casi nunca faltan, y lo que gana tu equipo con cada una:',
      questions: [
        { q: '¿Qué necesitas resolver exactamente?', why: 'Tu equipo empieza la llamada sabiendo de qué va, sin repetir preguntas.' },
        { q: '¿Para cuándo lo necesitas?', why: 'Distingue a quien tiene prisa de quien se está informando para dentro de un año.' },
        { q: '¿Has hablado ya con otros profesionales?', why: 'Quien ya compara necesita otro tipo de conversación, y conviene saberlo antes.' },
        { q: '¿Desde qué zona nos escribes?', why: 'Si atiendes en un radio concreto, sabes antes si esa persona puede venir.' },
        { q: '¿Te va bien que te propongamos un día y una hora?', why: 'Convierte el interés en una cita concreta antes de que se enfríe.' },
      ],
      card: {
        name: 'Elena P.',
        source: 'Llamada perdida retomada por WhatsApp · 21:40',
        fields: [
          { k: 'Necesita', v: 'Tu servicio principal' },
          { k: 'Plazo', v: 'Las próximas dos semanas' },
          { k: 'Comparando', v: 'Sí, con otro centro' },
          { k: 'Zona', v: 'A diez minutos' },
          { k: 'Cita', v: 'Viernes, 10:00 (propuesta)' },
        ],
        status: 'Filtrada · enviada a tu equipo con la conversación',
      },
    },
    handoff: {
      titleHtml: 'Cuándo la IA se aparta <span class="text-gold">y te pasa el mando.</span>',
      lead: 'Nova no intenta resolverlo todo. Está configurada para reconocer las conversaciones que necesitan a una persona y, en esos casos, deja de responder y te avisa al momento con todo el contexto.',
      triggers: [
        'El cliente pide hablar con alguien del equipo.',
        'Llega una queja o un cliente molesto.',
        'Le preguntan algo que no está en la información aprobada.',
        'Hay una duda delicada: salud, dinero o un caso personal.',
        'Alguien listo para cerrar pide condiciones especiales.',
        'Tú decides tomar el chat en cualquier momento.',
      ],
      alert: {
        title: 'Marta necesita hablar con una persona',
        text: 'Pregunta por un caso que no está en la información aprobada.',
        context: 'Viene del anuncio de este mes · ya ha dado su plazo y su zona',
      },
    },
  },

  // ───────────────────────────── WhatsApp Business API
  'whatsapp-business-api': {
    offer: {
      titleHtml: 'WhatsApp, <span class="text-gold">conectado a todo lo demás.</span>',
      lead: 'La API oficial es la base técnica. Lo que la convierte en clientes es lo que va encima: anuncios que abren conversaciones, una IA que las atiende y un CRM donde no se pierde ninguna.',
      first: 'whatsapp',
      patch: {
        title: 'WhatsApp Business API oficial con IA',
        outcome: 'Migración de tu número, bandeja compartida para tu equipo y una IA que responde en menos de 60 segundos con tus respuestas aprobadas.',
      },
      omit: 'redes',
    },
    compare: {
      titleHtml: 'App de WhatsApp Business <span class="text-gold">o API oficial.</span>',
      lead: 'Las dos son de Meta. La diferencia está en cuánta gente te escribe y cuántas personas tienen que atender: la app se queda corta en cuanto crece cualquiera de las dos cosas.',
      caption: 'Comparativa entre la app de WhatsApp Business y la WhatsApp Business API oficial',
      columns: ['App de WhatsApp Business', 'WhatsApp Business API oficial'],
      rows: [
        { feature: 'Pensada para', a: 'Un negocio pequeño que contesta desde el móvil.', b: 'Negocios con volumen de mensajes y un equipo que atiende.' },
        { feature: 'Quién atiende', a: 'El móvil principal y unos pocos dispositivos vinculados.', b: 'Una bandeja compartida para todo el equipo, desde el ordenador o el móvil.' },
        { feature: 'IA y automatización', a: 'Respuestas rápidas, saludo y mensaje de ausencia.', b: 'Una IA conectada que responde, cualifica y propone cita.' },
        { feature: 'Escribir tú primero', a: 'Listas de difusión, que solo llegan a quien tiene tu número guardado.', b: 'Plantillas aprobadas por Meta para recordatorios y seguimientos a quien te dio permiso.' },
        { feature: 'Historial y CRM', a: 'Las conversaciones se quedan en el teléfono.', b: 'Cada conversación se guarda en CRM Nova, unida a la ficha del cliente.' },
        { feature: 'Coste de Meta', a: 'La app es gratuita.', b: 'Meta cobra algunos mensajes, sobre todo las plantillas que inicias tú.' },
        { feature: 'Tu número', a: 'Tuyo.', b: 'Tuyo también, registrado a nombre de tu empresa.' },
      ],
      note: 'Resumen orientativo de cómo funciona cada opción hoy. Meta actualiza sus condiciones y sus tarifas; antes de empezar te contamos las vigentes.',
    },
    statement: {
      eyebrow: 'Sin letra pequeña',
      titleHtml: 'Tu número <span class="text-gold">es tuyo.</span>',
      lead: 'Es la primera duda de casi todo el mundo, así que la dejamos clara antes que nada.',
      points: [
        { icon: 'phone', title: 'A nombre de tu empresa', text: 'Usamos tu número de siempre o uno nuevo, y queda registrado en la cuenta de Meta de tu negocio, no en la nuestra.' },
        { icon: 'shield', title: 'Si un día lo dejamos, se queda contigo', text: 'El número sigue siendo tuyo cuando dejemos de trabajar juntos, y puedes seguir usándolo como quieras.' },
        { icon: 'crm', title: 'Tus clientes no dependen de nosotros', text: 'El historial de conversaciones queda en tu CRM, con acceso para las personas que tú autorices.' },
      ],
    },
  },

  // ───────────────────────────── Diseño web
  'diseno-web': {
    offer: {
      titleHtml: 'La web, <span class="text-gold">incluida en el montaje.</span>',
      lead: 'No hacemos webs sueltas. La tuya se construye al montar NovaScale, porque es donde aterrizan tus anuncios y tu contenido, y se ajusta mes a mes con lo que aprendemos de las campañas.',
      first: 'web',
      patch: { outcome: 'Diseñada para el móvil, con tu contenido real y con cada formulario y botón de WhatsApp conectado a CRM Nova.' },
      omit: 'voz',
    },
    anatomy: {
      titleHtml: 'Cada parte de la web <span class="text-gold">tiene un trabajo.</span>',
      lead: 'Quien llega desde un anuncio decide en segundos si se queda. Por eso la web no se diseña como un folleto, sino como el paso entre el anuncio y la conversación.',
      blocks: [
        { title: 'Lo que haces, en una frase', text: 'Arriba del todo, qué ofreces, para quién y un botón para dar el siguiente paso. Con un vídeo de tu negocio, no una foto de banco.' },
        { title: 'Prueba de que eres real', text: 'Tu equipo, tu local y tu trabajo, grabados en la jornada mensual. Es lo que convence a quien todavía no te conoce.' },
        { title: 'Tus servicios, sin rodeos', text: 'Qué incluye cada servicio y las dudas que más te repiten, resueltas antes de que tengan que llamarte.' },
        { title: 'Un formulario corto', text: 'Pocas preguntas y bien elegidas. Cada envío entra en CRM Nova y la IA escribe a esa persona al momento.' },
        { title: 'WhatsApp siempre a mano', text: 'Un botón visible en el móvil que abre la conversación con tu número, ya conectado al filtro de la IA.' },
      ],
    },
    funnel: {
      eyebrow: 'La web en el sistema',
      titleHtml: 'La web no va sola: <span class="text-gold">es un paso del recorrido.</span>',
      lead: 'Cada visita llega de algún sitio y tiene que acabar en algún sitio. Así encaja la web entre tus anuncios y tu agenda.',
      steps: [
        { icon: 'megaphone', title: 'Anuncio o búsqueda', text: 'La visita llega desde tus campañas de Meta, desde Google o desde tu perfil de Instagram.' },
        { icon: 'globe', title: 'Tu web', text: 'Carga rápido en el móvil y explica en pocos segundos qué haces y por qué fiarse de ti.' },
        { icon: 'chat', title: 'Formulario o WhatsApp', text: 'La persona deja sus datos o escribe por WhatsApp, sin buscar tu teléfono ni esperar.' },
        { icon: 'target', title: 'La IA contesta', text: 'En menos de 60 segundos le escribe, pregunta lo necesario y le propone una cita.' },
        { icon: 'crm', title: 'CRM Nova', text: 'Ves de qué página y de qué campaña llegó cada contacto, y qué páginas convierten mejor.' },
      ],
    },
  },
};
