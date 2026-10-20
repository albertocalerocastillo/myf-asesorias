// Test "¿Por dónde empiezo?": tres preguntas que recomiendan empezar con Marta, con Fran o con los dos.
// No se guarda ni se envía nada: todo ocurre en el navegador de quien lo hace.
// ⚠️ PROVISIONAL: revisar las preguntas y los textos de resultado con Marta y Fran.
import type { OpcionTestDTO, PreguntaTestDTO } from '../dtos/PreguntaTestDTO';

export enum ResultadoTest {
  Marta = 'marta',
  Fran = 'fran',
  Ambos = 'ambos'
}

// Diferencia de puntos a partir de la cual se recomienda solo una de las dos partes.
const DIFERENCIA_CLARA = 2;

export const preguntasTest: PreguntaTestDTO[] = [
  {
    pregunta: '¿Qué te gustaría cambiar primero?',
    opciones: [
      { texto: 'Comer mejor y con orden', nutricion: 3, entreno: 0 },
      { texto: 'Ponerme en forma y ganar fuerza', nutricion: 0, entreno: 3 },
      { texto: 'Perder peso', nutricion: 2, entreno: 2 },
      { texto: 'Tener más energía y salud en general', nutricion: 1, entreno: 1 }
    ]
  },
  {
    pregunta: '¿Cómo es tu día a día ahora mismo?',
    opciones: [
      { texto: 'Apenas me muevo', nutricion: 0, entreno: 2 },
      { texto: 'Entreno, pero sin un plan claro', nutricion: 0, entreno: 1 },
      { texto: 'Como a deshoras o lo primero que pillo', nutricion: 2, entreno: 0 },
      { texto: 'Bastante ordenado, quiero afinar', nutricion: 1, entreno: 1 }
    ]
  },
  {
    pregunta: '¿Hay algo de salud que debamos tener en cuenta?',
    opciones: [
      { texto: 'Sí, algo del corazón', nutricion: 1, entreno: 1, salud: true },
      { texto: 'Sí, otra cosa', nutricion: 1, entreno: 1, salud: true },
      { texto: 'No, nada en especial', nutricion: 0, entreno: 0 }
    ]
  }
];

export const textosResultado: Record<ResultadoTest, { titulo: string; texto: string }> = {
  [ResultadoTest.Marta]: {
    titulo: 'Empieza por la nutrición, con Marta',
    texto: 'Lo que más te va a cambiar ahora es cómo comes. Marta te prepara un plan con comida real, adaptado a tus gustos y a tu rutina.'
  },
  [ResultadoTest.Fran]: {
    titulo: 'Empieza por el entrenamiento, con Fran',
    texto: 'Tu siguiente paso es moverte con un plan. Fran te prepara entrenamientos a tu nivel, en la app Jarvis, y te acompaña en cada progreso.'
  },
  [ResultadoTest.Ambos]: {
    titulo: 'Lo tuyo es el plan completo, con los dos',
    texto: 'Comer mejor y entrenar con cabeza van de la mano. Marta y Fran trabajan juntos para que las dos partes encajen en tu vida.'
  }
};

export const AVISO_SALUD =
  'Como hay un tema de salud de por medio, empezaremos siempre con el visto bueno de tu médico. Sabemos lo que es, y lo adaptamos todo a ti.';

// Suma los puntos de las respuestas elegidas y decide la recomendación.
export const calcularResultadoTest = (respuestas: OpcionTestDTO[]): ResultadoTest => {
  const nutricion = respuestas.reduce((total, opcion) => total + opcion.nutricion, 0);
  const entreno = respuestas.reduce((total, opcion) => total + opcion.entreno, 0);

  let result = ResultadoTest.Ambos;
  if (nutricion - entreno >= DIFERENCIA_CLARA) {
    result = ResultadoTest.Marta;
  } else if (entreno - nutricion >= DIFERENCIA_CLARA) {
    result = ResultadoTest.Fran;
  }
  return result;
};
