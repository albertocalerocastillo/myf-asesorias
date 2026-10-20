export interface OpcionTestDTO {
  texto: string;
  /** Cuánto apunta esta respuesta a nutrición (Marta). */
  nutricion: number;
  /** Cuánto apunta esta respuesta a entrenamiento (Fran). */
  entreno: number;
  /** true si la persona indica un problema de salud (se añade un aviso al resultado). */
  salud?: boolean;
}

export interface PreguntaTestDTO {
  pregunta: string;
  opciones: OpcionTestDTO[];
}
