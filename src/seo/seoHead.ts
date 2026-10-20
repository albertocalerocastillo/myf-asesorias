// Escribe en el <head> las etiquetas de SEO de una página.
// Dos versiones con el mismo contenido: en texto (para el prerenderizado) y en el DOM (al navegar).
import type { IPageSeo } from './IPageSeo';
import { PageType } from './IPageSeo';
import { buildAbsoluteUrl, DEFAULT_IMAGE, IS_PUBLISHED, SITE_LOCALE, SITE_NAME } from './siteConfig';

// Marca de las etiquetas gestionadas aquí, para poder sustituirlas al cambiar de página.
const MANAGED_ATTRIBUTE = 'data-seo';
const ROBOTS_INDEX = 'index, follow, max-image-preview:large';
const ROBOTS_NOINDEX = 'noindex, nofollow';

interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  attributes: Record<string, string>;
  content?: string;
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Evita que un "</script>" dentro de los datos cierre la etiqueta antes de tiempo.
const serializeJsonLd = (data: object): string => JSON.stringify(data).replace(/</g, '\\u003c');

const buildHeadTags = (seo: IPageSeo): HeadTag[] => {
  // #region Declaraciones
  const canonical = buildAbsoluteUrl(seo.path);
  const image = seo.image ?? DEFAULT_IMAGE;
  const robots = IS_PUBLISHED && !seo.noindex ? ROBOTS_INDEX : ROBOTS_NOINDEX;
  // #endregion

  const result: HeadTag[] = [
    { tag: 'meta', attributes: { name: 'description', content: seo.description } },
    { tag: 'meta', attributes: { name: 'robots', content: robots } },
    { tag: 'link', attributes: { rel: 'canonical', href: canonical } },
    { tag: 'meta', attributes: { property: 'og:type', content: seo.type ?? PageType.Website } },
    { tag: 'meta', attributes: { property: 'og:site_name', content: SITE_NAME } },
    { tag: 'meta', attributes: { property: 'og:locale', content: SITE_LOCALE } },
    { tag: 'meta', attributes: { property: 'og:title', content: seo.title } },
    { tag: 'meta', attributes: { property: 'og:description', content: seo.description } },
    { tag: 'meta', attributes: { property: 'og:url', content: canonical } },
    { tag: 'meta', attributes: { property: 'og:image', content: image } },
    { tag: 'meta', attributes: { name: 'twitter:card', content: 'summary_large_image' } },
    ...(seo.structuredData ?? []).map(
      (data): HeadTag => ({ tag: 'script', attributes: { type: 'application/ld+json' }, content: serializeJsonLd(data) })
    )
  ];
  return result;
};

// Versión texto: para inyectar en el HTML generado al compilar.
export const renderSeoHead = (seo: IPageSeo): string => {
  const tags = buildHeadTags(seo).map(({ tag, attributes, content }) => {
    const attributeText = Object.entries(attributes)
      .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
      .join(' ');
    return tag === 'script'
      ? `<script ${MANAGED_ATTRIBUTE} ${attributeText}>${content}</script>`
      : `<${tag} ${MANAGED_ATTRIBUTE} ${attributeText}>`;
  });

  return [`<title>${escapeHtml(seo.title)}</title>`, ...tags].join('\n    ');
};

// Versión DOM: al navegar dentro de la web, sustituye las etiquetas de la página anterior.
export const applySeoToDocument = (seo: IPageSeo): void => {
  document.title = seo.title;
  document.head.querySelectorAll(`[${MANAGED_ATTRIBUTE}]`).forEach((element) => element.remove());

  buildHeadTags(seo).forEach(({ tag, attributes, content }) => {
    const element = document.createElement(tag);
    element.setAttribute(MANAGED_ATTRIBUTE, '');
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    if (content) {
      element.textContent = content;
    }
    document.head.appendChild(element);
  });
};
