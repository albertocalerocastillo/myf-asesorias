// Ficha de una receta: ingredientes y pasos.
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Users } from 'lucide-react';
import PhotoPlaceholderComponent from '../../components/ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import TagComponent from '../../components/ui/Tag/TagComponent';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { AppAnchor, AppRoute } from '../../enums/AppRoute';
import { Tone } from '../../enums/Tone';
import { buscarReceta, formatearRaciones } from '../../data/recetas';

const RecipeComponent = () => {
  // #region Declaraciones
  const { slug = '' } = useParams();
  const receta = buscarReceta(slug);
  // #endregion

  // #region Renderizado
  if (!receta) {
    return <NotFoundComponent />;
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link to={`${AppRoute.Nutrition}#${AppAnchor.Recipes}`} className="mb-8 inline-flex items-center gap-2 font-medium text-salvia hover:underline">
        <ArrowLeft className="size-4" /> Todas las recetas
      </Link>
      <div className="mb-4 flex flex-wrap gap-2">
        {receta.etiquetas.map((etiqueta) => (
          <TagComponent key={etiqueta} label={etiqueta} />
        ))}
      </div>
      <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{receta.titulo}</h1>
      <p className="mb-6 text-xl text-gris">{receta.resumen}</p>
      <p className="mb-8 flex gap-6 text-gris">
        <span className="flex items-center gap-2">
          <Clock className="size-5" /> {receta.minutos} min
        </span>
        <span className="flex items-center gap-2">
          <Users className="size-5" /> {formatearRaciones(receta.raciones)}
        </span>
      </p>
      <PhotoPlaceholderComponent label="Foto del plato" tone={Tone.Sage} className="mb-12 aspect-[16/9]" />

      <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Ingredientes</h2>
          <ul className="space-y-2">
            {receta.ingredientes.map((ingrediente) => (
              <li key={ingrediente} className="flex gap-3 border-b border-tinta/5 pb-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-salvia" /> {ingrediente}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold">Preparación</h2>
          <ol className="space-y-5">
            {receta.pasos.map((paso, indice) => (
              <li key={paso} className="flex gap-4">
                <span className="titulo grid size-8 shrink-0 place-items-center rounded-full bg-salvia font-bold text-white">{indice + 1}</span>
                <span className="pt-1 leading-relaxed">{paso}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
  // #endregion
};

export default RecipeComponent;
