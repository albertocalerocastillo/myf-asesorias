import type { Tone } from '../../../enums/Tone';

export interface IShareButtonProps {
  /** Título de lo que se comparte. */
  title: string;
  /** Ruta de la página, empezando por "/". */
  path: string;
  /** Color del botón. */
  tone?: Tone;
}
