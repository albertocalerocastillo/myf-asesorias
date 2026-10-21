// Nuestra historia: cuatro capítulos cortos en un mazo de tarjetas que se reparte al bajar (el quirófano,
// Marta, Fran y por qué nace M&F), con el texto encendiéndose en cada una. Después, la foto del equipo
// se abre hasta ocupar la pantalla, con el titular encima.
// PENDIENTE: texto real a partir de lo que nos cuenten Marta y Fran.
import { m } from 'motion/react';
import CardDeckComponent from '../../ui/CardDeck/CardDeckComponent';
import EyebrowComponent from '../../ui/Eyebrow/EyebrowComponent';
import ExpandingPhotoComponent from '../../ui/ExpandingPhoto/ExpandingPhotoComponent';
import PhotoComponent from '../../ui/Photo/PhotoComponent';
import { ECG_PATH } from '../../ui/Heartbeat/HeartbeatComponent';
import { BRAND_COLORS } from '../../../theme/colors';
import { FOTO_EQUIPO, fotoPersona } from '../../../data/fotos';
import { fran, marta } from '../../../data/equipo';
import type { CardDeckItem } from '../../ui/CardDeck/ICardDeckProps';
import type { PersonaDTO } from '../../../dtos/PersonaDTO';

const AVATAR_SIZES = '80px';
const ECG_DRAW_S = 2.4;

// Cabecera de la tarjeta de cada uno: su foto redonda y su área.
const PersonHeader = ({ persona, className }: { persona: PersonaDTO; className: string }) => (
  <span className={`flex items-center gap-4 ${className}`}>
    <PhotoComponent
      photo={fotoPersona(persona)}
      label={persona.nombre}
      tone={persona.tono}
      sizes={AVATAR_SIZES}
      compact
      className="size-16 rounded-full ring-4 ring-white/60 sm:size-20"
    />
    <span className="text-xs font-medium tracking-[0.28em] uppercase">{persona.area}</span>
  </span>
);

const STORY_CARDS: CardDeckItem[] = [
  {
    id: 'quirofano',
    // Línea del latido que se dibuja al aparecer la tarjeta.
    header: (
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" aria-hidden="true" className="h-14 w-full text-tierra sm:h-20">
        <m.path
          d={ECG_PATH}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: ECG_DRAW_S, ease: 'easeInOut' }}
        />
      </svg>
    ),
    parts: [
      { text: 'Pasar por quirófano te cambia la forma de ver' },
      { text: 'la comida, el ejercicio y la salud.', className: 'italic', color: BRAND_COLORS.tierra }
    ],
    className: 'bg-white',
    dimColor: BRAND_COLORS.apagado
  },
  {
    id: 'marta',
    header: <PersonHeader persona={marta} className="text-oliva" />,
    parts: [
      { text: 'A' },
      { text: marta.nombre, className: 'italic', color: BRAND_COLORS.oliva },
      { text: 'le enseñó lo importante que es comer bien.' }
    ],
    className: 'bg-oliva-claro',
    dimColor: BRAND_COLORS.apagadoFuerte
  },
  {
    id: 'fran',
    header: <PersonHeader persona={fran} className="text-tierra" />,
    parts: [
      { text: 'A' },
      { text: `${fran.nombre},`, className: 'italic', color: BRAND_COLORS.tierra },
      { text: 'lo que vale entrenar para mantenerse fuerte.' }
    ],
    className: 'bg-tierra-claro',
    dimColor: BRAND_COLORS.apagadoFuerte
  },
  {
    id: 'myf',
    header: <span className="titulo text-6xl text-acento-suave italic sm:text-7xl">M&amp;F</span>,
    parts: [
      { text: 'De ahí nace M&F: para que tú también lo consigas,', color: BRAND_COLORS.crema },
      { text: 'sin extremos.', className: 'italic', color: BRAND_COLORS.acentoSuave }
    ],
    className: 'fondo-oscuro bg-acento-oscuro',
    dimColor: BRAND_COLORS.apagado
  }
];

const StoryComponent = () => (
  <section aria-label="Nuestra historia">
    <CardDeckComponent
      eyebrow="Nuestra historia"
      title={
        <>
          Lo que aprendimos <em>en el quirófano</em>
        </>
      }
      cards={STORY_CARDS}
    />
    <ExpandingPhotoComponent photo={FOTO_EQUIPO} label="Marta y Fran juntos">
      <EyebrowComponent text="Marta & Fran" inverted />
      <p className="titulo-seccion titulo max-w-3xl text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
        Dos corazones operados. <em>Dos formas de cuidarlo.</em>
      </p>
    </ExpandingPhotoComponent>
  </section>
);

export default StoryComponent;
