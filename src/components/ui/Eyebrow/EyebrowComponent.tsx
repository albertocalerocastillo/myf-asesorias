// Antetítulo con el estilo del lema del logo: mayúsculas espaciadas entre dos rayas finas.
import type { IEyebrowProps } from './IEyebrowProps';

const EyebrowComponent = ({ text, centered = false, inverted = false, className = '' }: IEyebrowProps) => {
  // #region Declaraciones
  const lineClasses = `h-px w-8 shrink-0 ${inverted ? 'bg-acento-suave/60' : 'bg-acento-suave'}`;
  // #endregion

  // #region Renderizado
  return (
    <p
      className={`mb-5 flex items-center gap-3 text-xs font-medium tracking-[0.28em] uppercase ${centered ? 'justify-center' : ''} ${
        inverted ? 'text-acento-suave' : 'text-tierra'
      } ${className}`}
    >
      <span aria-hidden="true" className={lineClasses} />
      {text}
      {centered && <span aria-hidden="true" className={lineClasses} />}
    </p>
  );
  // #endregion
};

export default EyebrowComponent;
