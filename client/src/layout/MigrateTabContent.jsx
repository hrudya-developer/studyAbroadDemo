
import canadaImg from "../assets/canada.png";
import australiaImg from "../assets/australia.png";
import {
  BriefcaseBusiness,
  HeartPulse,
  ShieldCheck,
  GraduationCap,
  Globe,
  ArrowRight,
  Users,
} from "lucide-react";

const immigrationData = [
  {
    country: "CANADA",
    title: "Canadian Skilled Immigration",
    image: canadaImg,
    buttonColor: "bg-primary",
    accent: "text-primary",
    features: [
      {
        icon: <GraduationCap size={18} />,
        text: "Quality Education",
      },
      {
        icon: <HeartPulse size={18} />,
        text: "Healthcare Access",
      },
      {
        icon: <ShieldCheck size={18} />,
        text: "High Quality Life",
      },
    ],
    desc: `Canada's Skilled Immigration program is designed to attract individuals with the skills and experience needed to contribute to the Canadian economy.`,
  },
  {
    country: "AUSTRALIA",
    title: "Australian Skilled Immigration",
    image: australiaImg,
    buttonColor: "bg-secondary",
    accent: "text-secondary",
    features: [
      {
        icon: <BriefcaseBusiness size={18} />,
        text: "In-demand Jobs",
      },
      {
        icon: <Users size={18} />,
        text: "Multicultural Society",
      },
      {
        icon: <Globe size={18} />,
        text: "Pathway to PR",
      },
    ],
    desc: `Australia's Skilled Immigration program targets professionals and tradespeople with the qualifications and experience needed in the Australian job market.`,
  },
];

const MigrateTabContent = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-8">
        {/* heading */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-secondary leading-tight">
            Skilled Immigration
            <span className="text-primary"> Opportunities</span>
          </h1>

          <p className="mt-5 text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-8">
            Your skills can open doors to a better future. Explore
            pathways to live, work and grow in leading countries.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {immigrationData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              {/* image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[320px] object-cover"
                />

                {/* country badge */}
                <div className="absolute top-5 left-5 bg-secondary text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md">
                  {item.country}
                </div>

                {/* floating icon */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white">
                    <div
                      className={`w-12 h-12 rounded-full ${item.buttonColor} text-white flex items-center justify-center`}
                    >
                      <Users size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* content */}
              <div className="pt-14 pb-8 px-7 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                  {item.title}
                </h2>

                <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4"></div>

                <p className="mt-6 text-gray-600 leading-8 text-sm md:text-base">
                  {item.desc}
                </p>

                {/* features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  {item.features.map((feature, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-primary transition"
                    >
                      <div className={`${item.accent}`}>
                        {feature.icon}
                      </div>

                      <p className="text-sm font-medium text-secondary">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* button */}
                <button
                  className={`${item.buttonColor} mt-10 text-white px-8 py-4 rounded-xl inline-flex items-center gap-3 hover:scale-105 transition cursor-pointer`}
                >
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MigrateTabContent;

