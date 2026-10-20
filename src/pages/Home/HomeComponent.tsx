// Portada: quiénes somos, por qué lo hacemos, los dos caminos, cómo trabajamos y lo último publicado.
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import ButtonComponent from '../../components/ui/Button/ButtonComponent';
import HeartIconComponent from '../../components/ui/Icons/HeartIconComponent';
import PhotoPlaceholderComponent from '../../components/ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import RecipeCardComponent from '../../components/sections/RecipeCard/RecipeCardComponent';
import DiaryCardComponent from '../../components/sections/DiaryCard/DiaryCardComponent';
import { AppAnchor, AppRoute } from '../../enums/AppRoute';
import { Tone } from '../../enums/Tone';
import { toneStyles } from '../../theme/toneStyles';
import { marca, personas } from '../../data/equipo';
import { perfilesCliente, pasos } from '../../data/servicio';
import { recetas } from '../../data/recetas';
import { entradasDiario } from '../../data/diario';

const NUMERO_ULTIMAS_PUBLICACIONES = 3;

const HomeComponent = () => (
  <>
    {/* #region Portada */}
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-20">
      <div>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-corazon/10 px-4 py-1.5 text-sm font-semibold text-corazon">
          <HeartIconComponent className="size-4" /> Marta y Fran
        </p>
        <h1 className="mb-6 text-4xl leading-tight font-bold sm:text-6xl">
          Cuidarse no es una moda. <span className="text-corazon">Es lo que nos mantiene aquí.</span>
        </h1>
        <p className="mb-8 max-w-xl text-lg text-gris">
          Somos {marca.nombre}: nutrición y entrenamiento personalizados, de la mano de dos personas operadas de
          corazón que saben, en primera persona, lo que vale cuidarse de verdad.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonComponent to={AppRoute.HowWeWork}>Qué puedes esperar</ButtonComponent>
          <a
            href={`#${AppAnchor.Contact}`}
            className="inline-flex items-center gap-2 rounded-full border border-tinta/20 px-6 py-3 font-semibold hover:border-corazon hover:text-corazon"
          >
            Escríbenos
          </a>
        </div>
      </div>
      <PhotoPlaceholderComponent label="Foto de Marta y Fran juntos" className="aspect-[4/5] md:aspect-square" />
    </section>
    {/* #endregion */}

    {/* #region Nuestra historia. PENDIENTE: texto real a partir de lo que nos cuenten. */}
    <section className="bg-white/60">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <HeartIconComponent className="mx-auto mb-6 size-10 text-corazon" />
        <h2 className="mb-6 text-3xl font-bold sm:text-5xl">Por qué hacemos esto</h2>
        <div className="prosa text-lg text-gris">
          <p>
            Los dos hemos pasado por una operación de corazón. Eso nos cambió la forma de ver la comida, el ejercicio y
            la salud.
          </p>
          <p>
            Marta aprendió la importancia de comer bien. Fran, la de entrenar para mantenerse fuerte. Juntos queremos
            ayudarte a ti a conseguirlo, sin extremos y adaptándonos a tu vida.
          </p>
        </div>
      </div>
    </section>
    {/* #endregion */}

    {/* #region Los dos caminos */}
    <SectionComponent eyebrow="Lo que hacemos" title="Dos caminos, un mismo objetivo">
      <div className="grid gap-6 md:grid-cols-2">
        {personas.map((persona) => (
          <Link
            key={persona.nombre}
            to={persona.ruta}
            className={`group flex flex-col gap-6 rounded-3xl p-8 transition hover:-translate-y-1 ${toneStyles[persona.tono].soft}`}
          >
            <PhotoPlaceholderComponent label={`Foto de ${persona.nombre}`} tone={persona.tono} className="aspect-[3/2] bg-white/50" />
            <div>
              <p className={`mb-1 text-sm font-semibold tracking-widest uppercase ${toneStyles[persona.tono].text}`}>{persona.area}</p>
              <h3 className="mb-3 text-3xl font-bold">con {persona.nombre}</h3>
              <p className="mb-4 text-gris">{persona.frase}</p>
              <span className={`inline-flex items-center gap-2 font-semibold ${toneStyles[persona.tono].text}`}>
                Conoce a {persona.nombre} y su {persona.seccionContenido.toLowerCase()}
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionComponent>
    {/* #endregion */}

    {/* #region Para quién y cómo trabajamos (resumen) */}
    <section className="bg-arena/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Esto es para ti si…</h2>
          <ul className="space-y-4">
            {perfilesCliente.map((perfil) => (
              <li key={perfil} className="flex gap-3 text-lg">
                <Check className="mt-1 size-5 shrink-0 text-corazon" /> {perfil}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Así trabajamos</h2>
          <ol className="mb-8 space-y-4">
            {pasos.map((paso, indice) => (
              <li key={paso.titulo} className="flex gap-4">
                <span className="titulo grid size-9 shrink-0 place-items-center rounded-full bg-corazon font-bold text-white">{indice + 1}</span>
                <span className="pt-1.5 text-lg font-semibold">{paso.titulo}</span>
              </li>
            ))}
          </ol>
          <ButtonComponent to={AppRoute.HowWeWork} tone={Tone.Outline}>
            Ver con detalle <ArrowRight className="size-4" />
          </ButtonComponent>
        </div>
      </div>
    </section>
    {/* #endregion */}

    {/* #region Últimas publicaciones */}
    <SectionComponent eyebrow="De la cocina de Marta" title="Últimas recetas">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recetas.slice(0, NUMERO_ULTIMAS_PUBLICACIONES).map((receta) => (
          <RecipeCardComponent key={receta.slug} receta={receta} />
        ))}
      </div>
    </SectionComponent>

    <SectionComponent eyebrow="El diario de Fran" title="Últimas entradas" className="pt-0 sm:pt-0">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {entradasDiario.slice(0, NUMERO_ULTIMAS_PUBLICACIONES).map((entrada) => (
          <DiaryCardComponent key={entrada.slug} entrada={entrada} />
        ))}
      </div>
    </SectionComponent>
    {/* #endregion */}
  </>
);

export default HomeComponent;
