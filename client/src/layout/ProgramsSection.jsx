import { Globe, GraduationCap, Send, ShieldCheck } from "lucide-react";
import mapBg from "../assets/mapBg.png";
import Tabs from "./Tabs";

const ProgramsSection = () => {
  return (
    <>
<div className="max-w-7xl mx-auto px-4" data-aos="fade-up" id="ep_section">
    <div style={{backgroundImage:`url(${mapBg})`}} className="h-auto mb-14 bg-no-repeat bg-contain bg-top w-full">
        <p className="font-bold text-center flex gap-3 justify-center pb-8 pt-15 text-sm"><span className="flex items-center justify-center gap-2 bg-orange-100 text-darkPrimary px-4 py-2 rounded-full"><span><Send className="text-darkPrimary"/></span>EXPLORE OUR PROGRAMS</span></p>
  <h1 className="font-nunito font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 text-center text-darkPrimary">Unlock Global <span className="text-primary">Opportunities</span></h1>
   <h5 className="font-bold text-gray-800 text-lg text-center my-2 px-5 md:px-3">Your Gateway to International Education and Immigration Success.</h5>
   <p className="text-center textColor w-[90%] sm:w-[90%] md:w-[65%] lg:w-[60%] mx-auto pt-3 text-md">
    A seamless study visa process opens the door to world-class education and global careers. With the right support and expertise, your journey from student to global professional becomes effortless.
   </p>
<div className="mx-5 mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
  {[
    {
      icon: <GraduationCap size={38} />,
      title: "Global Education",
      desc: "Access top-ranked universities worldwide and unlock endless opportunities.",
      theme: "pink",
    },
    {
      icon: <Globe size={38} />,
      title: "Global Exposure",
      desc: "Build international experience, explore diverse cultures and broaden your perspective.",
      theme: "blue",
    },
    {
      icon: <ShieldCheck size={38} />,
      title: "Secure Future",
      desc: "Receive expert guidance to achieve your academic and career goals with confidence.",
      theme: "pink",
    },
  ].map((item, index) => (
    <div
      key={index}
      className={`group relative min-h-[320px] rounded-[28px] border bg-white px-6 pb-8 pt-20 mb-10 md:mb-0 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
        item.theme === "pink"
          ? "border-primary/20"
          : "border-secondary/20"
      }`}
    >
      {/* Floating Icon */}
      <div
        className={`absolute left-1/2 top-0 z-20 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-xl transition-transform duration-500 group-hover:scale-110 ${
          item.theme === "pink"
            ? "bg-gradient-to-br from-primary to-darkPrimary"
            : "bg-gradient-to-br from-secondary to-blue-800"
        }`}
      >
        {item.icon}
      </div>

      {/* Top Left Dots */}
      <div
        className={`absolute left-7 top-8 grid grid-cols-4 gap-1 opacity-25 ${
          item.theme === "pink" ? "text-primary" : "text-secondary"
        }`}
      >
        {[...Array(16)].map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-current" />
        ))}
      </div>

      {/* Bottom Right Dots */}
      <div
        className={`absolute bottom-8 right-7 grid grid-cols-4 gap-1 opacity-25 ${
          item.theme === "pink" ? "text-primary" : "text-secondary"
        }`}
      >
        {[...Array(16)].map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-current" />
        ))}
      </div>

    

      <h3
        className={`relative mb-4 text-lg font-extrabold ${
          item.theme === "pink" ? "text-darkPrimary" : "text-secondary"
        }`}
      >
        {item.title}
      </h3>

      <div
        className={`relative mx-auto mb-6 h-1 w-16 rounded-full ${
          item.theme === "pink" ? "bg-primary" : "bg-secondary"
        }`}
      />

      <p className="relative mx-auto max-w-[280px] text-[15px] leading-7 text-gray-600">
        {item.desc}
      </p>
    </div>
  ))}
</div>
    </div>

<Tabs />

</div>
    </>
  )
}

export default ProgramsSection