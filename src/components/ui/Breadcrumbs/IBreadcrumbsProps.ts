export interface BreadcrumbItem {
  /** Texto visible. */
  label: string;
  /** Ruta interna. El último elemento (página actual) no la lleva. */
  to?: string;
}

export interface IBreadcrumbsProps {
  /** Camino desde la portada hasta la página actual. */
  items: BreadcrumbItem[];
}
