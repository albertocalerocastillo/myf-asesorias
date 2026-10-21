import type { ReactNode } from 'react';

export enum RevealFrom {
  Below = 'below',
  Left = 'left',
  Right = 'right',
  Scale = 'scale'
}

export interface IRevealProps {
  /** Retraso de la animación en milisegundos, para escalonar elementos de una lista. */
  delay?: number;
  /** Desde dónde entra el bloque. Por defecto, desde abajo. */
  from?: RevealFrom;
  /** Clases extra del contenedor. */
  className?: string;
  children: ReactNode;
}
