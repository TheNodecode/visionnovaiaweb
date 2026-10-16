import type { IconName } from '../components/ui/icon-names';

export type SectorSlug = 'clinicas-dentales' | 'medicina-estetica' | 'inmobiliarias' | 'reformas';

export type SectorPage = {
  slug: SectorSlug;
  name: string; // nombre del sector para títulos ("clínicas dentales")
  business: string; // cómo se llama el negocio en "Lo que grabaríamos en tu …"
  seoTitle: string; // ≤ 60 caracteres
  seoDescription: string; // 140–160 caracteres, empieza por la keyword
  keyword: string;
  hero: { eyebrow: string; title: string; titleAccent?: string; lead: string; bullets: string[] };
  pains: { title: string; text: string; icon?: IconName }[]; // 4 dolores concretos del sector
  contentIdeas: string[]; // 4–5 ideas de vídeo que grabaríamos allí
  aiScenario: 'dental' | 'estetica' | 'inmobiliaria' | 'reformas';
  audioFilter: string[]; // sectores de AUDIO_DEMOS que se muestran
  audioNote?: string; // aviso junto a los audios cuando no hay demo propia del sector
  defaultTicket: number; // ticket medio inicial de la calculadora
  complianceNote?: string; // solo sectores sanitarios
  faq: { q: string; a: string }[]; // 5, específicas
  related: string[]; // slugs de servicios (mínimo 3)
};

