// Página de Marta: su presentación y el recetario.
import ProfileIntroComponent from '../../components/sections/ProfileIntro/ProfileIntroComponent';
import RecipeListComponent from '../../components/sections/RecipeList/RecipeListComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import { AppAnchor } from '../../enums/AppRoute';
import { marta } from '../../data/equipo';

const NutritionComponent = () => (
  <>
    <ProfileIntroComponent persona={marta} contentAnchor={AppAnchor.Recipes} />
    <SectionComponent
      id={AppAnchor.Recipes}
      eyebrow="Recetario"
      title="Recetas para cuidarte sin renunciar a nada"
      intro="Platos sencillos, de comida real y buenos para tu corazón. Los preparo en mi propia cocina."
    >
      <RecipeListComponent />
    </SectionComponent>
  </>
);

export default NutritionComponent;
