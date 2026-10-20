// Recetario de Marta.
// ⚠️ PROVISIONAL: recetas de ejemplo. Más adelante saldrán de la base de datos y Marta las subirá desde el panel.
import type { RecetaDTO } from '../dtos/RecetaDTO';

export const recetas: RecetaDTO[] = [
  {
    slug: 'salmon-al-horno-con-verduras',
    titulo: 'Salmón al horno con verduras',
    resumen: 'Una bandeja, veinte minutos y una cena completa rica en omega-3.',
    minutos: 25,
    raciones: 2,
    etiquetas: ['Cena', 'Sin gluten'],
    ingredientes: [
      '2 lomos de salmón',
      '1 calabacín',
      '1 pimiento rojo',
      '1 cebolla morada',
      '1 limón',
      'Aceite de oliva virgen extra',
      'Pimienta, eneldo y una pizca de sal'
    ],
    pasos: [
      'Precalienta el horno a 200 °C.',
      'Corta las verduras en trozos parecidos, alíñalas con un chorrito de aceite y hornéalas 10 minutos.',
      'Pon el salmón encima, con unas rodajas de limón, eneldo y pimienta.',
      'Hornea 10–12 minutos más, hasta que el salmón se separe en láminas.'
    ]
  },
  {
    slug: 'garbanzos-con-espinacas',
    titulo: 'Garbanzos con espinacas',
    resumen: 'Un clásico de toda la vida, con legumbre y mucha verdura.',
    minutos: 20,
    raciones: 4,
    etiquetas: ['Comida', 'Vegetariana'],
    ingredientes: [
      '400 g de garbanzos cocidos',
      '300 g de espinacas frescas',
      '2 dientes de ajo',
      '1 rebanada de pan integral',
      '1 cucharadita de pimentón dulce',
      'Comino y aceite de oliva virgen extra'
    ],
    pasos: [
      'Dora los ajos y el pan en una sartén con un poco de aceite y machácalos con el pimentón y el comino.',
      'Saltea las espinacas hasta que reduzcan.',
      'Añade los garbanzos escurridos y el majado, con un poco de agua.',
      'Deja que se haga a fuego lento 5–10 minutos.'
    ]
  },
  {
    slug: 'tostada-de-aguacate-y-huevo',
    titulo: 'Tostada de aguacate y huevo',
    resumen: 'Un desayuno que sacia de verdad, en cinco minutos.',
    minutos: 10,
    raciones: 1,
    etiquetas: ['Desayuno'],
    ingredientes: [
      '1 rebanada de pan integral',
      '½ aguacate',
      '1 huevo',
      'Tomates cherry',
      'Semillas de sésamo y pimienta'
    ],
    pasos: [
      'Tuesta el pan.',
      'Machaca el aguacate con un tenedor y extiéndelo.',
      'Haz el huevo a la plancha o pochado y colócalo encima.',
      'Termina con los tomates, las semillas y un poco de pimienta.'
    ]
  }
];

// Todas las etiquetas usadas en el recetario, sin repetir y en orden alfabético.
export const obtenerEtiquetasRecetas = (): string[] =>
  [...new Set(recetas.flatMap((receta) => receta.etiquetas))].sort((a, b) => a.localeCompare(b, 'es'));

export const buscarReceta =(slug: string): RecetaDTO | undefined => recetas.find((receta) => receta.slug === slug);

export const formatearRaciones = (raciones: number): string => `${raciones} ${raciones === 1 ? 'ración' : 'raciones'}`;
