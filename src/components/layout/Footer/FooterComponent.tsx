import { Link } from 'react-router-dom';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import { AppRoute } from '../../../enums/AppRoute';
import { marca, obtenerUrlInstagram, personas } from '../../../data/equipo';

const LOGO_FULL = '/logo-completo.webp';

const FOOTER_LINKS = [
  { to: AppRoute.Nutrition, label: 'Nutrición con Marta' },
  { to: AppRoute.Training, label: 'Entrenamiento con Fran' },
  { to: AppRoute.HowWeWork, label: 'Cómo trabajamos' }
];

const FooterComponent = () => (
  <footer className="border-t border-tinta/10 bg-arena text-sm text-gris">
    <div className="contenedor grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
      <div>
        <Link to={AppRoute.Home} className="mb-4 inline-block" aria-label={`${marca.nombre}, ir al inicio`}>
          <img src={LOGO_FULL} alt="" width={176} height={138} loading="lazy" className="h-auto w-44" />
        </Link>
        {/* Aviso de salud: la web divulga, no diagnostica. */}
        <p className="max-w-md leading-relaxed">
          La información de esta web es divulgativa y no sustituye la consulta con tu médico. Si tienes alguna patología,
          consulta con tu especialista antes de empezar un plan de alimentación o de entrenamiento.
        </p>
      </div>

      <nav aria-label="Pie de página">
        <p className="mb-3 font-semibold text-tinta">La web</p>
        <ul className="space-y-2">
          {FOOTER_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="inline-block py-1 hover:text-acento">{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <p className="mb-3 font-semibold text-tinta">Síguenos</p>
        <ul className="space-y-2">
          {personas.map((persona) => (
            <li key={persona.nombre}>
              <a href={obtenerUrlInstagram(persona.instagram)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 py-1 hover:text-acento">
                <InstagramIconComponent className="size-4" /> {persona.nombre}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="contenedor border-t border-tinta/10 py-6">
      {/* PENDIENTE: enlaces a aviso legal y privacidad cuando tengamos sus datos. */}
      <p>© {new Date().getFullYear()} {marca.nombre}. Hecho con cariño.</p>
    </div>
  </footer>
);

export default FooterComponent;
