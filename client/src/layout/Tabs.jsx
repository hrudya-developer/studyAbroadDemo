import { BriefcaseBusiness, Globe, GraduationCap } from "lucide-react";
import StudyTabContent from "./StudyTabContent";
import WorkTabContent from "./WorkTabContent";
import MigrateTabContent from "./MigrateTabContent";
import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("study");

  const tabs = [
    {
      id: "study",
      label: "Study",
      icon: GraduationCap,
      activeColor: "bg-primary",
      textColor: "text-primary",
      borderColor: "border-primary",
      lineColor: "bg-primary",
    },
    {
      id: "work",
      label: "Work",
      icon: BriefcaseBusiness,
      activeColor: "bg-secondary",
      textColor: "text-secondary",
      borderColor: "border-secondary",
      lineColor: "bg-secondary",
    },
    {
      id: "migrate",
      label: "Migrate",
      icon: Globe,
      activeColor: "bg-yellow-500",
      textColor: "text-yellow-500",
      borderColor: "border-yellow-500",
      lineColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* TAB BUTTONS */}
      <div className="overflow-x-auto pb-2 max-w-5xl mx-auto">
        <div className="flex min-w-max gap-3 sm:grid sm:min-w-0 sm:grid-cols-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative w-[180px] shrink-0 overflow-hidden rounded-xl border bg-white text-left shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-full ${
                  isActive ? tab.borderColor : "border-gray-200"
                }`}
              >
                <div className="flex h-12 items-center sm:h-14">
                  <div
                    className={`flex h-full w-12 shrink-0 items-center justify-center rounded-r-[24px] transition-all duration-300 sm:w-14 ${
                      isActive
                        ? `${tab.activeColor} text-white`
                        : "bg-gray-100 text-secondary"
                    }`}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </div>

                  <div className="flex flex-1 flex-col justify-center px-3 sm:px-4">
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 sm:text-lg ${
                        isActive ? tab.textColor : "text-secondary"
                      }`}
                    >
                      {tab.label}
                    </span>

                    <span
                      className={`mt-1 h-0.5 rounded-full transition-all duration-300 ${
                        isActive ? `w-8 ${tab.lineColor}` : "w-6 bg-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="mt-0">
        {activeTab === "study" && <StudyTabContent />}
        {activeTab === "work" && <WorkTabContent />}
        {activeTab === "migrate" && <MigrateTabContent />}
      </div>
    </div>
  );
};

export default Tabs;