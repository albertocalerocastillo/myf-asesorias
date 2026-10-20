// Nombre de la foto de cada cosa (el fichero en fotos/, sin extensión). Ver fotos/LEEME.md.
import type { EntradaDiarioDTO } from '../dtos/EntradaDiarioDTO';
import type { PersonaDTO } from '../dtos/PersonaDTO';
import type { RecetaDTO } from '../dtos/RecetaDTO';
import fotos from './fotos.generated.json';

export const FOTO_EQUIPO = 'equipo';

export const fotoPersona = (persona: PersonaDTO): string => persona.nombre.toLowerCase();

// Segunda foto de cada uno, en acción: Marta cocinando y Fran entrenando.
export const fotoPersonaEnAccion = (persona: PersonaDTO): string => `${persona.nombre.toLowerCase()}-accion`;

export const fotoReceta = (receta: RecetaDTO): string => `receta-${receta.slug}`;

export const fotoEntradaDiario = (entrada: EntradaDiarioDTO): string => `diario-${entrada.slug}`;

// Ruta pública de la versión más grande en WebP (para Google y redes), o null si aún no existe.
export const obtenerRutaFoto = (nombre: string): string | null => {
  const foto = (fotos as Record<string, { path: string; widths: number[] }>)[nombre];
  const result = foto ? `${foto.path}-${foto.widths.at(-1)}.webp` : null;
  return result;
};
