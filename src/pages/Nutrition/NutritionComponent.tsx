// Página de Marta: su presentación y el recetario.
import ProfileIntroComponent from '../../components/sections/ProfileIntro/ProfileIntroComponent';
import RecipeCardComponent from '../../components/sections/RecipeCard/RecipeCardComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import { AppAnchor } from '../../enums/AppRoute';
import { marta } from '../../data/equipo';
import { recetas } from '../../data/recetas';

const NutritionComponent = () => (
  <>
    <ProfileIntroComponent persona={marta} />
    <SectionComponent
      id={AppAnchor.Recipes}
      eyebrow="Recetario"
      title="Recetas para cuidarte sin renunciar a nada"
      intro="Platos sencillos, de comida real, que preparo en mi propia cocina."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recetas.map((receta) => (
          <RecipeCardComponent key={receta.slug} receta={receta} />
        ))}
      </div>
    </SectionComponent>
  </>
);

export default NutritionComponent;
