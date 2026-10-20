// En el móvil, al bajar un poco aparece un botón fijo para escribirles: el contacto siempre a un toque.
// Se esconde al llegar al bloque de contacto, para no taparlo.
import { useEffect, useState } from 'react';
import HeartIconComponent from '../../ui/Icons/HeartIconComponent';
import { AppAnchor } from '../../../enums/AppRoute';
import { useScrolled } from '../../../hooks/useScrolled';

const SHOW_AFTER_PX = 600;

const FloatingContactComponent = () => {
  // #region Declaraciones
  const scrolled = useScrolled(SHOW_AFTER_PX);
  const [contactInView, setContactInView] = useState<boolean>(false);
  const visible = scrolled && !contactInView;
  // #endregion

  // #region Efectos
  useEffect(() => {
    const contact = document.getElementById(AppAnchor.Contact);
    if (!contact) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting));
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
      className={`fixed right-4 bottom-4 left-4 z-30 flex items-center justify-center gap-2 rounded-full bg-corazon px-6 py-4 font-semibold text-white shadow-xl shadow-corazon/30 transition-all duration-300 sm:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'
      }`}
    >
      <HeartIconComponent className="size-5" /> Cuéntanos tu caso
    </a>
  );
  // #endregion
};

export default FloatingContactComponent;
