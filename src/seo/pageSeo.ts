// Título, descripción y datos estructurados de cada ruta. Es la única fuente: la usan el
// navegador (SeoManagerComponent) y el prerenderizado (scripts/prerender.mjs).
import { AppRoute, buildDiaryRoute, buildRecipeRoute } from '../enums/AppRoute';
import { fran, marta } from '../data/equipo';
import { buscarReceta, recetas } from '../data/recetas';
import { buscarEntradaDiario, entradasDiario } from '../data/diario';
import { preguntasFrecuentes } from '../data/servicio';
import { buildDiaryBreadcrumbs, buildRecipeBreadcrumbs } from './breadcrumbs';
import {
  buildBlogPostingData,
  buildBreadcrumbData,
  buildFaqData,
  buildOrganizationData,
  buildProfilePageData,
  buildRecipeData,
  buildWebsiteData
} from './structuredData';
import { PageType, type IPageSeo } from './IPageSeo';
import { buildAbsoluteUrl, DEFAULT_IMAGE, SITE_NAME, TITLE_SEPARATOR } from './siteConfig';
import { FOTO_EQUIPO, fotoEntradaDiario, fotoPersona, fotoReceta, obtenerRutaFoto } from '../data/fotos';

export const NOT_FOUND_PATH = '/404';

const HOME_DESCRIPTION =
  'Asesoría online de nutrición y entrenamiento personal con Marta y Fran, dos personas operadas de corazón. Plan a tu medida en la app Jarvis y trato directo.';

const withSiteName = (title: string): string => `${title}${TITLE_SEPARATOR}${SITE_NAME}`;

// URL absoluta de una foto, o la imagen general para compartir si todavía no existe.
const photoUrl = (photo: string): string => {
  const ruta = obtenerRutaFoto(photo);
  const result = ruta ? buildAbsoluteUrl(ruta) : DEFAULT_IMAGE;
  return result;
};

const HOME_IMAGE = photoUrl(FOTO_EQUIPO);

const STATIC_PAGES: Record<string, IPageSeo> = {
  [AppRoute.Home]: {
    title: `${SITE_NAME}${TITLE_SEPARATOR}Nutrición y entrenamiento personal online`,
    description: HOME_DESCRIPTION,
    path: AppRoute.Home,
    image: HOME_IMAGE,
    structuredData: [buildOrganizationData(HOME_DESCRIPTION, HOME_IMAGE), buildWebsiteData()]
  },
  [AppRoute.Nutrition]: {
    title: withSiteName('Nutrición personalizada online con Marta'),
    description:
      'Planes de alimentación a tu medida, con comida real y sin dietas milagro. Conoce a Marta, su historia y sus recetas saludables para cuidar tu corazón.',
    path: AppRoute.Nutrition,
    image: photoUrl(fotoPersona(marta)),
    type: PageType.Profile,
    structuredData: [buildProfilePageData(marta)]
  },
  [AppRoute.Training]: {
    title: withSiteName('Entrenador personal online: entrena con Fran'),
    description:
      'Entrenamientos personalizados y seguros, adaptados a tu nivel, en la app Jarvis. Conoce a Fran, su historia y su diario de entrenamiento.',
    path: AppRoute.Training,
    image: photoUrl(fotoPersona(fran)),
    type: PageType.Profile,
    structuredData: [buildProfilePageData(fran)]
  },
  [AppRoute.HowWeWork]: {
    title: withSiteName('Cómo funciona la asesoría'),
    description:
      'Qué puedes esperar de nuestra asesoría de nutrición y entrenamiento: los pasos, qué incluye, la app Jarvis y respuestas a las preguntas más habituales.',
    path: AppRoute.HowWeWork,
    structuredData: [buildFaqData(preguntasFrecuentes)]
  },
  [NOT_FOUND_PATH]: {
    title: withSiteName('Página no encontrada'),
    description: 'La página que buscas no existe o ha cambiado de sitio.',
    path: NOT_FOUND_PATH,
    noindex: true
  }
};

const getRecipeSeo = (path: string, slug: string): IPageSeo | null => {
  // #region Declaraciones
  const receta = buscarReceta(slug);
  const image = receta ? photoUrl(fotoReceta(receta)) : DEFAULT_IMAGE;
  // #endregion

  if (!receta) {
    return null;
  }

  const result: IPageSeo = {
    title: withSiteName(`${receta.titulo}: receta saludable`),
    description: `${receta.resumen} Receta de Marta lista en ${receta.minutos} minutos.`,
    path,
    image,
    type: PageType.Article,
    structuredData: [buildRecipeData(receta, marta, image), buildBreadcrumbData(buildRecipeBreadcrumbs(receta), path)]
  };
  return result;
};

const getDiarySeo = (path: string, slug: string): IPageSeo | null => {
  // #region Declaraciones
  const entrada = buscarEntradaDiario(slug);
  const image = entrada ? photoUrl(fotoEntradaDiario(entrada)) : DEFAULT_IMAGE;
  // #endregion

  if (!entrada) {
    return null;
  }

  const result: IPageSeo = {
    title: withSiteName(entrada.titulo),
    description: `${entrada.resumen} Del diario de entrenamiento de Fran.`,
    path,
    image,
    type: PageType.Article,
    structuredData: [buildBlogPostingData(entrada, fran, path, image), buildBreadcrumbData(buildDiaryBreadcrumbs(entrada), path)]
  };
  return result;
};

// Devuelve el SEO de una ruta; si no existe, el de la página 404.
export const getPageSeo = (pathname: string): IPageSeo => {
  // #region Declaraciones
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  const slug = path.split('/').pop() ?? '';
  // #endregion

  let result: IPageSeo | null = STATIC_PAGES[path] ?? null;
  if (!result && path.startsWith(`${AppRoute.Recipe}/`)) {
    result = getRecipeSeo(path, slug);
  }
  if (!result && path.startsWith(`${AppRoute.DiaryEntry}/`)) {
    result = getDiarySeo(path, slug);
  }

  return result ?? STATIC_PAGES[NOT_FOUND_PATH];
};

// Todas las rutas que se generan como HTML al compilar (y que van al sitemap, salvo la 404).
export const getPrerenderRoutes = (): string[] => [
  AppRoute.Home,
  AppRoute.Nutrition,
  AppRoute.Training,
  AppRoute.HowWeWork,
  ...recetas.map((receta) => buildRecipeRoute(receta.slug)),
  ...entradasDiario.map((entrada) => buildDiaryRoute(entrada.slug)),
  NOT_FOUND_PATH
];
