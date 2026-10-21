// Sello redondo con un texto girando alrededor (p. ej. "Lo hemos vivido"). Decorativo.
// El texto ocupa justo la vuelta entera, así nunca se monta ni deja huecos.
import { useId } from 'react';
import type { ISealProps } from './ISealProps';

const TEXT_RADIUS = 38;
// Longitud de la circunferencia por la que va el texto.
const TEXT_LENGTH = 2 * Math.PI * TEXT_RADIUS;
const SEPARATOR = ' · ';

const SealComponent = ({ text, children, className = 'relative' }: ISealProps) => {
  // #region Declaraciones
  // Identificador único por sello, para que varios en la misma página no compartan el círculo.
  const pathId = `sello-${useId().replace(/:/g, '')}`;
  const repeatedText = `${text}${SEPARATOR}${text}${SEPARATOR}`;
  // #endregion

  // #region Renderizado
  return (
    <div aria-hidden="true" className={className}>
      <svg viewBox="0 0 100 100" className="size-full animate-[spin_20s_linear_infinite] drop-shadow-xl motion-reduce:animate-none">
        <defs>
          <path id={pathId} d={`M50 50 m-${TEXT_RADIUS} 0 a${TEXT_RADIUS} ${TEXT_RADIUS} 0 1 1 ${TEXT_RADIUS * 2} 0 a${TEXT_RADIUS} ${TEXT_RADIUS} 0 1 1 -${TEXT_RADIUS * 2} 0`} />
        </defs>
        <circle cx="50" cy="50" r="50" fill="var(--color-crema)" />
        <text className="fill-tinta text-[9px] font-medium uppercase">
          <textPath href={`#${pathId}`} textLength={TEXT_LENGTH} lengthAdjust="spacing">
            {repeatedText}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
  // #endregion
};

export default SealComponent;
