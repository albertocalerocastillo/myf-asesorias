// Pie de página en arena (su logo es oscuro y necesita fondo claro), con enlaces, Instagram, el aviso
// de salud y un "M&F" gigante que sube desde abajo al llegar al final de la página.
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, useScroll, useSpring, useTransform } from 'motion/react';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import { AppRoute } from '../../../enums/AppRoute';
import { SPRING_SOFT } from '../../../theme/animation';
import { marca, obtenerUrlInstagram, personas } from '../../../data/equipo';

const LOGO_FULL = '/logo-completo.webp';
const WORDMARK = 'M&F';

const FOOTER_LINKS = [
  { to: AppRoute.Nutrition, label: 'Nutrición con Marta' },
  { to: AppRoute.Training, label: 'Entrenamiento con Fran' },
  { to: AppRoute.HowWeWork, label: 'Cómo trabajamos' }
];

const FooterComponent = () => {
  // #region Declaraciones
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const wordmarkY = useSpring(useTransform(scrollYProgress, [0, 1], ['60%', '0%']), SPRING_SOFT);
  // #endregion

  // #region Renderizado
  return (
    <footer ref={ref} className="relative overflow-hidden bg-arena text-sm text-gris">
      <div className="contenedor grid gap-12 pt-16 pb-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link to={AppRoute.Home} className="mb-6 inline-block" aria-label={`${marca.nombre}, ir al inicio`}>
            <img src={LOGO_FULL} alt="" width={176} height={138} loading="lazy" className="h-auto w-44" />
          </Link>
          {/* Aviso de salud: la web divulga, no diagnostica. */}
          <p className="max-w-md leading-relaxed">
            La información de esta web es divulgativa y no sustituye la consulta con tu médico. Si tienes alguna patología,
            consulta con tu especialista antes de empezar un plan de alimentación o de entrenamiento.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <p className="mb-4 text-xs font-medium tracking-[0.28em] text-tierra uppercase">La web</p>
          <ul className="space-y-1">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="inline-block py-1 text-base text-tinta transition-colors hover:text-oliva">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.28em] text-tierra uppercase">Síguenos</p>
          <ul className="space-y-1">
            {personas.map((persona) => (
              <li key={persona.nombre}>
                <a
                  href={obtenerUrlInstagram(persona.instagram)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 py-1 text-base text-tinta transition-colors hover:text-oliva"
                >
                  <InstagramIconComponent className="size-4" /> {persona.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="contenedor flex flex-col gap-2 border-t border-tinta/10 py-6 sm:flex-row sm:justify-between">
        {/* PENDIENTE: enlaces a aviso legal y privacidad cuando tengamos sus datos. */}
        <p>
          © {new Date().getFullYear()} {marca.nombre}
        </p>
        <p>Entrenamiento · Nutrición</p>
      </div>

      {/* Marca gigante decorativa, cortada por abajo. */}
      <div aria-hidden="true" className="pointer-events-none -mb-[0.22em] overflow-hidden text-center select-none">
        {/* El texto va en un pseudoelemento (data-texto): es decoración, no contenido. */}
        <m.div className="marca-gigante titulo text-[34vw] leading-[0.8] text-tinta/[0.06] italic" data-texto={WORDMARK} style={{ y: wordmarkY }} />
      </div>
    </footer>
  );
  // #endregion
};

export default FooterComponent;
