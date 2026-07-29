import AboutSEO from "./components/AboutSEO";
import AboutHero from "./components/AboutHero";
import AboutStats from "./components/AboutStats";
import StorySection from "./components/StorySection";
import ChairmanSection from "./components/ChairmanSection";
import CoreValues from "./components/CoreValues";

import FAQ from "../../layout/FAQ/FAQ";

const AboutUs = () => {
  return (
    <>
      <AboutSEO />

      <main
        id="main-content"
        className="overflow-hidden bg-white"
      >
        <AboutHero />
        <AboutStats />
        <StorySection />
        <ChairmanSection />
        <CoreValues />
        <FAQ />
      </main>
    </>
  );
};

export default AboutUs;