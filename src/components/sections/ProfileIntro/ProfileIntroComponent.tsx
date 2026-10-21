// Cabecera de las páginas de Nutrición y Entrenamiento: presentación con foto en arco, su historia
// (que se enciende palabra a palabra al bajar) y cómo trabaja, en pasos numerados.
// Las dos páginas son iguales salvo el color, que sale del tono de cada persona.
import { ArrowDown } from 'lucide-react';
import AnimatedHeadingComponent from '../../ui/AnimatedHeading/AnimatedHeadingComponent';
import ButtonComponent from '../../ui/Button/ButtonComponent';
import EyebrowComponent from '../../ui/Eyebrow/EyebrowComponent';
import HeartIconComponent from '../../ui/Icons/HeartIconComponent';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import LeafComponent from '../../ui/Leaf/LeafComponent';
import PhotoComponent from '../../ui/Photo/PhotoComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import ScrollRevealTextComponent from '../../ui/ScrollRevealText/ScrollRevealTextComponent';
import SealComponent from '../../ui/Seal/SealComponent';
import { Tone } from '../../../enums/Tone';
import { obtenerUrlInstagram } from '../../../data/equipo';
import { fotoPersona } from '../../../data/fotos';
import { enterOrder } from '../../../theme/animation';
import { toneStyles } from '../../../theme/toneStyles';
import type { IProfileIntroProps } from './IProfileIntroProps';

const PROFILE_PHOTO_SIZES = '(min-width: 1024px) 440px, 80vw';
const REVEAL_STEP_MS = 100;
const NUMBER_DIGITS = 2;

const ProfileIntroComponent = ({ persona, contentAnchor }: IProfileIntroProps) => {
  // #region Declaraciones
  const tone = toneStyles[persona.tono];
  const historia = persona.historia.map((parrafo) => ({ text: parrafo }));
  // #endregion

  // #region Renderizado
  return (
    <>
      {/* #region Presentación */}
      <section className="relative -mt-16 overflow-hidden pt-16 lg:-mt-18 lg:pt-18">
        <div aria-hidden="true" className={`absolute inset-0 -z-10 rounded-b-[4rem] ${tone.soft} opacity-60`} />
        <LeafComponent className="absolute top-24 -right-8 size-40 text-oliva/15 sm:size-56" parallax={100} rotate={150} sway />

        <div className="contenedor grid items-center gap-16 pt-10 pb-20 lg:grid-cols-[1.15fr_1fr] lg:pt-16 lg:pb-28">
          <div>
            <div className="entra" style={enterOrder(0)}>
              <EyebrowComponent text={persona.area} />
            </div>
            <AnimatedHeadingComponent
              parts={[{ text: 'Hola, soy' }, { text: persona.nombre, className: `italic ${tone.text}` }]}
              className="titulo-grande mb-8 text-6xl leading-[0.95] sm:text-7xl xl:text-8xl"
            />
            <p className="entra titulo mb-10 max-w-xl text-2xl leading-snug text-gris italic sm:text-3xl" style={enterOrder(1)}>
              “{persona.frase}”
            </p>
            <div className="entra flex flex-col gap-3 sm:flex-row sm:items-center" style={enterOrder(2)}>
              <ButtonComponent href={obtenerUrlInstagram(persona.instagram)} tone={persona.tono} withArrow magnetic large>
                <InstagramIconComponent /> Escríbeme
              </ButtonComponent>
              <ButtonComponent href={`#${contentAnchor}`} tone={Tone.Outline} large>
                Ver mi {persona.seccionContenido.toLowerCase()} <ArrowDown className="size-4" aria-hidden="true" />
              </ButtonComponent>
            </div>
          </div>

          <div className="entra relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-[26rem]" style={enterOrder(3)}>
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 -translate-y-4 rounded-t-full rounded-b-[2.5rem] border border-acento-suave sm:translate-x-6 sm:-translate-y-6" />
            <PhotoComponent
              photo={fotoPersona(persona)}
              label={persona.nombre}
              tone={persona.tono}
              sizes={PROFILE_PHOTO_SIZES}
              priority
              className="relative aspect-[4/5] max-h-[68svh] w-full rounded-t-full rounded-b-[2.5rem] shadow-[0_40px_80px_-30px_rgb(45_48_33/0.45)]"
            />
            <SealComponent text="Lo he vivido" className="absolute -bottom-6 -left-6 size-24 sm:size-28">
              <HeartIconComponent className={`size-7 animate-latido ${tone.text}`} />
            </SealComponent>
          </div>
        </div>
      </section>
      {/* #endregion */}

      {/* #region Mi historia (se enciende al bajar). PENDIENTE: su historia real. */}
      <ScrollRevealTextComponent eyebrow="Mi historia" parts={historia} />
      {/* #endregion */}

      {/* #region Cómo trabajo contigo */}
      <section className="contenedor pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <RevealComponent>
            <EyebrowComponent text="Cómo trabajo" />
            <h2 className="titulo-seccion mb-6 text-4xl leading-[1.05] sm:text-5xl">
              Así trabajo <em>contigo</em>
            </h2>
            <p className="inline-flex rounded-full bg-arena px-4 py-2 text-sm font-medium">{persona.titulacion}</p>
          </RevealComponent>
          <ol className="divide-y divide-tinta/10 border-y border-tinta/10">
            {persona.enfoque.map((punto, index) => (
              <li key={punto}>
                <RevealComponent delay={index * REVEAL_STEP_MS} className="flex items-baseline gap-6 py-6">
                  <span className={`titulo text-3xl ${tone.text}`}>{String(index + 1).padStart(NUMBER_DIGITS, '0')}</span>
                  <span className="text-lg leading-relaxed sm:text-xl">{punto}</span>
                </RevealComponent>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* #endregion */}
    </>
  );
  // #endregion
};

export default ProfileIntroComponent;