export const SECTORS: SectorPage[] = [
  // ───────────────────────────── Clínicas dentales
  {
    slug: 'clinicas-dentales',
    name: 'clínicas dentales',
    business: 'clínica',
    keyword: 'marketing para clínicas dentales',
    seoTitle: 'Marketing para clínicas dentales con IA | Visión Nova',
    seoDescription:
      'Marketing para clínicas dentales: grabamos a tu equipo en la clínica, captamos pacientes con Meta Ads y una IA atiende cada consulta antes de darle cita.',
    hero: {
      eyebrow: 'Marketing para clínicas dentales',
      title: 'Pacientes que llegan a la primera visita',
      titleAccent: 'sabiendo ya quién les va a atender.',
      lead: 'Elegir clínica es más fácil cuando ya has visto las caras de quien te va a atender. Grabamos a tus doctores y a tu equipo en la propia clínica, convertimos esos vídeos en anuncios para tu zona y dejamos que la IA atienda WhatsApp y teléfono: pregunta qué tratamiento buscan, cuándo quieren empezar y propone una cita.',
      bullets: [
        'Vídeos con tus doctores, grabados en tu clínica',
        'WhatsApp configurado para contestar en menos de 60 s',
        'Llamadas perdidas recuperadas por el agente de voz',
      ],
    },
    pains: [
      {
        icon: 'phone',
        title: 'Llamadas que caen en plena consulta',
        text: 'Recepción está cobrando, confirmando citas y atendiendo a quien sale del gabinete. El teléfono suena, nadie puede cogerlo y ese paciente prueba con la siguiente clínica de la lista.',
      },
      {
        icon: 'crm',
        title: 'Presupuestos que se quedan en el cajón',
        text: 'Haces la valoración, explicas el plan de implantes u ortodoncia, entregas el presupuesto y el paciente dice que lo pensará. Sin un seguimiento ordenado, esas conversaciones se enfrían solas.',
      },
      {
        icon: 'megaphone',
        title: 'Promociones que atraen a quien solo busca la oferta',
        text: 'Las campañas de revisión a precio de saldo llenan la agenda de gente que viene una vez y no vuelve. Para tratamientos de importe alto necesitas contactos con un motivo real para venir.',
      },
      {
        icon: 'camera',
        title: 'Una clínica que en redes parece cualquier otra',
        text: 'Fotos de banco de imágenes, sonrisas genéricas y publicaciones sueltas. El paciente no sabe quién le va a tratar ni cómo es la clínica por dentro, así que elige por cercanía o por precio.',
      },
    ],
    contentIdeas: [
      'El doctor contando en 40 segundos qué ocurre en una primera visita, paso a paso.',
      'Un recorrido desde la puerta hasta el sillón, pensado para quien llega con miedo.',
      'Respuestas cortas a lo que más te preguntan los pacientes: cuánto dura, cada cuánto hay revisión, qué hay que traer.',
      'Presentación del equipo: quién es quién, desde recepción hasta higiene.',
      'Cómo se planifica un tratamiento con alineadores, explicado por quien lo diseña.',
    ],
    aiScenario: 'dental',
    audioFilter: ['dental'],
    defaultTicket: 1500,
    complianceNote: 'La IA no diagnostica ni da precios médicos cerrados: las consultas clínicas pasan a tu equipo.',
    faq: [
      {
        q: '¿Qué cuidado tenéis con la publicidad sanitaria?',
        a: 'La publicidad de servicios sanitarios tiene normas propias, tanto en Meta como en España. Escribimos los anuncios sin prometer resultados clínicos ni usar comparativas que puedan confundir, y nada se publica sin que lo revise la clínica. Tu clínica conoce los requisitos de su comunidad autónoma; en la llamada vemos cómo encajarlos en los anuncios.',
      },
      {
        q: '¿La IA da citas directamente?',
        a: 'Propone huecos al paciente y deja la cita registrada en CRM Nova. Cómo encaja con el programa de gestión que ya usa tu clínica lo vemos en la llamada, porque cada software funciona de una manera.',
      },
      {
        q: '¿Qué pasa si un paciente escribe por un dolor o una urgencia?',
        a: 'La IA no valora síntomas. Recoge el mensaje, le dice al paciente que la clínica se pondrá en contacto y a tu equipo le llega un aviso al momento para que alguien lo atienda.',
      },
      {
        q: '¿Mis doctores tienen que salir en los vídeos?',
        a: 'Ayuda mucho que aparezca al menos una cara de la clínica, porque el paciente quiere saber quién le va a tratar. Aun así, nadie graba nada con lo que no se sienta cómodo: recepción, las instalaciones o una voz en off también cuentan mucho.',
      },
      {
        q: '¿Sirve para una clínica con varios doctores o varias sedes?',
        a: 'Puede encajar, pero depende de cómo esté organizada tu clínica. Antes de activar nada lo vemos contigo en la llamada: cómo te llegan hoy los contactos, quién debe atender cada uno y a quién tiene que llegarle cada aviso.',
      },
    ],
    related: ['creacion-de-contenido', 'publicidad-meta-ads', 'sistema-ia', 'whatsapp-business-api'],
  },

  // ───────────────────────────── Medicina estética
  {
    slug: 'medicina-estetica',
    name: 'medicina estética',
    business: 'clínica estética',
    keyword: 'marketing para clínicas de medicina estética',
    seoTitle: 'Marketing para clínicas de medicina estética | Visión Nova',
    seoDescription:
      'Marketing para clínicas de medicina estética: vídeos con tu equipo médico, anuncios en Instagram y una IA que atiende cada consulta y propone valoración.',
    hero: {
      eyebrow: 'Marketing para medicina estética',
      title: 'Que te elijan por confianza,',
      titleAccent: 'no por el precio más bajo de Instagram.',
      lead: 'En estética, el paciente compara durante semanas antes de pedir valoración. Grabamos a tu equipo médico explicando cómo trabaja, convertimos esas piezas en campañas para tu zona y ponemos una IA a responder los mensajes con la información que tú apruebas, para que a valoración lleguen personas que ya te conocen.',
      bullets: [
        'Contenido grabado con tu propio equipo médico',
        'WhatsApp configurado para responder en menos de 60 s, también de noche',
        'Aviso inmediato cuando hace falta una persona',
      ],
    },
    pains: [
      {
        icon: 'chat',
        title: 'Mensajes de "¿cuánto cuesta?" que no piden cita',
        text: 'Llegan muchas consultas con una pregunta de precio y poco más. Recepción contesta una por una y casi nadie da el paso de reservar valoración.',
      },
      {
        icon: 'chart',
        title: 'Competencia que vende a golpe de descuento',
        text: 'Cadenas y centros de bajo coste llenan Instagram de ofertas. Si tu comunicación también gira en torno al precio, entras en una carrera que no te conviene ganar.',
      },
      {
        icon: 'bolt',
        title: 'Consultas de madrugada que se enfrían',
        text: 'Mucha gente se decide de noche, con el móvil en la mano y tras ver tres perfiles. Si a la mañana siguiente nadie le ha contestado, ya ha escrito a otro centro.',
      },
      {
        icon: 'camera',
        title: 'Un perfil bonito que no explica nada',
        text: 'Imágenes cuidadas y frases inspiradoras, pero ni rastro de quién es la doctora, qué formación tiene el equipo o cómo es una primera valoración. Sin eso, la confianza no aparece.',
      },
    ],
    contentIdeas: [
      'La doctora explicando qué se revisa en una primera valoración y por qué no se recomienda nada sin ella.',
      'Mitos habituales sobre tratamientos faciales, aclarados por el equipo médico en frases cortas.',
      'Un día en la clínica: preparación de cabina, protocolos de higiene y cómo se recibe a cada paciente.',
      'Qué conviene preguntar antes de elegir clínica, contado desde dentro.',
      'Detrás de cámaras con el equipo: quién atiende, quién valora y quién hace el seguimiento.',
    ],
    aiScenario: 'estetica',
    audioFilter: ['estetica'],
    defaultTicket: 600,
    complianceNote: 'Nuestra IA no hace diagnósticos ni cierra precios de tratamientos médicos; cualquier pregunta clínica la deriva a tu equipo.',
    faq: [
      {
        q: '¿Se pueden publicar fotos de antes y después?',
        a: 'Es un terreno delicado: las normas de publicidad sanitaria y las de Meta limitan mucho cómo se muestran. Preferimos construir confianza con el equipo, el proceso y las explicaciones. Si quieres usar un caso real, lo revisamos contigo y solo con el consentimiento por escrito del paciente.',
      },
      {
        q: '¿Qué contesta la IA cuando le piden el precio de un tratamiento?',
        a: 'Lo que tú decidas. Puedes darle rangos orientativos o pedirle que explique que el precio depende de la valoración y ofrezca una cita. Lo dejamos configurado contigo antes de activarla.',
      },
      {
        q: '¿Y si alguien escribe preocupado después de un tratamiento?',
        a: 'La IA no entra en cuestiones médicas. Le explica a esa persona que el equipo la contactará y te avisa en ese mismo momento para que alguien de la clínica se haga cargo.',
      },
      {
        q: '¿Grabáis también en cabina, con pacientes?',
        a: 'Solo lo que tú y tus pacientes aprobéis. Grabar a un paciente real exige su consentimiento firmado; si no lo hay, recreamos el proceso con alguien del equipo o enseñamos la cabina preparada y vacía.',
      },
      {
        q: '¿Cuánto tarda en notarse en la agenda?',
        a: 'Depende de tu zona, del tratamiento que impulsemos y de la inversión en anuncios, así que no te vamos a dar una fecha. Lo que sí ves desde el primer día es cada conversación y cada valoración en CRM Nova, y cada mes recibes un informe con lo que ha pasado.',
      },
    ],
    related: ['creacion-de-contenido', 'gestion-redes-sociales', 'publicidad-meta-ads', 'sistema-ia'],
  },

  // ───────────────────────────── Inmobiliarias
  {
    slug: 'inmobiliarias',
    name: 'inmobiliarias',
    business: 'inmobiliaria',
    keyword: 'marketing para inmobiliarias',
    seoTitle: 'Marketing para inmobiliarias con vídeo e IA | Visión Nova',
    seoDescription:
      'Marketing para inmobiliarias: vídeos de tus inmuebles y tus agentes, campañas para compradores y propietarios, y una IA que filtra antes de cada visita.',
    hero: {
      eyebrow: 'Marketing para inmobiliarias',
      title: 'Menos visitas de curiosos,',
      titleAccent: 'más compradores que ya han hablado de cómo pagar.',
      lead: 'Cada piso publicado trae una avalancha de mensajes, y la mayoría no va a comprar. Grabamos tus inmuebles y a tus agentes, llevamos esos vídeos a campañas para compradores y propietarios de tu zona, y la IA hace las preguntas que tu equipo no tiene tiempo de hacer: para qué buscan, en qué plazo y cómo piensan pagarlo.',
      bullets: [
        'Recorridos en vídeo de tus mejores inmuebles',
        'Agentes con cara y nombre en redes',
        'Compradores filtrados antes de enseñar el piso',
      ],
    },
    pains: [
      {
        icon: 'target',
        title: 'Agentes enseñando pisos a quien solo mira',
        text: 'Una tarde entera de visitas y ninguna con intención real. El problema no es el piso: nadie preguntó antes si esa persona podía o quería comprar.',
      },
      {
        icon: 'globe',
        title: 'Pocas captaciones de propietarios',
        text: 'El cuello de botella no siempre está en vender, sino en conseguir producto. Si tu marca no suena en el barrio, el propietario firma con la agencia que ya conoce.',
      },
      {
        icon: 'bolt',
        title: 'El mismo comprador escribe a cinco agencias',
        text: 'Quien busca un tipo de piso contacta con varias inmobiliarias a la vez. Se queda con la que responde primero y con criterio, no con la que devuelve la llamada al día siguiente.',
      },
      {
        icon: 'camera',
        title: 'Un perfil que es un escaparate de fotos',
        text: 'Publicar cada inmueble con cuatro imágenes y el precio no crea confianza ni comunidad. Falta que se vea quién está detrás y cómo acompaña a sus clientes.',
      },
    ],
    contentIdeas: [
      'Recorrido en un solo plano de un piso recién captado, narrado por el agente que lo lleva.',
      'Qué revisa un comprador primerizo antes de dar la señal, en un minuto.',
      'Cómo prepara tu equipo una vivienda para salir a la venta, del primer café con el propietario a la sesión de fotos.',
      'El barrio contado por quien vende en él: comercios, colegios y transporte.',
      'Presentación de cada agente: qué zona cubre y por qué conoce ese mercado.',
    ],
    aiScenario: 'inmobiliaria',
    // Sin audio propio de inmobiliaria: la demo enseña solo el chat (sin reproductor).
    audioFilter: [],
    defaultTicket: 4000,
    faq: [
      {
        q: '¿La IA puede contestar sobre cualquier inmueble de mi cartera?',
        a: 'Contesta con los datos que le cargamos y que tú validas: características, zona y disponibilidad. Si le preguntan algo que no tiene, está configurada para no responderlo por su cuenta: lo anota y avisa al agente. Cómo mantenerla al día cuando entra o sale un inmueble lo vemos contigo en la llamada.',
      },
      {
        q: '¿Sirve también para captar propietarios que quieren vender?',
        a: 'Sí. Con vídeos de tus agentes contando cómo trabajan una venta, lanzamos anuncios en tu zona pensados para propietarios. La IA les pregunta qué vivienda tienen y cuándo quieren vender antes de pasarte el contacto.',
      },
      {
        q: '¿Grabáis cada piso que entra en cartera?',
        a: 'Depende del volumen. Lo que proponemos es dedicar la jornada mensual a los inmuebles con más tirón y a piezas de marca con tus agentes. Si necesitas más frecuencia, lo planteamos en la llamada.',
      },
      {
        q: '¿Esto sustituye a los portales inmobiliarios?',
        a: 'No. Los contactos que llegan desde redes y anuncios se suman a los que ya recibes. Si quieres que la IA atienda también los mensajes de WhatsApp que llegan desde los portales, lo valoramos al configurarla.',
      },
      {
        q: '¿Y si un comprador quiere hablar ya con una persona?',
        a: 'La IA no retiene a nadie que pida un agente. Lo anota, le confirma que le llamarán y al agente le llega un aviso inmediato; la conversación queda guardada en CRM Nova para que no tenga que volver a preguntar nada.',
      },
    ],
    related: ['creacion-de-contenido', 'publicidad-meta-ads', 'sistema-ia', 'diseno-web'],
  },

  // ───────────────────────────── Reformas y construcción
  {
    slug: 'reformas',
    name: 'empresas de reformas',
    business: 'empresa de reformas',
    keyword: 'marketing para empresas de reformas',
    seoTitle: 'Marketing para empresas de reformas | Visión Nova',
    seoDescription:
      'Marketing para empresas de reformas y construcción: grabamos tus obras, captamos clientes con Meta Ads y la IA filtra cada presupuesto antes de la visita.',
    hero: {
      eyebrow: 'Marketing para reformas y construcción',
      title: 'Deja de ir a medir',
      titleAccent: 'obras que nunca se van a firmar.',
      lead: 'Cada visita técnica le cuesta una mañana a alguien de tu equipo. Grabamos tus obras en sus distintas fases, las convertimos en anuncios para tu zona y la IA atiende cada petición de presupuesto: qué quieren reformar, cuántos metros, para cuándo y con qué presupuesto aproximado. Así decides a qué visitas merece la pena ir.',
      bullets: [
        'Tus obras grabadas en distintas fases',
        'Peticiones de presupuesto filtradas por la IA',
        'Llamadas que entran mientras estás en obra, atendidas',
      ],
    },
    pains: [
      {
        icon: 'chat',
        title: 'Presupuestos a ciegas',
        text: 'Te piden precio por WhatsApp con una foto borrosa y dos líneas. Para no perder el cliente te desplazas, mides y calculas, y después no vuelve a contestar.',
      },
      {
        icon: 'phone',
        title: 'El teléfono suena cuando estás subido al andamio',
        text: 'Con la radial en la mano no se coge el móvil. Cada llamada sin respuesta puede ser una reforma integral que acaba firmando otra empresa.',
      },
      {
        icon: 'chart',
        title: 'Clientes que solo comparan la cifra final',
        text: 'Si nadie ha visto cómo trabajas, la única forma de compararte es el total del presupuesto. Y en ese terreno siempre aparece alguien más barato.',
      },
      {
        icon: 'film',
        title: 'Trabajo bien hecho que nadie ve',
        text: 'Terminas cocinas y baños de los que estar orgulloso y las fotos se quedan en el móvil del encargado. Ese material es justo lo que convence a quien duda.',
      },
    ],
    contentIdeas: [
      'El antes y el después de una cocina, con el encargado contando las decisiones que se tomaron.',
      'Lo que no se ve en una reforma barata: impermeabilización, instalaciones y remates.',
      'Un día de obra en un minuto: llegada, protección de la vivienda y limpieza al terminar.',
      'Cómo se prepara un presupuesto en tu empresa y qué incluye cada partida.',
      'El jefe de obra respondiendo a la duda de siempre: cuánto se tarda en reformar un baño.',
    ],
    aiScenario: 'reformas',
    audioFilter: ['reformas'],
    defaultTicket: 8000,
    faq: [
      {
        q: '¿Grabáis en obras con los clientes viviendo en casa?',
        a: 'Solo con el permiso del propietario, y lo gestionamos contigo antes de ir. Si prefieren no salir, grabamos el espacio y al equipo trabajando, sin caras ni datos que identifiquen la vivienda.',
      },
      {
        q: '¿La IA da precios de reformas?',
        a: 'Solo si tú quieres y con los rangos que nos facilites. Lo que solemos proponer es que recoja medidas, tipo de trabajo y plazo, y te lo deje ordenado en CRM Nova para que decidas si merece la visita.',
      },
      {
        q: '¿Funciona para obra nueva o solo para reformas?',
        a: 'El sistema es el mismo; cambia lo que grabamos y lo que pregunta la IA. En obra nueva el contenido gira en torno al avance de la construcción y a la confianza en la constructora. Lo concretamos en la llamada según el cliente que buscas.',
      },
      {
        q: '¿Qué pasa con las llamadas que entran mientras estoy trabajando?',
        a: 'Las atiende el agente de voz a cualquier hora, recoge qué necesitan y te avisa. Las llamadas perdidas también se recuperan, así que quien llama recibe respuesta en lugar de un tono que nadie contesta.',
      },
      {
        q: '¿En qué zona salen los anuncios?',
        a: 'En la que te interese trabajar. Si no quieres desplazarte más allá de cierta distancia, los anuncios se limitan a ese radio y la IA puede preguntar la población de la obra antes de proponer una visita.',
      },
    ],
    related: ['creacion-de-contenido', 'publicidad-meta-ads', 'sistema-ia', 'diseno-web'],
  },
];
