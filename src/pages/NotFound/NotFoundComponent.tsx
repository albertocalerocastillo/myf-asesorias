import ButtonComponent from '../../components/ui/Button/ButtonComponent';
import { AppRoute } from '../../enums/AppRoute';

const NotFoundComponent = () => (
  <section className="mx-auto max-w-xl px-4 py-24 text-center">
    <h1 className="mb-4 text-4xl font-bold">Página no encontrada</h1>
    <p className="mb-8 text-gris">Lo que buscas no está aquí, o ya no existe.</p>
    <ButtonComponent to={AppRoute.Home}>Volver al inicio</ButtonComponent>
  </section>
);

export default NotFoundComponent;
