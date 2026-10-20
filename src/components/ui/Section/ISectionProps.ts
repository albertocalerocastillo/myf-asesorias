import type { ReactNode } from 'react';

export interface ISectionProps {
  /** Ancla para enlazar a la sección (#id). */
  id?: string;
  /** Texto pequeño en mayúsculas encima del título. */
  eyebrow?: string;
  title?: string;
  /** Si es el título principal de la página, se pinta como h1 en vez de h2. */
  isPageTitle?: boolean;
  /** Párrafo de introducción bajo el título. */
  intro?: string;
  /** Clases extra. */
  className?: string;
  children: ReactNode;
}
