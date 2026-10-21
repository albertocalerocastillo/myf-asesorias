// "Elige por dónde empezar": una tarjeta grande para Marta (nutrición) y otra para Fran (entreno),
// con foto en arco, lo que incluye y un botón. Se inclinan en 3D con el ratón y entran desde los lados.
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import PhotoComponent from '../../ui/Photo/PhotoComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { RevealFrom } from '../../ui/Reveal/IRevealProps';
import SectionComponent from '../../ui/Section/SectionComponent';
import TiltCardComponent from '../../ui/TiltCard/TiltCardComponent';
import { toneStyles } from '../../../theme/toneStyles';
import { personas } from '../../../data/equipo';
import { fotoPersonaEnAccion } from '../../../data/fotos';

const PHOTO_SIZES = '(min-width: 1024px) 560px, 100vw';
const ENFOQUE_VISIBLE = 3;
const REVEAL_SIDES = [RevealFrom.Left, RevealFrom.Right];
const REVEAL_STEP_MS = 120;

const PathsComponent = () => (
  <SectionComponent
    eyebrow="Lo que hacemos"
    title={
      <>
        Elige por dónde <em>empezar</em>
      </>
    }
    intro="Por separado funcionan. Juntos, mucho mejor."
  >
    {/* Recorte horizontal: las tarjetas entran desde los lados y no deben provocar scroll lateral. */}
    <div className="-mx-4 grid gap-6 overflow-x-clip px-4 py-2 lg:grid-cols-2 lg:gap-8">
      {personas.map((persona, index) => (
        <RevealComponent key={persona.nombre} from={REVEAL_SIDES[index]} delay={index * REVEAL_STEP_MS} className="h-full">
          <TiltCardComponent className={`rounded-[2.5rem] ${toneStyles[persona.tono].soft}`}>
            <Link to={persona.ruta} className="group al-tocar flex h-full flex-col gap-8 p-5 sm:p-8">
              <PhotoComponent
                photo={fotoPersonaEnAccion(persona)}
                label={`${persona.nombre}, ${persona.area.toLowerCase()}`}
                tone={persona.tono}
                sizes={PHOTO_SIZES}
                className="aspect-[16/11] w-full shrink-0 rounded-t-[999px] rounded-b-3xl bg-white/60"
              />
              <div className="flex flex-1 flex-col sm:px-2">
                <p className={`mb-2 text-xs font-medium tracking-[0.28em] uppercase ${toneStyles[persona.tono].text}`}>{persona.area}</p>
                <h3 className="mb-6 text-4xl leading-none sm:text-5xl">
                  con <em className={`italic ${toneStyles[persona.tono].text}`}>{persona.nombre}</em>
                </h3>
                <ul className="mb-8 flex-1 space-y-3">
                  {persona.enfoque.slice(0, ENFOQUE_VISIBLE).map((punto) => (
                    <li key={punto} className="flex gap-3 text-gris">
                      <Check className={`mt-1 size-4 shrink-0 ${toneStyles[persona.tono].text}`} aria-hidden="true" /> {punto}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-3 font-medium">
                  <span className={`grid size-12 place-items-center rounded-full text-white transition-transform duration-500 group-hover:rotate-45 ${toneStyles[persona.tono].solid}`}>
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                  Conoce a {persona.nombre}
                </span>
              </div>
            </Link>
          </TiltCardComponent>
        </RevealComponent>
      ))}
    </div>
  </SectionComponent>
);

export default PathsComponent;
