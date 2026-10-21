// Nuestra historia: el párrafo se enciende palabra a palabra al bajar y después la foto del equipo
// se abre hasta ocupar la pantalla, con el titular encima.
// PENDIENTE: texto real a partir de lo que nos cuenten Marta y Fran.
import EyebrowComponent from '../../ui/Eyebrow/EyebrowComponent';
import ExpandingPhotoComponent from '../../ui/ExpandingPhoto/ExpandingPhotoComponent';
import ScrollRevealTextComponent from '../../ui/ScrollRevealText/ScrollRevealTextComponent';
import { BRAND_COLORS } from '../../../theme/colors';
import { FOTO_EQUIPO } from '../../../data/fotos';

const STORY_PARTS = [
  { text: 'Pasar por quirófano te cambia la forma de ver la comida, el ejercicio y la salud. A' },
  { text: 'Marta', className: 'italic', color: BRAND_COLORS.oliva },
  { text: 'le enseñó lo importante que es comer bien. A' },
  { text: 'Fran,', className: 'italic', color: BRAND_COLORS.tierra },
  { text: 'lo que vale entrenar para mantenerse fuerte. De ahí nace M&F: para que tú también lo consigas, sin extremos.' }
];

const StoryComponent = () => (
  <section aria-label="Nuestra historia">
    <ScrollRevealTextComponent eyebrow="Nuestra historia" parts={STORY_PARTS} />
    <ExpandingPhotoComponent photo={FOTO_EQUIPO} label="Marta y Fran juntos">
      <EyebrowComponent text="Marta & Fran" inverted />
      <p className="titulo-seccion titulo max-w-3xl text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
        Dos corazones operados. <em>Dos formas de cuidarlo.</em>
      </p>
    </ExpandingPhotoComponent>
  </section>
);

export default StoryComponent;
