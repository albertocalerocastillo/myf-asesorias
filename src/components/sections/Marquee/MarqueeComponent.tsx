// Dos cintas de frases cruzadas en diagonal, moviéndose en sentidos opuestos y reaccionando al scroll.
// La de atrás es decorativa (repite las mismas frases) y se oculta a los lectores de pantalla.
import { Fragment } from 'react';
import LeafShapeComponent from '../../ui/Leaf/LeafShapeComponent';
import VelocityTextComponent from '../../ui/VelocityText/VelocityTextComponent';
import { frasesCinta } from '../../../data/servicio';

const SPEED_PERCENT_PER_SECOND = 1.2;
const LEAF_ROTATION = { rotate: '-30deg' };

const renderPhrases = (leafClassName: string) =>
  frasesCinta.map((frase) => (
    <Fragment key={frase}>
      <span className="titulo px-6 text-3xl whitespace-nowrap italic sm:px-10 sm:text-5xl">{frase}</span>
      <LeafShapeComponent className={`size-7 shrink-0 sm:size-9 ${leafClassName}`} style={LEAF_ROTATION} />
    </Fragment>
  ));

const MarqueeComponent = () => (
  <section aria-label="Lo que nos define" className="relative overflow-hidden py-14 sm:py-20">
    <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -mx-4 -translate-y-1/2 rotate-2 bg-arena-oscura py-5 text-tierra sm:py-6">
      <VelocityTextComponent baseSpeed={-SPEED_PERCENT_PER_SECOND}>{renderPhrases('text-oliva/50')}</VelocityTextComponent>
    </div>
    <div className="relative -mx-4 -rotate-2 bg-acento py-5 text-crema shadow-[0_20px_50px_-20px_rgb(45_48_33/0.5)] sm:py-6">
      <VelocityTextComponent baseSpeed={SPEED_PERCENT_PER_SECOND}>{renderPhrases('text-acento-suave')}</VelocityTextComponent>
    </div>
  </section>
);

export default MarqueeComponent;
