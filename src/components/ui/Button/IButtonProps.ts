import type { ReactNode } from 'react';
import type { Tone } from '../../../enums/Tone';

export interface IButtonProps {
  /** Ruta interna de la web. Si se indica, el botón navega sin recargar. */
  to?: string;
  /** Enlace externo (Instagram, WhatsApp…). Se abre en otra pestaña. */
  href?: string;
  /** Color del botón. Por defecto, el coral de la marca. */
  tone?: Tone;
  /** Clases extra. */
  className?: string;
  children: ReactNode;
}
