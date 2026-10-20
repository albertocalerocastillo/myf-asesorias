// Menú del móvil a pantalla completa. Se abre como un círculo que crece desde el botón de la
// cabecera y las opciones entran escalonadas; al cerrar, todo se recoge al revés.
// Cerrado queda "inert": no se puede tabular a sus enlaces ni lo leen los lectores de pantalla.
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeartbeatComponent from '../../ui/Heartbeat/HeartbeatComponent';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import { MENU_LINKS } from '../navigation';
import { AppAnchor, AppRoute } from '../../../enums/AppRoute';
import { obtenerUrlInstagram, personas } from '../../../data/equipo';
import type { IMobileMenuProps } from './IMobileMenuProps';

const ESCAPE_KEY = 'Escape';
// Centro del círculo: el botón de menú, arriba a la derecha.
const REVEAL_ORIGIN = 'at calc(100% - 2.75rem) 2.25rem';
const REVEAL_DURATION = '700ms';

// Retraso escalonado de cada elemento al abrir (al cerrar, todos a la vez).
const staggerStyle = (open: boolean, order: number): CSSProperties => ({ transitionDelay: open ? `${150 + order * 60}ms` : '0ms' });

const MobileMenuComponent = ({ open, onClose }: IMobileMenuProps) => {
  // #region Declaraciones
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const getLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `titulo flex items-center justify-between rounded-2xl px-5 py-4 text-3xl font-semibold al-tocar ${
      isActive ? 'bg-corazon-claro text-corazon' : 'text-tinta active:bg-arena'
    }`;

  const itemClasses = `transition-[opacity,transform] duration-500 ease-[var(--ease-suave)] ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`;
  // #endregion

  // #region Efectos
  // Con el menú abierto: la página de detrás no se mueve, Escape lo cierra y el foco va al primer enlace.
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === ESCAPE_KEY) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    firstLinkRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);
  // #endregion

  // #region Renderizado
  return (
    <nav
      id="menu-movil"
      aria-label="Principal"
      inert={!open}
      style={{
        clipPath: `circle(${open ? '150%' : '0%'} ${REVEAL_ORIGIN})`,
        // Al abrir, visible al instante (para poder enfocarlo); al cerrar, se oculta cuando acaba el círculo.
        transition: `clip-path ${REVEAL_DURATION} var(--ease-suave)${open ? '' : `, visibility 0s linear ${REVEAL_DURATION}`}`
      }}
      className={`fixed inset-0 z-30 flex flex-col overflow-y-auto bg-crema px-5 pt-28 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-8 lg:hidden ${
        open ? 'visible' : 'invisible'
      }`}
    >
      <HeartbeatComponent className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full text-corazon/10" />

      <ul className="relative space-y-1">
        {MENU_LINKS.map((link, index) => (
          <li key={link.to} className={itemClasses} style={staggerStyle(open, index)}>
            <NavLink
              ref={index === 0 ? firstLinkRef : undefined}
              to={link.to}
              end={link.to === AppRoute.Home}
              className={getLinkClasses}
              onClick={onClose}
            >
              {link.label}
              <ArrowRight className="size-6 opacity-40" aria-hidden="true" />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={`relative mt-auto pt-10 ${itemClasses}`} style={staggerStyle(open, MENU_LINKS.length)}>
        <a
          href={`#${AppAnchor.Contact}`}
          onClick={onClose}
          className="al-tocar flex items-center justify-center gap-2 rounded-full bg-corazon px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-corazon/25"
        >
          Cuéntanos tu caso <ArrowRight className="size-5" aria-hidden="true" />
        </a>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {personas.map((persona) => (
            <a
              key={persona.nombre}
              href={obtenerUrlInstagram(persona.instagram)}
              target="_blank"
              rel="noreferrer"
              className="al-tocar flex items-center justify-center gap-2 rounded-full border border-tinta/10 bg-white py-3 text-sm font-semibold"
            >
              <InstagramIconComponent className="size-4" /> {persona.nombre}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
  // #endregion
};

export default MobileMenuComponent;
