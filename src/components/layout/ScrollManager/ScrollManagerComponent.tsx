// Al cambiar de página, sube arriba del todo; si la URL lleva ancla (p. ej. /nutricion#recetas), baja hasta ella.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManagerComponent = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollManagerComponent;
