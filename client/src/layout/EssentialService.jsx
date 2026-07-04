import {
  GraduationCap,
  House,
  Landmark,
  HeartPulse,
  BadgeDollarSign,
  Smartphone,
  Ticket,
  ArrowRight,
} from "lucide-react";

import bgOverlay from "../assets/bgOverlay.png";

const EssentialService = () => {
  const services = [
    {
      id: "01",
      title: "Education Loan",
      desc: "Easy access to finances so you don’t delay your dreams.",
      icon: <GraduationCap size={34} strokeWidth={1.7} />,
    },
    {
      id: "02",
      title: "Accommodation",
      desc: "Student apartment or homestay, the choice is yours.",
      icon: <House size={34} strokeWidth={1.7} />,
    },
    {
      id: "03",
      title: "Banking",
      desc: "Open a bank account before you arrive.",
      icon: <Landmark size={34} strokeWidth={1.7} />,
    },
    {
      id: "04",
      title: "Health Cover",
      desc: "Your choice, your health cover, your peace of mind abroad.",
      icon: <HeartPulse size={34} strokeWidth={1.7} />,
    },
    {
      id: "05",
      title: "Money Transfer",
      desc: "Safe, secure and fast payments to your institution and services.",
      icon: <BadgeDollarSign size={34} strokeWidth={1.7} />,
    },
    {
      id: "06",
      title: "SIM Cards",
      desc: "No SIM? No problem — We’ve got it covered.",
      icon: <Smartphone size={34} strokeWidth={1.7} />,
    },
    {
      id: "07",
      title: "Ticketing",
      desc: "Book flights easily with the best routes and hassle-free travel support.",
      icon: <Ticket size={34} strokeWidth={1.7} />,
    },
  ];

  return (
    <section
      className="relative mx-auto max-w-7xl overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      data-aos="fade-up"
      style={{
        backgroundImage: `url(${bgOverlay})`,
      }}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-primary" />

            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm md:text-base">
              Student Essentials Services
            </p>

            <span className="h-[2px] w-10 bg-primary" />
          </div>

          <h1 className="font-nunito text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Everything You Need,{" "}
            <span className="text-primary">We’ve Got You Covered</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
            Explore our wide range of essential services designed to make your
            study abroad experience smooth, secure, and stress-free.
          </p>
        </div>

        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative w-full max-w-[340px] overflow-hidden rounded-3xl border border-white/25 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 sm:w-[calc(50%-12px)] sm:p-7 lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary text-white">
                  {service.icon}
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-bold text-primary">
                    {service.id}
                  </h3>

                  <h2 className="text-lg font-semibold text-white">
                    {service.title}
                  </h2>

                  <div className="mt-3 h-[3px] w-12 rounded-full bg-primary" />
                </div>
              </div>

              <p className="relative z-10 mb-10 text-base leading-7 text-gray-300 sm:text-lg">
                {service.desc}
              </p>

              <div className="relative z-10 flex items-center justify-between gap-4">
                <button className="group/btn flex items-center gap-3 font-semibold text-white">
                  {/* Learn More */}
                  {/* <ArrowRight
                    size={20}
                    className="text-primary transition duration-300 group-hover/btn:translate-x-2"
                  /> */}
                </button>

                <div className="grid grid-cols-4 gap-2 opacity-70">
                  {[...Array(12)].map((_, i) => (
                    <span
                      key={i}
                      className="h-[4px] w-[4px] rounded-full bg-logoYellow"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EssentialService;