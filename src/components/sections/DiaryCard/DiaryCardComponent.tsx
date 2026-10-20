// Tarjeta de entrada del diario para los listados (diario y portada).
import { Link } from 'react-router-dom';
import PhotoPlaceholderComponent from '../../ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import { buildDiaryRoute } from '../../../enums/AppRoute';
import { Tone } from '../../../enums/Tone';
import { formatearFecha } from '../../../data/diario';
import type { IDiaryCardProps } from './IDiaryCardProps';

const DiaryCardComponent = ({ entrada }: IDiaryCardProps) => (
  <Link
    to={buildDiaryRoute(entrada.slug)}
    className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <PhotoPlaceholderComponent label="Foto de la entrada" tone={Tone.Night} className="aspect-[4/3] rounded-none" />
    <div className="flex flex-1 flex-col gap-3 p-6">
      <p className="text-sm font-medium text-noche">{formatearFecha(entrada.fecha)}</p>
      <h3 className="text-xl font-bold group-hover:text-noche">{entrada.titulo}</h3>
      <p className="text-gris">{entrada.resumen}</p>
    </div>
  </Link>
);

export default DiaryCardComponent;
