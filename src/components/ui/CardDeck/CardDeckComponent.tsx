// Mazo de tarjetas que se reparte al hacer scroll: la sección se queda fija y cada tarjeta entra
// deslizándose desde la derecha y se posa encima de la anterior, que se hunde un poco. Al posarse, su
// texto se enciende palabra a palabra. No pide ningún gesto nuevo (se baja como siempre) y unas barras
// de progreso dicen cuánto falta.
// Con "reducir movimiento" las tarjetas se ven una debajo de otra, sin animación (solo con CSS, así el
// HTML es el mismo en el servidor y en el navegador).
import { useRef, useState } from 'react';
import { m, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import EyebrowComponent from '../Eyebrow/EyebrowComponent';
import RevealWordsComponent from '../RevealWords/RevealWordsComponent';
import { SPRING_SOFT } from '../../../theme/animation';
import type { CardDeckItem, ICardDeckProps } from './ICardDeckProps';

// Tramo del recorrido en el que se reparten las tarjetas (antes y después, unos instantes de pausa).
const DEAL_START = 0.06;
const DEAL_END = 0.94;
// Parte de cada tramo en la que la tarjeta se mueve; el resto se queda quieta para leerla.
const MOVE_SHARE = 0.6;
// Alto del recorrido: una pantalla más este tanto por cada tarjeta que entra.
const SCROLL_PER_CARD_VH = 80;
const ENTER_OFFSET_VW = 110;
const ENTER_ROTATE_DEG = 8;
// Cuánto se hunde cada tarjeta por cada una que tiene encima (como mucho se ven dos por debajo).
const STACK_SCALE_STEP = 0.06;
const STACK_LIFT_PX = 18;
const MAX_STACK_DEPTH = 2;
const MAX_SHADE = 0.25;

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const dealStep = (total: number): number => (DEAL_END - DEAL_START) / Math.max(1, total - 1);

// Momento en el que empieza a entrar cada tarjeta (la primera ya está en su sitio desde el principio).
const enterStart = (index: number, total: number): number => DEAL_START + (index - 1) * dealStep(total);

// Cuánto ha entrado ya la tarjeta: 0 fuera de pantalla, 1 en su sitio.
const enterAmount = (value: number, index: number, total: number): number =>
  index === 0 ? 1 : clamp01((value - enterStart(index, total)) / (dealStep(total) * MOVE_SHARE));

// Cuántas tarjetas tiene encima (con decimales mientras la siguiente va entrando).
const stackDepth = (value: number, index: number, total: number): number => {
  let result = 0;
  for (let next = index + 1; next < total; next++) {
    result += enterAmount(value, next, total);
  }
  return Math.min(result, MAX_STACK_DEPTH);
};

// Tramo en el que se enciende el texto: desde que la tarjeta está casi posada hasta que llega la siguiente.
const textRange = (index: number, total: number): [number, number] => {
  const step = dealStep(total);
  const from = index === 0 ? 0 : enterStart(index, total) + step * MOVE_SHARE * 0.6;
  const to = index === total - 1 ? DEAL_END : enterStart(index + 1, total) + step * 0.1;
  return [from, to];
};

const DeckCard = ({ card, index, total, progress }: { card: CardDeckItem; index: number; total: number; progress: MotionValue<number> }) => {
  const x = useTransform(progress, (value) => `${(1 - enterAmount(value, index, total)) * ENTER_OFFSET_VW}vw`);
  const rotate = useTransform(progress, (value) => (1 - enterAmount(value, index, total)) * ENTER_ROTATE_DEG);
  const scale = useTransform(progress, (value) => 1 - stackDepth(value, index, total) * STACK_SCALE_STEP);
  const y = useTransform(progress, (value) => -stackDepth(value, index, total) * STACK_LIFT_PX);
  const shade = useTransform(progress, (value) => Math.min(stackDepth(value, index, total), 1) * MAX_SHADE);
  const textProgress = useTransform(progress, textRange(index, total), [0, 1]);

  return (
    <m.li
      className="absolute inset-0 origin-top overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-28px_rgb(45_48_33/0.45)] motion-reduce:relative motion-reduce:inset-auto motion-reduce:transform-none!"
      style={{ x, y, rotate, scale }}
    >
      <div className={`flex h-full flex-col justify-between gap-6 p-7 sm:p-10 ${card.className}`}>
        {card.header}
        <p className="titulo text-[length:clamp(1.5rem,min(7.4vw,4.4svh),2.6rem)] leading-[1.12]">
          <span className="sr-only">{card.parts.map((part) => part.text).join(' ')}</span>
          <span aria-hidden="true">
            <RevealWordsComponent parts={card.parts} progress={textProgress} dimColor={card.dimColor} />
          </span>
        </p>
      </div>
      {/* Sombra que oscurece la tarjeta cuando otra se le pone encima. */}
      <m.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-tinta motion-reduce:hidden" style={{ opacity: shade }} />
    </m.li>
  );
};

const ProgressBar = ({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) => {
  const scaleX = useTransform(progress, (value) => enterAmount(value, index, total));

  return (
    <span className="h-1 flex-1 overflow-hidden rounded-full bg-tinta/10">
      <m.span className="block h-full origin-left rounded-full bg-acento" style={{ scaleX }} />
    </span>
  );
};

const CardDeckComponent = ({ eyebrow, title, cards }: ICardDeckProps) => {
  // #region Declaraciones
  const ref = useRef<HTMLDivElement>(null);
  const total = cards.length;
  const [current, setCurrent] = useState<number>(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, SPRING_SOFT);
  const hintOpacity = useTransform(scrollYProgress, [0, DEAL_START], [1, 0]);
  const height = `${100 + (total - 1) * SCROLL_PER_CARD_VH}vh`;
  // #endregion

  // #region Efectos
  // Contador "02 / 04": cuenta una tarjeta cuando ya ha entrado más de la mitad.
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const dealt = cards.filter((_, index) => enterAmount(value, index, total) >= 0.5).length;
    setCurrent(dealt);
  });
  // #endregion

  // #region Renderizado
  const renderHint = (className: string) => (
    <m.p aria-hidden="true" className={`items-center gap-2 text-sm text-gris motion-reduce:hidden ${className}`} style={{ opacity: hintOpacity }}>
      <ArrowDown className="size-4 animate-bounce" /> Sigue bajando
    </m.p>
  );

  return (
    <div ref={ref} data-sin-boton-flotante className="relative motion-reduce:h-auto!" style={{ height }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
        <div className="contenedor grid w-full items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
          <div>
            <EyebrowComponent text={eyebrow} className="mb-3 sm:mb-5" />
            <h2 className="titulo-seccion mb-4 text-3xl leading-[1.05] sm:mb-6 sm:text-5xl lg:text-6xl">{title}</h2>
            <div aria-hidden="true" className="flex items-center gap-4 motion-reduce:hidden">
              <span className="titulo text-2xl text-acento tabular-nums sm:text-3xl">
                {String(current).padStart(2, '0')}
                <span className="text-base text-gris"> / {String(total).padStart(2, '0')}</span>
              </span>
              <span className="flex max-w-56 flex-1 gap-1.5">
                {cards.map((card, index) => (
                  <ProgressBar key={card.id} index={index} total={total} progress={progress} />
                ))}
              </span>
            </div>
            {renderHint('mt-6 hidden lg:flex')}
          </div>

          <ol className="relative mt-6 h-[min(24rem,50svh)] lg:mt-0 lg:h-[min(30rem,60svh)] motion-reduce:flex motion-reduce:h-auto motion-reduce:flex-col motion-reduce:gap-4">
            {cards.map((card, index) => (
              <DeckCard key={card.id} card={card} index={index} total={total} progress={progress} />
            ))}
          </ol>

          {renderHint('flex justify-center lg:hidden')}
        </div>
      </div>
    </div>
  );
  // #endregion
};

export default CardDeckComponent;
