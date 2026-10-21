// "Por qué con nosotros": cuatro razones en tarjetas grandes numeradas.
// - Escritorio: la sección se queda fija y las tarjetas pasan en horizontal mientras bajas.
// - Móvil y tablet: carrusel deslizable con el dedo.
import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useSpring, useTransform } from 'motion/react';
import CarouselComponent from '../../ui/Carousel/CarouselComponent';
import EyebrowComponent from '../../ui/Eyebrow/EyebrowComponent';
import SectionComponent from '../../ui/Section/SectionComponent';
import type { VentajaDTO } from '../../../dtos/VentajaDTO';
import { SPRING_SOFT } from '../../../theme/animation';
import { ventajas } from '../../../data/servicio';

const TITLE = (
  <>
    No te lo contamos <em>de oídas</em>
  </>
);
const INTRO = 'Hay muchos planes de dieta y de entreno. Lo que no hay tanto es gente que haya tenido que volver a empezar y sepa acompañarte.';
const CARD_BACKGROUNDS = ['bg-white', 'bg-oliva-claro', 'bg-tierra-claro', 'bg-arena'];
const NUMBER_DIGITS = 2;

const WhyCard = ({ ventaja, index }: { ventaja: VentajaDTO; index: number }) => (
  <article className={`flex h-full flex-col justify-between gap-10 rounded-[2.5rem] p-8 sm:p-10 ${CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}`}>
    <div className="flex items-start justify-between">
      <span className="titulo text-6xl leading-none text-tierra sm:text-7xl">{String(index + 1).padStart(NUMBER_DIGITS, '0')}</span>
      <span className="grid size-14 place-items-center rounded-full bg-crema text-oliva shadow-sm">
        <ventaja.icono className="size-6" aria-hidden="true" />
      </span>
    </div>
    <div>
      <h3 className="mb-3 text-3xl leading-tight sm:text-4xl">{ventaja.titulo}</h3>
      <p className="text-lg leading-relaxed text-gris">{ventaja.texto}</p>
    </div>
  </article>
);

// Versión de escritorio: scroll vertical convertido en desplazamiento horizontal de las tarjetas.
const PinnedCards = () => {
  // #region Declaraciones
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<number>(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, SPRING_SOFT);
  const x = useTransform(progress, [0, 1], [0, -distance]);
  // #endregion

  // #region Efectos
  // Lo que hay que desplazar: el ancho de la fila menos lo que se ve. Se recalcula al cambiar el tamaño.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const measure = (): void => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    measure();

    return () => observer.disconnect();
  }, []);
  // #endregion

  // #region Renderizado
  return (
    <div ref={sectionRef} className="relative hidden h-[300vh] lg:block">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <m.div ref={trackRef} className="flex w-max items-stretch gap-8 pr-[8vw] pl-[max(2rem,calc((100vw-72rem)/2+2rem))]" style={{ x }}>
          <div className="flex w-[30rem] shrink-0 flex-col justify-center pr-8">
            <EyebrowComponent text="Por qué con nosotros" />
            <h2 className="titulo-seccion mb-6 text-6xl leading-[1.05]">{TITLE}</h2>
            <p className="text-xl leading-relaxed text-gris">{INTRO}</p>
          </div>
          {ventajas.map((ventaja, index) => (
            <div key={ventaja.titulo} className="h-[28rem] w-[26rem] shrink-0">
              <WhyCard ventaja={ventaja} index={index} />
            </div>
          ))}
        </m.div>
        {/* Barra de progreso del recorrido horizontal. */}
        <div className="contenedor mt-12">
          <div className="h-px bg-tinta/10">
            <m.div className="h-px origin-left bg-oliva" style={{ scaleX: progress }} />
          </div>
        </div>
      </div>
    </div>
  );
  // #endregion
};

const WhyUsComponent = () => (
  <>
    <PinnedCards />
    <div className="lg:hidden">
      <SectionComponent eyebrow="Por qué con nosotros" title={TITLE} intro={INTRO}>
        <CarouselComponent
          label="Por qué con nosotros"
          gridClassName="sm:grid-cols-2"
          items={ventajas.map((ventaja, index) => (
            <WhyCard key={ventaja.titulo} ventaja={ventaja} index={index} />
          ))}
        />
      </SectionComponent>
    </div>
  </>
);

export default WhyUsComponent;
