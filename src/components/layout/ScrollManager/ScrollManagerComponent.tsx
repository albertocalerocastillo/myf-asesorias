// Al cambiar de página, sube arriba del todo; si la URL lleva ancla (p. ej. /nutricion#recetas), baja hasta ella.
// Desde la primera navegación marca <html> con "navegado" para activar el fundido entre páginas
// (en la primera carga no se usa, para que la página se vea cuanto antes).
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const NAVIGATED_CLASS = 'navegado';

const ScrollManagerComponent = () => {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      document.documentElement.classList.add(NAVIGATED_CLASS);
    }

    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollManagerComponent;
