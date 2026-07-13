import { useEffect, useRef, useState } from "react";

import Carousel from "../layout/Carousel";
import SearchSection from "../layout/SearchSection";
import MainSectionOne from "../layout/MainSectionOne";
import ProgramsSection from "../layout/ProgramsSection";
import Destinations from "../layout/Destinations";
import MobileApp from "../layout/MobileApp";
import EssentialService from "../layout/EssentialService";
import SASteps from "../layout/SASteps";
import Testimonial from "../layout/Testimonial";
import Counselling from "../layout/Counselling";
import StudyDestinations from "../layout/StudyDestinations";


import MiaModal from "./MiaAgentModal";
import MiaButton from "./MiaButton";
import MiaAgentChatbox from "./MiaAgentChatbox";
import GermanCoursesLayout from "../layout/GermanCoursesLayout";
import GridBackgroundView from "../layout/GridBackgroundView";

const Home = () => {
  const [showMiaModal, setShowMiaModal] = useState(false);
  const [showMiaButton, setShowMiaButton] = useState(false);
  const [showMiaChatBox, setShowMiaChatBox] = useState(false);

  const autoPopupShownRef = useRef(false);

  // Open chatbot
  const openMiaChatBox = () => {
    setShowMiaModal(false);
    setShowMiaButton(false);
    setShowMiaChatBox(true);
  };

  // Close chatbot
  const closeMiaChatBox = () => {
    setShowMiaChatBox(false);
    setShowMiaButton(true);
  };

  // Close popup
  const closeModal = () => {
    setShowMiaModal(false);
    setShowMiaButton(true);
  };

  // Auto popup after hero section
  useEffect(() => {
    const handleScroll = () => {
      if (
        autoPopupShownRef.current ||
        showMiaModal ||
        showMiaChatBox
      )
        return;

      const hero = document.getElementById("hero-section");
      if (!hero) return;

      const heroBottom = hero.offsetTop + hero.offsetHeight;

      if (window.scrollY > heroBottom - 100) {
        autoPopupShownRef.current = true;
        setShowMiaModal(true);
        setShowMiaButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showMiaModal, showMiaChatBox]);

  return (
    <>
      <div id="hero-section">
        <Carousel />
      </div>

      <SearchSection />
      <MainSectionOne />
      <ProgramsSection />
      <Destinations />
      <MobileApp />
      <GermanCoursesLayout />
      <EssentialService />
      <SASteps />
      <Testimonial />
      <GridBackgroundView />
      <Counselling />
      <StudyDestinations />

      {/* Popup */}
      <MiaModal
        isOpen={showMiaModal}
        onClose={closeModal}
        onTalk={openMiaChatBox}
      />

      {/* Floating Sticker */}
      {showMiaButton && !showMiaChatBox && (
        <MiaButton onClick={openMiaChatBox} />
      )}

      {/* Chatbot */}
      {showMiaChatBox && (
        <MiaAgentChatbox
          onClose={closeMiaChatBox}
        />
      )}
    </>
  );
};

export default Home;