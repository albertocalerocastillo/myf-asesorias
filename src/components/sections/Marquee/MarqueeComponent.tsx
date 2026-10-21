// Cinta de frases que se desliza sin fin. El contenido va dos veces para que el bucle no tenga salto;
// la segunda copia se oculta a los lectores de pantalla.
import HeartIconComponent from '../../ui/Icons/HeartIconComponent';
import { frasesCinta } from '../../../data/servicio';

const COPIES = [false, true];

const MarqueeComponent = () => (
  <div className="cinta-contenedor overflow-hidden border-y border-tinta/10 bg-acento py-5 text-white sm:py-6">
    <div className="cinta">
      {COPIES.map((isCopy) => (
        <ul key={`${isCopy}`} aria-hidden={isCopy} className="flex shrink-0 items-center">
          {frasesCinta.map((frase) => (
            <li key={frase} className="flex items-center">
              <span className="titulo px-6 text-2xl font-semibold whitespace-nowrap italic sm:px-8 sm:text-4xl">{frase}</span>
              <HeartIconComponent className="size-5 shrink-0 text-white/60 sm:size-6" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default MarqueeComponent;
