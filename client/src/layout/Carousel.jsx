import ButtonPrimary from "../components/ButtonPrimary";
import { HeadsetIcon, Plane } from "lucide-react";

import heroVideoDesktop from "../assets/medcity2025.15f1bf21a50a5d60cdae.mp4";
import heroVideoMobile from "../assets/mobilemedcity2.e47b58ad13ce13294963.mp4";

const Carousel = () => {
  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden bg-black">
      <div className="absolute right-3 top-3 z-20 animate__animated animate__pulse sm:right-4 sm:top-4">
        <button
          type="button"
          className="talk-btn flex items-center gap-1 rounded-2xl bg-logoYellow px-3 py-2 text-xs font-bold text-black shadow-xl hover:cursor-pointer sm:gap-3 sm:rounded-3xl sm:px-5 sm:py-4 sm:text-base lg:bg-black lg:px-6 lg:py-5 lg:text-lg lg:text-yellow-300"
        >
          <span className="grid place-items-center rounded-lg p-1 shadow-[0_0_10px_rgba(255,215,0,0.8)]">
            <HeadsetIcon className="size-4 text-black sm:size-5 lg:size-6 lg:text-yellow-300" />
          </span>
          <span className="whitespace-nowrap">Talk to Mia</span>
        </button>
      </div>

      <div className="relative w-full overflow-hidden bg-black">
        {/* Mobile Video */}
        <video
          className="block w-full h-auto md:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideoMobile} type="video/mp4" />
        </video>

        {/* Desktop Video */}
        <video
          className="hidden w-full h-auto md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideoDesktop} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Carousel;