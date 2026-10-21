// "Por qué con nosotros": las cuatro razones que nos diferencian (carrusel en el móvil).
import CarouselComponent from '../../ui/Carousel/CarouselComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import SectionComponent from '../../ui/Section/SectionComponent';
import { ventajas } from '../../../data/servicio';

const REVEAL_STEP_MS = 100;

const WhyUsComponent = () => (
  <SectionComponent
    eyebrow="Por qué con nosotros"
    title="No te lo contamos de oídas"
    intro="Hay muchos planes de dieta y de entreno. Lo que no hay tanto es gente que haya tenido que volver a empezar y sepa acompañarte."
  >
    <CarouselComponent
      label="Por qué con nosotros"
      gridClassName="sm:grid-cols-2 lg:grid-cols-4"
      items={ventajas.map((ventaja, index) => (
        <RevealComponent key={ventaja.titulo} delay={index * REVEAL_STEP_MS} className="h-full">
          <div className="h-full rounded-3xl border border-tinta/5 bg-white p-7 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
            <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-acento-claro text-acento">
              <ventaja.icono className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mb-2 text-xl font-bold">{ventaja.titulo}</h3>
            <p className="leading-relaxed text-gris">{ventaja.texto}</p>
          </div>
        </RevealComponent>
      ))}
    />
  </SectionComponent>
);

export default WhyUsComponent;
