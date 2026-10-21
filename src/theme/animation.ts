// Ajustes comunes de las animaciones: variables CSS de theme.css (tipadas para el atributo style)
// y curvas de Motion, para que todo se mueva con el mismo ritmo.
import type { CSSProperties } from 'react';

// Curva suave de toda la web (la misma que --ease-suave en theme.css).
export const EASE_SMOOTH: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

// Muelle de Motion para lo que sigue al ratón o al scroll: rápido pero sin rebotar.
export const SPRING_SOFT = { stiffness: 140, damping: 22, mass: 0.6 };

// Orden de aparición de un bloque al cargar (".entra"): cada paso añade un pequeño retraso.
export const enterOrder = (order: number): CSSProperties => ({ '--orden': order }) as CSSProperties;

// Nombre común de la foto en la tarjeta y en la ficha, para la transición entre las dos páginas.
export const photoTransitionName = (kind: 'receta' | 'diario', slug: string): string => `foto-${kind}-${slug}`;
