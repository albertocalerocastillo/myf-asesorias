// Portada. Orden pensado para convencer: quiénes somos → por qué nosotros → qué ofrecemos →
// cómo funciona → muestra de contenido → contacto (al final de todas las páginas).
import { Link } from 'react-router-dom';
import { ArrowRight, Check, HeartPulse, MessageCircleHeart, Smartphone } from 'lucide-react';
import ButtonComponent from '../../components/ui/Button/ButtonComponent';
import HeartbeatComponent from '../../components/ui/Heartbeat/HeartbeatComponent';
import HeartIconComponent from '../../components/ui/Icons/HeartIconComponent';
import PhotoPlaceholderComponent from '../../components/ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import RevealComponent from '../../components/ui/Reveal/RevealComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import RecipeCardComponent from '../../components/sections/RecipeCard/RecipeCardComponent';
import DiaryCardComponent from '../../components/sections/DiaryCard/DiaryCardComponent';
import StepsComponent from '../../components/sections/Steps/StepsComponent';
import WhyUsComponent from '../../components/sections/WhyUs/WhyUsComponent';
import { AppAnchor, AppRoute } from '../../enums/AppRoute';
import { Tone } from '../../enums/Tone';
import { toneStyles } from '../../theme/toneStyles';
import { fran, marta, personas } from '../../data/equipo';
import { perfilesCliente } from '../../data/servicio';
import { recetas } from '../../data/recetas';
import { entradasDiario, ordenarPorFecha } from '../../data/diario';

const NUMERO_ULTIMAS_PUBLICACIONES = 3;
const REVEAL_STEP_MS = 120;

const PUNTOS_CONFIANZA = [
  { icono: HeartPulse, texto: 'Lo hemos vivido' },
  { icono: Smartphone, texto: '100 % online, en la app Jarvis' },
  { icono: MessageCircleHeart, texto: 'Hablas directamente con nosotros' }
];

