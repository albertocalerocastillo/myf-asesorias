// Los pasos de la asesoría como línea de tiempo: vertical en el móvil, horizontal en escritorio.
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { pasos } from '../../../data/servicio';

const REVEAL_STEP_MS = 120;

const StepsComponent = () => (
  <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
    {/* Línea que une los pasos. */}
    <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px bg-corazon/25 md:top-6 md:right-[12.5%] md:bottom-auto md:left-[12.5%] md:h-px md:w-auto" />
    {pasos.map((paso, index) => (
      <li key={paso.titulo} className="relative">
        <RevealComponent delay={index * REVEAL_STEP_MS} className="flex gap-5 md:flex-col md:items-center md:text-center">
          <span className="titulo relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-corazon text-lg font-bold text-white ring-8 ring-crema">
            {index + 1}
          </span>
          <div>
            <h3 className="mb-1.5 text-xl font-bold">{paso.titulo}</h3>
            <p className="leading-relaxed text-gris">{paso.texto}</p>
          </div>
        </RevealComponent>
      </li>
    ))}
  </ol>
);

export default StepsComponent;
