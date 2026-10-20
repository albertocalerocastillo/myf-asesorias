// Enlaces del menú principal, compartidos por la cabecera de escritorio y el menú del móvil.
import { AppRoute } from '../../enums/AppRoute';

export const MENU_LINKS = [
  { to: AppRoute.Home, label: 'Inicio' },
  { to: AppRoute.Nutrition, label: 'Nutrición' },
  { to: AppRoute.Training, label: 'Entrenamiento' },
  { to: AppRoute.HowWeWork, label: 'Cómo trabajamos' }
];
