// Botón redondeado que sirve igual para rutas internas (to) que para enlaces externos (href).
import { Link } from 'react-router-dom';
import { Tone } from '../../../enums/Tone';
import { toneStyles } from '../../../theme/toneStyles';
import type { IButtonProps } from './IButtonProps';

const BASE_CLASSES = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition';

const ButtonComponent = ({ to, href, tone = Tone.Heart, className = '', children }: IButtonProps) => {
  // #region Declaraciones
  const classes = `${BASE_CLASSES} ${toneStyles[tone].solid} ${className}`;
  // #endregion

  // #region Renderizado
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {children}
    </a>
  );
  // #endregion
};

export default ButtonComponent;
