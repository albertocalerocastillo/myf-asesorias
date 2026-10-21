// Primera pantalla de la portada. Titular grande palabra a palabra (CSS, se ve antes de cargar
// React), foto del equipo en arco con chips flotantes, hojas a distintas profundidades y, al
// empezar a bajar, el texto sube y se desvanece mientras la foto crece un poco.
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, useScroll, useSpring, useTransform } from 'motion/react';
import { HeartPulse, MessageCircleHeart, Smartphone } from 'lucide-react';
import AnimatedHeadingComponent from '../../ui/AnimatedHeading/AnimatedHeadingComponent';
import ButtonComponent from '../../ui/Button/ButtonComponent';
import EyebrowComponent from '../../ui/Eyebrow/EyebrowComponent';
import HeartIconComponent from '../../ui/Icons/HeartIconComponent';
import LeafComponent from '../../ui/Leaf/LeafComponent';
import PhotoComponent from '../../ui/Photo/PhotoComponent';
import SealComponent from '../../ui/Seal/SealComponent';
import { AppAnchor, AppRoute } from '../../../enums/AppRoute';
import { Tone } from '../../../enums/Tone';
import { EASE_SMOOTH, SPRING_SOFT, enterOrder } from '../../../theme/animation';
import { fran, marta } from '../../../data/equipo';
import { FOTO_EQUIPO, fotoPersona } from '../../../data/fotos';

const HEADING = [{ text: 'Cuidarte, contado por quien' }, { text: 'volvió a empezar', className: 'italic text-oliva' }];
const TEAM_PHOTO_SIZES = '(min-width: 1024px) 460px, 80vw';
const AVATAR_SIZES = '48px';
const CHIP_FLOAT_S = 6;

const TRUST_POINTS = [
  { icon: HeartPulse, text: 'Lo hemos vivido' },
  { icon: Smartphone, text: '100 % online, en Jarvis' },
  { icon: MessageCircleHeart, text: 'Trato directo con nosotros' }
];

const HeroComponent = () => {
  // #region Declaraciones
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, SPRING_SOFT);
  const textY = useTransform(progress, [0, 1], [0, -120]);
  const textOpacity = useTransform(progress, [0, 0.7], [1, 0]);
  const photoScale = useTransform(progress, [0, 1], [1, 1.12]);
  const photoY = useTransform(progress, [0, 1], [0, 60]);

  const chips = [
    { persona: marta, label: 'Nutrición', className: 'top-[14%] -left-4 sm:-left-12', delay: 0 },
    { persona: fran, label: 'Entreno', className: 'bottom-[18%] -right-3 sm:-right-10', delay: CHIP_FLOAT_S / 2 }
  ];
  // #endregion

  // #region Renderizado
  return (
    <section ref={ref} className="relative -mt-16 overflow-hidden pt-16 lg:-mt-18 lg:pt-18">
      {/* Fondo: manchas de color suaves y hojas a distintas profundidades. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_30rem_at_85%_10%,var(--color-oliva-claro),transparent_70%),radial-gradient(40rem_30rem_at_0%_90%,var(--color-tierra-claro),transparent_70%)]" />
      <LeafComponent className="absolute top-28 -left-10 size-40 text-oliva/15 sm:size-56" parallax={120} rotate={-20} sway />
      <LeafComponent className="absolute right-[40%] bottom-10 hidden size-24 text-acento-suave/40 lg:block" parallax={-80} rotate={140} sway />
      <LeafComponent className="absolute top-20 right-4 size-20 text-tierra/15 lg:hidden" parallax={60} rotate={60} />

      <div className="contenedor grid min-h-[calc(100svh-4rem)] items-center gap-14 pt-8 pb-24 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pt-4">
        <m.div style={{ y: textY, opacity: textOpacity }} className="relative z-10">
          <div className="entra" style={enterOrder(0)}>
            <EyebrowComponent text="Entrenamiento · Nutrición" />
          </div>
          <AnimatedHeadingComponent
            parts={HEADING}
            className="titulo-grande mb-8 text-[3.1rem] leading-[0.98] min-[400px]:text-6xl sm:text-7xl xl:text-[5.75rem]"
          />
          <p className="entra mb-10 max-w-xl text-lg leading-relaxed text-gris sm:text-xl" style={enterOrder(2)}>
            Somos Marta y Fran. Los dos pasamos por una operación de corazón y hoy te ayudamos a comer mejor y a entrenar
            con cabeza: un plan hecho para ti y trato directo con nosotros.
          </p>
          <div className="entra flex flex-col gap-3 sm:flex-row sm:items-center" style={enterOrder(3)}>
            <ButtonComponent href={`#${AppAnchor.Contact}`} withArrow magnetic large>
              Cuéntanos tu caso
            </ButtonComponent>
            <ButtonComponent to={AppRoute.HowWeWork} tone={Tone.Outline} large>
              Cómo funciona
            </ButtonComponent>
          </div>
          <ul className="entra mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gris" style={enterOrder(4)}>
            {TRUST_POINTS.map((point) => (
              <li key={point.text} className="flex items-center gap-2">
                <point.icon className="size-4 text-oliva" aria-hidden="true" /> {point.text}
              </li>
            ))}
          </ul>
        </m.div>

        {/* Foto del equipo en arco, con un arco de contorno detrás y los chips de cada uno. */}
        <div className="entra relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-[26rem] xl:max-w-[28rem]" style={enterOrder(3)}>
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 -translate-y-4 rounded-t-full rounded-b-[2.5rem] border border-acento-suave sm:translate-x-6 sm:-translate-y-6" />
          <m.div style={{ scale: photoScale, y: photoY }} className="relative">
            <PhotoComponent
              photo={FOTO_EQUIPO}
              label="Marta y Fran"
              tone={Tone.Olive}
              sizes={TEAM_PHOTO_SIZES}
              priority
              className="aspect-[4/5] max-h-[68svh] w-full rounded-t-full rounded-b-[2.5rem] shadow-[0_40px_80px_-30px_rgb(45_48_33/0.45)]"
            />
          </m.div>

          {chips.map((chip) => (
            <m.div
              key={chip.persona.nombre}
              className={`absolute ${chip.className}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: CHIP_FLOAT_S, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
            >
              <Link to={chip.persona.ruta} className="al-tocar flex items-center gap-3 rounded-full bg-crema/90 py-2 pr-5 pl-2 shadow-xl backdrop-blur">
                <PhotoComponent
                  photo={fotoPersona(chip.persona)}
                  label={chip.persona.nombre}
                  tone={chip.persona.tono}
                  sizes={AVATAR_SIZES}
                  className="size-11 shrink-0 rounded-full text-[0px] [&_svg]:size-4"
                />
                <span className="text-sm leading-tight">
                  <span className="titulo block text-base">{chip.persona.nombre}</span>
                  <span className="text-gris">{chip.label}</span>
                </span>
              </Link>
            </m.div>
          ))}

          <SealComponent text="Lo hemos vivido" className="absolute -top-4 -right-4 size-24 sm:-right-8 sm:size-28">
            <HeartIconComponent className="size-7 animate-latido text-oliva" />
          </SealComponent>
        </div>
      </div>

      {/* Indicador para invitar a bajar. */}
      <m.div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-gris uppercase lg:flex"
        style={{ opacity: textOpacity }}
      >
        Desliza
        <span className="relative h-12 w-px overflow-hidden bg-tinta/15">
          <m.span
            className="absolute inset-x-0 top-0 h-1/2 bg-acento"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE_SMOOTH }}
          />
        </span>
      </m.div>
    </section>
  );
  // #endregion
};

export default HeroComponent;
