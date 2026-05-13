import { Briefcase, CalendarDays, Newspaper } from "lucide-react";

const Topbar = () => {
  return (
    <div className="w-full">
      
      <div className="max-w-7xl bg-primary text-white mx-auto flex justify-end gap-6 px-4 sm:px-5 md:px-8 text-[12px] md:text-sm py-2">
        
        <div className="flex items-center gap-2">
          <Newspaper size={16} />
          <p>News & Articles</p>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          <p>Events</p>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          <p>Careers</p>
        </div>

      </div>

    </div>
  );
};

export default Topbar;