// Recetario con filtros por etiqueta (Desayuno, Cena, Vegetariana…). Las etiquetas salen solas de
// las recetas, así que al añadir una receta con una etiqueta nueva aparece su filtro.
import { useState } from 'react';
import RecipeCardComponent from '../RecipeCard/RecipeCardComponent';
import { obtenerEtiquetasRecetas, recetas } from '../../../data/recetas';

const ALL_FILTER = null;

const RecipeListComponent = () => {
  // #region Declaraciones
  const [filtro, setFiltro] = useState<string | null>(ALL_FILTER);
  const etiquetas = obtenerEtiquetasRecetas();
  const visibles = filtro ? recetas.filter((receta) => receta.etiquetas.includes(filtro)) : recetas;

  const getChipClasses = (active: boolean): string =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      active ? 'bg-salvia text-white shadow-md shadow-salvia/20' : 'border border-tinta/10 bg-white text-tinta hover:border-salvia hover:text-salvia'
    }`;
  // #endregion

  // #region Renderizado
  return (
    <>
      <div role="group" aria-label="Filtrar recetas" className="mb-8 flex flex-wrap items-center gap-2">
        <button type="button" aria-pressed={filtro === ALL_FILTER} onClick={() => setFiltro(ALL_FILTER)} className={getChipClasses(filtro === ALL_FILTER)}>
          Todas
        </button>
        {etiquetas.map((etiqueta) => (
          <button
            key={etiqueta}
            type="button"
            aria-pressed={filtro === etiqueta}
            onClick={() => setFiltro(filtro === etiqueta ? ALL_FILTER : etiqueta)}
            className={getChipClasses(filtro === etiqueta)}
          >
            {etiqueta}
          </button>
        ))}
        <span className="ml-auto text-sm text-gris" aria-live="polite">
          {visibles.length} {visibles.length === 1 ? 'receta' : 'recetas'}
        </span>
      </div>

      {/* La clave por filtro hace que la lista vuelva a entrar con su animación al cambiarlo. */}
      <div key={filtro ?? 'todas'} className="aparece grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((receta) => (
          <RecipeCardComponent key={receta.slug} receta={receta} />
        ))}
      </div>
    </>
  );
  // #endregion
};

export default RecipeListComponent;
