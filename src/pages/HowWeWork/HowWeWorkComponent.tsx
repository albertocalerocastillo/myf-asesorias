// "Qué puedes esperar": todo lo que incluye la asesoría, sin precios (las tarifas se dan en privado).
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import FaqComponent from '../../components/sections/Faq/FaqComponent';
import JarvisPhoneComponent from '../../components/sections/JarvisPhone/JarvisPhoneComponent';
import QuizComponent from '../../components/sections/Quiz/QuizComponent';
import StepsComponent from '../../components/sections/Steps/StepsComponent';
import EyebrowComponent from '../../components/ui/Eyebrow/EyebrowComponent';
import LeafComponent from '../../components/ui/Leaf/LeafComponent';
import RevealComponent from '../../components/ui/Reveal/RevealComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import { AppAnchor } from '../../enums/AppRoute';
import { toneStyles } from '../../theme/toneStyles';
import { personas } from '../../data/equipo';

const REVEAL_STEP_MS = 120;

// PENDIENTE: confirmar qué incluye exactamente su uso de Jarvis.
const JARVIS_INCLUYE = ['Tu plan de comidas', 'Tus rutinas con vídeos', 'Tu progreso semana a semana', 'Chat directo con nosotros'];

const HowWeWorkComponent = () => (
  <>
    {/* #region Pasos */}
    <SectionComponent
      eyebrow="Qué puedes esperar"
      title={
        <>
          Así trabajamos <em>contigo</em>
        </>
      }
      isPageTitle
      intro="Sin letra pequeña ni sorpresas: esto es lo que vas a encontrar desde el primer mensaje."
    >
      <StepsComponent headingLevel="h2" />
    </SectionComponent>
    {/* #endregion */}

    {/* #region Qué incluye cada área */}
    <section className="bg-arena">
      <div className="contenedor py-24 sm:py-32">
        <RevealComponent className="mb-14 max-w-3xl">
          <EyebrowComponent text="Las dos partes" />
          <h2 className="titulo-seccion text-4xl leading-[1.05] sm:text-5xl">
            Qué incluye <em>cada parte</em>
          </h2>
        </RevealComponent>
        <div className="grid gap-6 md:grid-cols-2">
          {personas.map((persona, index) => (
            <RevealComponent key={persona.nombre} delay={index * REVEAL_STEP_MS} className="h-full">
              <Link to={persona.ruta} className="group al-tocar flex h-full flex-col rounded-[2.5rem] bg-crema p-6 transition-shadow duration-500 hover:shadow-2xl sm:p-10">
                <p className={`mb-2 text-xs font-medium tracking-[0.28em] uppercase ${toneStyles[persona.tono].text}`}>con {persona.nombre}</p>
                <h3 className="mb-8 text-3xl sm:text-4xl">{persona.area}</h3>
                <ul className="mb-10 flex-1 space-y-4">
                  {persona.enfoque.map((punto) => (
                    <li key={punto} className="flex gap-3 text-lg">
                      <span className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full text-white ${toneStyles[persona.tono].solid}`}>
                        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {punto}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-3 font-medium">
                  <span className={`grid size-12 place-items-center rounded-full text-white transition-transform duration-500 group-hover:rotate-45 ${toneStyles[persona.tono].solid}`}>
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                  Conoce a {persona.nombre}
                </span>
              </Link>
            </RevealComponent>
          ))}
        </div>
      </div>
    </section>
    {/* #endregion */}

    {/* #region App Jarvis */}
    <section className="fondo-oscuro relative overflow-hidden bg-acento-oscuro text-crema">
      <LeafComponent className="absolute -top-10 -left-10 size-64 text-crema/5" parallax={80} rotate={-20} sway />
      <div className="contenedor relative grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-2">
        <RevealComponent>
          <EyebrowComponent text="Todo en tu móvil" inverted />
          <h2 className="titulo-seccion mb-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Tu plan, en la app <em>Jarvis</em>
          </h2>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-crema/75">
            Abres la app y sabes exactamente qué comer y qué entrenar hoy. Sin PDFs que se pierden ni dudas de “¿esto
            cómo era?”.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {JARVIS_INCLUYE.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl border border-crema/10 bg-crema/5 px-5 py-4">
                <Check className="size-5 shrink-0 text-acento-suave" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </RevealComponent>
        <JarvisPhoneComponent />
      </div>
    </section>
    {/* #endregion */}

    {/* #region Preguntas frecuentes: título fijo a la izquierda mientras se leen las respuestas. */}
    <section className="contenedor grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <RevealComponent>
          <EyebrowComponent text="Dudas" />
          <h2 className="titulo-seccion mb-6 text-4xl leading-[1.05] sm:text-5xl">
            Preguntas <em>frecuentes</em>
          </h2>
          <p className="text-lg text-gris">
            Lo que más nos preguntan antes de empezar. ¿Tienes otra?{' '}
            <a href={`#${AppAnchor.Contact}`} className="font-medium text-oliva underline underline-offset-4">
              Pregúntanos directamente
            </a>
            .
          </p>
        </RevealComponent>
      </div>
      <FaqComponent />
    </section>
    {/* #endregion */}

    <QuizComponent />
  </>
);

export default HowWeWorkComponent;
