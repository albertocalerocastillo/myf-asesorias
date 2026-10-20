// Cabecera fija: transparente arriba del todo y con fondo al hacer scroll.
// En el móvil, el botón de hamburguesa se transforma en una X y abre MobileMenuComponent.
import { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MobileMenuComponent from '../MobileMenu/MobileMenuComponent';
import { MENU_LINKS } from '../navigation';
import { AppAnchor, AppRoute } from '../../../enums/AppRoute';
import { useScrolled } from '../../../hooks/useScrolled';
import { marca } from '../../../data/equipo';

const SCROLL_OFFSET = 12;
const LOGO_ICON = '/logo-icono.webp';
// Cada raya del botón de menú: arriba y abajo giran para formar la X, la del medio desaparece.
const BURGER_LINE = 'absolute left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-tinta transition-all duration-300 ease-[var(--ease-suave)]';

const HeaderComponent = () => {
  // #region Declaraciones
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const scrolled = useScrolled(SCROLL_OFFSET);

  const getDesktopLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `relative py-1 font-medium transition-colors hover:text-corazon after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-corazon after:transition-transform ${
      isActive ? 'text-corazon after:scale-x-100' : 'text-tinta after:scale-x-0'
    }`;

  // Estable entre renderizados: el menú la usa dentro de un efecto.
  const closeMenu = useCallback((): void => setMenuOpen(false), []);
  // #endregion

  // #region Renderizado
  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled || menuOpen ? 'bg-crema/95 shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur' : 'bg-transparent'
        }`}
      >
        <div className="contenedor flex h-16 items-center justify-between lg:h-18">
          <Link to={AppRoute.Home} className="group al-tocar flex items-center gap-2.5" onClick={closeMenu} aria-label={`${marca.nombre}, ir al inicio`}>
            <img src={LOGO_ICON} alt="" width={40} height={40} className="size-9 rounded-xl transition group-hover:scale-105 lg:size-10" />
            <span className="titulo text-lg font-bold whitespace-nowrap lg:text-xl">{marca.nombre}</span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {MENU_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === AppRoute.Home} className={getDesktopLinkClasses}>
                {link.label}
              </NavLink>
            ))}
            <a
              href={`#${AppAnchor.Contact}`}
              className="rounded-full bg-corazon px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-corazon-oscuro"
            >
              Hablemos
            </a>
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
        {/* Progreso de lectura de la página (solo en navegadores que lo soportan, ver theme.css). */}
        <span aria-hidden="true" className="barra-progreso absolute inset-x-0 bottom-0 h-0.5 bg-corazon" />
      </header>

      <MobileMenuComponent open={menuOpen} onClose={closeMenu} />
    </>
  );
  // #endregion
};

export default HeaderComponent;
