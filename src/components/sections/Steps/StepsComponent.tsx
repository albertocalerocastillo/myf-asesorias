// Los pasos de la asesoría como línea de tiempo: vertical en el móvil, horizontal en escritorio.
// La línea se dibuja siguiendo el scroll (Motion) y cada número se rellena cuando la línea llega a él.
import { useRef } from 'react';
import { m, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { SPRING_SOFT } from '../../../theme/animation';
import { BRAND_COLORS } from '../../../theme/colors';
import { pasos } from '../../../data/servicio';
import type { IStepsProps } from './IStepsProps';

const REVEAL_STEP_MS = 120;
// Margen del recorrido para que cada número se rellene justo cuando la línea lo alcanza.
const FILL_WINDOW = 0.08;
const VERTICAL_LINE = 'absolute top-7 bottom-7 left-7 w-px lg:hidden';
const HORIZONTAL_LINE = 'absolute top-7 right-[12.5%] left-[12.5%] hidden h-px lg:block';

const StepNumber = ({ number, progress, threshold }: { number: number; progress: MotionValue<number>; threshold: number }) => {
  const fill = useTransform(progress, [threshold - FILL_WINDOW, threshold], [0, 1]);
  const color = useTransform(fill, [0, 1], [BRAND_COLORS.tierra, BRAND_COLORS.blanco]);

  return (
    <span className="titulo relative z-10 grid size-14 shrink-0 place-items-center overflow-hidden rounded-full border border-acento-suave bg-crema text-xl text-tierra">
      <m.span aria-hidden="true" className="absolute inset-0 rounded-full bg-oliva" style={{ opacity: fill, scale: fill }} />
      <m.span className="relative" style={{ color }}>
        {number}
      </m.span>
    </span>
  );
};

const StepsComponent = ({ headingLevel: Heading = 'h3' }: IStepsProps) => {
  // #region Declaraciones
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, SPRING_SOFT);
  const lastIndex = pasos.length - 1;
  // #endregion

  // #region Renderizado
  return (
    <ol ref={ref} className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
      {/* Línea de fondo y, encima, la que se dibuja con el scroll. */}
      <span aria-hidden="true" className={`${VERTICAL_LINE} bg-tinta/10`} />
      <m.span aria-hidden="true" className={`${VERTICAL_LINE} origin-top bg-oliva`} style={{ scaleY: progress }} />
      <span aria-hidden="true" className={`${HORIZONTAL_LINE} bg-tinta/10`} />
      <m.span aria-hidden="true" className={`${HORIZONTAL_LINE} origin-left bg-oliva`} style={{ scaleX: progress }} />

      {pasos.map((paso, index) => (
        <li key={paso.titulo} className="relative">
          <RevealComponent delay={index * REVEAL_STEP_MS} className="flex gap-6 lg:flex-col lg:items-center lg:text-center">
            <StepNumber number={index + 1} progress={progress} threshold={lastIndex ? index / lastIndex : 1} />
            <div>
              <Heading className="mb-2 text-2xl">{paso.titulo}</Heading>
              <p className="leading-relaxed text-gris">{paso.texto}</p>
            </div>
          </RevealComponent>
        </li>
      ))}
    </ol>
  );
  // #endregion
};

export default StepsComponent;
