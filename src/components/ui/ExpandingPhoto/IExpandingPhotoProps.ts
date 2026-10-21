import type { ReactNode } from 'react';
import type { Tone } from '../../../enums/Tone';

export interface IExpandingPhotoProps {
  /** Nombre de la foto en fotos/ (si aún no existe, se ve un hueco). */
  photo: string;
  /** Descripción de la foto. */
  label: string;
  /** Color del hueco mientras no hay foto. */
  tone?: Tone;
  /** Lo que aparece encima de la foto al terminar de abrirse (titular, frase…). */
  children?: ReactNode;
}
