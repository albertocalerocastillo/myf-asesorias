// "Qué puedes esperar": cómo funciona la asesoría, sin precios.
// ⚠️ PROVISIONAL: confirmar los pasos reales con Marta y Fran.
import type { PasoDTO } from '../dtos/PasoDTO';

export const pasos: PasoDTO[] = [
  {
    titulo: 'Nos escribes',
    texto: 'Por Instagram, contándonos un poco qué buscas. Sin compromiso.'
  },
  {
    titulo: 'Te conocemos',
    texto: 'Hablamos contigo para entender tu punto de partida, tus objetivos, tus horarios y tu salud.'
  },
  {
    titulo: 'Tu plan, a tu medida',
    texto: 'Preparamos tu plan de nutrición, de entrenamiento o los dos. Lo tienes todo en la app Jarvis, bien explicado.'
  },
  {
    titulo: 'Te acompañamos',
    texto: 'Revisamos cómo vas, resolvemos dudas y ajustamos el plan cuando haga falta.'
  }
];

export const perfilesCliente: string[] = [
  'Quieres empezar a cuidarte y no sabes por dónde',
  'Buscas perder grasa, ganar fuerza o sentirte con más energía',
  'Has tenido algún problema de salud y quieres volver a moverte con cabeza',
  'Te has cansado de dietas y rutinas que no se adaptan a tu vida'
];
