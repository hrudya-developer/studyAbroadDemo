import { Briefcase, CalendarDays, Newspaper } from "lucide-react";

const Topbar = () => {
  return (
    <div className="w-full">
      
      <div className="max-w-7xl bg-white text-darkPrimary mx-auto flex justify-end sm:justify-end gap-4 sm:gap-6 px-4 sm:px-5 md:px-8 text-[12px] md:text-sm py-2">
    
        
          <div className="flex justify-end items-center gap-2 animate__animated animate__backInLeft">
          <Newspaper size={16} />
          <p>Latest News</p>
        </div>

        <div className="flex items-center gap-2 animate__animated animate__backInLeft">
          <CalendarDays size={16} />
          <p>Events</p>
        </div>

        <div className="flex items-center gap-2 animate__animated animate__backInLeft">
          <button className="p-2 px-2 text-[12px] sm:p-2 sm:px-3 rounded-lg bg-darkPrimary text-white border border-gray-300 sm:text-sm hover:cursor-pointer hover:bg-black hover:text-white">German Programs</button>         
        </div>
        </div>

     

    </div>
  );
};

export default Topbar;