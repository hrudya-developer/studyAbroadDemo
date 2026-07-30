const GermanProgramsHeader = () => (
  <header className="mb-12 text-center">
    <span
      className="
        inline-flex rounded-full
        bg-pink-100 px-5 py-2
        text-xs font-bold uppercase
        tracking-widest text-primary
      "
    >
      Explore Programs
    </span>

    <h1
      id="german-programs-heading"
      className="
        mt-4 text-3xl font-extrabold
        leading-tight text-darkPrimary
        sm:text-4xl md:text-5xl
      "
    >
      Popular{" "}
      <span className="text-primary">
        German
      </span>{" "}
      Courses
    </h1>

    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
      Explore German courses, Ausbildung
      programs and career pathways for
      international study, vocational
      training and employment.
    </p>
  </header>
);

export default GermanProgramsHeader;