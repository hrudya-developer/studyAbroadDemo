import { House } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import { Link } from "react-router-dom";
import { destinations } from "../data/destinationData";



const Dots = ({ className = "" }) => (
  <div className={`grid grid-cols-5 gap-3 ${className}`}>
    {Array.from({ length: 25 }).map((_, i) => (
      <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#d70707]" />
    ))}
  </div>
);

const DestinationList = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f9fd] max-w-7xl px-3 sm:px-5 md:px-8 mx-auto">
      {/* background patterns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* soft corner waves */}
        <div className="absolute -left-40 -top-48 h-[400px] w-[420px] rounded-full border-[36px] border-[#dce9f8]/70" />
        {/* <div className="absolute -left-14 -top-10 h-[400px] w-[420px] rounded-full border-[26px] border-white/70" /> */}
        <div className="absolute -bottom-40 -right-44 h-[520px] w-[520px] rounded-full border-[34px] border-[#dce9f8]/70" />
        <div className="absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full border-[24px] border-white/70" />

        {/* bottom-left blue circles */}
        <div className="absolute -bottom-16 -left-16 h-40 w-42 rounded-full bg-[#c6d8f1]/70" />
        <div className="absolute bottom-0 left-10 h-28 w-28 rounded-full bg-[#dbe8f8]/80" />

        {/* left heart route */}
        <svg
          className="absolute left-8 top-[195px] hidden w-[280px] md:block"
          viewBox="0 0 280 130"
          fill="none"
        >
          <path
            d="M0 35 C42 74 92 105 136 82 C183 56 125 12 105 52 C82 98 188 117 270 70"
            stroke="#d70707"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.85"
          />
        </svg>

        {/* right flight route */}
        <svg
          className="absolute right-[150px] top-[220px] hidden w-[250px] lg:block"
          viewBox="0 0 250 90"
          fill="none"
        >
          <path
            d="M5 48 C70 18 105 78 170 47 C198 33 215 18 240 6"
            stroke="#d70707"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.75"
          />
        </svg>

        {/* airplane */}
        <GiCommercialAirplane
          className="absolute right-[8%] top-[175px] hidden rotate-45 text-[#d70707] drop-shadow-md lg:block"
          size={50}
        />

        {/* dotted world map feel */}
        <div className="absolute right-0 top-[150px] hidden h-[350px] w-[440px] opacity-25 lg:block">
          <div className="h-full w-full bg-[radial-gradient(circle,#2c65aa_2px,transparent_2px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]" />
        </div>

        {/* red dot blocks */}
        <Dots className="absolute left-16 top-[590px] hidden md:grid" />
        <Dots className="absolute right-16 top-[560px] hidden lg:grid" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-24">
        <section className="mb-12 w-full">
          <div className="breadcrumbs mb-16 flex w-full justify-end text-md">
            <ul>
              <li className="flex items-center gap-2 text-md">
                <House size={14} />
                Home
              </li>
              <li className="text-md font-medium text-[#d70707]">
                Destinations
              </li>
            </ul>
          </div>

          <h1 className="text-center font-ubuntu text-3xl font-extrabold leading-tight tracking-tight text-[#071633] sm:text-4xl lg:text-5xl">
            Study Abroad{" "}
            <span className="text-[#d70707]">Destinations</span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-black sm:text-lg">
            Explore top study destinations and discover the perfect place to
            pursue your academic dreams
          </p>
        </section>

        <section className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((item) => (
            <div
              key={item.name}
              className="card rounded-2xl border border-white/70 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="card-body p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{item.flag}</span>
                  <h3 className="text-lg font-bold text-secondary">
                    {item.name}
                  </h3>
                </div>

                <figure className="relative h-52 overflow-hidden rounded-xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-110"
                  />

                 <Link to={item.path}> <button className="btn btn-circle absolute bottom-4 right-4 border-0 bg-white text-[#d70707] shadow-lg hover:bg-[#d70707] hover:text-white">
                    <FaArrowRight />
                  </button>
                  </Link>
                </figure>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DestinationList;