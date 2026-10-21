// Una entrada completa del diario de Fran, con lectura cómoda (columna estrecha y letra grande).
import { useParams } from 'react-router-dom';
import BreadcrumbsComponent from '../../components/ui/Breadcrumbs/BreadcrumbsComponent';
import ButtonComponent from '../../components/ui/Button/ButtonComponent';
import CarouselComponent from '../../components/ui/Carousel/CarouselComponent';
import InstagramIconComponent from '../../components/ui/Icons/InstagramIconComponent';
import PhotoComponent from '../../components/ui/Photo/PhotoComponent';
import ShareButtonComponent from '../../components/ui/ShareButton/ShareButtonComponent';
import DiaryCardComponent from '../../components/sections/DiaryCard/DiaryCardComponent';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { Clock } from 'lucide-react';
import { buildDiaryRoute } from '../../enums/AppRoute';
import { Tone } from '../../enums/Tone';
import { buildDiaryBreadcrumbs } from '../../seo/breadcrumbs';
import { photoTransitionName } from '../../theme/animation';
import { fran, obtenerUrlInstagram } from '../../data/equipo';
import { fotoEntradaDiario, fotoPersona } from '../../data/fotos';
import { buscarEntradaDiario, calcularMinutosLectura, entradasDiario, formatearFecha, ordenarPorFecha } from '../../data/diario';

const NUMERO_ENTRADAS_RELACIONADAS = 3;
const HEADER_PHOTO_SIZES = '(min-width: 768px) 720px, 100vw';
const AVATAR_SIZES = '80px';

const DiaryEntryComponent = () => {
  // #region Declaraciones
  const { slug = '' } = useParams();
  const entrada = buscarEntradaDiario(slug);
  const relacionadas = ordenarPorFecha(entradasDiario)
    .filter((otra) => otra.slug !== slug)
    .slice(0, NUMERO_ENTRADAS_RELACIONADAS);
  // #endregion

  // #region Renderizado
  if (!entrada) {
    return <NotFoundComponent />;
  }

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 pt-6 pb-16 sm:px-8 sm:pt-10">
        <BreadcrumbsComponent items={buildDiaryBreadcrumbs(entrada)} />
        <header className="mb-10">
          <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-tierra">
            <time dateTime={entrada.fecha}>{formatearFecha(entrada.fecha)}</time>
            <span aria-hidden="true">·</span>
            <span>por {fran.nombre}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" /> {calcularMinutosLectura(entrada)} min de lectura
            </span>
          </p>
          <h1 className="titulo-grande mb-6 text-5xl leading-[1.02] sm:text-7xl">{entrada.titulo}</h1>
          <p className="mb-6 text-xl leading-relaxed text-gris sm:text-2xl">{entrada.resumen}</p>
          <ShareButtonComponent title={`${entrada.titulo}, del diario de ${fran.nombre}`} path={buildDiaryRoute(entrada.slug)} />
        </header>
        <PhotoComponent
          photo={fotoEntradaDiario(entrada)}
          label={entrada.titulo}
          tone={Tone.Earth}
          sizes={HEADER_PHOTO_SIZES}
          priority
          transitionName={photoTransitionName('diario', entrada.slug)}
          className="mb-14 aspect-[16/10] rounded-t-[999px] rounded-b-[2.5rem] shadow-[0_40px_80px_-30px_rgb(45_48_33/0.45)]"
        />
        <div className="prosa text-lg sm:text-xl">
          {entrada.texto.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </div>

        <aside className="mt-14 flex flex-col gap-5 rounded-3xl bg-tierra-claro p-7 sm:flex-row sm:items-center">
          <PhotoComponent
            photo={fotoPersona(fran)}
            label={fran.nombre}
            tone={Tone.Earth}
            sizes={AVATAR_SIZES}
            compact
            className="size-20 shrink-0 rounded-full bg-white/70"
          />
          <div className="flex-1">
            <p className="titulo text-xl">Escrito por {fran.nombre}</p>
            <p className="text-gris">{fran.frase}</p>
          </div>
          <ButtonComponent href={obtenerUrlInstagram(fran.instagram)} tone={Tone.Earth}>
            <InstagramIconComponent /> Escríbele
          </ButtonComponent>
        </aside>
      </article>

      {relacionadas.length > 0 && (
        <section className="bg-white">
          <div className="contenedor py-16">
            <h2 className="mb-8 text-3xl">Sigue leyendo</h2>
            <CarouselComponent
              label="Más entradas del diario"
              gridClassName="sm:grid-cols-2 lg:grid-cols-3"
              items={relacionadas.map((otra) => (
                <DiaryCardComponent key={otra.slug} entrada={otra} />
              ))}
            />
          </div>
        </section>
      )}
    </>
  );
  // #endregion
};

export default DiaryEntryComponent;
