# Estrategia SEO, GEO y captación — Visión Nova (28/10/2026)

Objetivo: aparecer en Google (Barcelona, El Vendrell y Tarragona primero), que ChatGPT, Perplexity y Google IA te citen, y convertir esas visitas en contactos cualificados.

> **Aviso de método.** No tengo acceso a datos de volumen de búsqueda (Search Console, Keyword Planner, Ahrefs). Las palabras clave de abajo se han priorizado por intención de compra y competencia local, **sin inventar volúmenes**. En cuanto conectes Search Console (paso 1) validamos con datos reales. El conector de Ahrefs de Claude necesita que lo autorices tú: si lo haces, saco volúmenes y dificultad reales.

## 0. Lo que se ha hecho en la web (publicado)

- **Páginas locales nuevas:** `/agencia-marketing-tarragona` y `/agencia-marketing-el-vendrell`, además de `/agencia-marketing-barcelona`, con contenido propio de la zona.
- **15 artículos nuevos** (ver sección 3), enlazados entre sí y con los servicios, los sectores y la app Nova.
- **Para IA:** `llms.txt` actualizado, `llms-full.txt` (todo el contenido), versión **Markdown de cada página** (se sirve cuando un agente envía `Accept: text/markdown`, con `Vary: Accept`) y enlace `rel="alternate"` en cada página.
- **Schema:** `ProfessionalService` con `areaServed` (España, Barcelona, El Vendrell, Tarragona, Girona) y `ContactPoint`.
- **Captación:** teléfono pulsable (`tel:`) en pie, contacto y menú móvil.
- **Velocidad:** la imagen principal del home es ahora un WebP de 4–18 KB con `fetchpriority="high"` y precarga (antes, un JPG de 40 KB dentro de un vídeo).
- **IndexNow:** clave publicada y script (`npm run indexnow`) para avisar a Bing.

## 1. Google Search Console y Bing (hazlo tú; son tus cuentas)

1. Entra en https://search.google.com/search-console con la cuenta de Google de la empresa.
2. **Añadir propiedad → Dominio** → `visionnovaia.com`. Te dará un registro **TXT**. Pégalo en el DNS del dominio (si el dominio está en Vercel: *Vercel → Domains → DNS Records → Add*). Verifica.
3. **Sitemaps** → añade `https://www.visionnovaia.com/sitemap-index.xml`.
4. **Inspección de URL** → pega estas URLs y pulsa *Solicitar indexación* (Google limita las solicitudes diarias, así que hazlo en 2 o 3 días):
   - `/`, `/agencia-marketing-tarragona`, `/agencia-marketing-el-vendrell`, `/agencia-marketing-barcelona`
   - `/sectores/clinicas-dentales`, `/publicidad-meta-ads`, `/creacion-de-contenido`, `/sistema-ia`
   - `/blog/perfil-de-empresa-google-seo-local`, `/blog/como-elegir-agencia-marketing-barcelona`
