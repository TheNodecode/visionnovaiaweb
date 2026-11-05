# Plan de contenido y SEO · 5/11/2026

Datos de partida (Search Console, últimos 7 días, visionnovaia.com + app): 1.136 impresiones, 3 clics, posición media ≈ 43, impresiones al alza (≈126/día → ≈210/día). 77 % de España. México y Colombia suman 107 impresiones sin clics.

Auditoría completa de la web: `docs/seo/auditoria-2026-11-05.md` (se regenera con `npm run build && node scripts/seo-audit.mjs docs/seo/auditoria-2026-11-05.md`).

## A. Diagnóstico priorizado

| # | Hallazgo | Estado |
|---|---|---|
| 1 | **Duplicado `/blog-agente-voz-ia-malaga` vs `/blog/agente-voz-ia-malaga`.** La URL sin barra ya responde con redirección permanente (308) a `/blog/agente-voz-ia-malaga`, y esta lleva su canónica. | Resuelto. Solo falta que Google la retire del índice (semanas). |
| 2 | 4 artículos con cifras de precio sin fuente («150 € a 400 € al mes», «0,75 € por llamada», «por debajo de 100 €/mes»). Incumple «toda cifra lleva fuente y fecha». | Cifras eliminadas. |
| 3 | 14 títulos > 60 caracteres y 16 descripciones > 155. | Corregido (0 pendientes). La marca `\| Visión Nova` solo se añade si el título total cabe en 60. |
| 4 | Nombre del producto inconsistente («CRM Nova», «Nova», «Nova CRM»). | Ahora **NØVA** en toda la web (no se toca «Visión Nova» ni «NovaScale»). |
| 5 | `/software-nova` describía funciones que no están en la lista real (IVA y lector de facturas, cobros automáticos, API/webhooks/n8n/MCP, «Pregúntale a Nova», radar de ventas, límites numéricos por plan). | Reescrita solo con funciones reales, sectores preparados, límites y prueba de 3 días. |
| 6 | Enlaces a la app sin origen medible. | Todos con `?utm_source=visionnovaia&utm_medium=…&utm_campaign=…` (y `sector=` donde aplica). |
| 7 | Sin FAQPage ni fecha de actualización en el blog. | FAQPage generado solo con preguntas visibles; `dateModified` real (campo `updated`). |
| 8 | robots.txt sin reglas explícitas para los rastreadores clave. | Googlebot, Bingbot, OAI-SearchBot y PerplexityBot permitidos de forma explícita. |
| 9 | **Canibalización entre www y app.** Ver tabla de intenciones abajo. | Vigilar en Search Console. |
| 10 | Huérfanas desde el contenido (solo enlazadas en cabecera y pie): Madrid, Málaga, Valencia, Nosotros, Trabajos, Términos. | Pendiente de baja prioridad: enlazar desde artículos afines. |
| 11 | Impresiones de México y Colombia sin clics. | No actuar: el contenido es para España. |

### Reparto de intenciones entre la agencia (www) y el software (app)

| Intención | Dueño | Página |
|---|---|---|
| Marketing / captación de pacientes para clínicas | www | `/sectores/clinicas-dentales`, `/blog/captar-pacientes…`, `/blog/como-conseguir-pacientes-clinica-dental-meta-ads` |
| CRM / WhatsApp / agenda para clínicas (software) | app | `app…/clinicas-dentales`, `app…/blog/software-crm-para-clinicas-dentales` |
| Recepcionista virtual para clínicas (qué hace y qué no) | www | `/blog/recepcionista-virtual-ia-clinicas` (pos. 4,6 en «recepcionista virtual clínica») |
| Recepcionista IA de NØVA en clínica dental (producto) | app | `app…/blog/recepcionista-ia-clinica-dental-que-puede-hacer` |
| Precio de un CRM para clínica | www (comparativa) → enlaza a app | `/blog/cuanto-cuesta-crm-clinica-dental` |
| Chatbot / agente de voz / visibilidad IA | www | blog de la agencia |

**Riesgo detectado:** los dos artículos sobre recepcionista (www y app) pueden competir por la misma consulta. Se han diferenciado ángulo y título; si Search Console muestra que ambos se disputan la misma consulta, dejar uno como principal y reenfocar el otro.

## B. Cambios sobre páginas existentes (sin cambiar ninguna URL)

