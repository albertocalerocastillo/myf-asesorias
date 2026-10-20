// Cabecera fija: transparente arriba del todo y con fondo al hacer scroll.
// En el móvil, menú a pantalla completa con botones grandes y fáciles de pulsar.
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AppAnchor, AppRoute } from '../../../enums/AppRoute';
import { useScrolled } from '../../../hooks/useScrolled';
import { marca } from '../../../data/equipo';

const SCROLL_OFFSET = 12;
const LOGO_ICON = '/logo-icono.webp';

const MENU_LINKS = [
  { to: AppRoute.Home, label: 'Inicio' },
  { to: AppRoute.Nutrition, label: 'Nutrición' },
  { to: AppRoute.Training, label: 'Entrenamiento' },
  { to: AppRoute.HowWeWork, label: 'Cómo trabajamos' }
];

const HeaderComponent = () => {
  // #region Declaraciones
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const scrolled = useScrolled(SCROLL_OFFSET);

  const getDesktopLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `relative py-1 font-medium transition-colors hover:text-corazon after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-corazon after:transition-transform ${
      isActive ? 'text-corazon after:scale-x-100' : 'text-tinta after:scale-x-0'
    }`;

  const getMobileLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `flex items-center justify-between rounded-2xl px-5 py-4 text-2xl font-semibold titulo ${
      isActive ? 'bg-corazon-claro text-corazon' : 'text-tinta'
    }`;

  const closeMenu = (): void => setMenuOpen(false);
  // #endregion

  // #region Efectos
  // Con el menú abierto, la página de detrás no se desplaza.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);
  // #endregion

  // #region Renderizado
  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled || menuOpen ? 'bg-crema/95 shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur' : 'bg-transparent'
        }`}
      >
        <div className="contenedor flex h-18 items-center justify-between">
          <Link to={AppRoute.Home} className="group flex items-center gap-2.5" onClick={closeMenu} aria-label={`${marca.nombre}, ir al inicio`}>
            <img src={LOGO_ICON} alt="" width={40} height={40} className="size-10 rounded-xl transition group-hover:scale-105" />
            <span className="titulo text-xl font-bold whitespace-nowrap">{marca.nombre}</span>
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
            className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>
        {/* Progreso de lectura de la página (solo en navegadores que lo soportan, ver theme.css). */}
        <span aria-hidden="true" className="barra-progreso absolute inset-x-0 bottom-0 h-0.5 bg-corazon" />
      </header>

      {/* Menú del móvil: capa a pantalla completa por debajo de la cabecera. Va fuera del <header>
          porque el desenfoque (backdrop-blur) de la cabecera atraparía un elemento fijo dentro de ella. */}
      {menuOpen && (
        <nav id="menu-movil" aria-label="Principal" className="fixed inset-0 z-30 flex flex-col gap-2 overflow-y-auto bg-crema px-5 pt-28 pb-8 sm:px-8 lg:hidden">
          {MENU_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === AppRoute.Home} className={getMobileLinkClasses} onClick={closeMenu}>
              {link.label}
              <ArrowRight className="size-5 opacity-40" aria-hidden="true" />
            </NavLink>
          ))}
          <a
            href={`#${AppAnchor.Contact}`}
            onClick={closeMenu}
            className="mt-auto rounded-full bg-corazon px-6 py-4 text-center text-lg font-semibold text-white"
          >
            Hablemos por Instagram
          </a>
        </nav>
      )}
    </>
  );
  // #endregion
};

export default HeaderComponent;
