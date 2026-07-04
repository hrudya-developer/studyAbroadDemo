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

const MIA_GPT_URL =
  "https://chatgpt.com/g/g-69ec914630a08191a423917354e31099-study-abroad-advisor";

const Home = () => {
  const [showMiaModal, setShowMiaModal] = useState(false);
  const [showMiaButton, setShowMiaButton] = useState(false);
  const [miaChatOpen, setMiaChatOpen] = useState(false);

  const miaWindowRef = useRef(null);
  const timerRef = useRef(null);
  const autoPopupShownRef = useRef(false);

  const isMiaPopupOpen = () => {
    return miaWindowRef.current && !miaWindowRef.current.closed;
  };

  const startPopupWatcher = (win) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      if (!win || win.closed) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        miaWindowRef.current = null;
        setMiaChatOpen(false);
        setShowMiaButton(true);
      }
    }, 800);
  };

  const openMia = () => {
    if (isMiaPopupOpen()) {
      miaWindowRef.current.focus();
      return;
    }

    const win = window.open(
      MIA_GPT_URL,
      "MiaAdvisor",
      "width=1100,height=800,left=150,top=50,resizable=yes,scrollbars=yes"
    );

    if (!win) return;

    miaWindowRef.current = win;
    setMiaChatOpen(true);
    setShowMiaModal(false);
    setShowMiaButton(true);

    startPopupWatcher(win);
  };

  const closeModal = () => {
    setShowMiaModal(false);
    setShowMiaButton(true);
  };

  const openModal = () => {
    if (miaChatOpen || isMiaPopupOpen()) {
      miaWindowRef.current?.focus();
      return;
    }

    setShowMiaButton(false);
    setShowMiaModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (autoPopupShownRef.current || miaChatOpen || isMiaPopupOpen()) return;

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
  }, [miaChatOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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
      <EssentialService />
      <SASteps />
      <Testimonial />
      <Counselling />
      <StudyDestinations />

      <MiaModal
        isOpen={showMiaModal}
        onClose={closeModal}
        onTalk={openMia}
      />

      {showMiaButton && (
        <MiaButton
          onClick={openModal}
          disabled={miaChatOpen || isMiaPopupOpen()}
        />
      )}
    </>
  );
};

export default Home;