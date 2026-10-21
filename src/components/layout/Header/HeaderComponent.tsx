// Cabecera fija: transparente arriba del todo; al bajar se convierte en una píldora flotante con
// efecto cristal, se esconde mientras bajas y vuelve en cuanto subes.
// En el móvil, el botón de hamburguesa se transforma en una X y abre MobileMenuComponent.
import { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { m, useMotionValueEvent, useScroll } from 'motion/react';
import ButtonComponent from '../../ui/Button/ButtonComponent';
import MobileMenuComponent from '../MobileMenu/MobileMenuComponent';
import { MENU_LINKS } from '../navigation';
import { AppAnchor, AppRoute } from '../../../enums/AppRoute';
import { useScrolled } from '../../../hooks/useScrolled';
import { marca } from '../../../data/equipo';
import { EASE_SMOOTH } from '../../../theme/animation';

const SCROLL_OFFSET = 12;
const HIDE_AFTER_PX = 400;
const HIDDEN_OFFSET = '-130%';
const HIDE_DURATION_S = 0.45;
const LOGO_MARK = '/logo-marca.webp';
// Cada raya del botón de menú: arriba y abajo giran para formar la X, la del medio desaparece.
const BURGER_LINE = 'absolute left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-tinta transition-all duration-300 ease-[var(--ease-suave)]';

const HeaderComponent = () => {
  // #region Declaraciones
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const scrolled = useScrolled(SCROLL_OFFSET);
  const [hidden, setHidden] = useState<boolean>(false);
  const { scrollY } = useScroll();
  // Con el menú abierto, la cabecera siempre visible y en su forma de píldora.
  const pill = scrolled || menuOpen;

  // Al bajar se esconde (deja ver el contenido) y al subir vuelve a aparecer.
  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > HIDE_AFTER_PX && !menuOpen);
  });

  const getDesktopLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `relative py-1 font-medium transition-colors hover:text-acento after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-acento after:transition-transform ${
      isActive ? 'text-acento after:scale-x-100' : 'text-tinta after:scale-x-0'
    }`;

  // Estable entre renderizados: el menú la usa dentro de un efecto.
  const closeMenu = useCallback((): void => setMenuOpen(false), []);
  // #endregion

  // #region Renderizado
  return (
    <>
      {/* Progreso de lectura de la página, arriba del todo (solo en navegadores que lo soportan, ver theme.css). */}
      <span aria-hidden="true" className="barra-progreso fixed inset-x-0 top-0 z-50 h-0.5 bg-acento" />

      <m.header
        className={`sticky top-0 z-40 transition-[padding] duration-500 ease-[var(--ease-suave)] ${pill ? 'px-3 pt-3' : ''}`}
        animate={{ y: hidden ? HIDDEN_OFFSET : 0 }}
        transition={{ duration: HIDE_DURATION_S, ease: EASE_SMOOTH }}
      >
        <div
          className={`contenedor flex items-center justify-between transition-all duration-500 ease-[var(--ease-suave)] ${
            pill
              ? 'h-14 max-w-5xl rounded-full border border-tinta/5 bg-crema/80 shadow-[0_10px_40px_-12px_rgb(45_48_33/0.25)] backdrop-blur-md sm:px-6 lg:h-16'
              : 'h-16 lg:h-18'
          }`}
        >
          <Link to={AppRoute.Home} className="group al-tocar flex items-center gap-2.5" onClick={closeMenu} aria-label={`${marca.nombre}, ir al inicio`}>
            <img src={LOGO_MARK} alt="" width={117} height={88} className="h-10 w-auto transition group-hover:scale-105 lg:h-11" />
            <span className="titulo text-lg whitespace-nowrap lg:text-xl">{marca.nombre}</span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {MENU_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === AppRoute.Home} className={getDesktopLinkClasses}>
                {link.label}
              </NavLink>
            ))}
            <ButtonComponent href={`#${AppAnchor.Contact}`} className="px-5! py-2.5!">
              Hablemos
            </ButtonComponent>
          </nav>

          <button
            type="button"
            className="al-tocar relative -mr-2 size-11 rounded-full active:bg-arena lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span aria-hidden="true" className={`${BURGER_LINE} ${menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[15px]'}`} />
            <span aria-hidden="true" className={`${BURGER_LINE} top-1/2 -translate-y-1/2 ${menuOpen ? 'scale-x-0 opacity-0' : ''}`} />
            <span aria-hidden="true" className={`${BURGER_LINE} ${menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[27px]'}`} />
          </button>
        </div>
      </m.header>

      <MobileMenuComponent open={menuOpen} onClose={closeMenu} />
    </>
  );
  // #endregion
};

export default HeaderComponent;
