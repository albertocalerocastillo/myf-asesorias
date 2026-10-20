// Añade la clase "reveal-visible" a un elemento cuando entra en pantalla (animación de aparición).
import { useEffect, useRef } from 'react';

const VISIBLE_CLASS = 'reveal-visible';
const VISIBILITY_THRESHOLD = 0.12;

export const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(VISIBLE_CLASS);
          observer.disconnect();
        }
      },
      { threshold: VISIBILITY_THRESHOLD }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
};
