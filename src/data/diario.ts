// Diario de Fran: su rincón personal, para que se le conozca sin ser un Instagram.
// ⚠️ PROVISIONAL: entradas de ejemplo. Más adelante saldrán de la base de datos y Fran las subirá desde el panel.
import type { EntradaDiarioDTO } from '../dtos/EntradaDiarioDTO';

const IDIOMA_FECHAS = 'es-ES';

export const entradasDiario: EntradaDiarioDTO[] = [
  {
    slug: 'por-que-entreno',
    titulo: 'Por qué entreno',
    fecha: '2026-10-15',
    resumen: 'Después de pasar por quirófano, entrenar dejó de ser una cuestión de estética.',
    texto: [
      'Texto de ejemplo. Aquí Fran contará con sus palabras qué significa para él entrenar después de su operación.',
      'La idea de este apartado es que se le conozca: qué piensa, cómo entrena él, qué le funciona y qué no.'
    ]
  },
  {
    slug: 'empezar-sin-miedo',
    titulo: 'Empezar sin miedo',
    fecha: '2026-10-08',
    resumen: 'El primer día siempre cuesta. Algunos consejos para dar el paso.',
    texto: ['Texto de ejemplo. Una entrada sobre cómo empezar a entrenar cuando no sabes por dónde, o cuando te da respeto.']
  },
  {
    slug: 'una-semana-de-entreno',
    titulo: 'Así es una semana de entreno',
    fecha: '2026-10-01',
    resumen: 'Cómo organizo mis entrenos entre el trabajo y el día a día.',
    texto: ['Texto de ejemplo. Aquí podría enseñar cómo reparte él sus entrenos a lo largo de la semana.']
  }
];

export const buscarEntradaDiario = (slug: string): EntradaDiarioDTO | undefined =>
  entradasDiario.find((entrada) => entrada.slug === slug);

// Se formatea en UTC para que salga el mismo día en el HTML generado y en cualquier navegador.
export const formatearFecha = (fechaIso: string): string =>
  new Date(fechaIso).toLocaleDateString(IDIOMA_FECHAS, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// Minutos de lectura a un ritmo normal (unas 200 palabras por minuto), como mínimo 1.
const PALABRAS_POR_MINUTO = 200;

export const calcularMinutosLectura = (entrada: EntradaDiarioDTO): number => {
  const palabras = [entrada.resumen, ...entrada.texto].join(' ').split(/\s+/).filter(Boolean).length;
  const result = Math.max(1, Math.round(palabras / PALABRAS_POR_MINUTO));
  return result;
};

// Entradas de la más reciente a la más antigua.
export const ordenarPorFecha = (entradas: EntradaDiarioDTO[]): EntradaDiarioDTO[] =>
  [...entradas].sort((a, b) => b.fecha.localeCompare(a.fecha));
