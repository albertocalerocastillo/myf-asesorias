// Tarjeta que se inclina en 3D siguiendo al ratón, con un brillo suave que se mueve con él.
// Solo con ratón: en pantallas táctiles se queda quieta.
import type { PointerEvent } from 'react';
import { m, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SPRING_SOFT } from '../../../theme/animation';
import type { ITiltCardProps } from './ITiltCardProps';

const MOUSE_POINTER = 'mouse';
const DEFAULT_MAX_TILT = 6;
const CENTER = 0.5;

const TiltCardComponent = ({ children, maxTilt = DEFAULT_MAX_TILT, className = '' }: ITiltCardProps) => {
  // #region Declaraciones
  // Posición del ratón dentro de la tarjeta, de 0 a 1 (0,5 = centro).
  const pointerX = useMotionValue(CENTER);
  const pointerY = useMotionValue(CENTER);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]), SPRING_SOFT);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]), SPRING_SOFT);
  const glowX = useTransform(pointerX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(pointerY, [0, 1], ['0%', '100%']);
  const glow = useMotionTemplate`radial-gradient(30rem circle at ${glowX} ${glowY}, rgb(255 255 255 / 0.35), transparent 60%)`;

  const handleMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.pointerType !== MOUSE_POINTER) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = (): void => {
    pointerX.set(CENTER);
    pointerY.set(CENTER);
  };
  // #endregion

  // #region Renderizado
  return (
    <div className="h-full [perspective:1200px]">
      <m.div
        className={`relative h-full [transform-style:preserve-3d] ${className}`}
        style={{ rotateX, rotateY }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {children}
        <m.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light" style={{ background: glow }} />
      </m.div>
    </div>
  );
  // #endregion
};

export default TiltCardComponent;
