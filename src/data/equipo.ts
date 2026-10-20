// Datos de la marca y de las dos personas.
// ⚠️ PROVISIONAL: lo marcado como PENDIENTE se rellena con lo que nos pasen Marta y Fran con los datos reales.
import type { PersonaDTO } from '../dtos/PersonaDTO';
import { AppRoute } from '../enums/AppRoute';
import { Tone } from '../enums/Tone';

const URL_INSTAGRAM = 'https://instagram.com';
const URL_WHATSAPP = 'https://wa.me';

export const marca = {
  nombre: 'M&F Asesorías',
  // Si quieren botón de WhatsApp, número con prefijo y sin espacios (p. ej. '34600000000').
  whatsapp: null as string | null
};

export const marta: PersonaDTO = {
  nombre: 'Marta',
  area: 'Nutrición',
  ruta: AppRoute.Nutrition,
  tono: Tone.Sage,
  // PENDIENTE.
  instagram: 'usuario_de_marta',
  // PENDIENTE.
  titulacion: 'Titulación pendiente de confirmar',
  frase: 'Comer bien no es hacer dieta: es darle a tu cuerpo lo que necesita para seguir adelante.',
  // PENDIENTE: su historia contada con sus palabras.
  historia: [
    'Aquí irá la historia de Marta: su operación de corazón, cómo la vivió y qué cambió en su forma de ver la comida.',
    'Lo que aprendió en primera persona es lo que hoy enseña: que comer bien no va de prohibiciones, sino de entender qué necesita tu cuerpo y disfrutar haciéndolo.'
  ],
  enfoque: [
    'Planes de alimentación adaptados a ti, a tus gustos y a tu día a día',
    'Comida real, sin dietas milagro ni productos raros',
    'Educación nutricional para que aprendas a decidir por ti',
    'Seguimiento cercano y ajustes cuando haga falta'
  ],
  seccionContenido: 'Recetario'
};

export const fran: PersonaDTO = {
  nombre: 'Fran',
  area: 'Entrenamiento',
  ruta: AppRoute.Training,
  tono: Tone.Night,
  // PENDIENTE.
  instagram: 'usuario_de_fran',
  // PENDIENTE.
  titulacion: 'Titulación pendiente de confirmar',
  frase: 'Entrenar no es castigarte: es la mejor inversión en tu salud que vas a hacer.',
  // PENDIENTE: su historia contada con sus palabras.
  historia: [
    'Aquí irá la historia de Fran: su operación de corazón, la vuelta al movimiento y por qué entrenar se convirtió en su forma de cuidarse.',
    'Sabe lo que es empezar de cero y con miedo, y por eso entrena a cada persona desde donde está, sin prisas y sin comparaciones.'
  ],
  enfoque: [
    'Entrenamientos personalizados según tu nivel y tu objetivo',
    'Todo en la app Jarvis: rutinas, vídeos y progreso al detalle',
    'Progresión segura, pensando en la salud a largo plazo',
    'Contacto directo para dudas y ajustes'
  ],
  seccionContenido: 'Diario de entreno'
};

export const personas: PersonaDTO[] = [marta, fran];

export const obtenerUrlInstagram = (usuario: string): string => `${URL_INSTAGRAM}/${usuario}`;

// Devuelve null si no hay WhatsApp configurado, para no pintar el botón.
export const obtenerUrlWhatsApp = (mensaje: string): string | null => {
  const result = marca.whatsapp ? `${URL_WHATSAPP}/${marca.whatsapp}?text=${encodeURIComponent(mensaje)}` : null;
  return result;
};
