// Envuelve un bloque para que aparezca suavemente al llegar a él con el scroll.
import { useReveal } from '../../../hooks/useReveal';
import type { IRevealProps } from './IRevealProps';

const RevealComponent = ({ delay = 0, className = '', children }: IRevealProps) => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
};

export default RevealComponent;
