// Ingredientes y pasos de una receta, pensados para cocinar con el móvil al lado:
// - Se pueden tachar ingredientes y marcar pasos hechos (el siguiente paso queda resaltado).
// - "Modo cocina": letra más grande y la pantalla no se apaga mientras está activo.
import { useState } from 'react';
import { Check, ChefHat, MonitorSmartphone, X } from 'lucide-react';
import { useWakeLock } from '../../../hooks/useWakeLock';
import type { ICookingModeProps } from './ICookingModeProps';

const toggleInList = (list: number[], value: number): number[] =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const CookingModeComponent = ({ receta }: ICookingModeProps) => {
  // #region Declaraciones
  const [cooking, setCooking] = useState<boolean>(false);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const wakeLockSupported = useWakeLock(cooking);

  const nextStep = receta.pasos.findIndex((_, index) => !doneSteps.includes(index));
  const allDone = doneSteps.length === receta.pasos.length;
  // #endregion

  // #region Renderizado
  return (
    <div>
      {/* Barra del modo cocina. */}
      <div
        className={`mb-10 flex flex-col gap-4 rounded-3xl p-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
          cooking ? 'bg-oliva text-white' : 'border border-oliva/20 bg-oliva-claro'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${cooking ? 'bg-white/15' : 'bg-white text-oliva'}`}>
            <ChefHat className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">{cooking ? 'Modo cocina activado' : '¿Te pones a cocinar?'}</p>
            <p className={`text-sm ${cooking ? 'text-white/80' : 'text-gris'}`} aria-live="polite">
              {cooking
                ? `${doneSteps.length} de ${receta.pasos.length} pasos hechos${wakeLockSupported ? ' · la pantalla no se apagará' : ''}`
                : 'Letra grande, ingredientes para tachar y pantalla siempre encendida.'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setCooking(!cooking)}
          aria-pressed={cooking}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition ${
            cooking ? 'bg-white text-oliva hover:bg-crema' : 'bg-oliva text-white hover:brightness-110'
          }`}
        >
          {cooking ? <X className="size-4" aria-hidden="true" /> : <MonitorSmartphone className="size-4" aria-hidden="true" />}
          {cooking ? 'Salir' : 'Modo cocina'}
        </button>
      </div>

      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-14">
        {/* #region Ingredientes. En escritorio se quedan fijos mientras lees los pasos. */}
        <aside className="md:sticky md:top-24 md:self-start">
          <div className="rounded-3xl border border-tinta/10 bg-white p-6 sm:p-7">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h2 className="text-2xl">Ingredientes</h2>
              <span className="text-sm text-gris">
                {checkedIngredients.length}/{receta.ingredientes.length}
              </span>
            </div>
            <ul className="space-y-1">
              {receta.ingredientes.map((ingrediente, index) => {
                const checked = checkedIngredients.includes(index);
                return (
                  <li key={ingrediente}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => setCheckedIngredients(toggleInList(checkedIngredients, index))}
                      className={`flex w-full items-start gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-oliva-claro/60 ${cooking ? 'text-lg' : ''}`}
                    >
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 transition ${
                          checked ? 'border-oliva bg-oliva text-white' : 'border-tinta/25'
                        }`}
                        aria-hidden="true"
                      >
                        {checked && <Check className="size-3.5" strokeWidth={3} />}
                      </span>
                      <span className={checked ? 'text-gris line-through decoration-oliva/60' : ''}>{ingrediente}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
        {/* #endregion */}

        {/* #region Pasos */}
        <section>
          <h2 className="mb-6 text-2xl">Preparación</h2>
          <ol className="space-y-4">
            {receta.pasos.map((paso, index) => {
              const done = doneSteps.includes(index);
              const current = cooking && index === nextStep;
              return (
                <li key={paso}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={done}
                    onClick={() => setDoneSteps(toggleInList(doneSteps, index))}
                    className={`flex w-full gap-5 rounded-2xl p-3 text-left transition sm:p-4 ${
                      current ? 'bg-white shadow-lg ring-2 ring-oliva' : 'hover:bg-white/70'
                    } ${done ? 'opacity-55' : ''}`}
                  >
                    <span
                      className={`titulo grid size-10 shrink-0 place-items-center rounded-full text-lg transition ${
                        done ? 'bg-oliva-claro text-oliva' : 'bg-oliva text-white'
                      }`}
                      aria-hidden="true"
                    >
                      {done ? <Check className="size-5" strokeWidth={3} /> : index + 1}
                    </span>
                    <span className={`pt-1.5 leading-relaxed ${cooking ? 'text-xl sm:text-2xl' : 'text-lg'} ${done ? 'line-through decoration-oliva/50' : ''}`}>
                      {paso}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {cooking && allDone && (
            <p className="mt-8 rounded-2xl bg-oliva-claro p-5 text-center text-lg font-semibold text-oliva" role="status">
              ¡Listo! Que aproveche 💚
            </p>
          )}
          {!cooking && <p className="mt-4 text-sm text-gris">Toca un ingrediente o un paso para marcarlo.</p>}
        </section>
        {/* #endregion */}
      </div>
    </div>
  );
  // #endregion
};

export default CookingModeComponent;
