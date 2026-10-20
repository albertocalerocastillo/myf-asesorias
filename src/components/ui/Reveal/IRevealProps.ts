import type { ReactNode } from 'react';

export interface IRevealProps {
  /** Retraso de la animación en milisegundos, para escalonar elementos de una lista. */
  delay?: number;
  /** Clases extra del contenedor. */
  className?: string;
  children: ReactNode;
}
