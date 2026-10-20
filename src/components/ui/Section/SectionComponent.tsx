// Sección estándar de página: ancho máximo, márgenes y cabecera opcional.
import type { ISectionProps } from './ISectionProps';

const SectionComponent = ({ id, eyebrow, title, isPageTitle = false, intro, className = '', children }: ISectionProps) => {
  // #region Declaraciones
  const Heading = isPageTitle ? 'h1' : 'h2';
  // #endregion

  // #region Renderizado
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 ${className}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold tracking-widest text-corazon uppercase">{eyebrow}</p>}
      {title && <Heading className="mb-4 text-3xl font-bold sm:text-5xl">{title}</Heading>}
      {intro && <p className="mb-10 max-w-2xl text-lg text-gris">{intro}</p>}
      {children}
    </section>
  );
  // #endregion
};

export default SectionComponent;
