// Dibujo estático de la ramita de dos hojas del logo (usa currentColor). Sin animación: para usarla
// muchas veces (p. ej. en la cinta) sin coste. La versión animada es LeafComponent.
import { useId } from 'react';
import type { CSSProperties } from 'react';

interface ILeafShapeProps {
  /** Clases de tamaño y color. */
  className?: string;
  /** Estilos en línea (p. ej. giro). */
  style?: CSSProperties;
}

const LeafShapeComponent = ({ className = '', style }: ILeafShapeProps) => {
  // #region Declaraciones
  const maskId = useId();
  // #endregion

  // #region Renderizado
  // Las vetas se recortan de la hoja (máscara) en vez de pintarse encima: así nunca destacan más que
  // la propia hoja, aunque esta sea casi transparente sobre un fondo oscuro.
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className} style={style}>
      <mask id={maskId}>
        <rect width="120" height="120" fill="white" />
        <path d="M74 28 C 86 18, 98 10, 108 7" stroke="black" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
        <path d="M43 66 C 32 56, 20 48, 9 42" stroke="black" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      </mask>
      {/* Tallo. */}
      <path d="M18 112 C 40 84, 60 62, 70 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <g mask={`url(#${maskId})`} fill="currentColor">
        {/* Hoja grande. */}
        <path d="M70 30 C 64 6, 92 -2, 112 4 C 112 30, 96 52, 70 30 Z" />
        {/* Hoja pequeña. */}
        <path d="M46 70 C 22 72, 6 56, 4 38 C 26 34, 46 46, 46 70 Z" />
      </g>
    </svg>
  );
  // #endregion
};

export default LeafShapeComponent;
