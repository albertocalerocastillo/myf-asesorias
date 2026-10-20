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
  [Tone.Heart]: { solid: 'bg-corazon text-white hover:bg-corazon-oscuro', soft: 'bg-corazon/10', text: 'text-corazon' },
  [Tone.Sage]: { solid: 'bg-salvia text-white hover:brightness-110', soft: 'bg-salvia-claro', text: 'text-salvia' },
  [Tone.Night]: { solid: 'bg-noche text-white hover:brightness-125', soft: 'bg-noche-claro', text: 'text-noche' },
  [Tone.Sand]: { solid: 'bg-arena text-tinta', soft: 'bg-arena', text: 'text-gris' },
  [Tone.Outline]: {
    solid: 'border border-tinta/20 text-tinta hover:border-corazon hover:text-corazon',
    soft: 'bg-transparent',
    text: 'text-tinta'
  }
};
