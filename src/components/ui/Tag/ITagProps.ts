import type { Tone } from '../../../enums/Tone';

export interface ITagProps {
  /** Texto de la etiqueta. */
  label: string;
  /** Color de la etiqueta. */
  tone?: Tone;
}