| URL | Antes | Después |
|---|---|---|
| `/blog/recepcionista-virtual-ia-clinicas` | «Recepcionista virtual con IA para clínicas en Barcelona y Málaga» (64) | «Recepcionista virtual para clínicas: qué hace y qué no» (55). Respuesta de 55 palabras al inicio, tabla «qué hace / qué no», sección de datos de salud (RGPD art. 9, fuentes oficiales), 5 FAQ, enlaces con UTM a NØVA |
| `/blog/cuanto-cuesta-chatbot-ia-barcelona` | «¿Cuánto cuesta un chatbot con IA en Barcelona?» (46); rangos de precio sin fuente | «Chatbot con IA en Barcelona: cuánto cuesta y cómo elegir». Sin cifras sin fuente, tabla de 3 opciones, 5 FAQ, enlace a NØVA |
| `/blog/ideas-de-videos-para-clinicas-dentales` | Título 63, descripción 157 | Título 58, descripción 147, tabla objetivo/formato, bloque NØVA y 5 FAQ |
| `/blog/agencia-visibilidad-ia-barcelona` | Sin tabla; sin límites de lo que se controla | Tabla visión artificial / SEO / GEO, «qué se controla y qué no», 5 FAQ, enlace a guías GEO y a NØVA |
| `/blog/agente-voz-ia-malaga` | «precios» con cifras sin fuente | «precio, usos y límites», sin cifras, tabla por sector, límites, 5 FAQ; el agente de voz es servicio de la agencia, NØVA cubre WhatsApp y web |
| `/blog/que-es-un-crm-con-ia` | Describía NØVA con «un panel» | Ampliado con funciones reales de NØVA, sectores y límites |
| `/blog/como-aparecer-en-chatgpt-perplexity-google-ia` | Título 63 | «Aparecer en respuestas de IA: qué se controla y qué no», tabla controla/no controla, método de medición mensual |
| `/software-nova` | Planes con límites numéricos y funciones fuera de lista | Funciones reales, sectores, límites, prueba de 3 días |
| `/sectores/clinicas-dentales` | Sin enlace a la app | Enlace «NØVA: CRM para clínicas dentales» → `app…/clinicas-dentales` con UTM |
| `/` y 12 artículos y páginas | Títulos/descripciones largos | Títulos ≤ 60 y descripciones ≤ 155 |

## C. Mapa de palabras clave y plan de artículos

Prioridad por lo que ya aparece en Search Console (posición actual entre paréntesis):

| Consulta o grupo | Intención | Página | Acción |
|---|---|---|---|
| recepcionista virtual clínica (4,6) | informacional / comercial | `/blog/recepcionista-virtual-ia-clinicas` (pos. 11) | Optimizada (B). Medir CTR |
| chatbot barcelona (8,9), chatbot ia barcelona (10) | comercial local | `/blog/cuanto-cuesta-chatbot-ia-barcelona` (pos. 12) | Optimizada (B) |
| ideas de vídeos clínicas dentales | informacional | `/blog/ideas-de-videos-para-clinicas-dentales` (pos. 13) | Optimizada (B) |
| agencia visibilidad IA Barcelona | comercial | `/blog/agencia-visibilidad-ia-barcelona` (pos. 10–16) | Optimizada (B) |
| agente de voz IA Málaga | comercial local | `/blog/agente-voz-ia-malaga` (pos. 12) | Optimizada (B) |
| agencia de marketing Tarragona / El Vendrell / Barcelona | comercial local | `/agencia-marketing-…` | Publicadas; ficha de Google es la palanca principal |

### Lote 1 (publicado el 5/11/2026)

1. `/blog/whatsapp-clinicas-organizar-recepcion`
2. `/blog/cuanto-cuesta-crm-clinica-dental`
3. `/blog/como-captar-pacientes-sin-perderlos-en-whatsapp`
4. `/blog/que-hacer-con-los-contactos-de-meta-ads`

Cubren de Nova: «WhatsApp en clínicas», «cuánto cuesta un CRM para una clínica dental», «cómo captar pacientes sin perderlos en WhatsApp» y «qué hacer con los contactos que llegan de Meta Ads». No se ha creado una página nueva para «recepcionista virtual: qué hace y qué no» ni para «qué es un CRM con IA» ni para «cómo aparecer en respuestas de IA»: ya existían y se han actualizado, para no canibalizar.

### Próximos lotes (2 por semana, de mayor a menor intención comercial)

| Lote | Artículo | Keyword principal | Embudo |
|---|---|---|---|
| 2 | Qué hacer con los contactos de Meta Ads en una empresa de reformas | contactos meta ads reformas | Decisión |
| 2 | …en una inmobiliaria | contactos meta ads inmobiliaria | Decisión |
| 2 | …en una academia o centro de formación | captación academias whatsapp | Decisión |
| 2 | …en una empresa de limpieza o servicios | captación limpieza whatsapp | Decisión |
| 3 | Chatbot, agente de voz o recepcionista IA: cuál necesitas (actualiza `chatbot-vs-agente-voz-ia`) | chatbot vs agente de voz | Consideración |
| 3 | Meta Ads para clínicas de medicina estética: normativa y enfoque | publicidad clínica estética | Consideración |
| 3 | Plantillas de WhatsApp que se aprueban a la primera | plantillas whatsapp business | Consideración |
| 3 | Cómo medir el retorno de una agencia de marketing | roi agencia marketing | Decisión |
| 4 | Community manager en Tarragona: qué hace y qué necesita tu negocio | community manager tarragona | Consideración |
| 4 | Marketing para dentistas en Barcelona: fallos frecuentes | marketing dentistas barcelona | Consideración |
| 4 | Qué es un llms.txt y si merece la pena | llms.txt | Descubrimiento |
| 4 | Preguntas antes de firmar permanencia con una agencia | permanencia agencia marketing | Decisión |

