// Móvil dibujado con CSS que enseña cómo es "tu día" en la app Jarvis: comidas, entreno y progreso.
// Es una ilustración (no una captura real de la app), flota suavemente y sus tarjetas entran escalonadas.
// PENDIENTE: ajustar el contenido a lo que de verdad ven sus clientes en Jarvis.
import { m } from 'motion/react';
import { Dumbbell, Salad, TrendingUp } from 'lucide-react';
import { EASE_SMOOTH } from '../../../theme/animation';

const FLOAT_DURATION_S = 6;
const ITEM_STEP_S = 0.15;
const PROGRESS_PERCENT = 72;

const TODAY = [
  { icon: Salad, title: 'Comida', detail: 'Garbanzos con espinacas', tone: 'bg-oliva-claro text-oliva' },
  { icon: Dumbbell, title: 'Entreno · 45 min', detail: 'Fuerza tren inferior', tone: 'bg-tierra-claro text-tierra' }
];

const JarvisPhoneComponent = () => (
  <m.div
    aria-hidden="true"
    className="relative mx-auto w-64 sm:w-72"
    animate={{ y: [0, -14, 0], rotate: [-2, -1, -2] }}
    transition={{ duration: FLOAT_DURATION_S, repeat: Infinity, ease: 'easeInOut' }}
  >
    <div className="rounded-[3rem] bg-tinta p-3 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.6)]">
      <div className="relative overflow-hidden rounded-[2.4rem] bg-crema px-5 pt-12 pb-8 text-tinta">
        {/* Isla de la cámara. */}
        <span className="absolute top-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-tinta" />
        <p className="text-xs tracking-[0.2em] text-gris uppercase">Martes</p>
        <p className="titulo mb-6 text-3xl">Tu día</p>

        <div className="space-y-3">
          {TODAY.map((item, index) => (
            <m.div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * ITEM_STEP_S + 0.3, duration: 0.6, ease: EASE_SMOOTH }}
            >
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${item.tone}`}>
                <item.icon className="size-5" />
              </span>
              <span className="min-w-0 text-sm leading-tight">
                <span className="block font-medium">{item.title}</span>
                <span className="block truncate text-gris">{item.detail}</span>
              </span>
            </m.div>
          ))}

          <m.div
            className="rounded-2xl bg-acento p-4 text-crema"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: TODAY.length * ITEM_STEP_S + 0.3, duration: 0.6, ease: EASE_SMOOTH }}
          >
            <p className="mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="size-4" /> Progreso de la semana
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <m.div
                className="h-full rounded-full bg-acento-suave"
                initial={{ width: 0 }}
                whileInView={{ width: `${PROGRESS_PERCENT}%` }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 1.2, ease: EASE_SMOOTH }}
              />
            </div>
          </m.div>
        </div>
      </div>
    </div>
  </m.div>
);

export default JarvisPhoneComponent;
