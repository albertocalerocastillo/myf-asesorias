// "Qué puedes esperar": todo lo que incluye la asesoría, sin precios (las tarifas se dan en privado).
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Smartphone } from 'lucide-react';
import QuizComponent from '../../components/sections/Quiz/QuizComponent';
import FaqComponent from '../../components/sections/Faq/FaqComponent';
import StepsComponent from '../../components/sections/Steps/StepsComponent';
import RevealComponent from '../../components/ui/Reveal/RevealComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import { AppAnchor } from '../../enums/AppRoute';
import { toneStyles } from '../../theme/toneStyles';
import { personas } from '../../data/equipo';

const REVEAL_STEP_MS = 120;

const JARVIS_INCLUYE = ['Tu plan de comidas', 'Tus rutinas con vídeos', 'Tu progreso semana a semana', 'Chat directo con nosotros'];

const HowWeWorkComponent = () => (
  <>
    {/* #region Pasos */}
    <SectionComponent
      eyebrow="Qué puedes esperar"
      title="Así trabajamos contigo"
      isPageTitle
      intro="Sin letra pequeña ni sorpresas: esto es lo que vas a encontrar desde el primer mensaje."
    >
      <div className="pt-6">
        <StepsComponent headingLevel="h2" />
      </div>
    </SectionComponent>
    {/* #endregion */}

    {/* #region Qué incluye cada área */}
    <section className="bg-white">
      <div className="contenedor py-20">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Qué incluye cada parte</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {personas.map((persona, index) => (
            <RevealComponent key={persona.nombre} delay={index * REVEAL_STEP_MS} className="h-full">
              <div className={`flex h-full flex-col rounded-[2rem] p-8 ${toneStyles[persona.tono].soft}`}>
                <p className={`mb-1 text-sm font-semibold tracking-widest uppercase ${toneStyles[persona.tono].text}`}>con {persona.nombre}</p>
                <h3 className="mb-6 text-2xl font-bold">{persona.area}</h3>
                <ul className="mb-8 flex-1 space-y-3">
                  {persona.enfoque.map((punto) => (
                    <li key={punto} className="flex gap-3">
                      <Check className={`mt-1 size-4 shrink-0 ${toneStyles[persona.tono].text}`} aria-hidden="true" /> {punto}
                    </li>
                  ))}
                </ul>
                <Link to={persona.ruta} className={`inline-flex items-center gap-2 font-semibold ${toneStyles[persona.tono].text} hover:underline`}>
                  Conoce a {persona.nombre} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </RevealComponent>
          ))}
        </div>
      </div>
    </section>
    {/* #endregion */}

    {/* #region App Jarvis. PENDIENTE: confirmar qué incluye exactamente su uso de Jarvis. */}
    <SectionComponent>
      <RevealComponent>
        <div className="grid gap-10 overflow-hidden rounded-[2rem] bg-tinta p-8 text-crema sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <span className="mb-6 grid size-14 place-items-center rounded-2xl bg-acento text-white">
              <Smartphone className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Todo en tu móvil, con la app Jarvis</h2>
            <p className="text-lg text-crema/75">
              Abres la app y sabes exactamente qué comer y qué entrenar hoy. Sin PDFs que se pierden ni dudas de “¿esto
              cómo era?”.
            </p>
          </div>
          <ul className="grid gap-3">
            {JARVIS_INCLUYE.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 font-medium">
                <Check className="size-5 text-acento-suave" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </RevealComponent>
    </SectionComponent>
    {/* #endregion */}

    <QuizComponent />

    {/* #region Preguntas frecuentes */}
    <SectionComponent
      eyebrow="Dudas"
      title="Preguntas frecuentes"
      intro="Lo que más nos preguntan antes de empezar."
    >
      <FaqComponent />
      <p className="mt-8 text-center text-gris">
        ¿Tienes otra duda?{' '}
        <a href={`#${AppAnchor.Contact}`} className="font-semibold text-acento hover:underline">
          Pregúntanos directamente
        </a>
        .
      </p>
    </SectionComponent>
    {/* #endregion */}
  </>
);

export default HowWeWorkComponent;
