// Tarjeta de entrada del diario para los listados (diario y portada).
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PhotoPlaceholderComponent from '../../ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import { buildDiaryRoute } from '../../../enums/AppRoute';
import { Tone } from '../../../enums/Tone';
import { formatearFecha } from '../../../data/diario';
import type { IDiaryCardProps } from './IDiaryCardProps';

const DiaryCardComponent = ({ entrada }: IDiaryCardProps) => (
  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-tinta/5 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-noche/10">
    <div className="overflow-hidden">
      <PhotoPlaceholderComponent label="Foto de la entrada" tone={Tone.Night} className="aspect-[4/3] rounded-none transition duration-500 group-hover:scale-105" />
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      <time dateTime={entrada.fecha} className="text-sm font-medium text-noche">
        {formatearFecha(entrada.fecha)}
      </time>
      <h3 className="text-xl font-bold">
        {/* El enlace cubre toda la tarjeta, pero el texto del enlace es solo el título (mejor para lectores de pantalla). */}
        <Link to={buildDiaryRoute(entrada.slug)} className="after:absolute after:inset-0 group-hover:text-noche">
          {entrada.titulo}
        </Link>
      </h3>
      <p className="flex-1 leading-relaxed text-gris">{entrada.resumen}</p>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-noche">
        Leer <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </div>
  </article>
);

export default DiaryCardComponent;
