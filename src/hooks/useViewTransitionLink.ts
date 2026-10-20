// Navegación con transición nativa del navegador (View Transitions API): los elementos con el mismo
// "view-transition-name" en las dos páginas se transforman uno en otro (p. ej. la foto de la tarjeta
// en la foto grande de la receta). En navegadores sin soporte, el enlace funciona como siempre.
import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

// Clase en <html> mientras dura la transición, para pausar la animación normal de página.
const TRANSITION_CLASS = 'vt-activa';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const isPlainLeftClick = (event: MouseEvent<HTMLAnchorElement>): boolean =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export const useViewTransitionLink = (to: string) => {
  const navigate = useNavigate();

  return (event: MouseEvent<HTMLAnchorElement>): void => {
    // Ctrl+clic, rueda, navegador sin soporte o "reducir movimiento": navegación normal del <Link>.
    if (!document.startViewTransition || !isPlainLeftClick(event) || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      return;
    }

    event.preventDefault();
    document.documentElement.classList.add(TRANSITION_CLASS);
    const transition = document.startViewTransition(() => {
      flushSync(() => navigate(to));
      window.scrollTo(0, 0);
    });
    transition.finished.finally(() => document.documentElement.classList.remove(TRANSITION_CLASS));
  };
};
