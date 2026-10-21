// Preguntas frecuentes en acordeón. Usa <details>, así funciona sin JavaScript y es accesible de serie.
// En navegadores modernos la respuesta se despliega con una animación suave (ver theme.css).
import { Plus } from 'lucide-react';
import { preguntasFrecuentes } from '../../../data/servicio';

const FaqComponent = () => (
  <div className="border-t border-tinta/10">
    {preguntasFrecuentes.map((item) => (
      <details key={item.pregunta} className="group border-b border-tinta/10">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
          <span className="titulo text-xl leading-snug transition-colors group-hover:text-oliva sm:text-2xl">{item.pregunta}</span>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-tinta/15 transition-all duration-500 group-open:rotate-45 group-open:border-oliva group-open:bg-oliva group-open:text-white">
            <Plus className="size-5" aria-hidden="true" />
          </span>
        </summary>
        <p className="max-w-2xl pb-8 text-lg leading-relaxed text-gris">{item.respuesta}</p>
      </details>
    ))}
  </div>
);

export default FaqComponent;
