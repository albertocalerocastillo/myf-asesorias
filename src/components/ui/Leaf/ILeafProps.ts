export interface ILeafProps {
  /** Clases de posición, tamaño y color (las hojas usan currentColor). */
  className?: string;
  /** Desplazamiento máximo al hacer scroll, en píxeles (efecto de profundidad). 0 para que no se mueva. */
  parallax?: number;
  /** Giro base de la ramita, en grados. */
  rotate?: number;
  /** Si es true, se balancea suavemente sin parar, como movida por el aire. */
  sway?: boolean;
}
