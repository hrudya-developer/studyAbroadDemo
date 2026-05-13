import { BriefcaseBusiness, Globe, GraduationCap } from "lucide-react"
import StudyTabContent from "./StudyTabContent"
import WorkTabContent from "./WorkTabContent"
import MigrateTabContent from "./MigrateTabContent"


const Tabs = () => {
  return (
    <>
  
<div className="tabs tabs-lift flex justify-center gap-3 border-0">

  <label className="tab flex items-center gap-3 border-0 px-4 h-16 bg-primary text-white text-lg rounded-md w-[25%] shadow-md">
    <input type="radio" name="my_tabs_4" defaultChecked />
    <GraduationCap />
    Study
  </label>

  <div className="tab-content bg-base-100 pt-2">
    <StudyTabContent />
  </div>

  <label className="tab flex items-center gap-3 border-0 px-4 h-16 bg-gray-200 text-lg text-secondary rounded-md w-[25%] shadow-md">
    <input type="radio" name="my_tabs_4" />
    <BriefcaseBusiness />
    Work
  </label>

  <div className="tab-content bg-base-100 pt-2">
   <WorkTabContent />
  </div>

  <label className="tab flex items-center gap-3 border-0 px-4 h-16 text-lg bg-gray-200 text-secondary rounded-md w-[25%] shadow-md">
    <input type="radio" name="my_tabs_4" />
    <Globe />
    Migrate
  </label>

  <div className="tab-content bg-base-100 pt-2">
   <MigrateTabContent />
  </div>

</div>
    </>
  )
}

export default Tabs