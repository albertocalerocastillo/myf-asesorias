// Fila de texto que se desliza sin fin y reacciona al scroll: al bajar rápido acelera y se inclina,
// y al subir cambia de sentido. El contenido va repetido (la copia, oculta a lectores de pantalla).
// Con "reducir movimiento" se queda quieta.
import { useRef } from 'react';
import {
  m,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap
} from 'motion/react';
import type { IVelocityTextProps } from './IVelocityTextProps';

const COPIES = 4;
const MS_PER_SECOND = 1000;
const VELOCITY_SPRING = { damping: 50, stiffness: 400 };
const MAX_SKEW_DEGREES = 6;

const VelocityTextComponent = ({ children, baseSpeed, className = '' }: IVelocityTextProps) => {
  // #region Declaraciones
  const reducedMotion = useReducedMotion();
  const offset = useMotionValue(0);
  const direction = useRef<number>(1);
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), VELOCITY_SPRING);
  const speedFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-3000, 3000], [MAX_SKEW_DEGREES, -MAX_SKEW_DEGREES]);
  // Cada copia ocupa 1/COPIES del ancho: al pasar una copia entera, vuelve al principio sin salto.
  const x = useTransform(offset, (value) => `${wrap(-100 / COPIES, 0, value)}%`);
  // #endregion

  // #region Efectos
  useAnimationFrame((_, delta) => {
    if (reducedMotion) {
      return;
    }
    const factor = speedFactor.get();
    if (factor < 0) {
      direction.current = -1;
    } else if (factor > 0) {
      direction.current = 1;
    }
    const base = -baseSpeed * direction.current * (delta / MS_PER_SECOND);
    offset.set(offset.get() + base + base * Math.abs(factor));
  });
  // #endregion

  // #region Renderizado
  return (
    <div className="overflow-hidden">
      <m.div className={`flex w-max ${className}`} style={{ x, skewX }}>
        {Array.from({ length: COPIES }, (_, index) => (
          <div key={index} aria-hidden={index > 0} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </m.div>
    </div>
  );
  // #endregion
};

export default VelocityTextComponent;
