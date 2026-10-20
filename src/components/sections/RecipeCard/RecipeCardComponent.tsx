// Tarjeta de receta para los listados (recetario y portada).
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import PhotoPlaceholderComponent from '../../ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import TagComponent from '../../ui/Tag/TagComponent';
import { buildRecipeRoute } from '../../../enums/AppRoute';
import { Tone } from '../../../enums/Tone';
import { formatearRaciones } from '../../../data/recetas';
import type { IRecipeCardProps } from './IRecipeCardProps';

const RecipeCardComponent = ({ receta }: IRecipeCardProps) => (
  <Link
    to={buildRecipeRoute(receta.slug)}
    className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <PhotoPlaceholderComponent label="Foto del plato" tone={Tone.Sage} className="aspect-[4/3] rounded-none" />
    <div className="flex flex-1 flex-col gap-3 p-6">
      <div className="flex flex-wrap gap-2">
        {receta.etiquetas.map((etiqueta) => (
          <TagComponent key={etiqueta} label={etiqueta} />
        ))}
      </div>
      <h3 className="text-xl font-bold group-hover:text-salvia">{receta.titulo}</h3>
      <p className="flex-1 text-gris">{receta.resumen}</p>
      <p className="flex gap-4 text-sm text-gris">
        <span className="flex items-center gap-1">
          <Clock className="size-4" /> {receta.minutos} min
        </span>
        <span className="flex items-center gap-1">
          <Users className="size-4" /> {formatearRaciones(receta.raciones)}
        </span>
      </p>
    </div>
  </Link>
);

export default RecipeCardComponent;
