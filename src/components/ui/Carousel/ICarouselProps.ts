import type { ReactNode } from 'react';

export interface ICarouselProps {
  /** Nombre del carrusel para lectores de pantalla (p. ej. "Recetas"). */
  label: string;
  /** Tarjetas del carrusel, una por elemento. */
  items: ReactNode[];
  /** Columnas de la cuadrícula a partir de tablet (clases de Tailwind, p. ej. "sm:grid-cols-2 lg:grid-cols-3"). */
  gridClassName: string;
}
