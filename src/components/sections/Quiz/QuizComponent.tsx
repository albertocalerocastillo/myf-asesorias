// Test "¿Por dónde empiezo?": una pregunta cada vez, con barra de progreso, y al final una
// recomendación (Marta, Fran o los dos) con el botón para escribirles. Nada se guarda ni se envía.
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, HeartPulse, RotateCcw, Sparkles } from 'lucide-react';
import ButtonComponent from '../../ui/Button/ButtonComponent';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import type { OpcionTestDTO } from '../../../dtos/PreguntaTestDTO';
import { fran, marta, obtenerUrlInstagram } from '../../../data/equipo';
import { AVISO_SALUD, calcularResultadoTest, preguntasTest, ResultadoTest, textosResultado } from '../../../data/test';

const PERSONAS_POR_RESULTADO = {
  [ResultadoTest.Marta]: [marta],
  [ResultadoTest.Fran]: [fran],
  [ResultadoTest.Ambos]: [marta, fran]
};

const QuizComponent = () => {
  // #region Declaraciones
  const [respuestas, setRespuestas] = useState<OpcionTestDTO[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasInteracted = useRef<boolean>(false);

  const paso = respuestas.length;
  const terminado = paso === preguntasTest.length;
  const resultado = terminado ? calcularResultadoTest(respuestas) : null;
  const conAvisoSalud = respuestas.some((respuesta) => respuesta.salud);

  const responder = (opcion: OpcionTestDTO): void => {
    hasInteracted.current = true;
    setRespuestas([...respuestas, opcion]);
  };

  const volver = (): void => {
    hasInteracted.current = true;
    setRespuestas(respuestas.slice(0, -1));
  };

  const repetir = (): void => {
    hasInteracted.current = true;
    setRespuestas([]);
  };
  // #endregion

  // #region Efectos
  // Al cambiar de pregunta, el foco pasa al nuevo título (para teclado y lectores de pantalla).
  useEffect(() => {
    if (hasInteracted.current) {
      headingRef.current?.focus();
    }
  }, [paso]);
  // #endregion

  // #region Renderizado
  return (
    <section aria-labelledby="test-titulo" className="relative overflow-hidden bg-gradient-to-br from-acento to-acento-oscuro text-white">
      {/* Corazón gigante de fondo, decorativo. */}
      <HeartPulse className="pointer-events-none absolute -top-16 -right-16 size-80 text-white/5" aria-hidden="true" />
      <div className="contenedor relative grid gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
            <Sparkles className="size-4" aria-hidden="true" /> 30 segundos
          </p>
          <h2 id="test-titulo" className="mb-5 text-4xl font-bold sm:text-5xl">
            ¿No sabes por dónde empezar?
          </h2>
          <p className="text-lg text-white/85">
            Tres preguntas rápidas y te decimos si empezar con Marta, con Fran o con los dos. No pedimos ningún dato: las
            respuestas no salen de tu móvil.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-6 text-tinta shadow-2xl sm:p-8" aria-live="polite">
          {/* Progreso. */}
          <div className="mb-6 flex gap-2" aria-hidden="true">
            {preguntasTest.map((pregunta, index) => (
              <span
                key={pregunta.pregunta}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${index < paso ? 'bg-acento' : 'bg-tinta/10'}`}
              />
            ))}
          </div>

          {!terminado && (
            <div key={paso} className="aparece">
              <p className="mb-2 text-sm font-semibold text-acento">
                Pregunta {paso + 1} de {preguntasTest.length}
              </p>
              <h3 ref={headingRef} tabIndex={-1} className="mb-6 text-2xl font-bold outline-none sm:text-3xl">
                {preguntasTest[paso].pregunta}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {preguntasTest[paso].opciones.map((opcion) => (
                  <button
                    key={opcion.texto}
                    type="button"
                    onClick={() => responder(opcion)}
                    className="group al-tocar flex items-center justify-between gap-3 rounded-2xl border-2 border-tinta/10 px-5 py-4 text-left font-medium hover:border-acento hover:bg-acento-claro/50 active:border-acento active:bg-acento-claro/50"
                  >
                    {opcion.texto}
                    <ArrowRight className="size-4 shrink-0 text-acento opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </button>
                ))}
              </div>
              {paso > 0 && (
                <button type="button" onClick={volver} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gris hover:text-tinta">
                  <ArrowLeft className="size-4" aria-hidden="true" /> Atrás
                </button>
              )}
            </div>
          )}

          {resultado && (
            <div key="resultado" className="aparece">
              <p className="mb-2 text-sm font-semibold text-acento">Tu resultado</p>
              <h3 ref={headingRef} tabIndex={-1} className="mb-4 text-2xl font-bold outline-none sm:text-3xl">
                {textosResultado[resultado].titulo}
              </h3>
              <p className="mb-4 leading-relaxed text-gris">{textosResultado[resultado].texto}</p>
              {conAvisoSalud && <p className="mb-6 rounded-2xl bg-acento-claro p-4 text-sm leading-relaxed">{AVISO_SALUD}</p>}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {PERSONAS_POR_RESULTADO[resultado].map((persona) => (
                  <ButtonComponent key={persona.nombre} href={obtenerUrlInstagram(persona.instagram)} tone={persona.tono}>
                    <InstagramIconComponent /> Escribe a {persona.nombre}
                  </ButtonComponent>
                ))}
              </div>
              <button type="button" onClick={repetir} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gris hover:text-tinta">
                <RotateCcw className="size-4" aria-hidden="true" /> Repetir el test
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
  // #endregion
};

export default QuizComponent;
