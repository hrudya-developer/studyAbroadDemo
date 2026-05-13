import {
  GraduationCap,
  House,
  Landmark,
  HeartPulse,
  BadgeDollarSign,
  Smartphone,
  ArrowRight,
} from "lucide-react";

import bgOverlay from "../assets/bgOverlay.png";

const EssentialService = () => {
  const services = [
    {
      id: "01",
      title: "Education Loan",
      desc: "Easy access to finances so you don’t delay your dreams.",
      icon: <GraduationCap size={38} strokeWidth={1.7} />,
    },
    {
      id: "02",
      title: "Accommodation",
      desc: "Student apartment or homestay, the choice is yours.",
      icon: <House size={38} strokeWidth={1.7} />,
    },
    {
      id: "03",
      title: "Banking",
      desc: "Open a bank account before you arrive.",
      icon: <Landmark size={38} strokeWidth={1.7} />,
    },
    {
      id: "04",
      title: "Health Cover",
      desc: "Your choice, your health cover, your peace of mind abroad.",
      icon: <HeartPulse size={38} strokeWidth={1.7} />,
    },
    {
      id: "05",
      title: "Money Transfer",
      desc: "Safe, secure and fast payments to your institution and services.",
      icon: <BadgeDollarSign size={38} strokeWidth={1.7} />,
    },
    {
      id: "06",
      title: "SIM Cards",
      desc: "No SIM? No problem — We’ve got it covered.",
      icon: <Smartphone size={38} strokeWidth={1.7} />,
    },
  ];

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden bg-cover bg-center bg-no-repeat max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-fixed" data-aos="fade-up"
      style={{
        backgroundImage: `url(${bgOverlay})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#000]/80"></div>

      <div className="relative">
        
        {/* Header */}
        <div className="text-center mb-14">
          
          <div className="flex items-center justify-center gap-4 mb-5 flex-wrap">
            <span className="w-10 h-[2px] bg-primary"></span>

            <p className="uppercase tracking-widest text-primary font-semibold text-xs sm:text-sm md:text-base text-center">
              Student Essentials Services
            </p>

            <span className="w-10 h-[2px] bg-primary"></span>
          </div>

         <h1 className="font-ubuntu font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 text-white">
            Everything You Need,{" "}
            <span className="text-primary">
              We’ve Got You Covered
            </span>
          </h1>

          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-7 sm:leading-8">
            Explore our wide range of essential services designed to make your
            study abroad experience smooth, secure, and stress-free.
          </p>
        </div>

        {/* Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl">
            {services.map((service) => (
              <div
                key={service.id}
                className="relative bg-transparent border border-[#ffffff45] rounded-3xl p-6 sm:p-7 backdrop-blur-md hover:-translate-y-2 transition-all duration-500 hover:border-primary/50 group overflow-hidden"
              >
                
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/10 to-transparent"></div>

                {/* Top */}
                <div className="relative z-10 flex items-start gap-4 mb-6">
                  
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full border-2 p-1 border-primary flex items-center justify-center text-white shrink-0">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-primary text-lg sm:text-lg font-bold mb-1">
                      {service.id}
                    </h3>

                    <h2 className="text-white text-lg sm:text-lg font-semibold">
                      {service.title}
                    </h2>

                    <div className="w-12 h-[3px] bg-primary mt-3 rounded-full"></div>
                  </div>
                </div>

                {/* Description */}
                <p className="relative z-10 text-gray-300 leading-7 text-base sm:text-lg mb-10">
                  {service.desc}
                </p>

                {/* Bottom */}
                <div className="relative z-10 flex items-center justify-between">
                  
                  <button className="flex items-center gap-3 text-white font-semibold group/btn">
                    Learn More

                    <ArrowRight
                      size={20}
                      className="text-primary group-hover/btn:translate-x-2 transition duration-300"
                    />
                  </button>

                  {/* Dots */}
                  <div className="grid grid-cols-4 gap-2 opacity-70">
                    {[...Array(12)].map((_, i) => (
                      <span
                        key={i}
                        className="w-[4px] h-[4px] bg-white rounded-full"
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default EssentialService;