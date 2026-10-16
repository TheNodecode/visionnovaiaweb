export interface FaqItem { q: string; a: string }

export const GUARANTEE_FAQ: FaqItem = {
  q: '¿Cómo funciona la garantía?',
  a: 'Los 30 días empiezan a contar el día que arrancan las campañas, no el día que firmamos. Antes de empezar acordamos contigo qué cuenta como cliente filtrado en tu negocio y cuánto se invierte en Ads. Todo eso queda por escrito en el contrato, así que no hay sorpresas para ninguna de las dos partes.',
};

// Sin «¿notarán que es una IA?» ni «¿cuánto cuesta?»: en la home ya las responde el bloque de objeciones.
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
    q: '¿Qué pasa si la IA no sabe responder?',
    a: 'Está configurada para responder solo con la información que tú apruebas. Si le preguntan algo que no tiene, no lo improvisa: lo deja anotado y te avisa al instante para que tomes tú la conversación o alguien de tu equipo.',
  },
  {
    q: '¿El número de WhatsApp sigue siendo mío?',
    a: 'Sí. Trabajamos con la WhatsApp Business API oficial y el número es tuyo de principio a fin. Si algún día dejamos de trabajar juntos, el número y las conversaciones siguen contigo.',
  },
  GUARANTEE_FAQ,
];