Antes de publicar cada lote: comprobar duplicados, enlaces, metadatos, móvil, CTAs y que cada afirmación de producto esté en la lista real de funciones de NØVA. Ejecutar `npm test` (incluye auditoría de títulos, descripciones, canónicas, H1, alt y comprobación de enlaces a la app con UTM).

## D. Ficha del lote 1

| Slug | Keyword principal | Variantes | Intención / embudo | Meta title | Meta description | Imagen (prompt) |
|---|---|---|---|---|---|---|
| `whatsapp-clinicas-organizar-recepcion` | whatsapp clínica dental | recepción whatsapp clínica, whatsapp business clínica | Informacional-comercial / consideración | WhatsApp en clínicas: cómo organizar la recepción (49) | Cómo organizar WhatsApp en una clínica dental o estética: quién contesta, qué se automatiza, cómo repartir mensajes y cuándo pasa a una persona. | Recepción de una clínica moderna con un móvil mostrando una bandeja compartida de mensajes, luz natural, estilo editorial sobrio, sin rostros reconocibles |
| `cuanto-cuesta-crm-clinica-dental` | cuánto cuesta un crm clínica dental | precio crm clínica, software crm dentista | Comercial / decisión | Cuánto cuesta un CRM para una clínica dental (45) | De qué depende el precio de un CRM para una clínica dental, qué incluye cada tipo de software y cuándo basta una hoja de cálculo. Comparativa honesta. | Infografía limpia con tres columnas (gestión dental, CRM, CRM con WhatsApp e IA), paleta oscura y dorada |
| `como-captar-pacientes-sin-perderlos-en-whatsapp` | captar pacientes whatsapp | seguimiento pacientes whatsapp, de anuncio a cita | Comercial / decisión | Captar pacientes sin perderlos en WhatsApp: paso a paso (55) | Cómo pasar de un anuncio a una cita sin perder al paciente por el camino: respuesta rápida, filtro, seguimiento y recordatorios, paso a paso. | Esquema de embudo de seis etapas, de anuncio a recordatorio, estilo editorial, fondo oscuro |
| `que-hacer-con-los-contactos-de-meta-ads` | contactos meta ads | leads meta ads crm, seguimiento leads whatsapp | Comercial / decisión | Qué hacer con los contactos que llegan de Meta Ads (50) | Qué hacer cuando llegan contactos de tus anuncios en Meta: atenderlos, filtrarlos, asignarlos y seguirlos en un CRM con WhatsApp. Ejemplos por sector. | Cuatro tarjetas de sectores (reformas, inmobiliaria, academia, limpieza) con una ficha de contacto, estilo limpio |

Todos: H1 único (= título), 5 preguntas frecuentes visibles con FAQPage, Article + BreadcrumbList, canónica, enlace a NØVA con UTM (`utm_source=visionnovaia&utm_medium=blog&utm_campaign=<slug>`), fuentes oficiales cuando hay RGPD o WhatsApp (EUR-Lex, AEPD, documentación de WhatsApp Business Platform). Las imágenes no se han generado: los prompts quedan para cuando se decida producir imágenes propias (WebP con alt descriptivo).

## E. Informe y medición

**Publicado:** todo lo anterior, en producción.

**Pendiente (fuera de este repositorio o que requiere datos tuyos):**
1. En la app: cambiar «Nøva Intelligence» y el `<title>` «Nova · CRM con IA…» por **NØVA**, y enlazar a los artículos de la agencia donde aporte (bloque «Recursos» y pie con «Creado por Visión Nova»).
2. Confirmar si `app…/clinicas-dentales` y el artículo de recepcionista de la app compiten con los de la web.
3. Enlazar las páginas huérfanas (Madrid, Málaga, Valencia, Nosotros, Trabajos) desde artículos afines.
4. Imágenes propias de los artículos.
5. Conectar GA4 y Meta Pixel (necesitan banner de cookies).

**Medición semanal (Search Console):** impresiones, clics, CTR y posición por página (empezar por las 5 optimizadas); consultas nuevas; páginas indexadas. **Tráfico a la app:** altas con origen `visionnovaia` (utm_campaign = slug del artículo). **Mensual:** preguntar a ChatGPT, Perplexity y Gemini «¿qué CRM con WhatsApp recomiendas para una clínica dental en España?» y anotar si aparece NØVA y qué fuentes citan.
