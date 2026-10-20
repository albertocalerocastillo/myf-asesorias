// Cabecera fija con el menú; en el móvil se despliega con el botón de hamburguesa.
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import HeartIconComponent from '../../ui/Icons/HeartIconComponent';
import { AppAnchor, AppRoute } from '../../../enums/AppRoute';
import { marca } from '../../../data/equipo';

const MENU_LINKS = [
  { to: AppRoute.Home, label: 'Inicio' },
  { to: AppRoute.Nutrition, label: 'Nutrición' },
  { to: AppRoute.Training, label: 'Entrenamiento' },
  { to: AppRoute.HowWeWork, label: 'Cómo trabajamos' }
];

const HeaderComponent = () => {
  // #region Declaraciones
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const getLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `font-medium transition hover:text-corazon ${isActive ? 'text-corazon' : 'text-tinta'}`;

  const closeMenu = (): void => setMenuOpen(false);
  // #endregion

  // #region Renderizado
  return (
    <header className="sticky top-0 z-40 border-b border-tinta/5 bg-crema/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to={AppRoute.Home} className="flex items-center gap-2" onClick={closeMenu}>
          <HeartIconComponent className="size-6 text-corazon" />
          <span className="titulo text-xl font-bold">{marca.nombre}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {MENU_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === AppRoute.Home} className={getLinkClasses}>
              {link.label}
            </NavLink>
          ))}
          <a href={`#${AppAnchor.Contact}`} className="rounded-full bg-corazon px-5 py-2 font-semibold text-white hover:bg-corazon-oscuro">
            Contacto
          </a>
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
          {menuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-tinta/5 px-4 py-6 md:hidden">
          {MENU_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === AppRoute.Home} className={getLinkClasses} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
          <a href={`#${AppAnchor.Contact}`} onClick={closeMenu} className="font-semibold text-corazon">
            Contacto
          </a>
        </nav>
      )}
    </header>
  );
  // #endregion
};

export default HeaderComponent;
