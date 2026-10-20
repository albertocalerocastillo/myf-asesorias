// Una entrada completa del diario de Fran.
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PhotoPlaceholderComponent from '../../components/ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { AppAnchor, AppRoute } from '../../enums/AppRoute';
import { Tone } from '../../enums/Tone';
import { buscarEntradaDiario, formatearFecha } from '../../data/diario';

const DiaryEntryComponent = () => {
  // #region Declaraciones
  const { slug = '' } = useParams();
  const entrada = buscarEntradaDiario(slug);
  // #endregion

  // #region Renderizado
  if (!entrada) {
    return <NotFoundComponent />;
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link to={`${AppRoute.Training}#${AppAnchor.Diary}`} className="mb-8 inline-flex items-center gap-2 font-medium text-noche hover:underline">
        <ArrowLeft className="size-4" /> Todo el diario
      </Link>
      <p className="mb-3 font-medium text-noche">{formatearFecha(entrada.fecha)}</p>
      <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{entrada.titulo}</h1>
      <p className="mb-10 text-xl text-gris">{entrada.resumen}</p>
      <PhotoPlaceholderComponent label="Foto de la entrada" tone={Tone.Night} className="mb-10 aspect-[16/9]" />
      <div className="prosa text-lg">
        {entrada.texto.map((parrafo) => (
          <p key={parrafo}>{parrafo}</p>
        ))}
      </div>
    </article>
  );
  // #endregion
};

export default DiaryEntryComponent;
