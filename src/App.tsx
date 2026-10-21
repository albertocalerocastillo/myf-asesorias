import { Route, Routes, useLocation } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
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

const App = () => {
  // #region Declaraciones
  const { pathname } = useLocation();
  // #endregion

  // #region Renderizado
  // Motion para toda la web: carga solo las funciones que se usan (LazyMotion) y respeta la opción
  // "reducir movimiento" del sistema (MotionConfig).
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
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
        {/* La clave por ruta hace que cada página nueva entre con su animación (".pagina" en theme.css). */}
        <main id={MAIN_CONTENT_ID} key={pathname} className="pagina">
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
      </MotionConfig>
    </LazyMotion>
  );
  // #endregion
};

export default App;
