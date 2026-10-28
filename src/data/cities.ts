export type CitySlug =
  | 'agencia-marketing-madrid'
  | 'agencia-marketing-barcelona'
  | 'agencia-marketing-valencia'
  | 'agencia-marketing-malaga'
  | 'agencia-marketing-tarragona'
  | 'agencia-marketing-el-vendrell';

export type CityPage = {
  slug: CitySlug;
  city: string;
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; titleAccent?: string; lead: string; bullets: string[] };
  localAngle: { title: string; paragraphs: string[] }; // 2–3 párrafos genuinamente locales
  sectorsHighlight: string[]; // slugs de sectores con peso en esa ciudad
  faq: { q: string; a: string }[]; // 4–5, específicas de la ciudad
  /** La oferta y el primer mes vistos desde esa ciudad (el rodaje implica viajar desde Girona). */
    sales: {
      offerTitleHtml: string;
      offerLead: string;
      grabacion: string; // resultado de la jornada de grabación en esa ciudad
      ads: string; // resultado de las campañas en esa ciudad
      week2: { title: string; text: string };
      note: string; // nota del primer mes con el viaje
      proofTitleHtml: string;
      proofLead: string;
    };
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
        bullets: ['Jornada de grabación pactada con tu agenda', 'Anuncios segmentados por barrio y zona', 'WhatsApp con una IA configurada para contestar en menos de 60 s'],
      },
      localAngle: {
        title: 'Lo que cambia cuando tu negocio está en Madrid',
        paragraphs: [
          'Madrid concentra una de las mayores ofertas de clínicas, centros de estética e inmobiliarias de España, y eso se nota en Instagram: el mismo cliente ve en una tarde los anuncios de cinco negocios que ofrecen lo mismo. Ganar esa comparación no depende de gastar más, sino de que tu vídeo transmita confianza en los primeros segundos y de contestar antes que nadie.',
          'También es una ciudad grande para moverse. Un anuncio que llega a toda la Comunidad atrae a gente que nunca cruzará la ciudad por tu servicio. Por eso trabajamos con radios y zonas concretas alrededor de tu negocio y dejamos que la IA confirme, en la primera conversación, que el contacto puede venir.',
          'En una ciudad donde cada minuto de tu equipo cuenta, el sistema está pensado para que nadie pierda la mañana con contactos que no van a comprar: la IA hace las preguntas incómodas y tu agenda se llena de citas con sentido.',
        ],
      },
    sales: {
      offerTitleHtml: 'NovaScale <span class="text-gold">en Madrid.</span>',
      offerLead: 'Lo mismo que montamos en cualquier ciudad, ajustado a cómo se compite en Madrid: rodaje en tu negocio, anuncios por barrio y una IA que contesta antes de que el cliente pruebe con el de la calle de al lado.',
      grabacion: 'Viajamos a tu negocio en Madrid una vez al mes y grabamos en un solo día, con los guiones escritos y el plan de rodaje cerrado contigo.',
      ads: 'Campañas limitadas a los barrios y radios de donde de verdad salen tus clientes, en lugar de a toda la Comunidad.',
      week2: { title: 'Viajamos a Madrid a grabar', text: 'Organizamos el viaje desde Girona con antelación y elegimos contigo el día de menos movimiento. Grabamos en tu local y dirigimos cada toma.' },
      note: 'Plazos orientativos: dependen de la fecha que cerremos para viajar a Madrid y de la revisión de los anuncios por parte de Meta.',
      proofTitleHtml: 'El mismo trabajo, <span class="text-gold">en tu negocio de Madrid.</span>',
      proofLead: 'Son anuncios y vídeos reales de CEM Valderas, clínica dental y cliente actual. Es el tipo de material que grabaríamos en tu local madrileño.',
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
    sales: {
      offerTitleHtml: 'NovaScale <span class="text-gold">en Barcelona.</span>',
      offerLead: 'Pensado para negocios de Barcelona y su área metropolitana: un rodaje con margen para ajustar la fecha, porque desde Girona estamos a un paso, contenido pensado para la mezcla de público de la ciudad y la IA atendiendo desde el primer mensaje.',
      grabacion: 'Una jornada al mes en tu negocio de Barcelona. Como venimos desde Girona, si te conviene otro día solemos poder ajustar la fecha.',
      ads: 'Anuncios para Barcelona ciudad o para los municipios del área metropolitana de donde vienen tus clientes.',
      week2: { title: 'Grabamos en Barcelona', text: 'Desde Girona nos plantamos en tu negocio el día acordado, con el equipo y los guiones. Si surge algo, solemos poder ajustar la fecha.' },
      note: 'Plazos orientativos: dependen del día de rodaje en Barcelona que encaje con tu agenda y de la revisión de los anuncios por parte de Meta.',
      proofTitleHtml: 'Trabajo real, <span class="text-gold">no una maqueta.</span>',
      proofLead: 'Anuncios y vídeos de CEM Valderas, clínica dental y cliente actual. Así trabajamos con un negocio de verdad, y así trabajaríamos con el tuyo en Barcelona.',
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
      'Agencia de marketing en Valencia: grabamos en tu negocio, lanzamos tus Meta Ads y la IA está configurada para responder a tus contactos en menos de 60 s.',
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
    sales: {
      offerTitleHtml: 'NovaScale <span class="text-gold">en Valencia.</span>',
      offerLead: 'Ajustado a una ciudad que no para de recibir gente nueva: contenido que enseña tu negocio a quien todavía no conoce a nadie, anuncios para la ciudad y l’Horta y un filtro que separa a quien tiene fecha y presupuesto.',
      grabacion: 'Viajamos a Valencia una vez al mes y grabamos en tu local, ya sea en la ciudad o en cualquier municipio de l’Horta.',
      ads: 'Anuncios para los barrios y pueblos de donde salen tus clientes, incluida la gente que acaba de mudarse y busca de cero.',
      week2: { title: 'Viajamos a Valencia a grabar', text: 'Cerramos la fecha con antelación, preparamos el viaje y grabamos en tu negocio en una sola jornada, con guion y sin parar tu día.' },
      note: 'Plazos orientativos: dependen de la fecha del viaje a Valencia y de la revisión de los anuncios por parte de Meta.',
      proofTitleHtml: 'Así trabajamos <span class="text-gold">con un cliente de verdad.</span>',
      proofLead: 'Son piezas reales de CEM Valderas, una clínica dental que es cliente actual. En Valencia, el rodaje y los anuncios serían los de tu negocio.',
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
      bullets: ['De Málaga capital a toda la costa', 'Atención inmediata a cualquier hora', 'Agente de voz pensado para coger llamadas 24/7'],
    },
    localAngle: {
      title: 'Málaga no se parece a ninguna otra plaza',
      paragraphs: [
        'La provincia combina una ciudad que no deja de crecer con una costa llena de residentes internacionales. Para una clínica, una inmobiliaria o una empresa de reformas, eso significa contactos en varios idiomas y en husos horarios distintos: si nadie contesta hasta el día siguiente, esa persona ya ha hablado con otro.',
        'El mercado inmobiliario de la Costa del Sol atrae a muchos compradores de fuera que escriben antes de viajar. La IA les responde al instante, pregunta plazo, zona y financiación, y deja a tu equipo solo las visitas con intención real.',
        'Además, aquí el calendario manda: hay meses de mucho movimiento y otros más tranquilos. Planificamos contigo qué contar y cuánto invertir en cada época, en lugar de repetir la misma campaña los doce meses.',
      ],
    },
    sales: {
      offerTitleHtml: 'NovaScale <span class="text-gold">en Málaga.</span>',
      offerLead: 'Pensado para la Costa del Sol: un rodaje que puede ir de Málaga capital a cualquier punto de la costa, campañas que siguen la temporada y una IA que contesta a quien escribe desde otro país a medianoche.',
      grabacion: 'Viajamos a Málaga o a la costa una vez al mes y grabamos en tu negocio, centrando el contenido en lo que toca contar cada temporada.',
      ads: 'Campañas que se ajustan a los meses fuertes y a los tranquilos, para residentes y para quien te busca desde fuera.',
      week2: { title: 'Viajamos a la Costa del Sol', text: 'Organizamos el viaje desde Girona con margen y grabamos en tu local, en la capital o en la costa, en un único día.' },
      note: 'Plazos orientativos: dependen de la fecha del viaje a Málaga y de la revisión de Meta. En temporada alta conviene reservar el rodaje con más antelación.',
      proofTitleHtml: 'Material real, <span class="text-gold">sin vídeos de stock.</span>',
      proofLead: 'Anuncios y vídeos del doctor de CEM Valderas, clínica dental y cliente actual. Así se ve nuestro trabajo cuando sale publicado en Instagram.',
    },
    sectorsHighlight: ['inmobiliarias', 'medicina-estetica', 'reformas'],
    faq: [
      { q: '¿Grabáis también en Marbella, Estepona o el resto de la costa?', a: 'Sí. Rodamos en Málaga capital y en cualquier municipio de la Costa del Sol, desde la Axarquía hasta Manilva.' },
      { q: 'Muchos de mis clientes escriben en inglés. ¿La IA puede atenderlos?', a: 'Lo configuramos según tu clientela. Si te escriben en inglés, preparamos a la IA con tu información aprobada en ese idioma y lo probamos contigo antes de activarlo; si una conversación necesita a una persona, te avisa al instante.' },
      { q: '¿Qué pasa con los compradores que contactan desde otro país?', a: 'Les atendemos igual de rápido: la IA responde aunque en España sea de noche, recoge sus datos y sus fechas de viaje y te los deja ordenados en CRM Nova para que prepares la visita.' },
      { q: '¿Vale la pena si mi negocio es de temporada?', a: 'Sí, siempre que lo planifiquemos. Concentramos la grabación y la inversión en los meses que importan y la IA sigue atendiendo durante todo el año, para que no pierdas los contactos que llegan fuera de temporada.' },
    ],
  },
  {
    slug: 'agencia-marketing-tarragona',
    city: 'Tarragona',
    seoTitle: 'Agencia de marketing en Tarragona | Visión Nova',
    seoDescription:
      'Agencia de marketing en Tarragona: grabamos vídeo en tu negocio, gestionamos tus redes y tus anuncios en Meta y una IA filtra cada contacto antes de pasártelo.',
    hero: {
      eyebrow: 'Agencia de marketing en Tarragona',
      title: 'Marketing en Tarragona con vídeo',
      titleAccent: 'grabado en tu negocio, no en un banco de imágenes.',
      lead: 'Tarragona vive del servicio de cercanía, de la costa y de un turismo que cambia con las estaciones. Vamos a tu negocio, grabamos el contenido del mes, lo convertimos en anuncios para tu zona y dejamos una IA atendiendo los mensajes para que hables solo con quien quiere comprar.',
      bullets: ['Rodaje en tu local de Tarragona o del Camp', 'Anuncios por municipio, de Salou a Reus', 'IA que pregunta antes de pasarte cada contacto'],
    },
    localAngle: {
      title: 'Lo que pide una clientela como la de Tarragona',
      paragraphs: [
        'La demanda en Tarragona se reparte entre la ciudad, el Camp y la costa, y casi nadie decide un servicio sin mirar antes el perfil del negocio. Cuando buscan «clínica» o «reforma» cerca de casa, comparan caras, local y comentarios. Un vídeo real del equipo trabajando pesa más que cualquier foto retocada.',
        'Hay negocios con mucha vida de barrio y otros que dependen de residentes y visitantes que llegan con otras fechas. Ajustamos los anuncios a cada caso: más cerca de casa para el cliente habitual, más amplio para quien viene de fuera, siempre con una IA configurada para filtrar antes de que nadie pierda una mañana al teléfono.',
        'Nos desplazamos hasta Tarragona siguiendo la AP-7, así que planificamos la jornada de grabación con antelación y la aprovechamos entera: recepción, equipo, servicio y todos los planos que alimentarán el mes.',
      ],
    },
    sales: {
      offerTitleHtml: 'NovaScale <span class="text-gold">en Tarragona.</span>',
      offerLead: 'Lo mismo que montamos en cualquier ciudad, afinado para el Camp de Tarragona: rodaje en tu negocio, anuncios por municipio y una IA que atiende y filtra antes de que el cliente se vaya a probar con otro.',
      grabacion: 'Una jornada al mes en tu negocio de Tarragona, con los guiones escritos y el plan de rodaje cerrado contigo para aprovechar cada hora.',
      ads: 'Campañas para Tarragona ciudad, el Camp y la costa cercana, con la zona ajustada a de dónde vienen de verdad tus clientes.',
      week2: { title: 'Viajamos a Tarragona a grabar', text: 'Cerramos contigo la fecha con antelación, viajamos desde Girona y grabamos en tu negocio con los guiones ya aprobados.' },
      note: 'Plazos orientativos: dependen de la fecha que fijemos para ir a Tarragona y de la revisión de los anuncios por parte de Meta.',
      proofTitleHtml: 'Trabajo real, <span class="text-gold">con un cliente de hoy.</span>',
      proofLead: 'Vídeos y anuncios de CEM Valderas, clínica dental y cliente actual. Es el estilo de contenido que prepararíamos en tu negocio de Tarragona.',
    },
    sectorsHighlight: ['clinicas-dentales', 'inmobiliarias', 'reformas'],
    faq: [
      { q: '¿Grabáis solo en Tarragona ciudad?', a: 'No. Rodamos en tu negocio esté donde esté: Tarragona, Reus, Salou, Cambrils, Valls o cualquier punto del Camp y de la costa.' },
      { q: '¿Qué ventaja tiene contratar una agencia que no es de aquí?', a: 'Que vamos a grabar a tu local con el equipo ya preparado, y que el resto del trabajo (anuncios, redes, atención con IA y CRM) se hace a distancia sin que tengas que desplazarte. Lo que necesitas de nosotros presencialmente es el día de rodaje.' },
      { q: 'Mi negocio sube y baja con el turismo. ¿Sirve igualmente?', a: 'Sí, siempre que lo planifiquemos contigo. Concentramos la inversión en las semanas que más te importan y dejamos que la IA atienda el resto del año, para no perder los contactos que llegan fuera de temporada.' },
      { q: '¿Puedo ver cómo trabajáis antes de decidir?', a: 'En la llamada de 20 minutos te enseñamos material real de un cliente actual, cómo se ve el CRM Nova y cómo preguntaría la IA a un contacto de tu sector. Si no encajamos, te lo decimos nosotros.' },
    ],
  },
  {
    slug: 'agencia-marketing-el-vendrell',
    city: 'El Vendrell',
    seoTitle: 'Agencia de marketing en El Vendrell | Visión Nova',
    seoDescription:
      'Agencia de marketing para negocios de El Vendrell y el Baix Penedès: vídeo grabado en tu local, redes, anuncios en Meta y una IA que filtra cada contacto.',
    hero: {
      eyebrow: 'Agencia de marketing en El Vendrell',
      title: 'Marketing en El Vendrell y el Baix Penedès',
      titleAccent: 'para negocios que viven de la gente de aquí.',
      lead: 'El Vendrell queda entre Barcelona y Tarragona, con la costa a un paso y una clientela que mezcla vecinos, residentes de segunda vivienda y visitantes. Grabamos contenido real en tu negocio, lo movemos con anuncios en tu zona y dejamos a una IA preguntando antes de que el contacto llegue a ti.',
      bullets: ['Contenido grabado en tu negocio del Baix Penedès', 'Anuncios cerca de ti: Calafell, Coma-ruga, Sant Vicenç', 'IA que filtra los contactos antes de tu llamada'],
    },
    localAngle: {
      title: 'El Vendrell, a medio camino de todo',
      paragraphs: [
        'Estar entre Barcelona y Tarragona, con la AP-7 y la estación de Sant Vicenç de Calders cerca, hace que tu clientela pueda venir de varios municipios. Eso es una oportunidad, pero también significa que a un cliente le basta una tarde de Instagram para comparar tu negocio con otro de la comarca.',
        'Muchos negocios de la zona dependen de gente que reside aquí todo el año y de quienes llegan en verano o fines de semana a las poblaciones de la costa. Nos adaptamos a ese ritmo: el anuncio y la atención no pueden ser los mismos en febrero que en agosto.',
        'En una comarca donde casi todos se conocen, lo que distingue a un negocio es enseñar a su equipo de verdad y contestar rápido a quien escribe. Eso es lo que montamos contigo.',
      ],
    },
    sales: {
      offerTitleHtml: 'NovaScale <span class="text-gold">en El Vendrell.</span>',
      offerLead: 'Para negocios del Baix Penedès y la costa: rodaje en tu local, anuncios para la comarca y una IA que atiende cada mensaje y separa a quien va en serio del que solo curiosea.',
      grabacion: 'Una jornada al mes en tu negocio de El Vendrell o de cualquier pueblo del Baix Penedès, con guiones y plan de rodaje acordados antes.',
      ads: 'Anuncios para El Vendrell, Calafell, Cunit, Coma-ruga y los municipios de los que de verdad salen tus clientes, no para toda la provincia.',
      week2: { title: 'Viajamos al Baix Penedès a grabar', text: 'Fijamos contigo la fecha con antelación, viajamos desde Girona y grabamos en tu local con los guiones ya aprobados.' },
      note: 'Plazos orientativos: dependen de la fecha de rodaje en El Vendrell y de la revisión de los anuncios por parte de Meta.',
      proofTitleHtml: 'Así se ve el trabajo, <span class="text-gold">no un catálogo.</span>',
      proofLead: 'Anuncios y vídeos de CEM Valderas, clínica dental y cliente actual. Es el tipo de material que grabaríamos en tu negocio de El Vendrell.',
    },
    sectorsHighlight: ['inmobiliarias', 'reformas', 'clinicas-dentales'],
    faq: [
      { q: '¿Trabajáis con negocios de El Vendrell y de pueblos cercanos?', a: 'Sí. Grabamos en El Vendrell, Calafell, Cunit, Coma-ruga, Albinyana y cualquier municipio del Baix Penedès o de la costa, además de Tarragona y Barcelona.' },
      { q: '¿Qué tipo de negocios encajan mejor?', a: 'Clínicas dentales y estéticas, inmobiliarias y empresas de reformas que ya facturan, tienen equipo y quieren crecer sin contratar más personal. Si tu caso es otro, en la llamada te decimos con claridad si podemos ayudarte.' },
      { q: '¿Cómo funciona si mi negocio vive del verano y los fines de semana?', a: 'Lo planificamos con calendario: reforzamos contenido y anuncios en los meses fuertes y dejamos la atención con IA y el CRM funcionando el resto del año para que no se pierda ningún contacto.' },
      { q: '¿Tengo que desplazarme a vuestras oficinas?', a: 'No. Vamos nosotros a grabar a tu negocio y el resto del trabajo se coordina a distancia: llamadas, aprobación de guiones, informes y CRM Nova.' },
    ],
  },
];
