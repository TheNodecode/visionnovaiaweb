import type { IconName } from '../components/ui/icon-names';

export type ServiceSlug =
  | 'creacion-de-contenido'
  | 'gestion-redes-sociales'
  | 'publicidad-meta-ads'
  | 'sistema-ia'
  | 'whatsapp-business-api'
  | 'diseno-web';

export type ServicePage = {
  slug: ServiceSlug;
  seoTitle: string; // ≤ 60 caracteres, con la keyword al principio
  seoDescription: string; // 140–160 caracteres
  keyword: string;
  hero: { eyebrow: string; title: string; titleAccent?: string; lead: string; bullets: string[] };
  features: { title: string; items: { title: string; text: string; icon: IconName }[] };
  process?: { title: string; steps: { title: string; text: string }[] }; // contenido no lo usa: la jornada de rodaje lo cuenta
  faq: { q: string; a: string }[]; // 5–6, específicas del servicio
  related: string[]; // slugs de sectores (`sectores/...`) y de otros servicios
};

export const SERVICES: ServicePage[] = [
  // ───────────────────────────── Creación de contenido
  {
    slug: 'creacion-de-contenido',
    keyword: 'agencia de creación de contenido para redes sociales',
    seoTitle: 'Agencia de creación de contenido para redes sociales',
    seoDescription:
      'Agencia de creación de contenido para redes sociales: vamos a tu negocio con guiones y filmmaker y grabamos en una jornada los reels y anuncios del mes.',
    hero: {
      eyebrow: 'Agencia de creación de contenido',
      title: 'Contenido para redes sociales grabado',
      titleAccent: 'en tu propio negocio.',
      lead: 'Llegamos con los guiones escritos, el equipo de imagen y sonido y los formatos decididos. En una jornada de grabación al mes sacamos los reels, las stories y los creativos para anuncios de las semanas siguientes. Tú solo pones el negocio.',
      bullets: ['Guiones escritos y filmmaker en tu local', 'Una jornada de grabación cada mes', 'Rodamos en cualquier punto de España'],
    },
    features: {
      title: 'Todo lo que pasa antes, durante y después de darle a grabar',
      items: [
        { icon: 'film', title: 'Guiones con intención', text: 'Cada vídeo nace de una pregunta real de tus clientes o de una objeción que oyes en el mostrador. Los escribimos antes de ir y te los pasamos para revisarlos.' },
        { icon: 'camera', title: 'Filmmaker en tu negocio', text: 'Cámara, luz y micrófonos de solapa montados en tu local sin necesidad de cerrarlo. Nos adaptamos a tus horas más tranquilas.' },
        { icon: 'users', title: 'Dirigimos a tu equipo', text: 'Nadie necesita saber hablar a cámara. Damos frases cortas, repetimos lo que haga falta y elegimos las tomas en las que sonáis naturales.' },
        { icon: 'spark', title: 'Reels y stories editados', text: 'Montaje vertical, subtítulos que se leen sin sonido, un arranque pensado para los primeros segundos y portadas coherentes con tu marca.' },
        { icon: 'megaphone', title: 'Creativos para anuncios', text: 'De la misma jornada salen varias versiones de cada idea para probar en Meta Ads: ganchos distintos, otras duraciones y otra llamada a la acción.' },
        { icon: 'calendar', title: 'Un plan para cada mes', text: 'Decidimos contigo qué toca contar: temporada, servicios que quieres empujar, novedades del equipo. El siguiente rodaje ya llega con guion.' },
      ],
    },
    faq: [
      { q: '¿Cuántos vídeos salen de cada jornada de grabación?', a: 'Depende de tu negocio y de lo que quieras contar ese mes. Lo fijamos en la propuesta antes de empezar, así sabes exactamente qué recibes. Preferimos pocas piezas con buen guion a muchas que nadie termina de ver.' },
      { q: '¿Tengo que salir yo en los vídeos?', a: 'No es obligatorio, aunque funciona mejor cuando aparece alguien del negocio: la gente quiere ver quién la va a atender. Si nadie quiere ponerse delante de la cámara, trabajamos con planos de tu local, de tu servicio y con voz en off.' },
      { q: '¿Venís a grabar aunque mi negocio esté lejos de Girona?', a: 'Sí. Nuestra base está en Girona, pero grabamos en cualquier punto de España. El desplazamiento se organiza con antelación y queda reflejado en la propuesta.' },
      { q: '¿Hay que cerrar el negocio el día del rodaje?', a: 'No. Repartimos las tomas en bloques cortos y aprovechamos los ratos con menos clientela. Cada persona graba su parte y vuelve a lo suyo.' },
      { q: '¿Puedo usar los vídeos fuera de las redes?', a: 'Sí. Se graban para tu marca y te los entregamos para que también los uses en tu web, en tus anuncios o en la pantalla de tu sala de espera.' },
      { q: '¿Se publica algo sin que yo lo vea?', a: 'Nunca. Revisas cada pieza antes de que salga y nos dices qué ajustar. Sin tu visto bueno, no se publica.' },
    ],
    related: ['gestion-redes-sociales', 'publicidad-meta-ads', 'sectores/clinicas-dentales', 'sectores/medicina-estetica'],
  },

  // ───────────────────────────── Gestión de redes sociales
  {
    slug: 'gestion-redes-sociales',
    keyword: 'agencia de redes sociales',
    seoTitle: 'Agencia de redes sociales para negocios | Visión Nova',
    seoDescription:
      'Agencia de redes sociales: calendario, textos, diseño, publicación y respuesta a comentarios y mensajes, con una IA que detecta quién quiere comprar.',
    hero: {
      eyebrow: 'Agencia de redes sociales',
      title: 'Tus redes al día y bien contestadas,',
      titleAccent: 'sin que tengas que abrir Instagram.',
      lead: 'Planificamos, escribimos, diseñamos y publicamos. Respondemos comentarios y mensajes directos, y cuando alguien pregunta por precio o disponibilidad, la IA lo separa del resto y te lo pasa con sus datos.',
      bullets: ['Calendario mensual aprobado por ti', 'Respuesta a comentarios y mensajes', 'La IA detecta quién quiere comprar'],
    },
    features: {
      title: 'Lo que hacemos con tus redes cada mes',
      items: [
        { icon: 'calendar', title: 'Calendario editorial', text: 'Un mes de publicaciones planificado de antemano, con fecha, formato y objetivo de cada pieza. Lo apruebas una vez y te despreocupas.' },
        { icon: 'spark', title: 'Textos que suenan a ti', text: 'Escritos con tu manera de hablar, no con frases de manual. Cada publicación acaba con un siguiente paso claro para quien la lee.' },
        { icon: 'film', title: 'Diseño y vídeo', text: 'Portadas, carruseles y reels montados con el material que grabamos en tu negocio, para que el perfil se vea coherente de arriba abajo.' },
        { icon: 'chat', title: 'Comentarios y mensajes directos', text: 'Contestamos a quien comenta o escribe por privado. Nadie se queda días esperando una respuesta a su pregunta.' },
        { icon: 'target', title: 'Filtro de intención con IA', text: 'Si un mensaje pregunta por precio, cita o disponibilidad, la IA lo marca como oportunidad, recoge los datos y lo envía a tu CRM.' },
        { icon: 'chart', title: 'Un informe sin humo', text: 'Cada mes ves qué publicaciones han generado conversaciones y contactos, no solo cuántos me gusta han sumado.' },
      ],
    },
    process: {
      title: 'Cómo cogemos tus redes desde el primer mes',
      steps: [
        { title: 'Auditoría del perfil', text: 'Revisamos biografía, destacadas, lo último publicado y cómo se contesta hoy. Te decimos qué cambiar antes de subir nada nuevo.' },
        { title: 'Tono y límites', text: 'Acordamos cómo habla tu marca, qué temas se tocan y cuáles no, y qué preguntas debe responder siempre alguien de tu equipo.' },
        { title: 'Calendario y aprobación', text: 'Te enviamos el mes completo para revisarlo. Con tu visto bueno, lo dejamos todo programado.' },
        { title: 'Gestión diaria', text: 'Publicamos, contestamos y vigilamos la bandeja. Las oportunidades de venta llegan a CRM Nova con el historial de la conversación.' },
      ],
    },
    faq: [
      { q: '¿En qué redes sociales trabajáis?', a: 'Nos centramos en Instagram y Facebook, que es donde están los clientes de la mayoría de negocios locales y donde luego se lanzan los anuncios. Si tu público también está en TikTok o LinkedIn, lo valoramos en la llamada.' },
      { q: '¿Quién responde los mensajes, una persona o la IA?', a: 'Depende del mensaje. Las dudas habituales se resuelven al momento con la información que tú apruebas. Cuando hay intención de compra o algo delicado, te avisamos para que entre una persona de tu equipo.' },
      { q: '¿Tengo que aprobar cada publicación una por una?', a: 'Apruebas el calendario del mes de una sola vez. Si surge algo sobre la marcha, como una promoción o un cierre por vacaciones, nos escribes y lo ajustamos.' },
      { q: '¿Vais a llenar mi perfil de plantillas genéricas?', a: 'No. Todo sale del contenido grabado en tu negocio y de tus propios servicios. Las plantillas que se repiten en cien perfiles se notan y no convencen a nadie.' },
      { q: '¿Puedo seguir publicando yo cuando me apetezca?', a: 'Por supuesto: las cuentas siguen siendo tuyas. Solo te pedimos que nos avises para encajarlo en el calendario y que no se pisen publicaciones.' },
      { q: '¿Sirve gestionar las redes sin hacer anuncios?', a: 'Sirve para que quien te encuentra vea un negocio activo y de confianza. Pero si quieres que entren contactos nuevos cada semana, lo orgánico se queda corto: ahí entran las campañas de Meta Ads con ese mismo contenido.' },
    ],
    related: ['creacion-de-contenido', 'publicidad-meta-ads', 'sectores/medicina-estetica', 'sectores/inmobiliarias'],
  },

  // ───────────────────────────── Meta Ads
  {
    slug: 'publicidad-meta-ads',
    keyword: 'agencia de Meta Ads (Facebook e Instagram Ads)',
    seoTitle: 'Agencia de Meta Ads: Facebook e Instagram Ads | Visión Nova',
    seoDescription:
      'Campañas de Facebook e Instagram Ads con vídeos grabados en tu negocio. Tú pagas la inversión directamente a Meta y nuestra IA filtra cada lead al momento.',
    hero: {
      eyebrow: 'Agencia de Meta Ads',
      title: 'Anuncios en Facebook e Instagram',
      titleAccent: 'que acaban en citas, no en curiosos.',
      lead: 'Diseñamos la estrategia, montamos los anuncios con tus propios vídeos y los optimizamos cada semana. La diferencia está en lo que ocurre después del clic: la IA responde al contacto en menos de 60 segundos y lo pasa a tu equipo ya filtrado.',
      bullets: ['La inversión la pagas tú directamente a Meta', 'Creativos con vídeos de tu negocio', 'Informe mensual de cada euro'],
    },
    features: {
      title: 'Una campaña completa, del anuncio a la cita',
      items: [
        { icon: 'target', title: 'Estrategia por objetivo', text: 'Definimos a quién buscamos, en qué radio alrededor de tu negocio y con qué mensaje, según el servicio que más te interesa vender ese mes.' },
        { icon: 'film', title: 'Creativos con tu contenido', text: 'Los anuncios usan los vídeos rodados en tu local. Tu cara y tu equipo generan más confianza que cualquier imagen de banco.' },
        { icon: 'bolt', title: 'Respuesta inmediata al lead', text: 'En cuanto alguien deja sus datos o escribe desde el anuncio, la IA le contesta por WhatsApp y empieza a cualificarlo. Sin esperar al día siguiente.' },
        { icon: 'crm', title: 'Cada contacto en CRM Nova', text: 'Ves de qué anuncio viene cada persona, qué ha contestado y en qué punto está. Así sabemos qué campañas traen clientes y cuáles solo traen ruido.' },
        { icon: 'chart', title: 'Optimización semanal', text: 'Pausamos lo que no rinde, damos más presupuesto a lo que funciona y probamos ganchos nuevos con material de la siguiente jornada de grabación.' },
        { icon: 'shield', title: 'Tu cuenta, tu tarjeta', text: 'La cuenta publicitaria está a tu nombre y Meta te cobra directamente. Siempre sabes cuánto se ha invertido, sin intermediarios en el pago.' },
      ],
    },
    process: {
      title: 'De la primera llamada a los primeros contactos',
      steps: [
        { title: 'Diagnóstico', text: 'Revisamos tu cuenta publicitaria si ya existe, qué se ha probado antes y cuánto vale para ti un cliente. Con eso fijamos la inversión de partida.' },
        { title: 'Montaje técnico', text: 'Configuramos píxel, eventos, formularios y la conexión con WhatsApp y CRM Nova para que los contactos no se pierdan por el camino.' },
        { title: 'Lanzamiento con variantes', text: 'Salimos con varios creativos y públicos a la vez. Las primeras semanas sirven para ver qué combinación atrae a gente con intención real.' },
        { title: 'Optimización e informe', text: 'Ajustamos cada semana y a final de mes te enviamos un resumen claro: inversión, contactos, contactos filtrados y citas.' },
      ],
    },
    faq: [
      { q: '¿Cuánto tengo que invertir en publicidad?', a: 'Depende de tu zona, de tu sector y de cuántos clientes nuevos puedes atender. Lo calculamos contigo en la llamada a partir de tu ticket medio. Esa inversión la pagas tú directamente a Meta, aparte de nuestro trabajo.' },
      { q: '¿Por qué Meta Ads y no Google Ads?', a: 'Para negocios locales de ticket alto, Facebook e Instagram permiten llegar con vídeo y con tu cara a gente que todavía no te está buscando. Google funciona bien cuando la demanda ya existe; si en tu caso tiene sentido, te lo diremos.' },
      { q: '¿Cuándo empiezan a llegar contactos?', a: 'En cuanto la campaña se activa empiezan a entrar conversaciones. Lo que lleva algo más de tiempo es afinar: las primeras semanas sirven para descubrir qué anuncios atraen a quien de verdad compra.' },
      { q: 'Ya probé con anuncios y solo me llegaban curiosos. ¿Qué cambia?', a: 'Dos cosas. Los anuncios llevan contenido grabado para tu negocio, que atrae a un perfil más concreto. Y cada contacto pasa por la IA, que pregunta necesidad, plazo e intención antes de que tu equipo dedique tiempo a esa persona.' },
      { q: '¿Tengo acceso a la cuenta publicitaria?', a: 'Siempre. La cuenta está a tu nombre y tienes acceso completo. Además, cada mes te enviamos el informe con lo invertido y lo que ha salido de esa inversión.' },
      { q: '¿Gestionáis anuncios sin el resto del sistema?', a: 'Los anuncios rinden de verdad cuando hay buen contenido detrás y alguien responde al instante. Por eso los montamos dentro del sistema completo. Si ya tienes contenido propio de calidad, lo vemos en la llamada.' },
    ],
    related: ['creacion-de-contenido', 'sistema-ia', 'sectores/reformas', 'sectores/clinicas-dentales'],
  },

  // ───────────────────────────── Sistema IA
  {
    slug: 'sistema-ia',
    keyword: 'chatbot de WhatsApp con IA y agente de voz',
    seoTitle: 'Chatbot de WhatsApp con IA y agente de voz | Visión Nova',
    seoDescription:
      'WhatsApp con IA que responde en menos de 60 s, agente de voz 24/7 y CRM Nova. Recupera las llamadas perdidas y avisa a tu equipo solo cuando hace falta.',
    hero: {
      eyebrow: 'Sistema IA + CRM Nova',
      title: 'Chatbot de WhatsApp con IA y agente de voz',
      titleAccent: 'que atienden mientras tú trabajas.',
      lead: 'Nova contesta los mensajes en menos de 60 segundos, coge el teléfono a cualquier hora y retoma las llamadas que no pudiste atender. Pregunta lo que preguntarías tú, propone la cita y te avisa al momento si el cliente necesita hablar con una persona.',
      bullets: ['Respuesta en WhatsApp en menos de 60 s', 'Agente de voz 24/7', 'CRM Nova con cada conversación'],
    },
    features: {
      title: 'Seis piezas que trabajan como una sola',
      items: [
        { icon: 'chat', title: 'WhatsApp con IA', text: 'Resuelve dudas, pide los datos que necesitas y propone huecos de tu agenda. Escribe con el tono de tu negocio, no con frases de contestador.' },
        { icon: 'phone', title: 'Agente de voz 24/7', text: 'Atiende llamadas de noche, en fin de semana o cuando todo tu equipo está ocupado. Habla con naturalidad y deja la cita apuntada.' },
        { icon: 'bolt', title: 'Llamadas perdidas recuperadas', text: 'Si alguien llama y nadie lo coge, el sistema le escribe por WhatsApp en ese mismo momento para retomar la conversación antes de que pruebe con otro.' },
        { icon: 'target', title: 'Necesidad, plazo e intención', text: 'Antes de pasarte a nadie, la IA pregunta al contacto qué busca, para cuándo lo quiere y si está decidido. Tu equipo empieza cada llamada con contexto.' },
        { icon: 'crm', title: 'CRM Nova', text: 'Cada contacto aparece con su origen, la conversación completa y su estado. Ves de un vistazo quién está listo para cerrar y quién necesita más tiempo.' },
        { icon: 'users', title: 'Aviso cuando hace falta una persona', text: 'Una queja, una duda delicada o alguien que pide hablar con el equipo: la IA se aparta y te avisa al instante para que tomes el mando.' },
      ],
    },
    process: {
      title: 'Cómo dejamos a Nova hablando como tu equipo',
      steps: [
        { title: 'Entrevista de negocio', text: 'Nos cuentas servicios, horarios, preguntas habituales, lo que nunca debe decirse y cómo te gusta tratar a tus clientes.' },
        { title: 'Configuración y pruebas', text: 'Cargamos esa información, conectamos tu WhatsApp y tu teléfono, y ensayamos conversaciones difíciles antes de abrirlo al público.' },
        { title: 'Revisión contigo', text: 'Escuchas llamadas de prueba y lees conversaciones simuladas. Ajustamos todo lo que no suene a ti hasta que lo apruebes.' },
        { title: 'En marcha y en mejora', text: 'Ya en activo, revisamos conversaciones reales cada semana y afinamos respuestas. Tú lo sigues todo en CRM Nova desde el móvil.' },
      ],
    },
    faq: [
      { q: '¿La IA puede inventarse precios o condiciones?', a: 'Está configurada para responder solo con la información que tú apruebas, y la probamos contigo antes de activarla. Si le preguntan algo que no tiene, lo dice con naturalidad y avisa a tu equipo. En sectores sanitarios está configurada para no dar indicaciones clínicas y derivar esas preguntas a tu equipo.' },
      { q: '¿El agente de voz suena a robot?', a: 'Suena a una persona amable que conoce tu negocio. Puedes comprobarlo tú mismo con las grabaciones de demostración de esta página antes de decidir nada.' },
      { q: '¿Qué pasa con las llamadas fuera de horario?', a: 'Las atiende el agente de voz: resuelve dudas, toma los datos y deja propuesta la cita. Por la mañana tu equipo encuentra en CRM Nova el resumen de las llamadas de la noche.' },
      { q: '¿Se puede conectar con la agenda que ya uso?', a: 'Lo revisamos en la llamada: nos dices con qué herramienta gestionas hoy las citas y te explicamos cómo encaja con el sistema antes de empezar.' },
      { q: '¿Qué pasa con los datos de mis clientes?', a: 'Las conversaciones se guardan en tu CRM y solo acceden las personas que tú autorices. Antes de arrancar dejamos por escrito cómo se tratan esos datos, tal como exige el RGPD.' },
      { q: '¿Puedo contratar solo el software, sin la agencia?', a: 'Sí. Si ya tienes contenido y anuncios funcionando, puedes usar Nova por tu cuenta. Los planes del software están publicados en la app de Nova.' },
    ],
    related: ['whatsapp-business-api', 'publicidad-meta-ads', 'sectores/clinicas-dentales', 'sectores/inmobiliarias'],
  },

  // ───────────────────────────── WhatsApp Business API
  {
    slug: 'whatsapp-business-api',
    keyword: 'WhatsApp Business API oficial',
    seoTitle: 'WhatsApp Business API oficial con IA | Visión Nova',
    seoDescription:
      'Conectamos tu número a la WhatsApp Business API oficial: varios agentes, plantillas aprobadas e IA que responde en menos de 60 s. El número sigue siendo tuyo.',
    hero: {
      eyebrow: 'WhatsApp Business API oficial',
      title: 'Tu WhatsApp, preparado',
      titleAccent: 'para atender a todo el que escribe.',
      lead: 'Pasamos tu número de la aplicación a la API oficial de Meta. Tu equipo comparte una misma bandeja desde varios dispositivos, envías plantillas aprobadas y una IA contesta en menos de 60 segundos, con todo registrado en CRM Nova.',
      bullets: ['El número sigue siendo tuyo', 'Varios agentes en la misma bandeja', 'IA conectada desde el primer día'],
    },
    features: {
      title: 'Lo que cambia al pasar a la API oficial',
      items: [
        { icon: 'shield', title: 'API oficial de Meta', text: 'Trabajamos con la WhatsApp Business API oficial, no con aplicaciones de terceros que se saltan las normas y ponen en riesgo tu número.' },
        { icon: 'megaphone', title: 'Anuncios que abren el chat', text: 'Tus campañas de Meta pueden llevar directamente a una conversación con tu número, y cada contacto llega marcado con el anuncio del que viene.' },
        { icon: 'users', title: 'Varios agentes a la vez', text: 'Recepción, comercial y dirección atienden desde la misma bandeja, cada uno desde su ordenador o su móvil, y se reparten las conversaciones.' },
        { icon: 'calendar', title: 'Plantillas aprobadas', text: 'Recordatorios, confirmaciones y seguimientos con mensajes plantilla aprobados por Meta, para escribir a quien te dio permiso sin esperar a que te escriba.' },
        { icon: 'chat', title: 'IA conectada', text: 'Responde en menos de 60 segundos, cualifica y solo te pasa las conversaciones con intención. Puedes tomar el control cuando quieras.' },
        { icon: 'crm', title: 'Todo en CRM Nova', text: 'Cada chat queda unido a la ficha del cliente, con etiquetas, notas y el anuncio del que llegó.' },
      ],
    },
    process: {
      title: 'Cómo migramos tu número sin perder clientes',
      steps: [
        { title: 'Revisión del número', text: 'Comprobamos si tu número actual puede pasar a la API y qué hay que preparar: datos fiscales, verificación del negocio y nombre visible.' },
        { title: 'Alta y verificación', text: 'Damos de alta el número en la API oficial a nombre de tu empresa y redactamos las primeras plantillas para que Meta las apruebe.' },
        { title: 'Conexión con IA y CRM', text: 'Enlazamos el número con Nova, cargamos las respuestas de tu negocio y creamos los accesos de cada persona de tu equipo.' },
        { title: 'Arranque acompañado', text: 'Durante los primeros días repasamos contigo las conversaciones para ajustar tono, horarios y avisos.' },
      ],
    },
    faq: [
      { q: '¿Qué diferencia hay entre la app de WhatsApp Business y la API?', a: 'La app está pensada para un móvil y una persona. La API oficial permite que varias personas atiendan el mismo número, conectar una IA, enviar plantillas aprobadas y guardar cada conversación en un CRM.' },
      { q: '¿Pierdo mis conversaciones al pasar mi número a la API?', a: 'Depende de cómo se haga la migración, así que lo revisamos contigo antes de tocar nada. Sabrás de antemano qué historial se conserva y cómo guardar lo que quieras. Desde ese momento, todo queda registrado en CRM Nova.' },
      { q: '¿Meta cobra por usar la API?', a: 'Meta factura algunos tipos de mensajes, sobre todo las plantillas que envías tú para iniciar una conversación. Ese importe lo cobra Meta directamente, y te explicamos cómo funciona antes de empezar.' },
      { q: '¿Puedo seguir contestando yo desde el móvil?', a: 'Sí. Tú y tu equipo entráis a la bandeja compartida desde el móvil o el ordenador. Cuando alguien toma una conversación, la IA deja de responder en ella.' },
      { q: '¿Corro riesgo de que me bloqueen el número?', a: 'Usar la API oficial y respetar las normas de Meta es la forma más segura de trabajar con WhatsApp a escala. Los bloqueos suelen venir de herramientas no oficiales y de envíos masivos sin permiso, y no trabajamos con ninguna de las dos cosas.' },
    ],
    related: ['sistema-ia', 'publicidad-meta-ads', 'sectores/clinicas-dentales', 'sectores/reformas'],
  },

  // ───────────────────────────── Diseño web
  {
    slug: 'diseno-web',
    keyword: 'diseño web para negocios',
    seoTitle: 'Diseño web para negocios que captan clientes | Visión Nova',
    seoDescription:
      'Diseño web para negocios: rápida en el móvil, pensada para convertir visitas en contactos y conectada a CRM Nova. Va incluida al montar el sistema completo.',
    hero: {
      eyebrow: 'Diseño web para negocios',
      title: 'Una web que no está de adorno:',
      titleAccent: 'convierte visitas en contactos.',
      lead: 'La web es una pieza más del sistema. Carga rápido en el móvil, explica lo que haces en pocos segundos y cada formulario o botón de WhatsApp entra directo en CRM Nova, donde la IA atiende al contacto al momento.',
      bullets: ['Incluida en el montaje del sistema', 'Diseñada primero para el móvil', 'Formularios conectados a CRM Nova'],
    },
    features: {
      title: 'Lo que tiene una web hecha para vender',
      items: [
        { icon: 'bolt', title: 'Rápida de verdad', text: 'Código ligero, imágenes optimizadas y nada de añadidos innecesarios. Quien llega desde un anuncio no se queda mirando una pantalla en blanco.' },
        { icon: 'target', title: 'Un objetivo por página', text: 'Cada página lleva al visitante a un único paso siguiente: pedir cita, solicitar presupuesto o escribir por WhatsApp.' },
        { icon: 'crm', title: 'Conectada al CRM', text: 'Los formularios no terminan en un correo que nadie abre. Cada contacto entra en CRM Nova con su origen y la IA le escribe al momento.' },
        { icon: 'film', title: 'Con tu contenido real', text: 'Usamos los vídeos y fotos de la jornada de grabación. La web enseña tu negocio tal como es, no imágenes repetidas en mil sitios.' },
        { icon: 'globe', title: 'Preparada para Google', text: 'Estructura, títulos, velocidad y datos estructurados pensados para que Google entienda qué haces y en qué zona lo haces.' },
        { icon: 'chart', title: 'Medición desde el primer día', text: 'Sabes cuántas visitas llegan, de dónde vienen y cuántas acaban en contacto, para decidir con datos y no a ojo.' },
      ],
    },
    process: {
      title: 'Cómo construimos tu web',
      steps: [
        { title: 'Qué tiene que conseguir', text: 'Definimos qué servicios empujar, qué dudas resolver antes de que te llamen y qué paso queremos que dé cada visitante.' },
        { title: 'Textos y estructura', text: 'Escribimos los textos con tus palabras y ordenamos las páginas antes de diseñar una sola pantalla.' },
        { title: 'Diseño y desarrollo', text: 'Diseñamos primero para el móvil y después para el ordenador, con tu contenido grabado y tu identidad visual.' },
        { title: 'Conexión y publicación', text: 'Enlazamos formularios y WhatsApp con CRM Nova, activamos la medición y publicamos. Mientras trabajamos juntos, la web evoluciona con tus campañas.' },
      ],
    },
    faq: [
      { q: '¿Puedo contratar solo la web?', a: 'No la ofrecemos como servicio suelto. La construimos al montar el sistema completo, porque es donde aterrizan los anuncios y el contenido. Si lo que buscas es una web barata, no somos la opción adecuada.' },
      { q: 'Ya tengo web. ¿Hay que hacerla de cero?', a: 'No necesariamente. La revisamos y, si carga bien y se puede conectar al CRM, la mejoramos. Si está frenando tus campañas, te proponemos rehacerla dentro del montaje.' },
      { q: '¿A nombre de quién está el dominio?', a: 'Del tuyo. El dominio debe estar a nombre de tu empresa; si todavía no lo tienes, te ayudamos a registrarlo así desde el principio.' },
      { q: '¿Cuánto tarda en estar publicada?', a: 'En la propuesta te indicamos los plazos, que dependen de cuántas páginas necesites y de cuándo hagamos la primera jornada de grabación para tener material propio.' },
      { q: '¿Me garantizáis salir el primero en Google?', a: 'No, y desconfía de quien lo haga. Dejamos la web preparada para que Google la entienda: velocidad, estructura y textos con las búsquedas reales de tus clientes. Posicionar lleva tiempo y depende de tu competencia.' },
    ],
    related: ['creacion-de-contenido', 'sistema-ia', 'sectores/reformas', 'sectores/inmobiliarias'],
  },
];
