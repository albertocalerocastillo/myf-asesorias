// Estadísticas de visitas con Cloudflare Web Analytics: gratis, sin cookies y sin datos personales,
// así que no hace falta banner de cookies. Se activa solo con la web publicada y un token puesto.
import { IS_PUBLISHED } from './siteConfig';

// PENDIENTE: el token lo da Cloudflare al dar de alta la web en "Web Analytics".
const CLOUDFLARE_ANALYTICS_TOKEN: string | null = null;
const BEACON_URL = 'https://static.cloudflareinsights.com/beacon.min.js';

// Etiqueta <script> para el <head> (la inserta el prerenderizado), o cadena vacía si no toca.
export const renderAnalyticsTag = (): string => {
  if (!IS_PUBLISHED || !CLOUDFLARE_ANALYTICS_TOKEN) {
    return '';
  }

  // "spa": true para que cuente también las páginas que se abren sin recargar (navegación de React).
  const config = JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN, spa: true });
  const result = `<script defer src="${BEACON_URL}" data-cf-beacon='${config}'></script>`;
  return result;
};
