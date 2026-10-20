// Genera un HTML completo por cada página (prerenderizado), además de sitemap.xml y robots.txt.
// Se ejecuta en `npm run build`, después de compilar la web y el bundle de servidor.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = join(ROOT_DIR, 'dist');
const SERVER_DIR = join(DIST_DIR, 'server');
const SERVER_ENTRY = join(SERVER_DIR, 'entry-server.js');
const SEO_PLACEHOLDER = '<!--seo-->';
const APP_PLACEHOLDER = '<!--app-->';
const TITLE_PATTERN = /<title>.*?<\/title>/;

const {
  render,
  getPageSeo,
  getPrerenderRoutes,
  renderSeoHead,
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

const template = await readFile(join(DIST_DIR, 'index.html'), 'utf-8');
const routes = getPrerenderRoutes();

for (const route of routes) {
  const html = template
    .replace(TITLE_PATTERN, '')
    .replace(SEO_PLACEHOLDER, renderSeoHead(getPageSeo(route)))
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
