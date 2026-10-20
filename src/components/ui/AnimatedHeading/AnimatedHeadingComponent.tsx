// Titular principal que aparece palabra a palabra (animación en CSS, ver ".palabra" en theme.css).
// El texto completo va en aria-label para que los lectores de pantalla lo lean de corrido.
import type { CSSProperties } from 'react';
import type { IAnimatedHeadingProps } from './IAnimatedHeadingProps';

const AnimatedHeadingComponent = ({ parts, className = '' }: IAnimatedHeadingProps) => {
  // #region Declaraciones
  const fullText = parts.map((part) => part.text).join(' ');
  const words = parts.flatMap((part) => part.text.split(' ').map((word) => ({ word, className: part.className ?? '' })));
  // #endregion

  // #region Renderizado
  return (
    <h1 className={className} aria-label={fullText}>
      {words.map(({ word, className: wordClassName }, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span className="palabra">
            <span className={wordClassName} style={{ '--orden': index } as CSSProperties}>
              {word}
            </span>
          </span>{' '}
        </span>
      ))}
    </h1>
  );
  // #endregion
};

export default AnimatedHeadingComponent;
