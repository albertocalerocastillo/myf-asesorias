import type { ReactNode } from 'react';
import type { Tone } from '../../../enums/Tone';

export interface IButtonProps {
  /** Ruta interna de la web. Si se indica, el botón navega sin recargar. */
  to?: string;
  /** Enlace: externo (Instagram…, se abre en otra pestaña) o ancla de la página ("#contacto"). */
  href?: string;
  /** Color del botón. Por defecto, el verde de la marca. */
  tone?: Tone;
  /** Si es true, añade a la derecha un círculo con una flecha que se desliza al pasar el ratón. */
  withArrow?: boolean;
  /** Si es true, el botón se "atrae" hacia el ratón cuando pasa cerca (solo con ratón). */
  magnetic?: boolean;
  /** Botón más grande, para las llamadas a la acción principales. */
  large?: boolean;
  /** Clases extra. */
  className?: string;
  children: ReactNode;
}
