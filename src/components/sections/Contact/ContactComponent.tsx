// Bloque de contacto al final de cada página: cada uno lleva a su Instagram.
// Sin formulario a propósito: así no guardamos datos (ni de salud) de nadie.
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import { AppAnchor } from '../../../enums/AppRoute';
import { obtenerUrlInstagram, obtenerUrlWhatsApp, personas } from '../../../data/equipo';

const MENSAJE_WHATSAPP = 'Hola, he visto vuestra web y me gustaría informarme.';

const ContactComponent = () => {
  // #region Declaraciones
  const whatsappUrl = obtenerUrlWhatsApp(MENSAJE_WHATSAPP);
  // #endregion

  // #region Renderizado
  return (
    <section id={AppAnchor.Contact} className="bg-tinta text-crema">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="mb-3 text-sm font-semibold tracking-widest text-corazon uppercase">Hablemos</p>
        <h2 className="mb-4 text-3xl font-bold sm:text-5xl">¿Empezamos?</h2>
        <p className="mb-10 max-w-2xl text-lg text-crema/70">
          Escríbenos por Instagram y cuéntanos qué buscas. Te contestamos nosotros directamente, sin intermediarios.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {personas.map((persona) => (
            <a
              key={persona.nombre}
              href={obtenerUrlInstagram(persona.instagram)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-3xl bg-white/5 p-6 transition hover:bg-white/10"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white">
                <InstagramIconComponent className="size-7" />
              </span>
              <span>
                <span className="block text-sm text-crema/60">{persona.area}</span>
                <span className="titulo block text-xl font-bold">{persona.nombre}</span>
                <span className="block text-sm text-crema/80 group-hover:text-white">@{persona.instagram}</span>
              </span>
            </a>
          ))}
        </div>

        {whatsappUrl && (
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block font-semibold text-corazon hover:underline">
            O escríbenos por WhatsApp →
          </a>
        )}
      </div>
    </section>
  );
  // #endregion
};

export default ContactComponent;
