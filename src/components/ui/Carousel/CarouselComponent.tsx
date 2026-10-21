// En el móvil, tarjetas en fila que se deslizan con el dedo y encajan una a una (scroll-snap),
// asomando la siguiente para que se vea que hay más, con puntos que indican la posición.
// A partir de tablet es una cuadrícula normal. Sin librerías: es scroll nativo del navegador.
import { useRef, useState } from 'react';
import type { ICarouselProps } from './ICarouselProps';

const CarouselComponent = ({ label, items, gridClassName }: ICarouselProps) => {
  // #region Declaraciones
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // La tarjeta activa es la que está más a la izquierda del todo visible.
  const handleScroll = (): void => {
    const track = trackRef.current;
    const firstItem = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstItem) {
      return;
    }
    const step = firstItem.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    setActiveIndex(Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
  };

  const goTo = (index: number): void => {
    const item = trackRef.current?.children[index] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };
  // #endregion

  // #region Renderizado
  return (
    <div role="region" aria-roledescription="carrusel" aria-label={label}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className={`sin-barra -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 ${gridClassName}`}
      >
        {items.map((item, index) => (
          <div key={index} className="w-[84%] shrink-0 snap-start sm:w-auto">
            {item}
          </div>
        ))}
      </div>

      {/* Puntos de posición, solo en el móvil. */}
      <div className="mt-4 flex justify-center gap-2 sm:hidden">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ir a la tarjeta ${index + 1} de ${items.length}`}
            aria-current={index === activeIndex}
            className="grid size-6 place-items-center"
          >
            <span className={`block h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-6 bg-acento' : 'w-2 bg-tinta/20'}`} />
          </button>
        ))}
      </div>
    </div>
  );
  // #endregion
};

export default CarouselComponent;
