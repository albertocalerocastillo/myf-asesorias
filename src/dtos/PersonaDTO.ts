import type { AppRoute } from '../enums/AppRoute';
import type { Tone } from '../enums/Tone';

export interface PersonaDTO {
  /** Nombre de pila, tal como aparece en la web. */
  nombre: string;
  /** Área de la que se encarga (Nutrición / Entrenamiento). */
  area: string;
  /** Página propia de la persona. */
  ruta: AppRoute;
  /** Color de su parte de la web. */
  tono: Tone;
  /** Usuario de Instagram, sin la arroba. */
  instagram: string;
  /** Titulación o formación que se muestra bajo su historia. */
  titulacion: string;
  /** Frase corta que la resume. */
  frase: string;
  /** Su historia, un párrafo por elemento. */
  historia: string[];
  /** Puntos de cómo trabaja. */
  enfoque: string[];
  /** Nombre de su sección de contenido (Recetario / Diario). */
  seccionContenido: string;
}
