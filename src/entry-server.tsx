// Punto de entrada para generar el HTML de cada página al compilar (lo usa scripts/prerender.mjs).
// Así Google y las redes reciben la página ya escrita, sin esperar a que se ejecute JavaScript.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { getPageSeo, getPrerenderRoutes, NOT_FOUND_PATH } from './seo/pageSeo';
export { renderSeoHead } from './seo/seoHead';
export { IS_PUBLISHED, buildAbsoluteUrl } from './seo/siteConfig';

export const render = (url: string): string =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
