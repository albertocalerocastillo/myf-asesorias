// "Cómo funciona" (resumen para la portada): para quién es, los cuatro pasos con la línea que se
// dibuja con el scroll y un botón a la página con todo el detalle.
import { Check } from 'lucide-react';
import ButtonComponent from '../../ui/Button/ButtonComponent';
import EyebrowComponent from '../../ui/Eyebrow/EyebrowComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import StepsComponent from '../Steps/StepsComponent';
import { AppRoute } from '../../../enums/AppRoute';
import { Tone } from '../../../enums/Tone';
import { perfilesCliente } from '../../../data/servicio';

const REVEAL_DELAY_MS = 150;

const HowItWorksComponent = () => (
  <section className="bg-arena">
    <div className="contenedor py-24 sm:py-32">
      <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
        <RevealComponent>
          <EyebrowComponent text="Cómo funciona" />
          <h2 className="titulo-seccion text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Empezar es más <em>sencillo</em> de lo que crees
          </h2>
        </RevealComponent>
        <RevealComponent delay={REVEAL_DELAY_MS}>
          <p className="mb-5 text-xs font-medium tracking-[0.28em] text-tierra uppercase">Esto es para ti si…</p>
          <ul className="divide-y divide-tinta/10 border-y border-tinta/10">
            {perfilesCliente.map((perfil) => (
              <li key={perfil} className="flex gap-4 py-4 text-lg">
                <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-oliva text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {perfil}
              </li>
            ))}
          </ul>
        </RevealComponent>
      </div>

      <StepsComponent />

      <div className="mt-20 text-center">
        <ButtonComponent to={AppRoute.HowWeWork} tone={Tone.Outline} withArrow>
          Todo lo que incluye
        </ButtonComponent>
      </div>
    </div>
  </section>
);

export default HowItWorksComponent;
