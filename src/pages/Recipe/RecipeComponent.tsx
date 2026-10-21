// Ficha de una receta: pensada para cocinar con el móvil al lado (ver CookingModeComponent).
import { useParams } from 'react-router-dom';
import { ChefHat, Clock, Users } from 'lucide-react';
import BreadcrumbsComponent from '../../components/ui/Breadcrumbs/BreadcrumbsComponent';
import ButtonComponent from '../../components/ui/Button/ButtonComponent';
import CarouselComponent from '../../components/ui/Carousel/CarouselComponent';
import InstagramIconComponent from '../../components/ui/Icons/InstagramIconComponent';
import PhotoComponent from '../../components/ui/Photo/PhotoComponent';
import ShareButtonComponent from '../../components/ui/ShareButton/ShareButtonComponent';
import TagComponent from '../../components/ui/Tag/TagComponent';
import CookingModeComponent from '../../components/sections/CookingMode/CookingModeComponent';
import RecipeCardComponent from '../../components/sections/RecipeCard/RecipeCardComponent';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { buildRecipeRoute } from '../../enums/AppRoute';
import { Tone } from '../../enums/Tone';
import { buildRecipeBreadcrumbs } from '../../seo/breadcrumbs';
import { photoTransitionName } from '../../theme/animation';
import { marta, obtenerUrlInstagram } from '../../data/equipo';
import { fotoReceta } from '../../data/fotos';
import { buscarReceta, formatearRaciones, recetas } from '../../data/recetas';

const NUMERO_RECETAS_RELACIONADAS = 3;
const HEADER_PHOTO_SIZES = '(min-width: 768px) 480px, 100vw';

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
      <article className="mx-auto max-w-5xl px-5 pt-6 pb-16 sm:px-8 sm:pt-10">
        <BreadcrumbsComponent items={buildRecipeBreadcrumbs(receta)} />

        <header className="mb-12 grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {receta.etiquetas.map((etiqueta) => (
                <TagComponent key={etiqueta} label={etiqueta} />
              ))}
            </div>
            <h1 className="titulo-grande mb-5 text-5xl leading-[1.02] sm:text-6xl">{receta.titulo}</h1>
            <p className="mb-8 text-xl leading-relaxed text-gris">{receta.resumen}</p>
            <dl className="mb-6 grid grid-cols-3 gap-3 text-center">
              {[
                { icono: Clock, valor: `${receta.minutos} min`, etiqueta: 'Tiempo' },
                { icono: Users, valor: formatearRaciones(receta.raciones), etiqueta: 'Raciones' },
                { icono: ChefHat, valor: marta.nombre, etiqueta: 'Receta de' }
              ].map((dato) => (
                <div key={dato.etiqueta} className="rounded-2xl bg-oliva-claro px-2 py-4">
                  <dato.icono className="mx-auto mb-1.5 size-5 text-oliva" aria-hidden="true" />
                  <dt className="sr-only">{dato.etiqueta}</dt>
                  <dd className="font-semibold">{dato.valor}</dd>
                </div>
              ))}
            </dl>
            <ShareButtonComponent title={`${receta.titulo}, receta de ${marta.nombre}`} path={buildRecipeRoute(receta.slug)} />
          </div>
          <PhotoComponent
            photo={fotoReceta(receta)}
            label={receta.titulo}
            tone={Tone.Olive}
            sizes={HEADER_PHOTO_SIZES}
            priority
            transitionName={photoTransitionName('receta', receta.slug)}
            className="aspect-[4/5] rounded-t-full rounded-b-[2.5rem] shadow-[0_40px_80px_-30px_rgb(45_48_33/0.45)]"
          />
        </header>

        <CookingModeComponent receta={receta} />

        <div className="mt-14 flex flex-col gap-4 rounded-3xl bg-oliva-claro p-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">¿Quieres un plan de comidas hecho para ti?</p>
          <ButtonComponent href={obtenerUrlInstagram(marta.instagram)} tone={Tone.Olive}>
            <InstagramIconComponent /> Escribe a Marta
          </ButtonComponent>
        </div>
      </article>

      {relacionadas.length > 0 && (
        <section className="bg-white">
          <div className="contenedor py-16">
            <h2 className="mb-8 text-3xl">Más recetas</h2>
            <CarouselComponent
              label="Más recetas"
              gridClassName="sm:grid-cols-2 lg:grid-cols-3"
              items={relacionadas.map((otra) => (
                <RecipeCardComponent key={otra.slug} receta={otra} />
              ))}
            />
          </div>
        </section>
      )}
    </>
  );
  // #endregion
};

export default RecipeComponent;
