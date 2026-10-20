import ButtonComponent from '../../components/ui/Button/ButtonComponent';
import HeartbeatComponent from '../../components/ui/Heartbeat/HeartbeatComponent';
import { AppRoute } from '../../enums/AppRoute';
import { Tone } from '../../enums/Tone';

const NotFoundComponent = () => (
  <section className="mx-auto max-w-xl px-4 py-24 text-center">
    <HeartbeatComponent animated className="mx-auto mb-8 h-16 w-64 text-corazon" />
    <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Esta página no existe</h1>
    <p className="mb-10 text-lg text-gris">Puede que el enlace esté mal o que la hayamos movido. Te llevamos a un sitio seguro:</p>
    <div className="flex flex-col justify-center gap-3 sm:flex-row">
      <ButtonComponent to={AppRoute.Home}>Ir al inicio</ButtonComponent>
      <ButtonComponent to={AppRoute.HowWeWork} tone={Tone.Outline}>
        Cómo trabajamos
      </ButtonComponent>
    </div>
  </section>
);

export default NotFoundComponent;
