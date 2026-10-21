// Foto que se queda fija en pantalla y, al bajar, pasa de un arco pequeño a ocupar toda la pantalla
// (recorte animado con clip-path, que es barato para el navegador). Al final aparece encima el contenido.
import { useRef } from 'react';
import { m, useMotionTemplate, useScroll, useSpring, useTransform } from 'motion/react';
import PhotoComponent from '../Photo/PhotoComponent';
import { Tone } from '../../../enums/Tone';
import { SPRING_SOFT } from '../../../theme/animation';
import type { IExpandingPhotoProps } from './IExpandingPhotoProps';

const PHOTO_SIZES = '100vw';
// Momento del recorrido (0-1) en el que la foto ya ocupa la pantalla entera, sin esquinas.
const FULL_AT = 0.7;
const ARCH_RADIUS_PX = 400;
const BOTTOM_RADIUS_PX = 32;

const ExpandingPhotoComponent = ({ photo, label, tone = Tone.Olive, children }: IExpandingPhotoProps) => {
  // #region Declaraciones
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, SPRING_SOFT);
  // Recorte: de un arco centrado (márgenes grandes y esquinas muy redondas) a la pantalla entera.
  const insetX = useTransform(progress, [0, FULL_AT], [28, 0]);
  const insetY = useTransform(progress, [0, FULL_AT], [14, 0]);
  const topRadius = useTransform(progress, [0, FULL_AT], [ARCH_RADIUS_PX, 0]);
  const bottomRadius = useTransform(progress, [0, FULL_AT], [BOTTOM_RADIUS_PX, 0]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${topRadius}px ${topRadius}px ${bottomRadius}px ${bottomRadius}px)`;
  const photoScale = useTransform(progress, [0, 1], [1.25, 1]);
  const contentOpacity = useTransform(progress, [0.6, 0.85], [0, 1]);
  const contentY = useTransform(progress, [0.6, 0.85], [40, 0]);
  // #endregion

  // #region Renderizado
  return (
    <div ref={ref} data-sin-boton-flotante className="relative h-[160vh] sm:h-[200vh]">
      {/* Altura "grande" de la pantalla (lvh): en el móvil, cuando la barra del navegador se esconde,
          la foto sigue llegando hasta abajo del todo. */}
      <div className="sticky top-0 h-lvh overflow-hidden">
        <m.div className="absolute inset-0" style={{ clipPath }}>
          <m.div className="size-full" style={{ scale: photoScale }}>
            <PhotoComponent photo={photo} label={label} tone={tone} sizes={PHOTO_SIZES} className="size-full rounded-none" />
          </m.div>
          {/* Velo para que el texto de encima se lea sobre cualquier foto. */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-tinta/80 via-tinta/20 to-transparent" />
        </m.div>
        {children && (
          <m.div className="fondo-oscuro absolute inset-x-0 bottom-0 pb-28 text-crema sm:pb-24" style={{ opacity: contentOpacity, y: contentY }}>
            <div className="contenedor">{children}</div>
          </m.div>
        )}
      </div>
    </div>
  );
  // #endregion
};

export default ExpandingPhotoComponent;
