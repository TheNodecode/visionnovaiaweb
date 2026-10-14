export type CitySlug =
  | 'agencia-marketing-madrid'
  | 'agencia-marketing-barcelona'
  | 'agencia-marketing-valencia'
  | 'agencia-marketing-malaga';

export type CityPage = {
  slug: CitySlug;
  city: string;
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; titleAccent?: string; lead: string; bullets: string[] };
  localAngle: { title: string; paragraphs: string[] }; // 2–3 párrafos genuinamente locales
  sectorsHighlight: string[]; // slugs de sectores con peso en esa ciudad
  faq: { q: string; a: string }[]; // 4–5, específicas de la ciudad
};

export const CITIES: CityPage[] = [
  {
    slug: 'agencia-marketing-madrid',
    city: 'Madrid',
    seoTitle: 'Agencia de marketing en Madrid con IA | Visión Nova',
    seoDescription:
      'Agencia de marketing en Madrid: grabamos en tu negocio, lanzamos tus anuncios en Meta y una IA filtra cada contacto para que solo hables con quien compra.',
    hero: {
      eyebrow: 'Agencia de marketing en Madrid',
      title: 'Marketing en Madrid para destacar',
      titleAccent: 'donde todos compiten por la misma atención.',
      lead: 'En Madrid casi cualquier servicio tiene a otro negocio parecido a pocas calles. Grabamos contenido que solo puede ser tuyo, lo convertimos en anuncios para tu zona y dejamos a la IA atendiendo cada mensaje antes de que el cliente pruebe suerte en otra parte.',
      bullets: ['Rodaje en tu negocio en Madrid', 'Anuncios segmentados por barrio y zona', 'Respuesta en menos de 60 s'],
    },
    localAngle: {
      title: 'Lo que cambia cuando tu negocio está en Madrid',
      paragraphs: [
        'Madrid concentra una de las mayores ofertas de clínicas, centros de estética e inmobiliarias de España, y eso se nota en Instagram: el mismo cliente ve en una tarde los anuncios de cinco negocios que ofrecen lo mismo. Ganar esa comparación no depende de gastar más, sino de que tu vídeo transmita confianza en los primeros segundos y de contestar antes que nadie.',
        'También es una ciudad grande para moverse. Un anuncio que llega a toda la Comunidad atrae a gente que nunca cruzará la ciudad por tu servicio. Por eso trabajamos con radios y zonas concretas alrededor de tu negocio y dejamos que la IA confirme, en la primera conversación, que el contacto puede venir.',
        'Nuestra base está en Girona y a Madrid vamos con el rodaje planificado de antemano: guiones cerrados, lista de tomas y horario pactado contigo, para aprovechar la jornada al máximo.',
      ],
    },
    sectorsHighlight: ['clinicas-dentales', 'medicina-estetica', 'inmobiliarias'],
    faq: [
      { q: '¿Tenéis oficina en Madrid?', a: 'No. Nuestra base está en Girona y nos desplazamos a Madrid para cada jornada de grabación. El resto del trabajo, desde los anuncios hasta la IA y el CRM, funciona igual estés donde estés, y las reuniones de seguimiento las hacemos por videollamada.' },
      { q: '¿Podéis anunciar solo en mi barrio o en mi zona de Madrid?', a: 'Sí. Ajustamos el área de los anuncios a un radio alrededor de tu negocio o a zonas concretas, para no pagar por contactos de puntas opuestas de la Comunidad que difícilmente se acercarán.' },
      { q: 'En Madrid hay muchísima competencia en mi sector. ¿Merece la pena?', a: 'Precisamente ahí es donde más se nota. Cuando todos anuncian lo mismo, gana quien muestra a su equipo real y quien responde primero. Las dos cosas son el centro de nuestro sistema.' },
      { q: '¿Cada cuánto venís a grabar a Madrid?', a: 'Una jornada de grabación al mes en tu negocio. La fecha la cerramos con antelación para que tu equipo pueda organizarse y no coincida con tus días de más trabajo.' },
    ],
  },
  {
    slug: 'agencia-marketing-barcelona',
    city: 'Barcelona',
    seoTitle: 'Agencia de marketing en Barcelona | Visión Nova',
    seoDescription:
      'Agencia de marketing en Barcelona que graba el contenido en tu negocio, gestiona tus redes y anuncios en Meta y filtra cada contacto con IA. Base en Girona.',
    hero: {
      eyebrow: 'Agencia de marketing en Barcelona',
      title: 'Marketing en Barcelona con contenido',
      titleAccent: 'que tu clientela reconoce como suyo.',
      lead: 'Barcelona mezcla vecinos de toda la vida, gente llegada de fuera y un público que decide mirando Instagram. Grabamos en tu negocio contenido pensado para esa mezcla, lo movemos con anuncios en Meta y la IA atiende a cada contacto al momento, de día o de noche.',
      bullets: ['Rodaje en tu negocio en Barcelona', 'Contenido en castellano o en catalán', 'Respuesta en menos de 60 s'],
    },
    localAngle: {
      title: 'Por qué Barcelona pide un enfoque propio',
      paragraphs: [
        'En Barcelona conviven clientes que prefieren que les hables en catalán, otros que buscan en castellano y una parte importante que viene de fuera. Antes de grabar decidimos contigo en qué idioma habla cada vídeo y a quién va dirigido, para que el anuncio suene cercano a la persona que lo ve.',
        'La ciudad tiene una oferta muy densa de clínicas, estética e inmobiliarias, con muchos negocios compartiendo calle y pantalla. Lo que te diferencia no es un anuncio más bonito, sino enseñar quién eres de verdad y contestar en minutos cuando otros tardan un día.',
        'Trabajamos desde Girona, a poca distancia de Barcelona, así que organizar las jornadas de grabación en tu negocio es sencillo y nos permite adaptarnos con facilidad a tu calendario.',
      ],
    },
    sectorsHighlight: ['medicina-estetica', 'clinicas-dentales', 'reformas'],
    faq: [
      { q: '¿Hacéis el contenido en catalán?', a: 'Sí, si tu clientela lo prefiere. Decidimos contigo el idioma de cada pieza: hay negocios que publican en catalán, otros en castellano y otros que combinan los dos según el servicio.' },
      { q: '¿Estáis cerca para grabar en Barcelona?', a: 'Nuestra base está en Girona, así que Barcelona nos queda cerca. Eso hace más fácil cuadrar la jornada de grabación con tu agenda.' },
      { q: '¿Trabajáis también con negocios del área metropolitana?', a: 'Sí. Tanto si estás en Barcelona ciudad como en L’Hospitalet, Badalona, Sabadell o cualquier otro municipio, el sistema es el mismo y la grabación se hace en tu propio negocio.' },
      { q: 'Muchos de mis clientes son extranjeros. ¿La IA les atiende?', a: 'La IA responde en el idioma en que le escriben, con la misma información que has aprobado para tu negocio. Si una conversación necesita a alguien de tu equipo, te avisa al instante.' },
    ],
  },
  {
    slug: 'agencia-marketing-valencia',
    city: 'Valencia',
    seoTitle: 'Agencia de marketing en Valencia: vídeo, Ads e IA',
    seoDescription:
      'Agencia de marketing en Valencia: grabamos el contenido en tu negocio, lanzamos tus campañas de Meta Ads y la IA responde a cada contacto en menos de 60 s.',
    hero: {
      eyebrow: 'Agencia de marketing en Valencia',
      title: 'Marketing en Valencia para negocios',
      titleAccent: 'que quieren crecer sin contratar más.',
      lead: 'Valencia se ha convertido en una ciudad muy buscada para vivir, y eso trae clientes nuevos que todavía no conocen a nadie. Llegamos a tu negocio a grabar, ponemos tus vídeos delante de esa gente con anuncios en Meta y la IA atiende cada mensaje mientras tu equipo sigue con su trabajo.',
      bullets: ['Rodaje en tu negocio en Valencia', 'Anuncios para quien acaba de llegar', 'Cada contacto filtrado en CRM Nova'],
    },
    localAngle: {
      title: 'Lo que vemos en el mercado de Valencia',
      paragraphs: [
        'Mucha gente se ha mudado a Valencia en los últimos años, tanto desde otras ciudades españolas como desde el extranjero. Son clientes que necesitan dentista, clínica, reforma o vivienda y que no tienen a quién pedir una recomendación: eligen por lo que ven en redes y por quién les responde antes.',
        'Ese movimiento también ha activado la compraventa de viviendas y las reformas. Para una inmobiliaria o una empresa de reformas, la diferencia entre cerrar o no muchas veces está en atender rápido al contacto del anuncio y separar a quien solo mira de quien tiene fecha y presupuesto.',
        'Venimos a tu negocio en Valencia o en su área metropolitana con todo preparado: guiones, equipo y formatos, para que la jornada de grabación no altere tu día a día.',
      ],
    },
    sectorsHighlight: ['inmobiliarias', 'reformas', 'clinicas-dentales'],
    faq: [
      { q: '¿Grabáis en pueblos del área metropolitana de Valencia?', a: 'Sí. Da igual que tu negocio esté en el centro o en un municipio de l’Horta; vamos a grabar donde está tu negocio y ajustamos los anuncios a la zona de la que vienen tus clientes.' },
      { q: 'Tengo una inmobiliaria en Valencia. ¿Cómo filtra la IA a los compradores?', a: 'Pregunta lo que preguntaría tu agente: si buscan para vivir o invertir, en qué zona, en qué plazo y si tienen la financiación encaminada. A tu equipo solo le llegan las visitas que tienen sentido.' },
      { q: '¿Podéis atender también a clientes extranjeros?', a: 'La IA responde en el idioma en que le escriben y con la información que tú apruebas. Si quieres además contenido pensado para ese público, lo planteamos en los guiones de la jornada.' },
      { q: '¿Cuánto tarda en estar todo funcionando?', a: 'Depende de lo que haya que montar en tu caso: cuentas, número de WhatsApp, primera grabación. En la llamada te damos un calendario realista con cada paso.' },
    ],
  },
  {
    slug: 'agencia-marketing-malaga',
    city: 'Málaga',
    seoTitle: 'Agencia de marketing en Málaga y Costa del Sol',
    seoDescription:
      'Agencia de marketing en Málaga y la Costa del Sol: contenido grabado en tu negocio, anuncios en Meta y una IA que atiende a cada contacto a cualquier hora.',
    hero: {
      eyebrow: 'Agencia de marketing en Málaga',
      title: 'Marketing en Málaga para un cliente',
      titleAccent: 'que escribe a cualquier hora y en cualquier idioma.',
      lead: 'En Málaga y la Costa del Sol tu próximo cliente puede vivir aquí todo el año, pasar media temporada o estar mirando casa desde otro país. Grabamos en tu negocio, lanzamos anuncios en Meta para cada perfil y la IA les responde al momento, aunque te escriban a medianoche.',
      bullets: ['Rodaje en tu negocio en Málaga', 'Atención a clientes internacionales', 'Agente de voz 24/7'],
    },
    localAngle: {
      title: 'Málaga no se parece a ninguna otra plaza',
      paragraphs: [
        'La provincia combina una ciudad que no deja de crecer con una costa llena de residentes internacionales. Para una clínica, una inmobiliaria o una empresa de reformas, eso significa contactos en varios idiomas y en husos horarios distintos: si nadie contesta hasta el día siguiente, esa persona ya ha hablado con otro.',
        'El mercado inmobiliario de la Costa del Sol atrae a muchos compradores de fuera que escriben antes de viajar. La IA les responde al instante, pregunta plazo, zona y financiación, y deja a tu equipo solo las visitas con intención real.',
        'Venimos a grabar a tu negocio en Málaga capital o en cualquier punto de la costa con el rodaje ya planificado, para sacar en una sola jornada el contenido de todo el mes.',
      ],
    },
    sectorsHighlight: ['inmobiliarias', 'medicina-estetica', 'reformas'],
    faq: [
      { q: '¿Grabáis también en Marbella, Estepona o el resto de la costa?', a: 'Sí. Vamos a donde esté tu negocio, sea en Málaga capital o en cualquier municipio de la Costa del Sol. La jornada se organiza con antelación para que no interfiera con tu trabajo.' },
      { q: 'Muchos de mis clientes escriben en inglés. ¿La IA puede atenderlos?', a: 'Sí. La IA contesta en el idioma en que le escriben, con la información que tú has aprobado, y te avisa si la conversación necesita a una persona de tu equipo.' },
      { q: '¿Qué pasa con los compradores que contactan desde otro país?', a: 'Les atendemos igual de rápido: la IA responde aunque en España sea de noche, recoge sus datos y sus fechas de viaje y te los deja ordenados en CRM Nova para que prepares la visita.' },
      { q: '¿Vale la pena si mi negocio es de temporada?', a: 'Sí, siempre que lo planifiquemos. Concentramos la grabación y la inversión en los meses que importan y la IA sigue atendiendo durante todo el año, para que no pierdas los contactos que llegan fuera de temporada.' },
    ],
  },
];
