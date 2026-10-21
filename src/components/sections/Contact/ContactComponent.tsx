// Cierre de todas las páginas: titular gigante y una tarjeta por persona para escribirle por Instagram.
// Sin formulario a propósito: así no guardamos datos (ni de salud) de nadie.
import { ArrowUpRight } from 'lucide-react';
import EyebrowComponent from '../../ui/Eyebrow/EyebrowComponent';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import LeafComponent from '../../ui/Leaf/LeafComponent';
import PhotoComponent from '../../ui/Photo/PhotoComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { AppAnchor } from '../../../enums/AppRoute';
import { obtenerUrlInstagram, obtenerUrlWhatsApp, personas } from '../../../data/equipo';
import { fotoPersona } from '../../../data/fotos';

const MENSAJE_WHATSAPP = 'Hola, he visto vuestra web y me gustaría informarme.';
const REVEAL_STEP_MS = 120;
const AVATAR_SIZES = '96px';

const ContactComponent = () => {
  // #region Declaraciones
  const whatsappUrl = obtenerUrlWhatsApp(MENSAJE_WHATSAPP);
  // #endregion

  // #region Renderizado
  return (
    <section id={AppAnchor.Contact} aria-labelledby="contacto-titulo" className="fondo-oscuro relative overflow-hidden bg-acento-oscuro text-crema">
      <LeafComponent className="absolute -top-16 right-[8%] size-72 text-crema/5 sm:size-96" parallax={120} rotate={160} sway />
      <LeafComponent className="absolute -bottom-24 -left-16 size-80 text-acento-suave/10" parallax={-100} rotate={-10} />

      <div className="contenedor relative py-24 sm:py-32 lg:py-40">
        <RevealComponent>
          <EyebrowComponent text="El primer paso es el más fácil" inverted />
          <h2 id="contacto-titulo" className="titulo-grande mb-8 text-6xl leading-[0.95] sm:text-8xl lg:text-9xl">
            Cuéntanos <em>tu caso</em>
          </h2>
          <p className="mb-14 max-w-xl text-lg leading-relaxed text-crema/75 sm:text-xl">
            Escríbenos por Instagram: qué buscas, cómo estás y qué te gustaría cambiar. Te contestamos nosotros,
            personalmente, y te decimos con sinceridad si podemos ayudarte.
          </p>
        </RevealComponent>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {personas.map((persona, index) => (
            <RevealComponent key={persona.nombre} delay={index * REVEAL_STEP_MS}>
              <a
                href={obtenerUrlInstagram(persona.instagram)}
                target="_blank"
                rel="noreferrer"
                className="group al-tocar flex items-center gap-5 rounded-[2rem] border border-crema/10 bg-crema/5 p-5 transition-colors duration-500 hover:border-crema/25 hover:bg-crema/10 sm:p-6"
              >
                <span className="relative shrink-0">
                  <PhotoComponent
                    photo={fotoPersona(persona)}
                    label={persona.nombre}
                    tone={persona.tono}
                    sizes={AVATAR_SIZES}
                    className="size-20 rounded-full text-[0px] [&_svg]:size-5"
                  />
                  <span className="absolute -right-1 -bottom-1 grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white ring-4 ring-acento-oscuro">
                    <InstagramIconComponent className="size-4" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs tracking-[0.28em] text-acento-suave uppercase">{persona.area}</span>
                  <span className="titulo block text-3xl">{persona.nombre}</span>
                  <span className="block truncate text-sm text-crema/70">@{persona.instagram}</span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-crema text-tinta transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </a>
            </RevealComponent>
          ))}
        </div>

        <p className="mt-10 text-sm text-crema/60">
          ¿No sabes a quién escribir? A cualquiera de los dos: trabajamos juntos.
          {whatsappUrl && (
            <>
              {' '}
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-semibold text-acento-suave hover:underline">
                También por WhatsApp.
              </a>
            </>
          )}
        </p>
      </div>
    </section>
  );
  // #endregion
};

export default ContactComponent;
