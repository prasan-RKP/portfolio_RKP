import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import ShowProject from "./sections/ShowProject";
import './stylesheets/myCustom.css'
//import Landing from "./gsap/landing";
import {Toaster} from 'sonner';

const App = () => (
  <>
   <Toaster position="top-right" />
    <Navbar />
    <Hero />
    {/* <ShowcaseSection /> */}
    <ShowProject />
    {/* <LogoShowcase /> */}
    <FeatureCards />
    <Experience />
    <TechStack />
    <Testimonials />
    <Contact />
    <Footer />

  </>
);

export default App;
