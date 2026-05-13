import { Globe, GraduationCap, Send, ShieldCheck } from "lucide-react";
import mapBg from "../assets/mapBg.png";
import Tabs from "./Tabs";

const ProgramsSection = () => {
  return (
    <>
<div className="max-w-7xl mx-auto">
    <div style={{backgroundImage:`url(${mapBg})`}} className="h-auto mb-14 bg-no-repeat bg-cover bg-center">
        <p className="text-primary font-bold text-center flex gap-3 justify-center mb-4"><span><Send className="text-primary"/></span>EXPLORE OUR PROGRAMS</p>
  <h1 className="font-ubuntu font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 text-center text-secondary">Unlock Global <span className="text-primary">Opportunities</span></h1>
   <h5 className="font-bold text-secondary text-lg text-center my-2">Your Gateway to International Education and Immigration Success.</h5>
   <p className="text-center textColor w-[90%] sm:w-[90%] md:w-[65%] lg:w-[60%] mx-auto pt-3 text-md">
    A seamless study visa process opens the door to world-class education and global careers. With the right support and expertise, your journey from student to global professional becomes effortless.
   </p>
   <div className="flex gap-3 justify-center mt-10 mx-5">

   
    <div className="flex gap-3 bg-[#d9ebff70] rounded-lg p-5 shadow-sm">
        <div className="w-12 h-12 rounded-lg p-3 grid place-content-center"><GraduationCap className="text-secondary" size={30}/></div>
       <div className="flex flex-col gap-2"><h4 className="text-lg font-bold flex gap-3">Global Education</h4>
        <p>Top Universities Worldwide</p>
    </div></div> 
    <div className="flex gap-3 bg-[#fde2d6] rounded-lg p-5 shadow-sm">
        <div className="w-12 h-12 rounded-lg p-3 grid place-content-center"><Globe className="text-secondary" size={30}/></div>
       <div className="flex flex-col gap-2"><h4 className="text-lg font-bold flex gap-3">Global Exposure</h4>
        <p>Build International experience</p>
    </div></div>
    <div className="flex gap-3 bg-[#d9ebff70] rounded-lg p-5 shadow-sm">
        <div className="w-12 h-12 rounded-lg p-3 grid place-content-center"><ShieldCheck className="text-secondary" size={30}/></div>
       <div className="flex flex-col gap-2"><h4 className="text-lg font-bold flex gap-3">Secure Future</h4>
        <p>Achieve your goals</p>
    </div></div>

   </div>
    </div>

<Tabs />

</div>
    </>
  )
}

export default ProgramsSection