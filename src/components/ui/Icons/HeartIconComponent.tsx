// Corazón relleno: el símbolo de la marca.
import type { IIconProps } from './IIconProps';

const HeartIconComponent = ({ className = 'size-5' }: IIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.6 2.3 4.5 6.1 4.5c2.2 0 3.6 1.2 4.4 2.4h3c.8-1.2 2.2-2.4 4.4-2.4 3.8 0 5.7 4.1 4.1 7.2C19.5 16.4 12 21 12 21z" />
  </svg>
);

export default HeartIconComponent;
