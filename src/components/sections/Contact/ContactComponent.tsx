// Cierre de todas las páginas: llamada a la acción y los dos Instagram.
// Sin formulario a propósito: así no guardamos datos (ni de salud) de nadie.
import { ArrowUpRight } from 'lucide-react';
import HeartbeatComponent from '../../ui/Heartbeat/HeartbeatComponent';
import InstagramIconComponent from '../../ui/Icons/InstagramIconComponent';
import RevealComponent from '../../ui/Reveal/RevealComponent';
import { AppAnchor } from '../../../enums/AppRoute';
import { obtenerUrlInstagram, obtenerUrlWhatsApp, personas } from '../../../data/equipo';

const MENSAJE_WHATSAPP = 'Hola, he visto vuestra web y me gustaría informarme.';
const REVEAL_STEP_MS = 120;

const ContactComponent = () => {
  // #region Declaraciones
  const whatsappUrl = obtenerUrlWhatsApp(MENSAJE_WHATSAPP);
  // #endregion

  // #region Renderizado
  return (
    <section id={AppAnchor.Contact} aria-labelledby="contacto-titulo" className="relative overflow-hidden bg-tinta text-crema">
      <HeartbeatComponent className="pointer-events-none absolute inset-x-0 top-10 h-24 w-full text-corazon/25" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <RevealComponent className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[#f08a63] uppercase">El primer paso es el más fácil</p>
          <h2 id="contacto-titulo" className="mb-5 text-4xl font-bold sm:text-6xl">
            Cuéntanos tu caso
          </h2>
          <p className="mb-12 text-lg text-crema/75">
            Escríbenos por Instagram: qué buscas, cómo estás y qué te gustaría cambiar. Te contestamos nosotros,
            personalmente, y te decimos con sinceridad si podemos ayudarte.
          </p>
        </RevealComponent>

        <div className="grid gap-4 sm:grid-cols-2">
          {personas.map((persona, index) => (
            <RevealComponent key={persona.nombre} delay={index * REVEAL_STEP_MS}>
              <a
                href={obtenerUrlInstagram(persona.instagram)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/25 hover:bg-white/10"
              >
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-lg">
                  <InstagramIconComponent className="size-8" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-crema/60">{persona.area}</span>
                  <span className="titulo block text-2xl font-bold">Escribe a {persona.nombre}</span>
                  <span className="block truncate text-sm text-crema/80">@{persona.instagram}</span>
                </span>
                <ArrowUpRight className="size-6 shrink-0 text-crema/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            </RevealComponent>
          ))}
        </div>

        <p className="mt-8 text-sm text-crema/60">
          ¿No sabes a quién escribir? A cualquiera de los dos: trabajamos juntos.
          {whatsappUrl && (
            <>
              {' '}
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#f08a63] hover:underline">
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
