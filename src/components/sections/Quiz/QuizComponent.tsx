// Test "¿Por dónde empiezo?": una pregunta cada vez, que entra deslizándose (hacia la izquierda al
// avanzar y hacia la derecha al volver), con barra de progreso animada, y al final una recomendación
// (Marta, Fran o los dos) con el botón para escribirles. Nada se guarda ni se envía.
import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import ButtonComponent from '../../ui/Button/ButtonComponent';
import EyebrowComponent from '../../ui/Eyebrow/EyebrowComponent';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import LeafComponent from '../../ui/Leaf/LeafComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import type { OpcionTestDTO } from '../../../dtos/PreguntaTestDTO';
import { EASE_SMOOTH } from '../../../theme/animation';
import { fran, marta, obtenerUrlInstagram } from '../../../data/equipo';
import { AVISO_SALUD, calcularResultadoTest, preguntasTest, ResultadoTest, textosResultado } from '../../../data/test';

const PERSONAS_POR_RESULTADO = {
  [ResultadoTest.Marta]: [marta],
  [ResultadoTest.Fran]: [fran],
  [ResultadoTest.Ambos]: [marta, fran]
};
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const SLIDE_PX = 60;
const SLIDE_DURATION_S = 0.45;
const RESULT_KEY = 'resultado';
const PROGRESS_DURATION_S = 0.6;
const CARD_REVEAL_DELAY_MS = 150;
const PERCENT = 100;

// Variantes de la animación: "direction" es 1 al avanzar y -1 al volver.
const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * SLIDE_PX }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: -direction * SLIDE_PX })
};

const QuizComponent = () => {
  // #region Declaraciones
  const [respuestas, setRespuestas] = useState<OpcionTestDTO[]>([]);
  const [direction, setDirection] = useState<number>(1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasInteracted = useRef<boolean>(false);

  const paso = respuestas.length;
  const terminado = paso === preguntasTest.length;
  const resultado = terminado ? calcularResultadoTest(respuestas) : null;
  const conAvisoSalud = respuestas.some((respuesta) => respuesta.salud);
  const progreso = paso / preguntasTest.length;

  const cambiarRespuestas = (nuevas: OpcionTestDTO[], nuevaDireccion: number): void => {
    hasInteracted.current = true;
    setDirection(nuevaDireccion);
    setRespuestas(nuevas);
  };

  // Cuando ha salido la pregunta anterior, el foco pasa al título nuevo (teclado y lectores de pantalla).
  const enfocarTitulo = (): void => {
    if (hasInteracted.current) {
      headingRef.current?.focus();
    }
  };
  // #endregion

  // #region Renderizado
  return (
    <section aria-labelledby="test-titulo" data-sin-boton-flotante className="fondo-oscuro relative overflow-hidden bg-acento-oscuro text-crema">
      <LeafComponent className="absolute -top-12 -left-12 size-72 text-crema/5" parallax={100} rotate={-30} sway />
      <LeafComponent className="absolute right-10 -bottom-20 size-56 text-acento-suave/10" parallax={-80} rotate={160} />

      <div className="contenedor relative grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-20">
        <RevealComponent>
          <EyebrowComponent text="Test · 30 segundos" inverted />
          <h2 id="test-titulo" className="titulo-seccion mb-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            ¿No sabes por dónde <em>empezar</em>?
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-crema/75">
            Tres preguntas rápidas y te decimos si empezar con Marta, con Fran o con los dos. No pedimos ningún dato: las
            respuestas no salen de tu móvil.
          </p>
        </RevealComponent>

        <RevealComponent delay={CARD_REVEAL_DELAY_MS}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-crema p-6 text-tinta shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)] sm:p-10" aria-live="polite">
            {/* Progreso: una barra que se llena con cada respuesta. */}
            <div className="mb-8 flex items-center gap-4" aria-hidden="true">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-tinta/10">
                <m.div className="h-full rounded-full bg-oliva" animate={{ width: `${progreso * PERCENT}%` }} transition={{ duration: PROGRESS_DURATION_S, ease: EASE_SMOOTH }} />
              </div>
              <span className="text-sm font-medium text-gris tabular-nums">
                {Math.min(paso + 1, preguntasTest.length)}/{preguntasTest.length}
              </span>
            </div>

            <AnimatePresence mode="wait" custom={direction} initial={false} onExitComplete={enfocarTitulo}>
              {!terminado ? (
                <m.div
                  key={paso}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: SLIDE_DURATION_S, ease: EASE_SMOOTH }}
                >
                  <h3 ref={headingRef} tabIndex={-1} className="mb-8 text-3xl leading-tight outline-none sm:text-4xl">
                    {preguntasTest[paso].pregunta}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {preguntasTest[paso].opciones.map((opcion, index) => (
                      <button
                        key={opcion.texto}
                        type="button"
                        onClick={() => cambiarRespuestas([...respuestas, opcion], 1)}
                        className="group al-tocar flex items-center gap-4 rounded-2xl border border-tinta/10 bg-white p-4 text-left font-medium transition-colors hover:border-oliva hover:bg-oliva-claro active:border-oliva active:bg-oliva-claro"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-arena text-sm font-semibold text-tierra transition-colors group-hover:bg-oliva group-hover:text-white">
                          {OPTION_LETTERS[index]}
                        </span>
                        {opcion.texto}
                      </button>
                    ))}
                  </div>
                  {paso > 0 && (
                    <button
                      type="button"
                      onClick={() => cambiarRespuestas(respuestas.slice(0, -1), -1)}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gris hover:text-tinta"
                    >
                      <ArrowLeft className="size-4" aria-hidden="true" /> Atrás
                    </button>
                  )}
                </m.div>
              ) : (
                resultado && (
                  <m.div
                    key={RESULT_KEY}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: SLIDE_DURATION_S, ease: EASE_SMOOTH }}
                  >
                    <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium tracking-[0.28em] text-tierra uppercase">
                      <Sparkles className="size-4" aria-hidden="true" /> Tu resultado
                    </p>
                    <h3 ref={headingRef} tabIndex={-1} className="mb-5 text-3xl leading-tight outline-none sm:text-4xl">
                      {textosResultado[resultado].titulo}
                    </h3>
                    <p className="mb-5 leading-relaxed text-gris">{textosResultado[resultado].texto}</p>
                    {conAvisoSalud && <p className="mb-6 rounded-2xl bg-oliva-claro p-4 text-sm leading-relaxed">{AVISO_SALUD}</p>}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      {PERSONAS_POR_RESULTADO[resultado].map((persona) => (
                        <ButtonComponent key={persona.nombre} href={obtenerUrlInstagram(persona.instagram)} tone={persona.tono}>
                          <InstagramIconComponent /> Escribe a {persona.nombre}
                        </ButtonComponent>
                      ))}
                    </div>
                    <button type="button" onClick={() => cambiarRespuestas([], -1)} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gris hover:text-tinta">
                      <RotateCcw className="size-4" aria-hidden="true" /> Repetir el test
                    </button>
                  </m.div>
                )
              )}
            </AnimatePresence>
          </div>
        </RevealComponent>
      </div>
    </section>
  );
  // #endregion
};

export default QuizComponent;
