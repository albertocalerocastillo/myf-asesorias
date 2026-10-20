import type { Tone } from '../../../enums/Tone';

export interface IPhotoPlaceholderProps {
  /** Qué foto irá en este hueco. */
  label: string;
  /** Color de fondo del hueco. */
  tone?: Tone;
  /** Clases extra (proporción, redondeo…). */
  className?: string;
}
