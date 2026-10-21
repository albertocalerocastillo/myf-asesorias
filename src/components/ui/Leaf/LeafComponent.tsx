// Ramita de dos hojas animada, el motivo del logo (la parte de nutrición). Decorativa: flota en el
// fondo, se desplaza con el scroll a distinta velocidad que la página y puede balancearse sola.
import { useRef } from 'react';
import { m, useScroll, useSpring, useTransform } from 'motion/react';
import LeafShapeComponent from './LeafShapeComponent';
import { SPRING_SOFT } from '../../../theme/animation';
import type { ILeafProps } from './ILeafProps';

const SWAY_DEGREES = 5;
const SWAY_DURATION_S = 7;

const LeafComponent = ({ className = '', parallax = 0, rotate = 0, sway = false }: ILeafProps) => {
  // #region Declaraciones
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [parallax, -parallax]), SPRING_SOFT);
  // #endregion

  // #region Renderizado
  return (
    <m.div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} style={{ y }}>
      <m.div
        className="size-full"
        style={{ rotate }}
        animate={sway ? { rotate: [rotate - SWAY_DEGREES, rotate + SWAY_DEGREES, rotate - SWAY_DEGREES] } : undefined}
        transition={sway ? { duration: SWAY_DURATION_S, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <LeafShapeComponent className="size-full" />
      </m.div>
    </m.div>
  );
  // #endregion
};

export default LeafComponent;
