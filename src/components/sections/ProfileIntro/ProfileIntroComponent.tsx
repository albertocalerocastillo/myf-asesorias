// Cabecera de las páginas de Nutrición y Entrenamiento: presentación, historia y forma de trabajar.
// Las dos páginas son iguales salvo el color, que sale del tono de cada persona.
import { ArrowDown, Check, HeartPulse } from 'lucide-react';
import AnimatedHeadingComponent from '../../ui/AnimatedHeading/AnimatedHeadingComponent';
import ButtonComponent from '../../ui/Button/ButtonComponent';
import HeartbeatComponent from '../../ui/Heartbeat/HeartbeatComponent';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import PhotoComponent from '../../ui/Photo/PhotoComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { obtenerUrlInstagram } from '../../../data/equipo';
import { fotoPersona } from '../../../data/fotos';
import { enterOrder, parallaxOffset } from '../../../theme/animation';
import { toneStyles } from '../../../theme/toneStyles';
import type { IProfileIntroProps } from './IProfileIntroProps';


const PROFILE_PHOTO_SIZES = '(min-width: 768px) 480px, 100vw';

const ProfileIntroComponent = ({ persona, contentAnchor }: IProfileIntroProps) => {
  // #region Declaraciones
  const tone = toneStyles[persona.tono];
  // #endregion

  // #region Renderizado
  return (
    <>
      {/* #region Presentación */}
      <section className="contenedor relative grid items-center gap-14 pt-8 pb-16 md:grid-cols-[1.1fr_1fr] md:pt-16 md:pb-24">
        <div>
          <p
            className={`entra mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${tone.soft} ${tone.text}`}
            style={enterOrder(0)}
          >
            {persona.area}
          </p>
          <AnimatedHeadingComponent
            parts={[{ text: 'Hola, soy' }, { text: persona.nombre, className: tone.text }]}
            className="mb-6 text-5xl leading-[1.05] font-bold sm:text-7xl"
          />
          <p className="entra titulo mb-10 max-w-xl text-2xl leading-snug text-gris italic sm:text-3xl" style={enterOrder(1)}>
            “{persona.frase}”
          </p>
          <div className="entra flex flex-col gap-3 sm:flex-row" style={enterOrder(2)}>
            <ButtonComponent href={obtenerUrlInstagram(persona.instagram)} tone={persona.tono}>
              <InstagramIconComponent /> Escríbeme
            </ButtonComponent>
            <a
              href={`#${contentAnchor}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-tinta/15 px-6 py-3.5 font-semibold transition hover:border-tinta/40"
            >
              Ver mi {persona.seccionContenido.toLowerCase()} <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="entra relative mx-auto w-full max-w-md md:max-w-none" style={enterOrder(3)}>
          <div className="paralaje" style={parallaxOffset(-24)}>
            <PhotoComponent
              photo={fotoPersona(persona)}
              label={persona.nombre}
              tone={persona.tono}
              sizes={PROFILE_PHOTO_SIZES}
              priority
              className="aspect-[4/5] rounded-[2rem] shadow-2xl"
            />
          </div>
          <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-6">
            <span className="grid size-10 place-items-center rounded-full bg-acento-claro text-acento">
              <HeartPulse className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold">Operación de corazón</span>
              <span className="text-gris">Lo he vivido en primera persona</span>
            </span>
          </div>
        </div>
      </section>
      {/* #endregion */}

      {/* #region Historia y forma de trabajar */}
      <section className="relative overflow-hidden bg-white">
        <HeartbeatComponent className={`pointer-events-none absolute inset-x-0 top-0 h-16 w-full opacity-30 ${tone.text}`} />
        <div className="contenedor relative grid gap-14 py-20 md:grid-cols-[3fr_2fr] md:gap-20">
          <RevealComponent>
            <p className={`mb-3 text-sm font-semibold tracking-widest uppercase ${tone.text}`}>Mi historia</p>
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Por qué me dedico a esto</h2>
            <div className="prosa text-lg text-gris">
              {persona.historia.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-arena px-4 py-2 text-sm font-medium">{persona.titulacion}</p>
          </RevealComponent>

          <RevealComponent delay={150}>
            <div className={`rounded-3xl p-8 ${tone.soft}`}>
              <h2 className="mb-6 text-2xl font-bold">Cómo trabajo contigo</h2>
              <ul className="space-y-4">
                {persona.enfoque.map((punto) => (
                  <li key={punto} className="flex gap-3">
                    <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white ${tone.text}`}>
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    <span className="leading-relaxed">{punto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealComponent>
        </div>
      </section>
      {/* #endregion */}
    </>
  );
  // #endregion
};

export default ProfileIntroComponent;
