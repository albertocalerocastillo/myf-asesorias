import { Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/layout/Header/HeaderComponent';
import FooterComponent from './components/layout/Footer/FooterComponent';
import FloatingContactComponent from './components/layout/FloatingContact/FloatingContactComponent';
import ScrollManagerComponent from './components/layout/ScrollManager/ScrollManagerComponent';
import SeoManagerComponent from './components/layout/SeoManager/SeoManagerComponent';
import ContactComponent from './components/sections/Contact/ContactComponent';
import HomeComponent from './pages/Home/HomeComponent';
import NutritionComponent from './pages/Nutrition/NutritionComponent';
import RecipeComponent from './pages/Recipe/RecipeComponent';
import TrainingComponent from './pages/Training/TrainingComponent';
import DiaryEntryComponent from './pages/DiaryEntry/DiaryEntryComponent';
import HowWeWorkComponent from './pages/HowWeWork/HowWeWorkComponent';
import NotFoundComponent from './pages/NotFound/NotFoundComponent';
import { AppRoute } from './enums/AppRoute';
import { IS_PUBLISHED } from './seo/siteConfig';

const MAIN_CONTENT_ID = 'contenido';

const App = () => (
  <>
    {/* Enlace oculto para saltar el menú con el teclado (accesibilidad). */}
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-tinta focus:px-5 focus:py-3 focus:text-crema"
    >
      Saltar al contenido
    </a>
    {!IS_PUBLISHED && (
      <div className="bg-tinta px-4 py-1.5 text-center text-xs font-medium text-crema">Versión de prueba · textos y fotos provisionales</div>
    )}
    <ScrollManagerComponent />
    <SeoManagerComponent />
    <HeaderComponent />
    <main id={MAIN_CONTENT_ID}>
      <Routes>
        <Route path={AppRoute.Home} element={<HomeComponent />} />
        <Route path={AppRoute.Nutrition} element={<NutritionComponent />} />
        <Route path={`${AppRoute.Recipe}/:slug`} element={<RecipeComponent />} />
        <Route path={AppRoute.Training} element={<TrainingComponent />} />
        <Route path={`${AppRoute.DiaryEntry}/:slug`} element={<DiaryEntryComponent />} />
        <Route path={AppRoute.HowWeWork} element={<HowWeWorkComponent />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </main>
    <ContactComponent />
    <FooterComponent />
    <FloatingContactComponent />
  </>
);

export default App;
