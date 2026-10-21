// Preguntas frecuentes en acordeón. Usa <details>, así funciona sin JavaScript y es accesible de serie.
import { Plus } from 'lucide-react';
import { preguntasFrecuentes } from '../../../data/servicio';

const FaqComponent = () => (
  <div className="divide-y divide-tinta/10 rounded-3xl border border-tinta/10 bg-white">
    {preguntasFrecuentes.map((item) => (
      <details key={item.pregunta} className="group px-6 sm:px-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
          {item.pregunta}
          <Plus className="size-5 shrink-0 text-acento transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
        </summary>
        <p className="-mt-2 pb-6 leading-relaxed text-gris">{item.respuesta}</p>
      </details>
    ))}
  </div>
);

export default FaqComponent;
