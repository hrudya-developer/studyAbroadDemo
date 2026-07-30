import CoursesOfUniv from "../../pages/CoursesOfUniv";

export default function UniversityCourses({
  universityName,
  courses,
}) {
  return (
    <section
      id="courses-panel"
      role="tabpanel"
      aria-labelledby="courses-tab"
      aria-label={`Courses at ${universityName}`}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-10"
    >
      <CoursesOfUniv
        courseCategoryId={
          courses?.[0]?.c_id
        }
      />
    </section>
  );
}