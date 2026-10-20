// Rutas de la web. Las fichas añaden el slug detrás (ver buildRecipeRoute / buildDiaryRoute).
export enum AppRoute {
  Home = '/',
  Nutrition = '/nutricion',
  Recipe = '/nutricion/recetas',
  Training = '/entrenamiento',
  DiaryEntry = '/entrenamiento/diario',
  HowWeWork = '/como-trabajamos'
}

// Anclas dentro de las páginas.
export enum AppAnchor {
  Contact = 'contacto',
  Recipes = 'recetas',
  Diary = 'diario'
}

export const buildRecipeRoute = (slug: string): string => `${AppRoute.Recipe}/${slug}`;

export const buildDiaryRoute = (slug: string): string => `${AppRoute.DiaryEntry}/${slug}`;
