// Botón en forma de píldora que sirve igual para rutas internas (to), anclas y enlaces externos (href).
// Opcionalmente lleva una flecha en un círculo que se desliza al pasar el ratón, y efecto magnético.
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MagneticComponent from '../Magnetic/MagneticComponent';
import { Tone } from '../../../enums/Tone';
import { toneStyles } from '../../../theme/toneStyles';
import type { IButtonProps } from './IButtonProps';

const BASE_CLASSES = 'group/boton al-tocar inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full font-medium tracking-wide';
const ANCHOR_PREFIX = '#';
// Fondo del círculo de la flecha según el color del botón (que se vea sobre cada fondo).
const ARROW_BACKGROUND: Record<Tone, string> = {
  [Tone.Accent]: 'bg-white/15',
  [Tone.Olive]: 'bg-white/15',
  [Tone.Earth]: 'bg-white/15',
  [Tone.Sand]: 'bg-tinta/5',
  [Tone.Outline]: 'bg-tinta/5',
  [Tone.Light]: 'bg-tinta/5'
};

const ButtonComponent = ({ to, href = '', tone = Tone.Accent, withArrow = false, magnetic = false, large = false, className = '', children }: IButtonProps) => {
  // #region Declaraciones
  const sizeClasses = large ? 'py-2 pr-2 pl-7 text-lg' : 'py-1.5 pr-1.5 pl-6';
  const paddingClasses = withArrow ? sizeClasses : large ? 'px-8 py-4 text-lg' : 'px-6 py-3.5';
  const classes = `${BASE_CLASSES} ${paddingClasses} ${toneStyles[tone].solid} ${className}`;
  const isExternal = !to && !href.startsWith(ANCHOR_PREFIX);

  const content = (
    <>
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${ARROW_BACKGROUND[tone]} ${large ? 'size-12' : 'size-10'}`}
        >
          {/* Dos flechas: la primera sale por la derecha y la segunda entra por la izquierda. */}
          <ArrowRight className="size-5 transition-transform duration-500 ease-[var(--ease-suave)] group-hover/boton:translate-x-10" />
          <ArrowRight className="absolute size-5 -translate-x-10 transition-transform duration-500 ease-[var(--ease-suave)] group-hover/boton:translate-x-0" />
        </span>
      )}
    </>
  );
  // #endregion

  // #region Renderizado
  const button = to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes} {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {content}
    </a>
  );

  return magnetic ? <MagneticComponent>{button}</MagneticComponent> : button;
  // #endregion
};

export default ButtonComponent;
