// Línea de datos cortos separados por "·" que, si no cabe, salta de línea sin dejar un punto suelto:
// cada dato lleva el punto delante y el que empieza línea queda fuera del recorte (margen negativo).
import type { IMetaLineProps } from './IMetaLineProps';

const MetaLineComponent = ({ items, className = '' }: IMetaLineProps) => (
  <span className={`block overflow-hidden ${className}`}>
    <span className="-ml-6 flex flex-wrap items-center gap-y-1">
      {items.map((item, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1 whitespace-nowrap before:inline-block before:w-6 before:text-center before:content-['·']"
        >
          {item}
        </span>
      ))}
    </span>
  </span>
);

export default MetaLineComponent;
