// Cabecera de las páginas de Nutrición y Entrenamiento: foto, historia y forma de trabajar.
// Las dos páginas son iguales salvo el color, que sale del tono de cada persona.
import { Check } from 'lucide-react';
import ButtonComponent from '../../ui/Button/ButtonComponent';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import PhotoPlaceholderComponent from '../../ui/PhotoPlaceholder/PhotoPlaceholderComponent';
import { obtenerUrlInstagram } from '../../../data/equipo';
import { toneStyles } from '../../../theme/toneStyles';
import type { IProfileIntroProps } from './IProfileIntroProps';

const ProfileIntroComponent = ({ persona }: IProfileIntroProps) => {
  // #region Declaraciones
  const textColor = toneStyles[persona.tono].text;
  // #endregion

  // #region Renderizado
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 md:grid-cols-2 md:pt-20">
        <div>
          <p className={`mb-3 text-sm font-semibold tracking-widest uppercase ${textColor}`}>{persona.area}</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-6xl">Soy {persona.nombre}</h1>
          <p className="titulo mb-8 text-xl text-gris italic sm:text-2xl">“{persona.frase}”</p>
          <ButtonComponent href={obtenerUrlInstagram(persona.instagram)} tone={persona.tono}>
            <InstagramIconComponent /> Escríbeme por Instagram
          </ButtonComponent>
        </div>
        <PhotoPlaceholderComponent label={`Foto de ${persona.nombre}`} tone={persona.tono} className="aspect-[4/5]" />
      </section>

      <section className="bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Mi historia</h2>
            <div className="prosa text-lg text-gris">
              {persona.historia.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>
            <p className="mt-6 text-sm font-medium text-gris">{persona.titulacion}</p>
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold">Cómo trabajo</h2>
            <ul className="space-y-4">
              {persona.enfoque.map((punto) => (
                <li key={punto} className="flex gap-3">
                  <Check className={`mt-0.5 size-5 shrink-0 ${textColor}`} />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
  // #endregion
};

export default ProfileIntroComponent;