const HomeComponent = () => (
  <>
    {/* #region Portada */}
    <section className="fondo-calido relative -mt-18 overflow-hidden pt-18">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-20 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pt-16 md:pb-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-corazon shadow-sm">
            <HeartIconComponent className="size-4 animate-latido" /> Nutrición y entrenamiento online
          </p>
          <h1 className="mb-6 text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-7xl">
            Cuidarte, contado por quien <span className="text-corazon italic">volvió a empezar</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-gris sm:text-xl">
            Somos Marta y Fran. Los dos pasamos por una operación de corazón y hoy te ayudamos a comer mejor y a entrenar
            con cabeza, con un plan hecho para ti y trato directo con nosotros.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`#${AppAnchor.Contact}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-corazon px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-corazon/25 transition hover:bg-corazon-oscuro"
            >
              Cuéntanos tu caso <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <ButtonComponent to={AppRoute.HowWeWork} tone={Tone.Outline} className="py-4 text-lg">
              Cómo funciona
            </ButtonComponent>
          </div>
        </div>

        {/* Las dos fotos superpuestas: cada una lleva a su página. */}
        <div className="relative mx-auto mb-10 w-full max-w-md md:mb-0 md:max-w-none">
          <Link to={marta.ruta} className="group relative block w-[72%] -rotate-3 transition hover:rotate-0" aria-label="Conoce a Marta">
            <PhotoPlaceholderComponent label="Foto de Marta" tone={Tone.Sage} className="aspect-[4/5] rounded-[2rem] shadow-2xl ring-8 ring-white" />
            <span className="absolute top-6 left-3 rounded-full bg-salvia sm:-left-3 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">Marta · Nutrición</span>
          </Link>
          <Link to={fran.ruta} className="group absolute right-0 bottom-[-8%] block w-[58%] rotate-3 transition hover:rotate-0" aria-label="Conoce a Fran">
            <PhotoPlaceholderComponent label="Foto de Fran" tone={Tone.Night} className="aspect-[4/5] rounded-[2rem] shadow-2xl ring-8 ring-white" />
            <span className="absolute right-3 bottom-8 rounded-full bg-noche sm:-right-2 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">Fran · Entreno</span>
          </Link>
        </div>
      </div>

      <HeartbeatComponent animated className="pointer-events-none absolute inset-x-0 bottom-20 hidden h-16 w-full text-corazon/30 md:block" />

      {/* Franja de confianza. */}
      <div className="relative border-y border-tinta/5 bg-white/70 backdrop-blur">
        <ul className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:justify-between sm:px-6">
          {PUNTOS_CONFIANZA.map((punto) => (
            <li key={punto.texto} className="flex items-center gap-3 font-medium">
              <punto.icono className="size-5 text-corazon" aria-hidden="true" /> {punto.texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
    {/* #endregion */}

    {/* #region Nuestra historia. PENDIENTE: texto real a partir de lo que nos cuenten. */}
    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <RevealComponent>
        <p className="mb-4 text-sm font-semibold tracking-widest text-corazon uppercase">Nuestra historia</p>
        <h2 className="mb-8 text-4xl font-bold sm:text-5xl">Dos corazones operados. Dos formas de cuidarlo.</h2>
        <div className="prosa mx-auto max-w-2xl text-lg text-gris sm:text-xl">
          <p>
            Pasar por quirófano te cambia la forma de ver la comida, el ejercicio y la salud. A Marta le enseñó lo
            importante que es comer bien. A Fran, lo que vale entrenar para mantenerse fuerte.
          </p>
          <p>
            De ahí nace <strong className="font-semibold text-tinta">M y F Asesorías</strong>: para ayudarte a ti a
            conseguirlo, sin extremos y adaptándonos a tu vida.
          </p>
        </div>
      </RevealComponent>
    </section>
    {/* #endregion */}

    {/* #region Los dos caminos */}
    <section className="bg-white">
      <SectionComponent eyebrow="Lo que hacemos" title="Elige por dónde empezar" intro="Por separado funcionan. Juntos, mucho mejor.">
        <div className="grid gap-6 md:grid-cols-2">
          {personas.map((persona, index) => (
            <RevealComponent key={persona.nombre} delay={index * REVEAL_STEP_MS} className="h-full">
              <Link
                to={persona.ruta}
                className={`group flex h-full flex-col gap-6 rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${toneStyles[persona.tono].soft}`}
              >
                <div className="overflow-hidden rounded-3xl">
                  <PhotoPlaceholderComponent
                    label={`Foto de ${persona.nombre}`}
                    tone={persona.tono}
                    className="aspect-[3/2] bg-white/60 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className={`mb-1 text-sm font-semibold tracking-widest uppercase ${toneStyles[persona.tono].text}`}>{persona.area}</p>
                  <h3 className="mb-3 text-3xl font-bold">con {persona.nombre}</h3>
                  <ul className="mb-6 flex-1 space-y-2">
                    {persona.enfoque.slice(0, 3).map((punto) => (
                      <li key={punto} className="flex gap-2.5 text-gris">
                        <Check className={`mt-1 size-4 shrink-0 ${toneStyles[persona.tono].text}`} aria-hidden="true" /> {punto}
                      </li>
                    ))}
                  </ul>
                  <span className={`inline-flex items-center gap-2 self-start rounded-full px-5 py-3 font-semibold ${toneStyles[persona.tono].solid}`}>
                    Conoce a {persona.nombre} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </RevealComponent>
          ))}
        </div>
      </SectionComponent>
    </section>
    {/* #endregion */}

    <WhyUsComponent />

    {/* #region Para quién y cómo funciona */}
    <section className="bg-arena/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mb-16 grid gap-10 md:grid-cols-2 md:items-end">
          <RevealComponent>
            <p className="mb-3 text-sm font-semibold tracking-widest text-corazon uppercase">Cómo funciona</p>
            <h2 className="text-4xl font-bold sm:text-5xl">Empezar es más sencillo de lo que crees</h2>
          </RevealComponent>
          <RevealComponent delay={REVEAL_STEP_MS}>
            <p className="mb-4 font-semibold">Esto es para ti si…</p>
            <ul className="space-y-2.5">
              {perfilesCliente.map((perfil) => (
                <li key={perfil} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-corazon" aria-hidden="true" /> {perfil}
                </li>
              ))}
            </ul>
          </RevealComponent>
        </div>
        <StepsComponent />
        <div className="mt-14 text-center">
          <ButtonComponent to={AppRoute.HowWeWork} tone={Tone.Outline}>
            Todo lo que incluye <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonComponent>
        </div>
      </div>
    </section>
    {/* #endregion */}

    {/* #region Últimas publicaciones */}
    <SectionComponent
      eyebrow="De la cocina de Marta"
      title="Recetas para cuidarte"
      intro="Recetas saludables y sencillas, con comida real, para cuidar tu corazón sin pasar hambre."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recetas.slice(0, NUMERO_ULTIMAS_PUBLICACIONES).map((receta, index) => (
          <RevealComponent key={receta.slug} delay={index * REVEAL_STEP_MS} className="h-full">
            <RecipeCardComponent receta={receta} />
          </RevealComponent>
        ))}
      </div>
      <Link to={`${AppRoute.Nutrition}#${AppAnchor.Recipes}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-salvia hover:underline">
        Ver todas las recetas <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </SectionComponent>

    <SectionComponent
      eyebrow="El diario de Fran"
      title="Entrenar, de verdad"
      intro="Cómo entrena Fran, qué le funciona y lo que ha aprendido desde su operación."
      className="pt-0 sm:pt-0"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordenarPorFecha(entradasDiario)
          .slice(0, NUMERO_ULTIMAS_PUBLICACIONES)
          .map((entrada, index) => (
            <RevealComponent key={entrada.slug} delay={index * REVEAL_STEP_MS} className="h-full">
              <DiaryCardComponent entrada={entrada} />
            </RevealComponent>
          ))}
      </div>
      <Link to={`${AppRoute.Training}#${AppAnchor.Diary}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-noche hover:underline">
        Ver todo el diario <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </SectionComponent>
    {/* #endregion */}
  </>
);

export default HomeComponent;
