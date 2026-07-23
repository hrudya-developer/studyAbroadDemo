import AboutHero from "./components/AboutHero";
import AboutStats from "./components/AboutStats";
import StorySection from "./components/StorySection";
import ChairmanSection from "./components/ChairmanSection";
import CoreValues from "./components/CoreValues";

const AboutUs = () => {
  return (
    <main className="overflow-hidden bg-white">
      <AboutHero />
      <AboutStats />
      <StorySection />
      <ChairmanSection />
      <CoreValues />
    </main>
  );
};

export default AboutUs;