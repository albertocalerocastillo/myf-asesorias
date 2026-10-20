// Genera un HTML completo por cada página (prerenderizado), además de sitemap.xml y robots.txt.
// Se ejecuta en `npm run build`, después de compilar la web y el bundle de servidor.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = join(ROOT_DIR, 'dist');
const SERVER_DIR = join(DIST_DIR, 'server');
const SERVER_ENTRY = join(SERVER_DIR, 'entry-server.js');
const SEO_PLACEHOLDER = '<!--seo-->';
const APP_PLACEHOLDER = '<!--app-->';
const TITLE_PATTERN = /<title>.*?<\/title>/;
const STYLESHEET_PATTERN = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/;
// Fuentes que se ven nada más cargar: Fraunces (titulares) e Inter (texto), solo alfabeto latino.
const PRELOADED_FONTS = ['fraunces-latin-opsz-normal', 'inter-latin-wght-normal'];

const {
  render,
  getPageSeo,
  getPrerenderRoutes,
  renderSeoHead,
  renderAnalyticsTag,
  NOT_FOUND_PATH,
  IS_PUBLISHED,
  buildAbsoluteUrl
} = await import(pathToFileURL(SERVER_ENTRY).href);

// "/" → dist/index.html · "/nutricion" → dist/nutricion.html · "/404" → dist/404.html
// Ficheros "ruta.html" (y no "ruta/index.html") para que la URL sin barra final se sirva tal
// cual, sin redirecciones, y coincida con el canonical.
const getOutputFile = (route) => join(DIST_DIR, route === '/' ? 'index.html' : `${route}.html`);

const buildSitemap = (routes) => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => `  <url><loc>${buildAbsoluteUrl(route)}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

// Mientras la web sea de prueba, se pide a los buscadores que no entren.
const buildRobots = () =>
  IS_PUBLISHED
    ? `User-agent: *\nAllow: /\n\nSitemap: ${buildAbsoluteUrl('/sitemap.xml')}\n`
    : 'User-agent: *\nDisallow: /\n';

// Los estilos van dentro del HTML (<style>) en vez de en un fichero aparte: así la página se pinta
// sin esperar a otra descarga. Son pocos KB y comprimidos con el HTML.
const inlineStylesheet = async (html) => {
  const match = html.match(STYLESHEET_PATTERN);
  if (!match) {
    return html;
  }
  const css = await readFile(join(DIST_DIR, match[1]), 'utf-8');
  return html.replace(match[0], `<style>${css}</style>`);
};

// Las fuentes del titular y del texto se piden a la vez que el HTML, sin esperar a leer los estilos.
const buildFontPreloads = async () => {
  const assets = await readdir(join(DIST_DIR, 'assets'));
  return PRELOADED_FONTS.map((prefix) => assets.find((file) => file.startsWith(prefix) && file.endsWith('.woff2')))
    .filter(Boolean)
    .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
    .join('\n    ');
};

const template = (await inlineStylesheet(await readFile(join(DIST_DIR, 'index.html'), 'utf-8'))).replace(
  SEO_PLACEHOLDER,
  `${await buildFontPreloads()}\n    ${SEO_PLACEHOLDER}`
);
const routes = getPrerenderRoutes();

for (const route of routes) {
  const html = template
    .replace(TITLE_PATTERN, '')
    .replace(SEO_PLACEHOLDER, `${renderSeoHead(getPageSeo(route))}${renderAnalyticsTag()}`)
    .replace(APP_PLACEHOLDER, render(route));
  const file = getOutputFile(route);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

const indexableRoutes = routes.filter((route) => route !== NOT_FOUND_PATH);
await writeFile(join(DIST_DIR, 'sitemap.xml'), buildSitemap(indexableRoutes));
await writeFile(join(DIST_DIR, 'robots.txt'), buildRobots());
await rm(SERVER_DIR, { recursive: true, force: true });

console.log(`Prerenderizadas ${routes.length} páginas y generados sitemap.xml y robots.txt.`);
