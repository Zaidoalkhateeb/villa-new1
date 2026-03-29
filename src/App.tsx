import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Properties from "./components/Properties";
import Comparison from "./components/Comparison";
import Location from "./components/Location";
import Gallery from "./components/gallery";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Contact from "./components/Contact";
import BottomBar from "./components/BottomBar";


  

export default function App() {
  return (
    <div className="bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 overflow-x-hidden pb-24">
      <Navbar />
      <Hero />
      <Features />
      <Properties />
      <Comparison />
      <Location />
      <Gallery />
      <Testimonials />
      <Team />
      <Contact />
      <BottomBar />
    </div>
  );
}


