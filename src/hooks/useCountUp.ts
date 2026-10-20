// Cuenta de 0 hasta el valor final cuando el número entra en pantalla.
// El HTML ya trae el valor final (bien para Google y sin JavaScript); la animación solo lo
// repinta, escribiendo directamente en el elemento para no provocar renderizados de React.
import { useEffect, useRef } from 'react';

const DURATION_MS = 1600;
const VISIBILITY_THRESHOLD = 0.6;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Arranca rápido y frena al final.
const easeOutCubic = (progress: number): number => 1 - Math.pow(1 - progress, 3);

export const useCountUp = <T extends HTMLElement>(target: number) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      return;
    }

    let frame = 0;
    const animate = (start: number) => (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      element.textContent = `${Math.round(target * easeOutCubic(progress))}`;
      if (progress < 1) {
        frame = requestAnimationFrame(animate(start));
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          frame = requestAnimationFrame((now) => animate(now)(now));
        }
      },
      { threshold: VISIBILITY_THRESHOLD }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return ref;
};
