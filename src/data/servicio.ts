// Qué ofrece la asesoría y cómo funciona, sin precios (se dan en privado).
// ⚠️ PROVISIONAL: confirmar con Marta y Fran los pasos reales y las respuestas de las preguntas frecuentes.
import { HeartPulse, MessageCircleHeart, Smartphone, Sparkles } from 'lucide-react';
import type { PasoDTO } from '../dtos/PasoDTO';
import type { PreguntaFrecuenteDTO } from '../dtos/PreguntaFrecuenteDTO';
import type { VentajaDTO } from '../dtos/VentajaDTO';

export const ventajas: VentajaDTO[] = [
  {
    icono: HeartPulse,
    titulo: 'Lo hemos vivido',
    texto: 'Los dos hemos pasado por una operación de corazón. Sabemos lo que es empezar de cero, con dudas y con miedo.'
  },
  {
    icono: Sparkles,
    titulo: 'Hecho para ti',
    texto: 'Nada de plantillas: tu plan parte de tu salud, tus gustos, tus horarios y tu punto de partida.'
  },
  {
    icono: Smartphone,
    titulo: 'Todo en tu móvil',
    texto: 'Comidas, rutinas con vídeo y progreso en la app Jarvis. Abres y sabes exactamente qué toca hoy.'
  },
  {
    icono: MessageCircleHeart,
    titulo: 'Trato directo',
    texto: 'Hablas con nosotros, no con un equipo ni con un bot. Dudas, cambios y ánimos cuando los necesites.'
  }
];

export const pasos: PasoDTO[] = [
  {
    titulo: 'Nos escribes',
    texto: 'Por Instagram, contándonos qué buscas. Sin compromiso y sin formularios.'
  },
  {
    titulo: 'Te conocemos',
    texto: 'Hablamos contigo para entender tu punto de partida, tus objetivos, tu rutina y tu salud.'
  },
  {
    titulo: 'Recibes tu plan',
    texto: 'Preparamos tu plan de nutrición, de entrenamiento o los dos, y lo tienes en la app Jarvis bien explicado.'
  },
  {
    titulo: 'Te acompañamos',
    texto: 'Revisamos cómo vas, resolvemos dudas y ajustamos el plan para que sigas avanzando.'
  }
];

export const perfilesCliente: string[] = [
  'Quieres empezar a cuidarte y no sabes por dónde',
  'Buscas perder grasa, ganar fuerza o tener más energía',
  'Has tenido un problema de salud y quieres volver a moverte con cabeza',
  'Te has cansado de dietas y rutinas que no encajan con tu vida'
];

export const preguntasFrecuentes: PreguntaFrecuenteDTO[] = [
  {
    pregunta: '¿Cuánto cuesta la asesoría?',
    respuesta:
      'Depende de lo que necesites: solo nutrición, solo entrenamiento o los dos. Escríbenos por Instagram, te hacemos unas preguntas y te contamos las opciones sin compromiso.'
  },
  {
    pregunta: '¿Es todo online?',
    respuesta:
      'Sí. El plan, las rutinas y el seguimiento los tienes en la app Jarvis, y hablas con nosotros directamente cuando lo necesites. Da igual dónde vivas.'
  },
  {
    pregunta: '¿Necesito ir a un gimnasio?',
    respuesta:
      'No. Adaptamos el entrenamiento a lo que tengas: gimnasio, casa con poco material o al aire libre.'
  },
  {
    pregunta: '¿Puedo empezar si tengo un problema de corazón u otra patología?',
    respuesta:
      'Sí, siempre con el visto bueno de tu médico. Sabemos lo que es entrenar y comer después de una operación, adaptamos todo a tu situación y nunca sustituimos a tu especialista.'
  },
  {
    pregunta: '¿Puedo contratar solo nutrición o solo entrenamiento?',
    respuesta:
      'Claro. Puedes empezar con Marta, con Fran o con los dos. Juntos funciona mejor, pero tú decides.'
  },
  {
    pregunta: '¿Qué es Jarvis?',
    respuesta:
      'Es la app que usamos para que tengas todo a mano: tu plan de comidas, tus rutinas con vídeos y tu progreso. Te la explicamos el primer día.'
  }
];
