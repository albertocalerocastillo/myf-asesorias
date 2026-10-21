# M y F Asesorías

Web de Marta y Fran: asesoría online de nutrición y entrenamiento, contada por dos personas
operadas de corazón.

## Tecnología

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router · Motion (animaciones) ·
prerenderizado propio (SSG) · View Transitions API · Screen Wake Lock API · sharp (fotos).

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # tipos + web + HTML prerenderizado de cada página, sitemap y robots
npm run preview    # sirve la versión final (dist/)
npm run fotos      # solo prepara las fotos de fotos/ (también lo hacen dev y build)
npm run lint:fix   # aplica la guía de estilos
```

## Despliegue

Cloudflare (Workers, plan gratuito) está conectado a este repositorio: cada push a `master` compila
y publica la web automáticamente. Las cabeceras de seguridad y caché están en `public/_headers`.
También se puede publicar a mano con `npm run deploy`.

## Diseño y animaciones

Estética sacada del logo: crema, verde oliva y tostado, textura de papel, fotos en arco y la ramita
de hojas como motivo. Las animaciones usan [Motion](https://motion.dev) con `LazyMotion` (solo lo
necesario) y `MotionConfig reducedMotion="user"` (respeta "reducir movimiento"):

- `ScrollRevealTextComponent`: párrafo que se enciende palabra a palabra con el scroll.
- `ExpandingPhotoComponent`: foto que pasa de arco a pantalla completa (clip-path).
- `WhyUsComponent`: en escritorio, scroll vertical convertido en desplazamiento horizontal.
- `VelocityTextComponent`: cinta que acelera y se inclina según la velocidad del scroll.
- `TiltCardComponent` y `MagneticComponent`: inclinación 3D y botones magnéticos (solo con ratón).
- `StepsComponent`: línea de pasos que se dibuja con el scroll.

Todos los colores con texto cumplen contraste AA (también el gris de partida del texto animado).

## Fotos

Los originales van en `fotos/` (ver `fotos/LEEME.md`). `scripts/optimize-photos.mjs` genera
AVIF y WebP en varios anchos con una miniatura borrosa, y `PhotoComponent` elige la versión justa
para cada pantalla (`srcset`/`sizes`). Si una foto aún no existe, pinta un hueco con su descripción.

## Cómo funciona el SEO

La web es una SPA de React, pero `npm run build` genera además **un HTML completo por cada
página** (`scripts/prerender.mjs` + `src/entry-server.tsx`). Google y las redes reciben el
contenido, el título y los datos estructurados ya escritos; en el navegador, React solo
"hidrata" ese HTML.

- `src/seo/pageSeo.ts`: título, descripción y datos estructurados de cada ruta. Es la única
  fuente: la usan el build y la navegación dentro de la web (`SeoManagerComponent`).
- `src/seo/structuredData.ts`: schema.org (Recipe, BlogPosting, Person, FAQPage, BreadcrumbList…).
- `src/seo/siteConfig.ts`: dominio y `IS_PUBLISHED` (mientras sea `false`, noindex).

## Estructura

```
src/
├── components/
│   ├── layout/      Cabecera, pie, botón flotante, scroll y SEO al navegar
│   ├── sections/    Bloques con contenido (presentación, tarjetas, pasos, FAQ, contacto)
│   └── ui/          Piezas genéricas (botón, sección, migas, animación, iconos)
├── pages/           Una carpeta por página (ruta)
├── data/            Contenido de la web (equipo, recetas, diario, servicio)
├── dtos/            Forma de cada dato (PersonaDTO, RecetaDTO…)
├── enums/           Rutas, anclas y tonos de color
├── hooks/           useReveal (aparición al hacer scroll) y useScrolled
├── seo/             Metadatos, datos estructurados y migas de pan
└── theme/           Paleta (theme.css) y clases por tono (toneStyles.ts)
scripts/prerender.mjs  Genera el HTML de cada página, sitemap.xml y robots.txt
```

## Guía de estilos

El código sigue la guía de frontend de tms.web:

- **Idioma**: lo técnico en inglés (componentes, carpetas, enums) y lo de negocio en castellano
  (datos, DTOs, comentarios).
- **Un componente por carpeta**: `NombreComponent.tsx` y su interfaz `INombreProps.ts`, con
  cada propiedad documentada.
- **Sin literales sueltos**: rutas, anclas y colores salen de enumerados (`AppRoute`, `Tone`)
  y constantes con nombre.
- **Arrow functions**, `const` siempre, nada de `any` ni `var`; la variable devuelta se llama `result`.
- **Regiones** (`#region Declaraciones` / `#region Renderizado`) en los componentes con lógica.
- **Comentarios** en la línea anterior, empezando en mayúscula y acabando en punto.

ESLint comprueba automáticamente lo que puede (`eslint.config.js`).

## Accesibilidad

Contraste AA en todos los colores con texto, enlace "Saltar al contenido", foco visible,
menú con `aria-expanded`, migas de pan con `aria-current` y animaciones desactivadas si el
sistema pide reducir movimiento.
