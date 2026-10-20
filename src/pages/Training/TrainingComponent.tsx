// Página de Fran: su presentación y su diario personal.
import ProfileIntroComponent from '../../components/sections/ProfileIntro/ProfileIntroComponent';
import DiaryCardComponent from '../../components/sections/DiaryCard/DiaryCardComponent';
import RevealComponent from '../../components/ui/Reveal/RevealComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import { AppAnchor } from '../../enums/AppRoute';
import { fran } from '../../data/equipo';
import { entradasDiario, ordenarPorFecha } from '../../data/diario';

const REVEAL_STEP_MS = 100;

const TrainingComponent = () => (
  <>
    <ProfileIntroComponent persona={fran} contentAnchor={AppAnchor.Diary} />
    <SectionComponent
      id={AppAnchor.Diary}
      eyebrow="Diario de entreno"
      title="Cómo entreno, qué pienso y lo que voy aprendiendo"
      intro="Un rincón más personal para que me conozcas antes de entrenar conmigo."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordenarPorFecha(entradasDiario).map((entrada, index) => (
          <RevealComponent key={entrada.slug} delay={(index % 3) * REVEAL_STEP_MS} className="h-full">
            <DiaryCardComponent entrada={entrada} />
          </RevealComponent>
        ))}
      </div>
    </SectionComponent>
  </>
);

export default TrainingComponent;
