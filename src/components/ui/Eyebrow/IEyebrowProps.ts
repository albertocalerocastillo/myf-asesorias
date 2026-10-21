export interface IEyebrowProps {
  /** Texto en mayúsculas pequeñas, como el lema del logo ("ENTRENAMIENTO · NUTRICIÓN"). */
  text: string;
  /** Centrado (rayas a los dos lados) o alineado a la izquierda (raya solo delante). */
  centered?: boolean;
  /** Para fondos oscuros: texto claro. */
  inverted?: boolean;
  /** Clases extra. */
  className?: string;
}
