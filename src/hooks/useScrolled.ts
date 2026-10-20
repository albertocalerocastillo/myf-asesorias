// Indica si la página se ha desplazado más de cierta distancia (para la cabecera y el botón flotante).
import { useEffect, useState } from 'react';

export const useScrolled = (offset: number): boolean => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const update = (): void => setScrolled(window.scrollY > offset);
    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, [offset]);

  return scrolled;
};