5. **Bing Webmaster Tools** (https://www.bing.com/webmasters): *Importar desde Google Search Console* (un clic). Bing es fuente de algunos asistentes de IA, y el aviso IndexNow ya está preparado.
6. Revisa a las 2 semanas el informe **Páginas** (qué se indexó y qué no) y **Rendimiento** (consultas reales). Pásame esas consultas y reajusto el plan.

## 2. Google Business Profile (lo que más pesa en búsquedas locales)

Es **la** palanca de «agencia de marketing en Tarragona/El Vendrell/Barcelona» en el mapa. Necesito de ti:

- Tipo de ficha: Google exige una dirección verificable para aparecer en el mapa de una ciudad. Con sede en Girona, puedes tener una ficha de **negocio con zona de servicio** (sin mostrar dirección) que cubra Barcelona, El Vendrell y Tarragona. Si tienes un espacio real en la zona del Penedès o Tarragona, dímelo.
- Categoría principal: «Agencia de marketing» y secundarias («Productora de vídeo», «Agencia de publicidad», «Diseñador web»).
- Fotos reales (tu foto detrás de cámaras, material de CEM Valderas con su permiso), horarios, teléfono, servicios.
- **Reseñas:** pídelas a CEM Valderas y a cada cliente nuevo, con enlace directo. Responde todas.

## 3. Palabras clave y contenido

### A. Servicio + ciudad (dinero, páginas ya publicadas)

| Búsqueda objetivo | Página |
|---|---|
| agencia de marketing Barcelona | `/agencia-marketing-barcelona` |
| agencia de marketing Tarragona | `/agencia-marketing-tarragona` |
| agencia de marketing El Vendrell / Baix Penedès | `/agencia-marketing-el-vendrell` |
| agencia de redes sociales, gestión de redes | `/gestion-redes-sociales` |
| agencia de Meta Ads, publicidad en Instagram/Facebook | `/publicidad-meta-ads` |
| creación de contenido para redes sociales, filmmaker empresas | `/creacion-de-contenido` |
| chatbot WhatsApp con IA, agente de voz IA, recepcionista virtual IA | `/sistema-ia` |
| WhatsApp Business API oficial | `/whatsapp-business-api` |

### B. Sector + ciudad (páginas de sector ya publicadas)

marketing para clínicas dentales, marketing inmobiliario, marketing para reformas, marketing para clínicas de estética (`/sectores/...`). **Siguiente paso (ver 6):** variantes por ciudad, solo si cada una tiene contenido propio.

### C. Artículos publicados el 28/10/2026 (22 en total con los anteriores)

| Artículo | Intención |
|---|---|
| ¿Cuánto cuesta una agencia de marketing digital? | comparar precio |
| Cómo elegir una agencia de marketing en Barcelona: 10 preguntas | elegir proveedor |
| Marketing digital en Tarragona: guía para elegir agencia | local Tarragona |
| Marketing digital en El Vendrell y el Baix Penedès: guía local | local El Vendrell |
| Perfil de empresa de Google: SEO local | local / how-to |
| Cómo aparecer en ChatGPT, Perplexity y Google IA | GEO |
| Cómo conseguir pacientes para una clínica dental con Meta Ads | sector dental |
| 20 ideas de vídeos para clínicas dentales | sector dental / contenido |
| Meta Ads para inmobiliarias: compradores y propietarios | sector inmobiliario |
| Marketing para empresas de reformas: conseguir presupuestos | sector reformas |
| WhatsApp Business API oficial vs app | WhatsApp / software |
| Qué es un CRM con IA | software Nova |
| Cómo filtrar contactos: cliente cualificado | método NovaScale |
| Jornada de grabación para tu negocio | contenido |
| Cuánto puedes pagar por un cliente (CAC) | rentabilidad |

### D. Próximos 20 artículos (ordenados por prioridad)

1. Community manager en Tarragona: qué hace y cuánto tiempo necesita tu negocio
2. Marketing para clínicas de medicina estética: cómo captar sin prometer resultados
3. Publicidad en Instagram para negocios locales del Baix Penedès
4. Cómo pedir reseñas en Google sin incumplir las normas
5. Qué es un agente de voz con IA y cuándo compensa en una clínica
6. Chatbot de WhatsApp para inmobiliarias: preguntas que debe hacer
7. Cómo medir el retorno de una agencia de marketing
8. Cómo elegir un filmmaker para tu negocio
9. Reels vs anuncios en vídeo: cuándo usar cada uno
10. Marketing para dentistas en Barcelona: errores frecuentes
11. Checklist de web local: lo que debe tener tu web para vender
12. Cómo responder a un lead en minutos (proceso y plantilla)
13. WhatsApp Business API: plantillas que se aprueban a la primera
14. Qué es el SEO local y cómo se diferencia del SEO normal
15. Cómo planificar el marketing de un negocio de temporada (costa)
16. CRM para inmobiliarias: qué debe controlar
17. CRM para clínicas: agenda, recordatorios y seguimiento
18. Cómo grabar vídeos con el móvil para tu negocio (consejos reales)
19. Qué es un llms.txt y si merece la pena
20. Preguntas que hacer a una agencia antes de firmar permanencia

Cada artículo: respuesta clara al principio, tabla o lista, FAQ, 2–3 enlaces internos y un enlace natural a Nova o a un servicio.

## 4. Enlaces entre Visión Nova y Nova (app.visionnovaia.com)

Son la misma empresa, así que el mejor movimiento es **que se refuercen con enlaces útiles, no masivos**.

**Desde Visión Nova hacia Nova (ya hecho):** los artículos sobre CRM, WhatsApp y filtrado enlazan a `https://app.visionnovaia.com`; existe la página `/software-nova` y la sección de software en la home.

**Desde Nova hacia Visión Nova (hay que hacerlo en la app; no tengo acceso a su código):**
- Un bloque «Recursos» en la web pública de Nova que enlace a 5 artículos: *Qué es un CRM con IA*, *WhatsApp Business API oficial vs app*, *Cómo filtrar contactos*, *Cómo aparecer en ChatGPT y Perplexity* y *Cuánto puedes pagar por un cliente*.
- En el pie de Nova: «Creado por Visión Nova, agencia de marketing y contenido» → `https://www.visionnovaia.com`.
- En la tarjeta de «Crecimiento» de los planes: enlace «Ver cómo lo montamos» → `/#sistema`.
- Texto del enlace variado y descriptivo (no repetir «agencia de marketing» en todos).

**Prompt para que Nova (la IA de la app) lo implemente:**
> Añade en la página pública de app.visionnovaia.com un bloque «Recursos» con enlaces (rel por defecto, texto descriptivo) a estos artículos de https://www.visionnovaia.com/blog/: que-es-un-crm-con-ia, whatsapp-business-api-oficial-vs-app, como-filtrar-contactos-cliente-cualificado, como-aparecer-en-chatgpt-perplexity-google-ia, cuanto-puedes-pagar-por-un-cliente-cac. Añade en el pie el texto «Creado por Visión Nova» con enlace a https://www.visionnovaia.com. Mantén el diseño actual. Comprueba que los enlaces responden 200.

## 5. Enlaces externos (backlinks) realistas, de más a menos valor

1. **Tus clientes.** CEM Valderas: pídele que enlace tu web en su web o en su Instagram («Vídeo y anuncios: Visión Nova»). Es un enlace natural y relevante.
2. **Perfiles propios:** LinkedIn de empresa y de Stiven, Instagram, YouTube, TikTok, con el enlace a la web.
3. **Directorios de agencias:** Sortlist, Clutch, GoodFirms (perfil de agencia con reseñas reales).
4. **Directorios de software para Nova:** Capterra, GetApp, Software Advice, G2, Product Hunt, AlternativeTo, SaaSHub.
5. **Directorios locales de España:** Páginas Amarillas, Cylex, QDQ, Infoisinfo. Mantén exactamente los mismos nombre, dirección y teléfono que en Google.
6. **Entidades locales:** cámaras de comercio y asociaciones empresariales de Tarragona, el Baix Penedès y Barcelona (muchas ofrecen ficha de socio con enlace).
7. **Prensa y colaboraciones locales:** notas sobre un caso real (con permiso del cliente), entrevistas, podcasts.
8. **Artículos invitados** en blogs de negocios, hostelería o clínicas con tu firma.

**No hagas:** comprar enlaces, redes de blogs, intercambios masivos ni reseñas falsas. Google lo penaliza y puede hundir la web.

## 6. Cómo posicionar rápido (lo realista)

| Frente | Qué esperar |
|---|---|
| El Vendrell, Baix Penedès | La competencia visible parece baja. Con ficha de Google, reseñas, página local y artículos, es donde antes puedes aparecer (semanas a pocos meses, sin garantía). |
| Tarragona | Competencia media, con muchas fichas de directorios. Aparecer en el mapa y en las consultas largas es alcanzable en el medio plazo. |
| Barcelona | La más competitiva. Apunta primero a consultas con sector (p. ej. «marketing para clínicas dentales en Barcelona») y a tu ficha de Google. Primeras posiciones en términos genéricos llevan meses de trabajo continuo. |

Nadie puede prometerte el primer puesto «lo antes posible». Lo que acelera de verdad: ficha de Google con reseñas, enlaces de clientes y directorios, contenido que responda mejor que el de los directorios, y **tráfico de pago a la vez** mientras el orgánico madura.

**Siguientes variantes por ciudad (solo con contenido propio):** `/agencia-redes-sociales-tarragona`, `/agencia-meta-ads-barcelona`, `/marketing-clinicas-dentales-tarragona`, `/marketing-inmobiliario-el-vendrell`. Si son copias con otra ciudad, Google las trata como relleno; cada una debe tener datos, ejemplos y preguntas de esa zona.

## 7. Ventas: de visitas a contactos

1. **Tráfico ya:** Meta Ads hacia la web con el contenido de CEM Valderas (campaña propia). Es lo que vendes a tus clientes; úsalo contigo.
2. **Google Ads local** de búsqueda para «agencia de marketing [ciudad]» como complemento mientras el SEO crece.
3. **Retargeting** a quien visitó la web y no rellenó el formulario.
4. **Responder en minutos:** cada formulario llega a Nova CRM. Comprueba una vez al mes que llegan (envía uno de prueba).
5. **Un imán de contactos:** una auditoría de captación gratuita (15 minutos) o la calculadora de la home como gancho.
6. **Prospección directa:** la skill `/clientes` (Harvey) busca negocios de tu zona, lee sus webs y redacta un email con un detalle real, y **ningún email sale sin tu aprobación**.
7. **Medir:** conecta GA4 y Meta Pixel (necesitan banner de cookies y actualizar la política). Dame los IDs y lo cableo.

## 8. Lo que necesito de ti

- [ ] Verificar la propiedad en Search Console y enviar el sitemap (sección 1).
- [ ] Datos de la ficha de Google: dirección o zona de servicio, categorías, fotos, horario (sección 2).
- [ ] Si tienes presencia real (dirección) en el Penedès o Tarragona.
- [ ] URLs de tus perfiles (LinkedIn, Instagram, YouTube, TikTok) para añadirlos al schema (`sameAs`).
- [ ] IDs de GA4 y Meta Pixel, si quieres medir.
- [ ] Pedir a CEM Valderas el enlace y la reseña.
- [ ] Autorizar el conector de Ahrefs de Claude para sacar volúmenes reales (opcional).
- [ ] Pasar a Nova el prompt de la sección 4 para los enlaces desde la app.
