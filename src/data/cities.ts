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
      lead: 'En Madrid casi cualquier servicio tiene a otro negocio parecido a pocas calles. Grabamos contenido que solo puede ser tuyo, lo convertimos en anuncios para tu zona y dejamos a la IA atendiendo los mensajes antes de que el cliente pruebe suerte en otra parte.',
      bullets: ['Jornada de grabación pactada con tu agenda', 'Anuncios segmentados por barrio y zona', 'WhatsApp atendido en menos de 60 s'],
    },
    localAngle: {
      title: 'Lo que cambia cuando tu negocio está en Madrid',
      paragraphs: [
        'Madrid concentra una de las mayores ofertas de clínicas, centros de estética e inmobiliarias de España, y eso se nota en Instagram: el mismo cliente ve en una tarde los anuncios de cinco negocios que ofrecen lo mismo. Ganar esa comparación no depende de gastar más, sino de que tu vídeo transmita confianza en los primeros segundos y de contestar antes que nadie.',
        'También es una ciudad grande para moverse. Un anuncio que llega a toda la Comunidad atrae a gente que nunca cruzará la ciudad por tu servicio. Por eso trabajamos con radios y zonas concretas alrededor de tu negocio y dejamos que la IA confirme, en la primera conversación, que el contacto puede venir.',
        'En una ciudad donde cada minuto de tu equipo cuenta, el sistema está pensado para que nadie pierda la mañana con contactos que no van a comprar: la IA hace las preguntas incómodas y tu agenda se llena de citas con sentido.',
      ],
    },
    sectorsHighlight: ['clinicas-dentales', 'medicina-estetica', 'inmobiliarias'],
    faq: [
      { q: '¿Tenéis oficina en Madrid?', a: 'No. Trabajamos desde Girona y viajamos a Madrid para rodar. Campañas, IA y CRM se gestionan en remoto, y el seguimiento contigo lo hacemos por videollamada.' },
      { q: '¿Podéis anunciar solo en mi barrio o en mi zona de Madrid?', a: 'Sí. Ajustamos el área de los anuncios a un radio alrededor de tu negocio o a zonas concretas, para no pagar por contactos de puntas opuestas de la Comunidad que difícilmente se acercarán.' },
      { q: 'En Madrid hay muchísima competencia en mi sector. ¿Merece la pena?', a: 'Precisamente ahí es donde más se nota. Cuando todos anuncian lo mismo, gana quien muestra a su equipo real y quien responde primero. Las dos cosas son el centro de nuestro sistema.' },
      { q: '¿Cada cuánto venís a grabar a Madrid?', a: 'Una vez al mes. Elegimos juntos un día de menos movimiento en tu negocio para que el rodaje no choque con tus horas punta.' },
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
      lead: 'Barcelona mezcla vecinos de toda la vida, gente llegada de fuera y un público que decide mirando Instagram. Grabamos en tu negocio contenido pensado para esa mezcla, lo movemos con anuncios en Meta y la IA atiende a tus contactos al momento, de día o de noche.',
      bullets: ['Rodaje con agenda flexible desde Girona', 'Vídeos con tu equipo y tu local reales', 'Filtro con IA antes de cada llamada'],
    },
    localAngle: {
      title: 'Por qué Barcelona pide un enfoque propio',
      paragraphs: [
        'En Barcelona conviven clientes que prefieren que les hables en catalán, otros que buscan en castellano y una parte importante que viene de fuera. Antes de grabar decidimos contigo a quién va dirigido cada vídeo y en qué idioma conviene hablarle.',
        'La ciudad tiene una oferta muy densa de clínicas, estética e inmobiliarias, con muchos negocios compartiendo calle y pantalla. Lo que te diferencia no es un anuncio más bonito, sino enseñar quién eres de verdad y contestar en minutos cuando otros tardan un día.',
        'Al estar en Girona, Barcelona nos queda a un paso. Si un mes tu negocio tiene una novedad, una apertura o un cambio de última hora, es más fácil encontrar hueco para grabarlo sin esperar al siguiente rodaje.',
      ],
    },
    sectorsHighlight: ['medicina-estetica', 'clinicas-dentales', 'reformas'],
    faq: [
      { q: '¿Podéis hacer contenido en catalán?', a: 'Lo hablamos en la llamada. Antes de grabar decidimos contigo en qué idioma habla cada pieza según tu clientela, y te decimos con claridad qué podemos preparar en catalán y qué en castellano.' },
      { q: '¿Estáis cerca para grabar en Barcelona?', a: 'Sí. Desde Girona llegamos en poco tiempo, lo que nos da margen para mover la fecha del rodaje si a tu negocio le conviene otro día.' },
      { q: '¿Trabajáis también con negocios del área metropolitana?', a: 'Sí. Tanto si estás en Barcelona ciudad como en L’Hospitalet, Badalona, Sabadell o cualquier otro municipio, el sistema es el mismo y la grabación se hace en tu propio negocio.' },
      { q: 'Muchos de mis clientes son extranjeros. ¿La IA les atiende?', a: 'Depende de cómo la configuremos. En la llamada vemos en qué idiomas te escriben y, antes de activarla, comprobamos contigo cómo atiende en cada uno. Lo que no esté preparado pasa directamente a tu equipo.' },
    ],
  },
  {
    slug: 'agencia-marketing-valencia',
    city: 'Valencia',
    seoTitle: 'Agencia de marketing en Valencia: vídeo, Ads e IA',
    seoDescription:
      'Agencia de marketing en Valencia: grabamos el contenido en tu negocio, lanzamos tus campañas de Meta Ads y la IA responde a tus contactos en menos de 60 s.',
    hero: {
      eyebrow: 'Agencia de marketing en Valencia',
      title: 'Marketing en Valencia para negocios',
      titleAccent: 'que quieren crecer sin contratar más.',
      lead: 'Valencia se ha convertido en una ciudad muy buscada para vivir, y eso trae clientes nuevos que todavía no conocen a nadie. Llegamos a tu negocio a grabar, ponemos tus vídeos delante de esa gente con anuncios en Meta y la IA atiende los mensajes mientras tu equipo sigue con su trabajo.',
      bullets: ['Grabación en la ciudad o en l’Horta', 'Anuncios para quien acaba de llegar', 'Cada contacto filtrado en CRM Nova'],
    },
    localAngle: {
      title: 'Lo que vemos en el mercado de Valencia',
      paragraphs: [
        'Mucha gente se ha mudado a Valencia en los últimos años, tanto desde otras ciudades españolas como desde el extranjero. Son clientes que necesitan dentista, clínica, reforma o vivienda y que no tienen a quién pedir una recomendación: eligen por lo que ven en redes y por quién les responde antes.',
        'Ese movimiento también ha activado la compraventa de viviendas y las reformas. Para una inmobiliaria o una empresa de reformas, la diferencia entre cerrar o no muchas veces está en atender rápido al contacto del anuncio y separar a quien solo mira de quien tiene fecha y presupuesto.',
        'En reformas y vivienda, el vídeo pesa más que en casi cualquier otro sector: enseñar una obra terminada, un piso por dentro o al equipo trabajando convence más que cualquier texto. Por eso, en Valencia, buena parte del contenido que grabamos está pensado para que el cliente vea el resultado antes de llamar.',
      ],
    },
    sectorsHighlight: ['inmobiliarias', 'reformas', 'clinicas-dentales'],
    faq: [
      { q: '¿Grabáis en pueblos del área metropolitana de Valencia?', a: 'Sí. Tanto si estás en el centro como en un municipio de l’Horta, el rodaje se hace en tu local y los anuncios se ajustan a los barrios y pueblos de donde salen tus clientes.' },
      { q: 'Tengo una inmobiliaria en Valencia. ¿Cómo filtra la IA a los compradores?', a: 'Pregunta lo que preguntaría tu agente: si buscan para vivir o invertir, en qué zona, en qué plazo y si tienen la financiación encaminada. Así, a tu equipo le llegan las visitas que tienen sentido, con esos datos ya recogidos.' },
      { q: '¿Podéis atender también a clientes extranjeros?', a: 'Si una parte de tus contactos llega de fuera, nos lo cuentas al empezar y preparamos la IA y los guiones teniendo en cuenta a ese público. Nada se activa sin que lo hayas revisado tú.' },
      { q: '¿Cuánto tarda en estar todo funcionando?', a: 'Depende de lo que haya que montar en tu caso: cuentas, número de WhatsApp, primera grabación. En la llamada te damos un calendario realista con cada paso.' },
    ],
  },
  {
    slug: 'agencia-marketing-malaga',
    city: 'Málaga',
    seoTitle: 'Agencia de marketing en Málaga y Costa del Sol',
    seoDescription:
      'Agencia de marketing en Málaga y la Costa del Sol: contenido grabado en tu negocio, anuncios en Meta y una IA que atiende a tus contactos a cualquier hora.',
    hero: {
      eyebrow: 'Agencia de marketing en Málaga',
      title: 'Marketing en Málaga para un cliente',
      titleAccent: 'que escribe a cualquier hora, también desde fuera.',
      lead: 'En Málaga y la Costa del Sol tu próximo cliente puede vivir aquí todo el año, pasar media temporada o estar mirando casa desde otro país. Grabamos en tu negocio, lanzamos anuncios en Meta para cada perfil y la IA les responde al momento, aunque te escriban a medianoche.',
      bullets: ['De Málaga capital a toda la costa', 'Atención inmediata a cualquier hora', 'Agente de voz 24/7'],
    },
    localAngle: {
      title: 'Málaga no se parece a ninguna otra plaza',
      paragraphs: [
        'La provincia combina una ciudad que no deja de crecer con una costa llena de residentes internacionales. Para una clínica, una inmobiliaria o una empresa de reformas, eso significa contactos en varios idiomas y en husos horarios distintos: si nadie contesta hasta el día siguiente, esa persona ya ha hablado con otro.',
        'El mercado inmobiliario de la Costa del Sol atrae a muchos compradores de fuera que escriben antes de viajar. La IA les responde al instante, pregunta plazo, zona y financiación, y deja a tu equipo solo las visitas con intención real.',
        'Además, aquí el calendario manda: hay meses de mucho movimiento y otros más tranquilos. Planificamos contigo qué contar y cuánto invertir en cada época, en lugar de repetir la misma campaña los doce meses.',
      ],
    },
    sectorsHighlight: ['inmobiliarias', 'medicina-estetica', 'reformas'],
    faq: [
      { q: '¿Grabáis también en Marbella, Estepona o el resto de la costa?', a: 'Sí. Rodamos en Málaga capital y en cualquier municipio de la Costa del Sol, desde la Axarquía hasta Manilva.' },
      { q: 'Muchos de mis clientes escriben en inglés. ¿La IA puede atenderlos?', a: 'Lo configuramos según tu clientela. Si te escriben en inglés, preparamos a la IA con tu información aprobada en ese idioma y lo probamos contigo antes de activarlo; si una conversación necesita a una persona, te avisa al instante.' },
      { q: '¿Qué pasa con los compradores que contactan desde otro país?', a: 'Les atendemos igual de rápido: la IA responde aunque en España sea de noche, recoge sus datos y sus fechas de viaje y te los deja ordenados en CRM Nova para que prepares la visita.' },
      { q: '¿Vale la pena si mi negocio es de temporada?', a: 'Sí, siempre que lo planifiquemos. Concentramos la grabación y la inversión en los meses que importan y la IA sigue atendiendo durante todo el año, para que no pierdas los contactos que llegan fuera de temporada.' },
    ],
  },
];
