import type { ReactNode } from 'react';

export interface IMetaLineProps {
  /** Datos que van en la línea, separados por un punto medio (fecha, autor, minutos...). */
  items: ReactNode[];
  /** Clases extra (tamaño y color del texto). */
  className?: string;
}
