// Los pasos de la asesoría como línea de tiempo: vertical en el móvil, horizontal en escritorio.
// La línea coral se dibuja a medida que bajas (".linea-pasos" en theme.css).
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { pasos } from '../../../data/servicio';

const REVEAL_STEP_MS = 120;
const LINE_POSITION = 'absolute top-6 bottom-6 left-6 w-0.5 lg:top-6 lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-0.5 lg:w-auto';

const StepsComponent = () => (
  <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
    {/* Línea de fondo y, encima, la que se va dibujando. */}
    <span aria-hidden="true" className={`${LINE_POSITION} rounded-full bg-corazon/15`} />
    <span aria-hidden="true" className={`${LINE_POSITION} linea-pasos rounded-full bg-corazon`} />
    {pasos.map((paso, index) => (
      <li key={paso.titulo} className="relative">
        <RevealComponent delay={index * REVEAL_STEP_MS} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
          <span className="titulo relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-corazon text-lg font-bold text-white shadow-lg shadow-corazon/30 ring-8 ring-crema">
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
