// Migas de pan de las fichas. Las usan tanto la página (navegación) como el SEO (datos estructurados).
import type { BreadcrumbItem } from '../components/ui/Breadcrumbs/IBreadcrumbsProps';
import type { EntradaDiarioDTO } from '../dtos/EntradaDiarioDTO';
import type { RecetaDTO } from '../dtos/RecetaDTO';
import { AppAnchor, AppRoute } from '../enums/AppRoute';

const HOME_ITEM: BreadcrumbItem = { label: 'Inicio', to: AppRoute.Home };

export const buildRecipeBreadcrumbs = (receta: RecetaDTO): BreadcrumbItem[] => [
  HOME_ITEM,
  { label: 'Nutrición', to: AppRoute.Nutrition },
  { label: 'Recetas', to: `${AppRoute.Nutrition}#${AppAnchor.Recipes}` },
  { label: receta.titulo }
];

export const buildDiaryBreadcrumbs = (entrada: EntradaDiarioDTO): BreadcrumbItem[] => [
  HOME_ITEM,
  { label: 'Entrenamiento', to: AppRoute.Training },
  { label: 'Diario', to: `${AppRoute.Training}#${AppAnchor.Diary}` },
  { label: entrada.titulo }
];
