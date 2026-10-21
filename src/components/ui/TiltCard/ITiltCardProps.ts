import type { ReactNode } from 'react';

export interface ITiltCardProps {
  /** Contenido de la tarjeta. */
  children: ReactNode;
  /** Giro máximo en grados al llevar el ratón a un borde. */
  maxTilt?: number;
  /** Clases de la tarjeta. */
  className?: string;
}
