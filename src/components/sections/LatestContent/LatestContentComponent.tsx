// Lo último publicado: tres recetas de Marta y tres entradas del diario de Fran (carrusel en el móvil).
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CarouselComponent from '../../ui/Carousel/CarouselComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import SectionComponent from '../../ui/Section/SectionComponent';
import DiaryCardComponent from '../DiaryCard/DiaryCardComponent';
import RecipeCardComponent from '../RecipeCard/RecipeCardComponent';
import { AppAnchor, AppRoute } from '../../../enums/AppRoute';
import { recetas } from '../../../data/recetas';
import { entradasDiario, ordenarPorFecha } from '../../../data/diario';

const NUMERO_ULTIMAS_PUBLICACIONES = 3;
const REVEAL_STEP_MS = 120;
const GRID_COLUMNS = 'sm:grid-cols-2 lg:grid-cols-3';
const SEE_ALL_CLASSES = 'group mt-10 inline-flex items-center gap-2 font-medium underline decoration-acento-suave underline-offset-8 transition-colors hover:decoration-current';

const LatestContentComponent = () => (
  <>
    <SectionComponent
      eyebrow="De la cocina de Marta"
      title={
        <>
          Recetas para <em>cuidarte</em>
        </>
      }
      intro="Recetas saludables y sencillas, con comida real, para cuidar tu corazón sin pasar hambre."
    >
      <CarouselComponent
        label="Últimas recetas"
        gridClassName={GRID_COLUMNS}
        items={recetas.slice(0, NUMERO_ULTIMAS_PUBLICACIONES).map((receta, index) => (
          <RevealComponent key={receta.slug} delay={index * REVEAL_STEP_MS} className="h-full">
            <RecipeCardComponent receta={receta} />
          </RevealComponent>
        ))}
      />
      <Link to={`${AppRoute.Nutrition}#${AppAnchor.Recipes}`} className={`${SEE_ALL_CLASSES} text-oliva`}>
        Ver todas las recetas <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </SectionComponent>

    <SectionComponent
      eyebrow="El diario de Fran"
      title={
        <>
          Entrenar, <em>de verdad</em>
        </>
      }
      intro="Cómo entrena Fran, qué le funciona y lo que ha aprendido desde su operación."
      className="pt-0 sm:pt-0 lg:pt-0"
    >
      <CarouselComponent
        label="Últimas entradas del diario"
        gridClassName={GRID_COLUMNS}
        items={ordenarPorFecha(entradasDiario)
          .slice(0, NUMERO_ULTIMAS_PUBLICACIONES)
          .map((entrada, index) => (
            <RevealComponent key={entrada.slug} delay={index * REVEAL_STEP_MS} className="h-full">
              <DiaryCardComponent entrada={entrada} />
            </RevealComponent>
          ))}
      />
      <Link to={`${AppRoute.Training}#${AppAnchor.Diary}`} className={`${SEE_ALL_CLASSES} text-tierra`}>
        Ver todo el diario <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </SectionComponent>
  </>
);

export default LatestContentComponent;
