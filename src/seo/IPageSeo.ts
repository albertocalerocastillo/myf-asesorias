export enum PageType {
  Website = 'website',
  Article = 'article',
  Profile = 'profile'
}

export interface IPageSeo {
  /** Título completo de la pestaña y del resultado de Google (ideal: menos de 60 caracteres). */
  title: string;
  /** Texto bajo el enlace en Google y al compartir (ideal: 120-160 caracteres). */
  description: string;
  /** Ruta de la página, empezando por "/". Genera el canonical. */
  path: string;
  /** Imagen absoluta para WhatsApp y redes. Si no se indica, la general. */
  image?: string;
  /** Tipo de contenido para Open Graph. */
  type?: PageType;
  /** Datos estructurados (schema.org) de la página. */
  structuredData?: object[];
  /** Si es true, la página no se indexa aunque el sitio esté publicado (p. ej. la 404). */
  noindex?: boolean;
}
