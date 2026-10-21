// Párrafo grande que se "enciende" palabra a palabra al hacer scroll: cada palabra pasa de un gris suave
// a su color final. El gris de partida ya cumple el contraste mínimo para letra grande, así que el texto
// se puede leer aunque no se haga scroll. El texto completo va también en una copia invisible para
// lectores de pantalla, que lo leen de corrido.
// - Texto corto o medio (hasta 90 palabras): el párrafo se queda fijo en pantalla mientras se enciende.
// - Texto largo: fluye normal por la página y cada palabra se enciende al pasar (cabe con cualquier longitud).
import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useScroll } from 'motion/react';
import EyebrowComponent from '../Eyebrow/EyebrowComponent';
import RevealWordsComponent from '../RevealWords/RevealWordsComponent';
import type { IScrollRevealTextProps } from './IScrollRevealTextProps';

// Tamaño de letra del párrafo fijo según su longitud, limitado también por el alto de la pantalla (svh)
// para que quepa siempre, incluso en móviles pequeños.
const PINNED_TIERS = [
  { maxWords: 50, mobile: 'clamp(1.25rem, min(8.2vw, 4.4svh), 2rem)', className: 'sm:text-[length:min(3rem,5.5svh)] lg:text-[length:min(3.75rem,6.6svh)] xl:text-[length:min(4.25rem,7svh)]' },
  { maxWords: 90, mobile: 'clamp(1.1rem, min(6.5vw, 3.4svh), 1.6rem)', className: 'sm:text-[length:min(2.25rem,4.2svh)] lg:text-[length:min(3rem,4.8svh)]' }
];
const MAX_PINNED_WORDS = PINNED_TIERS[PINNED_TIERS.length - 1].maxWords;

const ScrollRevealTextComponent = ({ eyebrow, parts }: IScrollRevealTextProps) => {
  // #region Declaraciones
  const pinnedRef = useRef<HTMLDivElement>(null);
  const flowingRef = useRef<HTMLParagraphElement>(null);
  const fullText = parts.map((part) => part.text).join(' ');
  const wordCount = fullText.split(' ').length;
  const pinnedTier = PINNED_TIERS.find((tier) => wordCount <= tier.maxWords);
  const isPinned = wordCount <= MAX_PINNED_WORDS;

  // Fijo: se enciende mientras el bloque recorre su altura. Largo: mientras el párrafo cruza la pantalla.
  const { scrollYProgress: pinnedProgress } = useScroll({ target: pinnedRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: flowingProgress } = useScroll({ target: flowingRef, offset: ['start 85%', 'end 55%'] });
  // #endregion

  // #region Renderizado
  if (!isPinned || !pinnedTier) {
    return (
      <div className="contenedor py-24 sm:py-32">
        <EyebrowComponent text={eyebrow} />
        <p className="sr-only">{fullText}</p>
        <p ref={flowingRef} aria-hidden="true" className="titulo max-w-4xl text-2xl leading-[1.3] sm:text-3xl lg:text-4xl">
          <RevealWordsComponent parts={parts} progress={flowingProgress} />
        </p>
      </div>
    );
  }

  // Recorrido del efecto: algo más corto en el móvil, para no pedir tanto scroll con el dedo.
  return (
    <div ref={pinnedRef} className="relative h-[170vh] sm:h-[220vh]">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="contenedor">
          <EyebrowComponent text={eyebrow} />
          <p className="sr-only">{fullText}</p>
          <p
            aria-hidden="true"
            className={`titulo max-w-5xl text-[length:var(--tamano-texto)] leading-[1.15] ${pinnedTier.className}`}
            style={{ '--tamano-texto': pinnedTier.mobile } as CSSProperties}
          >
            <RevealWordsComponent parts={parts} progress={pinnedProgress} />
          </p>
        </div>
      </div>
    </div>
  );
  // #endregion
};

export default ScrollRevealTextComponent;
