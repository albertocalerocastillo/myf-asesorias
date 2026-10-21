import type { ReactNode } from 'react';

export interface IVelocityTextProps {
  /** Contenido de la cinta (se repite para que el bucle no tenga salto). */
  children: ReactNode;
  /** Velocidad base en % del ancho por segundo. Negativo: hacia la derecha. */
  baseSpeed: number;
  /** Clases de la fila. */
  className?: string;
}
