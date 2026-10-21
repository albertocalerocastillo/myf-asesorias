// Envuelve un bloque para que aparezca al llegar a él con el scroll (Motion). Solo anima una vez.
// Con "reducir movimiento" activado, MotionConfig (App) quita el desplazamiento y deja solo el fundido.
import { m } from 'motion/react';
import type { TargetAndTransition } from 'motion/react';
import { RevealFrom, type IRevealProps } from './IRevealProps';
import { EASE_SMOOTH } from '../../../theme/animation';

const OFFSET_PX = 40;
const DURATION_S = 0.9;
const VISIBLE_AMOUNT = 0.2;
const MS_PER_SECOND = 1000;

const HIDDEN_STATES: Record<RevealFrom, TargetAndTransition> = {
  [RevealFrom.Below]: { opacity: 0, y: OFFSET_PX },
  [RevealFrom.Left]: { opacity: 0, x: -OFFSET_PX },
  [RevealFrom.Right]: { opacity: 0, x: OFFSET_PX },
  [RevealFrom.Scale]: { opacity: 0, scale: 0.94 }
};

const RevealComponent = ({ delay = 0, from = RevealFrom.Below, className = '', children }: IRevealProps) => (
  <m.div
    className={className}
    initial={HIDDEN_STATES[from]}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    viewport={{ once: true, amount: VISIBLE_AMOUNT }}
    transition={{ duration: DURATION_S, delay: delay / MS_PER_SECOND, ease: EASE_SMOOTH }}
  >
    {children}
  </m.div>
);

export default RevealComponent;
