import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Fuentes servidas desde la propia web (sin Google Fonts: más rápido y sin enviar la IP del
// visitante a terceros). Fraunces con eje de tamaño óptico, para que los titulares se vean finos.
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/inter';
import './theme/theme.css';
import App from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// En producción la página llega ya pintada (prerenderizada) y React solo la "despierta".
// En desarrollo llega vacía y React la pinta desde cero.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
