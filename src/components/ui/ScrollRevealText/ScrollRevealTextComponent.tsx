// Párrafo grande que se queda fijo en pantalla y se "enciende" palabra a palabra al hacer scroll: cada
// palabra pasa de un gris suave a su color final. El gris de partida ya cumple el contraste mínimo para
// letra grande, así que el texto se puede leer aunque no se haga scroll.
// El texto completo va también en una copia invisible para lectores de pantalla, que lo leen de corrido.
import { useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import EyebrowComponent from '../Eyebrow/EyebrowComponent';
import { BRAND_COLORS } from '../../../theme/colors';
import type { IScrollRevealTextProps, ScrollRevealWord } from './IScrollRevealTextProps';

const RevealWord = ({ word, progress, range }: { word: ScrollRevealWord; progress: MotionValue<number>; range: [number, number] }) => {
  const color = useTransform(progress, range, [BRAND_COLORS.apagado, word.color]);

  return (
    <m.span style={{ color }} className={word.className}>
      {word.text}{' '}
    </m.span>
  );
};

const ScrollRevealTextComponent = ({ eyebrow, parts }: IScrollRevealTextProps) => {
  // #region Declaraciones
  const ref = useRef<HTMLDivElement>(null);
  // De que el bloque llega arriba a que termina su recorrido: en ese tramo se encienden las palabras.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words: ScrollRevealWord[] = parts.flatMap((part) =>
    part.text.split(' ').map((text) => ({ text, className: part.className, color: part.color ?? BRAND_COLORS.tinta }))
  );
  const fullText = parts.map((part) => part.text).join(' ');
  // #endregion

  // #region Renderizado
  // Recorrido del efecto: algo más corto en el móvil, para no pedir tanto scroll con el dedo.
  return (
    <div ref={ref} className="relative h-[170vh] sm:h-[220vh]">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="contenedor">
          <EyebrowComponent text={eyebrow} />
          <p className="sr-only">{fullText}</p>
          <p aria-hidden="true" className="titulo max-w-5xl text-[2rem] leading-[1.15] sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            {words.map((word, index) => (
              <RevealWord key={`${word.text}-${index}`} word={word} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]} />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
  // #endregion
};

export default ScrollRevealTextComponent;
