// Efecto "magnético": el contenido se desplaza un poco hacia el ratón cuando pasa cerca y vuelve con
// un muelle al salir. Solo con ratón (en pantallas táctiles no hace nada).
import type { PointerEvent } from 'react';
import { m, useMotionValue, useSpring } from 'motion/react';
import { SPRING_SOFT } from '../../../theme/animation';
import type { IMagneticProps } from './IMagneticProps';

const MOUSE_POINTER = 'mouse';
const DEFAULT_STRENGTH = 0.3;

const MagneticComponent = ({ children, strength = DEFAULT_STRENGTH, className = '' }: IMagneticProps) => {
  // #region Declaraciones
  const x = useSpring(useMotionValue(0), SPRING_SOFT);
  const y = useSpring(useMotionValue(0), SPRING_SOFT);

  const handleMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.pointerType !== MOUSE_POINTER) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleLeave = (): void => {
    x.set(0);
    y.set(0);
  };
  // #endregion

  // #region Renderizado
  return (
    <m.div className={`inline-block ${className}`} style={{ x, y }} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {children}
    </m.div>
  );
  // #endregion
};

export default MagneticComponent;
