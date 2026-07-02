import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import Carousel from "../layout/Carousel";
import SearchSection from "../layout/SearchSection";
import MainSectionOne from "../layout/MainSectionOne";
import ProgramsSection from "../layout/ProgramsSection";
import Destinations from "../layout/Destinations";
import LanguagePrograms from "../layout/LanguageProgram";
import MobileApp from "../layout/MobileApp";
import EssentialService from "../layout/EssentialService";
import SASteps from "../layout/SASteps";
import Testimonial from "../layout/Testimonial";
import Counselling from "../layout/Counselling";
import StudyDestinations from "../layout/StudyDestinations";
import MiaModal from "./MiaAgentModal";


const Home = () => {
  const [showMiaModal, setShowMiaModal] = useState(false);
  const [showMiaButton, setShowMiaButton] = useState(false);

  useEffect(() => {
    let popupShown = false;

    const handleScroll = () => {
      if (popupShown) return;

      const hero = document.getElementById("hero-section");
      if (!hero) return;

      const heroBottom = hero.offsetTop + hero.offsetHeight;

      if (window.scrollY > heroBottom - 100) {
        popupShown = true;
        setShowMiaModal(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeModal = () => {
    setShowMiaModal(false);
    setShowMiaButton(true);
  };

  const openModal = () => {
    setShowMiaButton(false);
    setShowMiaModal(true);
  };

  return (
    <>
      <div id="hero-section">
        <Carousel />
      </div>

      <SearchSection />
      <MainSectionOne />
      <ProgramsSection />
      <Destinations />
      <LanguagePrograms />
      <MobileApp />
      <EssentialService />
      <SASteps />
      <Testimonial />
      <Counselling />
      <StudyDestinations />

      <MiaModal
        isOpen={showMiaModal}
        onClose={closeModal}
        onTalk={() => {
          console.log("Talk to Mia");
        }}
      />

      {showMiaButton && (
        <button
          onClick={openModal}
          className="fixed right-0 top-1/2 z-[9998] flex -translate-y-1/2 rounded-l-2xl bg-secondary px-5 py-3 text-sm font-bold text-white shadow-2xl transition hover:bg-darkPrimary"
          style={{ writingMode: "vertical-lr" }}
        >
          <MessageCircle size={20} className="mb-2" />
        Talk to Mia
        </button>
      )}
    </>
  );
};

export default Home;