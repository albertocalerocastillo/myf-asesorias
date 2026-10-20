// Ficha de una receta: pensada para cocinar con el móvil al lado (ingredientes a mano y pasos grandes).
import { useParams } from 'react-router-dom';
import { ChefHat, Clock, Users } from 'lucide-react';
import BreadcrumbsComponent from '../../components/ui/Breadcrumbs/BreadcrumbsComponent';
import ButtonComponent from '../../components/ui/Button/ButtonComponent';
import InstagramIconComponent from '../../components/ui/Icons/InstagramIconComponent';
import PhotoPlaceholderComponent from '../../components/ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import TagComponent from '../../components/ui/Tag/TagComponent';
import RecipeCardComponent from '../../components/sections/RecipeCard/RecipeCardComponent';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { Tone } from '../../enums/Tone';
import { buildRecipeBreadcrumbs } from '../../seo/breadcrumbs';
import { marta, obtenerUrlInstagram } from '../../data/equipo';
import { buscarReceta, formatearRaciones, recetas } from '../../data/recetas';

const NUMERO_RECETAS_RELACIONADAS = 3;

const RecipeComponent = () => {
  // #region Declaraciones
  const { slug = '' } = useParams();
  const receta = buscarReceta(slug);
  const relacionadas = recetas.filter((otra) => otra.slug !== slug).slice(0, NUMERO_RECETAS_RELACIONADAS);
  // #endregion

  // #region Renderizado
  if (!receta) {
    return <NotFoundComponent />;
  }

  return (
    <>
      <article className="mx-auto max-w-5xl px-4 pt-6 pb-16 sm:px-6 sm:pt-10">
        <BreadcrumbsComponent items={buildRecipeBreadcrumbs(receta)} />

        <header className="mb-10 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {receta.etiquetas.map((etiqueta) => (
                <TagComponent key={etiqueta} label={etiqueta} />
              ))}
            </div>
            <h1 className="mb-4 text-4xl leading-tight font-bold sm:text-5xl">{receta.titulo}</h1>
            <p className="mb-8 text-xl leading-relaxed text-gris">{receta.resumen}</p>
            <dl className="grid grid-cols-3 gap-3 text-center">
              {[
                { icono: Clock, valor: `${receta.minutos} min`, etiqueta: 'Tiempo' },
                { icono: Users, valor: formatearRaciones(receta.raciones), etiqueta: 'Raciones' },
                { icono: ChefHat, valor: marta.nombre, etiqueta: 'Receta de' }
              ].map((dato) => (
                <div key={dato.etiqueta} className="rounded-2xl bg-salvia-claro px-2 py-4">
                  <dato.icono className="mx-auto mb-1.5 size-5 text-salvia" aria-hidden="true" />
                  <dt className="sr-only">{dato.etiqueta}</dt>
                  <dd className="font-semibold">{dato.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
          <PhotoPlaceholderComponent label="Foto del plato" tone={Tone.Sage} className="aspect-square rounded-[2rem]" />
        </header>

        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-14">
          {/* En escritorio, los ingredientes se quedan fijos mientras lees los pasos. */}
          <aside className="md:sticky md:top-24 md:self-start">
            <div className="rounded-3xl border border-tinta/10 bg-white p-7">
              <h2 className="mb-5 text-2xl font-bold">Ingredientes</h2>
              <ul className="space-y-3">
                {receta.ingredientes.map((ingrediente) => (
                  <li key={ingrediente} className="flex gap-3 border-b border-tinta/5 pb-3 last:border-0 last:pb-0">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-salvia" aria-hidden="true" /> {ingrediente}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section>
            <h2 className="mb-6 text-2xl font-bold">Preparación</h2>
            <ol className="space-y-6">
              {receta.pasos.map((paso, index) => (
                <li key={paso} className="flex gap-5">
                  <span className="titulo grid size-10 shrink-0 place-items-center rounded-full bg-salvia text-lg font-bold text-white">{index + 1}</span>
                  <p className="pt-1.5 text-lg leading-relaxed">{paso}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-col gap-4 rounded-3xl bg-salvia-claro p-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium">¿Quieres un plan de comidas hecho para ti?</p>
              <ButtonComponent href={obtenerUrlInstagram(marta.instagram)} tone={Tone.Sage}>
                <InstagramIconComponent /> Escribe a Marta
              </ButtonComponent>
            </div>
          </section>
        </div>
      </article>

      {relacionadas.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold">Más recetas</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((otra) => (
                <RecipeCardComponent key={otra.slug} receta={otra} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
  // #endregion
};

export default RecipeComponent;
