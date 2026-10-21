import type { Tone } from '../../../enums/Tone';

export interface IPhotoProps {
  /** Nombre de la foto en fotos/ (sin extensión). Si no existe todavía, se pinta un hueco. */
  photo?: string;
  /** Descripción de la foto (texto alternativo) y texto del hueco mientras no hay foto. */
  label: string;
  /** Color del hueco. */
  tone?: Tone;
  /** Clases del contenedor (proporción, redondeo…). La foto lo rellena entero. */
  className?: string;
  /** Ancho que ocupa en pantalla, para que el navegador elija el tamaño justo (atributo sizes). */
  sizes?: string;
  /** true en la foto principal de la página: se carga la primera y sin esperar. */
  priority?: boolean;
  /** Hueco pequeño (p. ej. una foto redonda de perfil): solo el icono, sin el texto. */
  compact?: boolean;
  /** Nombre para la transición entre páginas: la foto "vuela" a la misma foto de la página siguiente. */
  transitionName?: string;
}
