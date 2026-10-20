// lucide-react no trae iconos de marcas, así que el de Instagram va como SVG propio.
import type { IIconProps } from './IIconProps';

const InstagramIconComponent = ({ className = 'size-5' }: IIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export default InstagramIconComponent;
