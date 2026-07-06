const heroVideoDesktop =
  "/videos/medcity2025.15f1bf21a50a5d60cdae.mp4";

const heroVideoMobile =
  "videos/mobilemedcity2.e47b58ad13ce13294963.mp4";

const Carousel = () => {
  return (
    <section
      id="hero-section"
      className="relative mx-auto w-full max-w-9xl overflow-hidden bg-white"
    >
      <div className="relative w-full overflow-hidden bg-white">
        {/* Mobile Video */}
        <video
          className="block w-full h-auto object-cover md:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideoMobile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Desktop Video */}
        <video
          className="hidden w-full h-auto object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideoDesktop} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Carousel;