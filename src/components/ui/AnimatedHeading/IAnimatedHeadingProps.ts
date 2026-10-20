export interface HeadingPart {
  /** Texto del trozo. */
  text: string;
  /** Clases del trozo (p. ej. para resaltar una parte en coral). */
  className?: string;
}

export interface IAnimatedHeadingProps {
  /** El titular, en trozos para poder resaltar partes con otro estilo. */
  parts: HeadingPart[];
  /** Clases del h1. */
  className?: string;
}
