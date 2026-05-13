import {
  BriefcaseBusiness,
  Globe,
  Users,
} from "lucide-react";

const WorkTabContent = () => {
  const workData = [
    {
      icon: <Globe size={38} />,
      title: "Exotic Destinations",
      desc: "Embark on life-changing journeys, where work meets wanderlust.",
      color: "text-primary",
      border: "from-primary to-red-400",
      bg: "bg-red-50",
    },
    {
      icon: <BriefcaseBusiness size={38} />,
      title: "In-demand Jobs",
      desc: "Find your niche in various industries with high demand abroad.",
      color: "text-blue-600",
      border: "from-secondary to-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: <Users size={38} />,
      title: "Cultural Exchange",
      desc: "Explore new cultures, grow as a person, and forge lifelong connections.",
      color: "text-primary",
      border: "from-primary to-red-400",
      bg: "bg-red-50",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-8">

        {/* heading */}
        <div className="text-center">

          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-24 h-[2px] bg-primary"></div>

            <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center text-primary">
              <BriefcaseBusiness size={24} />
            </div>

            <div className="w-24 h-[2px] bg-primary"></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-secondary">
            Job <span className="text-primary">Opportunities</span>
          </h1>

          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-5"></div>

          <p className="text-gray-600 text-base md:text-lg leading-8 max-w-4xl mx-auto mt-8">
            Studying abroad broadens academic horizons and offers practical
            work experience. Many countries allow part-time student jobs,
            enhancing financial support, cultural immersion, and employability
            through work permits and post-study options.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {workData.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-[32px] p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 overflow-hidden group"
            >
              
              {/* icon */}
              <div className="flex justify-center">
                <div
                  className={`relative w-28 h-28 rounded-full ${item.bg} flex items-center justify-center`}
                >
                  <div className={`${item.color}`}>
                    {item.icon}
                  </div>

                  {/* animated ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin [animation-duration:12s]"></div>
                </div>
              </div>

              {/* title */}
              <h2 className="text-2xl font-bold text-secondary text-center mt-8">
                {item.title}
              </h2>

              {/* divider */}
              <div className="w-24 h-1 bg-primary rounded-full mx-auto mt-5"></div>

              {/* description */}
              <p className="text-gray-600 leading-8 text-center mt-6">
                {item.desc}
              </p>

              {/* bottom gradient */}
              <div
                className={`absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r ${item.border}`}
              ></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WorkTabContent;