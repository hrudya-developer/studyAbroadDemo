import {
  BookOpen,
  Landmark,
} from "lucide-react";

export default function UniversityTabs({
  activeTab,
  universityName,
  onChange,
}) {
  return (
    <nav
      aria-label="University information"
      className="sticky top-0 z-20 overflow-x-auto border-b border-[#e6eaf2] bg-white/95 px-4 backdrop-blur-xl sm:px-8 lg:px-14"
    >
      <div
        role="tablist"
        aria-label={`${universityName} details`}
        className="mx-auto flex max-w-7xl"
      >
        <TabButton
          id="about-tab"
          active={activeTab === "about"}
          onClick={() =>
            onChange("about")
          }
          icon={Landmark}
        >
          About
        </TabButton>

        <TabButton
          id="courses-tab"
          active={
            activeTab === "courses"
          }
          onClick={() =>
            onChange("courses")
          }
          icon={BookOpen}
        >
          Courses
        </TabButton>
      </div>
    </nav>
  );
}

function TabButton({
  id,
  active,
  onClick,
  icon: Icon,
  children,
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={active}
      aria-controls={`${id.replace(
        "-tab",
        ""
      )}-panel`}
      onClick={onClick}
      className={`flex min-w-fit items-center gap-3 border-b-4 px-6 py-5 font-extrabold uppercase ${
        active
          ? "border-darkPrimary text-darkPrimary"
          : "border-transparent text-[#51607d]"
      }`}
    >
      <Icon
        className="size-6"
        aria-hidden="true"
      />

      {children}
    </button>
  );
}