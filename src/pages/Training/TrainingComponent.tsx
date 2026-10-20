// Página de Fran: su presentación y su diario personal.
import ProfileIntroComponent from '../../components/sections/ProfileIntro/ProfileIntroComponent';
import DiaryCardComponent from '../../components/sections/DiaryCard/DiaryCardComponent';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import { AppAnchor } from '../../enums/AppRoute';
import { fran } from '../../data/equipo';
import { entradasDiario } from '../../data/diario';

const TrainingComponent = () => (
  <>
    <ProfileIntroComponent persona={fran} />
    <SectionComponent
      id={AppAnchor.Diary}
      eyebrow="Mi diario"
      title="Cómo entreno, qué pienso y lo que voy aprendiendo"
      intro="Un rincón más personal para que me conozcas antes de entrenar conmigo."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {entradasDiario.map((entrada) => (
          <DiaryCardComponent key={entrada.slug} entrada={entrada} />
        ))}
      </div>
    </SectionComponent>
  </>
);

export default TrainingComponent;
