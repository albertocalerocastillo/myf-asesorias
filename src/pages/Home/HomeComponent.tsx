// Portada. Orden pensado para convencer y para que cada sección tenga su ritmo:
// quiénes somos → nuestra historia → cifras → qué ofrecemos → test → por qué nosotros →
// cómo funciona → muestra de contenido → contacto (al final de todas las páginas).
import HeroComponent from '../../components/sections/Hero/HeroComponent';
import HowItWorksComponent from '../../components/sections/HowItWorks/HowItWorksComponent';
import LatestContentComponent from '../../components/sections/LatestContent/LatestContentComponent';
import MarqueeComponent from '../../components/sections/Marquee/MarqueeComponent';
import PathsComponent from '../../components/sections/Paths/PathsComponent';
import QuizComponent from '../../components/sections/Quiz/QuizComponent';
import StatsComponent from '../../components/sections/Stats/StatsComponent';
import StoryComponent from '../../components/sections/Story/StoryComponent';
import WhyUsComponent from '../../components/sections/WhyUs/WhyUsComponent';

const HomeComponent = () => (
  <>
    <HeroComponent />
    <MarqueeComponent />
    <StoryComponent />
    <StatsComponent />
    <PathsComponent />
    <QuizComponent />
    <WhyUsComponent />
    <HowItWorksComponent />
    <LatestContentComponent />
  </>
);

export default HomeComponent;
