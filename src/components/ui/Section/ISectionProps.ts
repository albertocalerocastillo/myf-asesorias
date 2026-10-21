import type { ReactNode } from 'react';

export interface ISectionProps {
  /** Ancla para enlazar a la sección (#id). */
  id?: string;
  /** Antetítulo en mayúsculas espaciadas, con el estilo del lema del logo. */
  eyebrow?: string;
  /** Título. Puede llevar partes resaltadas (p. ej. <em> en cursiva oliva). */
  title?: ReactNode;
  /** Si es el título principal de la página, se pinta como h1 en vez de h2. */
  isPageTitle?: boolean;
  /** Párrafo de introducción bajo el título. */
  intro?: string;
  /** Cabecera centrada en vez de a la izquierda. */
  centered?: boolean;
  /** Clases extra. */
  className?: string;
  children: ReactNode;
}
