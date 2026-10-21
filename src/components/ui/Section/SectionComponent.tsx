// Sección estándar de página: ancho máximo, márgenes y cabecera opcional que entra al hacer scroll.
// En el título, lo que vaya en <em> sale en cursiva oliva (ver ".titulo-seccion em" en theme.css).
import EyebrowComponent from '../Eyebrow/EyebrowComponent';
import RevealComponent from '../Reveal/RevealComponent';
import type { ISectionProps } from './ISectionProps';

const SectionComponent = ({ id, eyebrow, title, isPageTitle = false, intro, centered = false, className = '', children }: ISectionProps) => {
  // #region Declaraciones
  const Heading = isPageTitle ? 'h1' : 'h2';
  const hasHeader = Boolean(eyebrow || title || intro);
  // #endregion

  // #region Renderizado
  return (
    <section id={id} className={`contenedor py-20 sm:py-28 lg:py-32 ${className}`}>
      {hasHeader && (
        <RevealComponent className={`mb-12 sm:mb-16 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
          {eyebrow && <EyebrowComponent text={eyebrow} centered={centered} />}
          {title && <Heading className="titulo-seccion text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</Heading>}
          {intro && <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-gris sm:text-xl ${centered ? 'mx-auto' : ''}`}>{intro}</p>}
        </RevealComponent>
      )}
      {children}
    </section>
  );
  // #endregion
};

export default SectionComponent;
