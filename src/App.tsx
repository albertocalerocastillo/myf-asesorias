import { Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/layout/Header/HeaderComponent';
import FooterComponent from './components/layout/Footer/FooterComponent';
import ScrollManagerComponent from './components/layout/ScrollManager/ScrollManagerComponent';
import ContactComponent from './components/sections/Contact/ContactComponent';
import HomeComponent from './pages/Home/HomeComponent';
import NutritionComponent from './pages/Nutrition/NutritionComponent';
import RecipeComponent from './pages/Recipe/RecipeComponent';
import TrainingComponent from './pages/Training/TrainingComponent';
import DiaryEntryComponent from './pages/DiaryEntry/DiaryEntryComponent';
import HowWeWorkComponent from './pages/HowWeWork/HowWeWorkComponent';
import NotFoundComponent from './pages/NotFound/NotFoundComponent';
import { AppRoute } from './enums/AppRoute';

const App = () => (
  <>
    {/* Quitar cuando tengamos los textos y las fotos reales. */}
    <div className="bg-tinta px-4 py-1.5 text-center text-xs font-medium text-crema">Versión de prueba · textos y fotos provisionales</div>
    <ScrollManagerComponent />
    <HeaderComponent />
    <main>
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
  </>
);

export default App;
