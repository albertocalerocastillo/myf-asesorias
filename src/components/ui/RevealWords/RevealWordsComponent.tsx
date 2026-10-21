// Palabras que se "encienden" una detrás de otra según avanza un progreso (0-1): cada una pasa de un gris
// suave a su color final. Va oculto a lectores de pantalla: quien lo use pone el texto completo aparte.
import { m, useTransform, type MotionStyle, type MotionValue } from 'motion/react';
import { BRAND_COLORS } from '../../../theme/colors';
import type { ScrollRevealWord } from '../ScrollRevealText/IScrollRevealTextProps';
import type { IRevealWordsProps } from './IRevealWordsProps';

const RevealWord = ({ word, progress, range, dimColor }: { word: ScrollRevealWord; progress: MotionValue<number>; range: [number, number]; dimColor: string }) => {
  const color = useTransform(progress, range, [dimColor, word.color]);

  // Con "reducir movimiento" la palabra se ve ya con su color final (variable CSS, gana al estilo animado).
  return (
    <m.span
      style={{ color, '--color-final': word.color } as MotionStyle}
      className={`motion-reduce:text-[var(--color-final)]! ${word.className ?? ''}`}
    >
      {word.text}{' '}
    </m.span>
  );
};

const RevealWordsComponent = ({ parts, progress, dimColor = BRAND_COLORS.apagado }: IRevealWordsProps) => {
  // #region Declaraciones
  const words: ScrollRevealWord[] = parts.flatMap((part) =>
    part.text.split(' ').map((text) => ({ text, className: part.className, color: part.color ?? BRAND_COLORS.tinta }))
  );
  // #endregion

  // #region Renderizado
  return words.map((word, index) => (
    <RevealWord
      key={`${word.text}-${index}`}
      word={word}
      progress={progress}
      range={[index / words.length, (index + 1) / words.length]}
      dimColor={dimColor}
    />
  ));
  // #endregion
};

export default RevealWordsComponent;
