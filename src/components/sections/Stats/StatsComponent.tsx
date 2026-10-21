// Banda de cifras que cuentan hacia arriba al aparecer.
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { useCountUp } from '../../../hooks/useCountUp';
import type { CifraDTO } from '../../../dtos/CifraDTO';
import { cifras } from '../../../data/servicio';

const REVEAL_STEP_MS = 100;

const StatComponent = ({ cifra }: { cifra: CifraDTO }) => {
  const ref = useCountUp<HTMLSpanElement>(cifra.valor);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="titulo text-6xl font-bold text-acento-suave sm:text-7xl">
        <span ref={ref}>{cifra.valor}</span>
        {cifra.sufijo}
      </p>
      <p className="max-w-[16ch] text-sm leading-snug text-crema/70 sm:text-base">{cifra.texto}</p>
    </div>
  );
};

const StatsComponent = () => (
  <section aria-label="Algunas cifras" className="bg-tinta text-crema">
    <div className="contenedor grid grid-cols-2 gap-x-6 gap-y-12 py-16 sm:py-20 lg:grid-cols-4">
      {cifras.map((cifra, index) => (
        <RevealComponent key={cifra.texto} delay={index * REVEAL_STEP_MS}>
          <StatComponent cifra={cifra} />
        </RevealComponent>
      ))}
    </div>
  </section>
);

export default StatsComponent;
