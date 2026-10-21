import type { MotionValue } from 'motion/react';
import type { ScrollRevealPart } from '../ScrollRevealText/IScrollRevealTextProps';

export interface IRevealWordsProps {
  /** Texto, en trozos para poder resaltar partes. */
  parts: ScrollRevealPart[];
  /** Avance del efecto (0 todo apagado, 1 todo encendido). */
  progress: MotionValue<number>;
  /** Color de partida de las palabras. Por defecto, el gris para fondo crema. */
  dimColor?: string;
}
