// Variables CSS de las animaciones de theme.css, tipadas para usarlas en el atributo style.
import type { CSSProperties } from 'react';

// Orden de aparición de un bloque al cargar (".entra"): cada paso añade un pequeño retraso.
export const enterOrder = (order: number): CSSProperties => ({ '--orden': order }) as CSSProperties;

// Cuánto se desplaza un elemento con ".paralaje" al hacer scroll (negativo: hacia el lado contrario).
export const parallaxOffset = (pixels: number): CSSProperties => ({ '--paralaje': `${pixels}px` }) as CSSProperties;

// Nombre común de la foto en la tarjeta y en la ficha, para la transición entre las dos páginas.
export const photoTransitionName = (kind: 'receta' | 'diario', slug: string): string => `foto-${kind}-${slug}`;
