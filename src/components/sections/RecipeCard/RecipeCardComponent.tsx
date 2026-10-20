// Tarjeta de receta para los listados (recetario y portada).
// Al pulsarla, la foto "vuela" hasta la cabecera de la receta (View Transitions).
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users } from 'lucide-react';
import PhotoComponent from '../../ui/Photo/PhotoComponent';
import TagComponent from '../../ui/Tag/TagComponent';
import { buildRecipeRoute } from '../../../enums/AppRoute';
import { Tone } from '../../../enums/Tone';
import { useViewTransitionLink } from '../../../hooks/useViewTransitionLink';
import { photoTransitionName } from '../../../theme/animation';
import { fotoReceta } from '../../../data/fotos';
import { formatearRaciones } from '../../../data/recetas';
import type { IRecipeCardProps } from './IRecipeCardProps';

const CARD_PHOTO_SIZES = '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw';

const RecipeCardComponent = ({ receta }: IRecipeCardProps) => {
  // #region Declaraciones
  const route = buildRecipeRoute(receta.slug);
  const handleClick = useViewTransitionLink(route);
  // #endregion

  // #region Renderizado
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-tinta/5 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-salvia/10">
      <div className="relative overflow-hidden">
        <PhotoComponent
          photo={fotoReceta(receta)}
          label={receta.titulo}
          tone={Tone.Sage}
          sizes={CARD_PHOTO_SIZES}
          transitionName={photoTransitionName('receta', receta.slug)}
          className="aspect-[4/3] rounded-none transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-tinta backdrop-blur">
          <Clock className="size-4 text-salvia" aria-hidden="true" /> {receta.minutos} min
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {receta.etiquetas.map((etiqueta) => (
            <TagComponent key={etiqueta} label={etiqueta} />
          ))}
        </div>
        <h3 className="text-xl font-bold">
          {/* El enlace cubre toda la tarjeta, pero el texto del enlace es solo el título (mejor para lectores de pantalla). */}
          <Link to={route} onClick={handleClick} className="after:absolute after:inset-0 group-hover:text-salvia">
            {receta.titulo}
          </Link>
        </h3>
        <p className="flex-1 leading-relaxed text-gris">{receta.resumen}</p>
        <p className="flex items-center justify-between text-sm text-gris">
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4" aria-hidden="true" /> {formatearRaciones(receta.raciones)}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-salvia">
            Ver receta <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </p>
      </div>
    </article>
  );
  // #endregion
};

export default RecipeCardComponent;
