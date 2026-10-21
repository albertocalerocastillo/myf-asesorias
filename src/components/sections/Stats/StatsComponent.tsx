// Banda de cifras en verde oscuro: números grandes que cuentan hacia arriba al aparecer, separados por
// líneas finas, con hojas flotando de fondo.
import LeafComponent from '../../ui/Leaf/LeafComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { useCountUp } from '../../../hooks/useCountUp';
import type { CifraDTO } from '../../../dtos/CifraDTO';
import { cifras } from '../../../data/servicio';

const REVEAL_STEP_MS = 120;

const StatComponent = ({ cifra }: { cifra: CifraDTO }) => {
  const ref = useCountUp<HTMLSpanElement>(cifra.valor);

  return (
    <div className="flex h-full flex-col gap-3 border-l border-crema/15 pl-6 sm:pl-8">
      <p className="titulo text-6xl leading-none text-acento-suave sm:text-7xl lg:text-8xl">
        <span ref={ref}>{cifra.valor}</span>
        <span className="text-4xl sm:text-5xl">{cifra.sufijo}</span>
      </p>
      <p className="max-w-[18ch] text-sm leading-snug text-crema/70 sm:text-base">{cifra.texto}</p>
    </div>
  );
};

const StatsComponent = () => (
  <section aria-label="Algunas cifras" className="relative overflow-hidden bg-acento-oscuro text-crema">
    <LeafComponent className="absolute -top-10 -right-10 size-64 text-crema/5" parallax={80} rotate={200} sway />
    <LeafComponent className="absolute -bottom-16 left-1/3 size-48 text-acento-suave/10" parallax={-60} rotate={20} />
    <div className="contenedor relative grid grid-cols-2 gap-x-4 gap-y-14 py-20 sm:py-28 lg:grid-cols-4">
      {cifras.map((cifra, index) => (
        <RevealComponent key={cifra.texto} delay={index * REVEAL_STEP_MS} className="h-full">
          <StatComponent cifra={cifra} />
        </RevealComponent>
      ))}
    </div>
  </section>
);

export default StatsComponent;
