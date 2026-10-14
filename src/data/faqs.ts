export interface FaqItem { q: string; a: string }

export const GUARANTEE_FAQ: FaqItem = {
  q: '¿Cómo funciona la garantía?',
  a: 'Los 30 días empiezan a contar el día que arrancan las campañas, no el día que firmamos. Antes de empezar acordamos contigo qué cuenta como cliente filtrado en tu negocio y cuánto se invierte en Ads. Todo eso queda por escrito en el contrato, así que no hay sorpresas para ninguna de las dos partes.',
};

export const HOME_FAQ: FaqItem[] = [
  {
    q: '¿Qué hacéis exactamente?',
    a: 'Montamos el sistema completo para que te lleguen clientes: grabamos el contenido de tu negocio, lo publicamos en tus redes, lanzamos campañas de Meta Ads con esos mismos vídeos y conectamos un WhatsApp y un agente de voz con IA que atienden y filtran cada contacto. Tú ves todo en CRM Nova y tu equipo solo habla con quien está listo para comprar.',
  },
  {
    q: '¿Venís de verdad a grabar a mi negocio? ¿Y si estoy fuera de Madrid o Barcelona?',
    a: 'Sí, vamos en persona. Grabamos en toda España: preparamos los guiones antes, llevamos el equipo y nos adaptamos a tu horario para no parar tu día a día.',
  },
  {
    q: '¿Quién paga la publicidad de Meta?',
    a: 'La inversión en anuncios la pagas tú, directamente a Meta, con tu propia tarjeta y en tu propia cuenta publicitaria. Nosotros la gestionamos y te contamos cada mes en qué se ha ido cada euro.',
  },
  {
    q: '¿Mis clientes notarán que hablan con una IA?',
    a: 'La IA se configura con el tono, las frases y la información real de tu negocio, así que la conversación suena a tu equipo y no a un contestador. Lo que nota el cliente es que le responden al momento y con información correcta, a cualquier hora.',
  },
  {
    q: '¿Qué pasa si la IA no sabe responder?',
    a: 'No se inventa nada: solo responde con la información que tú has aprobado. Cuando una conversación necesita a una persona, te avisa al instante para que la tomes tú o alguien de tu equipo.',
  },
  {
    q: '¿El número de WhatsApp sigue siendo mío?',
    a: 'Sí. Trabajamos con la API oficial de WhatsApp Business y el número es tuyo de principio a fin. Si algún día dejamos de trabajar juntos, el número y las conversaciones siguen contigo.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende de tu negocio, de cuánto contenido necesitas y de dónde quieres captar. En la llamada de 20 minutos lo vemos contigo y después te enviamos una propuesta cerrada, sin partidas escondidas. Si solo quieres el software, tienes los planes de Nova en la app.',
  },
  GUARANTEE_FAQ,
];
