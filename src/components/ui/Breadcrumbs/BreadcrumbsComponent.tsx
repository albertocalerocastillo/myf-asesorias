// Migas de pan: dicen dónde estás y permiten volver atrás de un toque. Google las usa en los resultados.
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { IBreadcrumbsProps } from './IBreadcrumbsProps';

const BreadcrumbsComponent = ({ items }: IBreadcrumbsProps) => (
  <nav aria-label="Estás en" className="mb-8 text-sm">
    <ol className="flex flex-wrap items-center gap-1.5 text-gris">
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />}
          {item.to ? (
            <Link to={item.to} className="underline-offset-4 hover:text-acento hover:underline">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="font-medium text-tinta">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default BreadcrumbsComponent;
