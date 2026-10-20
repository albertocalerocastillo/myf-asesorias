export interface EntradaDiarioDTO {
  /** Identificador para la URL (minúsculas y guiones). */
  slug: string;
  titulo: string;
  /** Fecha de publicación en formato ISO (AAAA-MM-DD). */
  fecha: string;
  resumen: string;
  /** Texto de la entrada, un párrafo por elemento. */
  texto: string[];
}
