# M y F Asesorías

Web de Marta y Fran: asesoría de nutrición y entrenamiento.

## Tecnología

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router.

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # comprueba tipos y genera dist/
npm run lint:fix   # aplica la guía de estilos
```

## Estructura

```
src/
├── components/
│   ├── layout/      Cabecera, pie y scroll entre páginas
│   ├── sections/    Bloques con contenido (presentación, tarjetas, contacto)
│   └── ui/          Piezas genéricas (botón, sección, etiqueta, iconos)
├── pages/           Una carpeta por página (ruta)
├── data/            Contenido de la web (equipo, recetas, diario, servicio)
├── dtos/            Forma de cada dato (PersonaDTO, RecetaDTO…)
├── enums/           Rutas, anclas y tonos de color
└── theme/           Paleta (theme.css) y clases por tono (toneStyles.ts)
```

## Guía de estilos

El código sigue la guía de frontend de tms.web:

- **Idioma**: lo técnico en inglés (componentes, carpetas, enums) y lo de negocio en castellano
  (datos, DTOs, comentarios).
- **Un componente por carpeta**: `NombreComponent.tsx` y su interfaz `INombreProps.ts`, con
  cada propiedad documentada.
- **Sin literales sueltos**: rutas, anclas y colores salen de enumerados (`AppRoute`, `Tone`).
- **Arrow functions**, `const` siempre, nada de `any` ni `var`.
- **Regiones** (`#region Declaraciones` / `#region Renderizado`) en los componentes con lógica.
- **Comentarios** en la línea anterior, empezando en mayúscula y acabando en punto.

ESLint comprueba automáticamente lo que puede (`eslint.config.js`).
