// Página de Marta: su presentación y el recetario.
import ProfileIntroComponent from '../../components/sections/ProfileIntro/ProfileIntroComponent';
import RecipeCardComponent from '../../components/sections/RecipeCard/RecipeCardComponent';
import RevealComponent from '../../components/ui/Reveal/RevealComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import { AppAnchor } from '../../enums/AppRoute';
import { marta } from '../../data/equipo';
import { recetas } from '../../data/recetas';

const REVEAL_STEP_MS = 100;

const NutritionComponent = () => (
  <>
    <ProfileIntroComponent persona={marta} contentAnchor={AppAnchor.Recipes} />
    <SectionComponent
      id={AppAnchor.Recipes}
      eyebrow="Recetario"
      title="Recetas para cuidarte sin renunciar a nada"
      intro="Platos sencillos, de comida real y buenos para tu corazón. Los preparo en mi propia cocina."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recetas.map((receta, index) => (
          <RevealComponent key={receta.slug} delay={(index % 3) * REVEAL_STEP_MS} className="h-full">
            <RecipeCardComponent receta={receta} />
          </RevealComponent>
        ))}
      </div>
    </SectionComponent>
  </>
);

export default NutritionComponent;
