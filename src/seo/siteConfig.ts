// Configuración general del sitio para buscadores y redes sociales.

// PENDIENTE: cambiar por el dominio real cuando lo tengan.
export const SITE_URL = 'https://myfasesorias.es';

// Mientras sea false, la web pide a Google que no la indexe (meta robots + robots.txt).
// Ponerlo a true solo cuando tenga los textos y las fotos reales.
export const IS_PUBLISHED = false;

export const SITE_NAME = 'M y F Asesorías';
export const SITE_LOCALE = 'es_ES';
export const SITE_LANGUAGE = 'es';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
export const TITLE_SEPARATOR = ' | ';

export const buildAbsoluteUrl = (path: string): string => `${SITE_URL}${path === '/' ? '' : path}`;
