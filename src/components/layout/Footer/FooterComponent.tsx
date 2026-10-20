import { Link } from 'react-router-dom';
import { AppRoute } from '../../../enums/AppRoute';
import { marca } from '../../../data/equipo';

const FooterComponent = () => (
  <footer className="bg-tinta text-sm text-crema/60">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/10 px-4 py-8 sm:px-6">
      {/* Aviso de salud: la web divulga, no diagnostica. */}
      <p className="max-w-3xl">
        La información de esta web es divulgativa y no sustituye la consulta con tu médico. Si tienes alguna patología,
        consulta con tu especialista antes de empezar un plan de alimentación o de entrenamiento.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <span>
          © {new Date().getFullYear()} {marca.nombre}
        </span>
        <Link to={AppRoute.Home} className="hover:text-crema">Inicio</Link>
        <Link to={AppRoute.Nutrition} className="hover:text-crema">Nutrición</Link>
        <Link to={AppRoute.Training} className="hover:text-crema">Entrenamiento</Link>
      </div>
    </div>
  </footer>
);

export default FooterComponent;
