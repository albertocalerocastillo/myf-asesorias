import type { ReactNode } from 'react';

export interface IMagneticProps {
  /** Lo que se "atrae" hacia el ratón (normalmente un botón). */
  children: ReactNode;
  /** Cuánto se desplaza como máximo, en proporción a la distancia al centro (0-1). */
  strength?: number;
  /** Clases del contenedor. */
  className?: string;
}
