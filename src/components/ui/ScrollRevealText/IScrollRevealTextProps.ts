export interface ScrollRevealPart {
  /** Texto del trozo. */
  text: string;
  /** Clases extra (p. ej. cursiva para resaltar un nombre). */
  className?: string;
  /** Color final del trozo al "encenderse". Por defecto, el color del texto. */
  color?: string;
}

export interface ScrollRevealWord {
  text: string;
  className?: string;
  color: string;
}

export interface IScrollRevealTextProps {
  /** Antetítulo de la sección. */
  eyebrow: string;
  /** Texto, en trozos para poder resaltar partes. */
  parts: ScrollRevealPart[];
}
