// Una entrada completa del diario de Fran, con lectura cómoda (columna estrecha y letra grande).
import { useParams } from 'react-router-dom';
import BreadcrumbsComponent from '../../components/ui/Breadcrumbs/BreadcrumbsComponent';
import ButtonComponent from '../../components/ui/Button/ButtonComponent';
import InstagramIconComponent from '../../components/ui/Icons/InstagramIconComponent';
import PhotoPlaceholderComponent from '../../components/ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import DiaryCardComponent from '../../components/sections/DiaryCard/DiaryCardComponent';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { Tone } from '../../enums/Tone';
import { buildDiaryBreadcrumbs } from '../../seo/breadcrumbs';
import { fran, obtenerUrlInstagram } from '../../data/equipo';
import { buscarEntradaDiario, entradasDiario, formatearFecha, ordenarPorFecha } from '../../data/diario';

const NUMERO_ENTRADAS_RELACIONADAS = 3;

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
      <article className="mx-auto max-w-3xl px-4 pt-6 pb-16 sm:px-6 sm:pt-10">
        <BreadcrumbsComponent items={buildDiaryBreadcrumbs(entrada)} />
        <header className="mb-10">
          <p className="mb-4 text-sm font-medium text-noche">
            <time dateTime={entrada.fecha}>{formatearFecha(entrada.fecha)}</time> · por {fran.nombre}
          </p>
          <h1 className="mb-6 text-4xl leading-tight font-bold sm:text-6xl">{entrada.titulo}</h1>
          <p className="text-xl leading-relaxed text-gris sm:text-2xl">{entrada.resumen}</p>
        </header>
        <PhotoPlaceholderComponent label="Foto de la entrada" tone={Tone.Night} className="mb-12 aspect-[16/9] rounded-[2rem]" />
        <div className="prosa text-lg sm:text-xl">
          {entrada.texto.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </div>

        <aside className="mt-14 flex flex-col gap-5 rounded-3xl bg-noche-claro p-7 sm:flex-row sm:items-center">
          <PhotoPlaceholderComponent label={fran.nombre} tone={Tone.Night} className="size-20 shrink-0 rounded-full bg-white/70" />
          <div className="flex-1">
            <p className="titulo text-xl font-bold">Escrito por {fran.nombre}</p>
            <p className="text-gris">{fran.frase}</p>
          </div>
          <ButtonComponent href={obtenerUrlInstagram(fran.instagram)} tone={Tone.Night}>
            <InstagramIconComponent /> Escríbele
          </ButtonComponent>
        </aside>
      </article>

      {relacionadas.length > 0 && (
        <section className="bg-white">
          <div className="contenedor py-16">
            <h2 className="mb-8 text-3xl font-bold">Sigue leyendo</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((otra) => (
                <DiaryCardComponent key={otra.slug} entrada={otra} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
  // #endregion
};

export default DiaryEntryComponent;
