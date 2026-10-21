import type { ReactNode } from 'react';

export interface ISealProps {
  /** Texto que da la vuelta al círculo (se repite dos veces). */
  text: string;
  /** Lo que va en el centro (normalmente un icono). */
  children?: ReactNode;
  /** Clases de posición (relative o absolute) y tamaño. */
  className?: string;
}
