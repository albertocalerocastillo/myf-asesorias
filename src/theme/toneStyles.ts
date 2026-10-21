// Clases de Tailwind de cada tono, en un único sitio para no repetirlas por los componentes.
import { Tone } from '../enums/Tone';

interface ToneStyle {
  /** Botón o elemento relleno. */
  solid: string;
  /** Fondo suave para tarjetas y bloques. */
  soft: string;
  /** Color de texto y de iconos. */
  text: string;
}

export const toneStyles: Record<Tone, ToneStyle> = {
  [Tone.Accent]: { solid: 'bg-acento text-white hover:bg-acento-oscuro', soft: 'bg-acento/10', text: 'text-acento' },
  [Tone.Olive]: { solid: 'bg-oliva text-white hover:brightness-110', soft: 'bg-oliva-claro', text: 'text-oliva' },
  [Tone.Earth]: { solid: 'bg-tierra text-white hover:brightness-125', soft: 'bg-tierra-claro', text: 'text-tierra' },
  [Tone.Sand]: { solid: 'bg-arena text-tinta', soft: 'bg-arena', text: 'text-gris' },
  [Tone.Outline]: {
    solid: 'border border-tinta/20 text-tinta hover:border-acento hover:text-acento',
    soft: 'bg-transparent',
    text: 'text-tinta'
  }
};
