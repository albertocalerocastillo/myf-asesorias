// Tarjeta de entrada del diario para los listados (diario y portada).
// Al pulsarla, la foto "vuela" hasta la cabecera de la entrada (View Transitions).
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import PhotoComponent from '../../ui/Photo/PhotoComponent';
import { buildDiaryRoute } from '../../../enums/AppRoute';
import { Tone } from '../../../enums/Tone';
import { useViewTransitionLink } from '../../../hooks/useViewTransitionLink';
import { photoTransitionName } from '../../../theme/animation';
import { fotoEntradaDiario } from '../../../data/fotos';
import { calcularMinutosLectura, formatearFecha } from '../../../data/diario';
import type { IDiaryCardProps } from './IDiaryCardProps';

const CARD_PHOTO_SIZES = '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw';

const DiaryCardComponent = ({ entrada }: IDiaryCardProps) => {
  // #region Declaraciones
  const route = buildDiaryRoute(entrada.slug);
  const handleClick = useViewTransitionLink(route);
  // #endregion

  // #region Renderizado
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-tinta/5 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-noche/10">
      <div className="overflow-hidden">
        <PhotoComponent
          photo={fotoEntradaDiario(entrada)}
          label={entrada.titulo}
          tone={Tone.Night}
          sizes={CARD_PHOTO_SIZES}
          transitionName={photoTransitionName('diario', entrada.slug)}
          className="aspect-[4/3] rounded-none transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="flex items-center gap-3 text-sm font-medium text-noche">
          <time dateTime={entrada.fecha}>{formatearFecha(entrada.fecha)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" /> {calcularMinutosLectura(entrada)} min
          </span>
        </p>
        <h3 className="text-xl font-bold">
          {/* El enlace cubre toda la tarjeta, pero el texto del enlace es solo el título (mejor para lectores de pantalla). */}
          <Link to={route} onClick={handleClick} className="after:absolute after:inset-0 group-hover:text-noche">
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
  // #endregion
};

export default DiaryCardComponent;
