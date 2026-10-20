// "Qué puedes esperar": todo lo que incluye la asesoría, sin precios (las tarifas se dan en privado).
import { Smartphone } from 'lucide-react';
import SectionComponent from '../../components/ui/Section/SectionComponent';
import { toneStyles } from '../../theme/toneStyles';
import { personas } from '../../data/equipo';
import { pasos } from '../../data/servicio';

const HowWeWorkComponent = () => (
  <>
    {/* #region Pasos */}
    <SectionComponent
      eyebrow="Qué puedes esperar"
      title="Así trabajamos contigo"
      isPageTitle
      intro="Sin letra pequeña: esto es lo que vas a encontrar cuando empieces con nosotros."
    >
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pasos.map((paso, indice) => (
          <li key={paso.titulo} className="rounded-3xl bg-white p-6 shadow-sm">
            <span className="titulo mb-4 grid size-10 place-items-center rounded-full bg-corazon font-bold text-white">{indice + 1}</span>
            <h3 className="mb-2 text-xl font-bold">{paso.titulo}</h3>
            <p className="text-gris">{paso.texto}</p>
          </li>
        ))}
      </ol>
    </SectionComponent>
    {/* #endregion */}

    {/* #region Qué incluye cada área */}
    <section className="bg-white/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
        {personas.map((persona) => (
          <div key={persona.nombre} className={`rounded-3xl p-8 ${toneStyles[persona.tono].soft}`}>
            <p className={`mb-1 text-sm font-semibold tracking-widest uppercase ${toneStyles[persona.tono].text}`}>con {persona.nombre}</p>
            <h2 className="mb-5 text-2xl font-bold">Si eliges {persona.area.toLowerCase()}</h2>
            <ul className="list-disc space-y-2 pl-5">
              {persona.enfoque.map((punto) => (
                <li key={punto}>{punto}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
    {/* #endregion */}

    {/* #region App Jarvis. PENDIENTE: confirmar qué incluye exactamente su uso de Jarvis. */}
    <SectionComponent>
      <div className="flex flex-col gap-6 rounded-3xl bg-tinta p-8 text-crema sm:flex-row sm:items-center sm:p-12">
        <Smartphone className="size-12 shrink-0 text-corazon" />
        <div>
          <h2 className="mb-2 text-2xl font-bold">Todo en la app Jarvis</h2>
          <p className="text-crema/70">
            Tu plan, tus rutinas y tu seguimiento, en el móvil y bien explicados. Sin papeles ni PDFs que se pierden.
          </p>
        </div>
      </div>
      <p className="mt-8 text-center text-gris">
        ¿Quieres saber precios o si encajamos contigo? Escríbenos y te lo contamos en privado.
      </p>
    </SectionComponent>
    {/* #endregion */}
  </>
);

export default HowWeWorkComponent;
