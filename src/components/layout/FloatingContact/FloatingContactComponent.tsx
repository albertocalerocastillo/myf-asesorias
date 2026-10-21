// En el móvil y la tablet, al bajar un poco aparece un botón fijo para escribirles: el contacto
// siempre a un toque. Se esconde al llegar al bloque de contacto (y en el pie, que va debajo),
// para no taparlo. Respeta la barra de inicio del iPhone (utilidad "abajo-seguro").
import { useEffect, useState } from 'react';
import HeartIconComponent from '../../ui/Icons/HeartIconComponent';
import { AppAnchor } from '../../../enums/AppRoute';
import { useScrolled } from '../../../hooks/useScrolled';

const SHOW_AFTER_PX = 600;

const FloatingContactComponent = () => {
  // #region Declaraciones
  const scrolled = useScrolled(SHOW_AFTER_PX);
  const [reachedContact, setReachedContact] = useState<boolean>(false);
  const visible = scrolled && !reachedContact;
  // #endregion

  // #region Efectos
  useEffect(() => {
    const contact = document.getElementById(AppAnchor.Contact);
    if (!contact) {
      return;
    }

    // Se considera "llegado" si el contacto está en pantalla o ya se ha pasado (estamos en el pie).
    const observer = new IntersectionObserver(([entry]) => setReachedContact(entry.isIntersecting || entry.boundingClientRect.top < 0));
    observer.observe(contact);

    return () => observer.disconnect();
  }, []);
  // #endregion

  // #region Renderizado
  return (
    <a
      href={`#${AppAnchor.Contact}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`al-tocar abajo-seguro fixed right-4 left-4 z-30 flex items-center justify-center gap-2 rounded-full bg-acento px-6 py-4 font-semibold text-white shadow-xl shadow-acento/30 transition-all duration-300 sm:right-6 sm:left-auto lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'
      }`}
    >
      <HeartIconComponent className="size-5" /> Cuéntanos tu caso
    </a>
  );
  // #endregion
};

export default FloatingContactComponent;
