export interface RecetaDTO {
  /** Identificador para la URL (minúsculas y guiones). */
  slug: string;
  titulo: string;
  resumen: string;
  /** Tiempo total de preparación, en minutos. */
  minutos: number;
  raciones: number;
  etiquetas: string[];
  ingredientes: string[];
  pasos: string[];
}
