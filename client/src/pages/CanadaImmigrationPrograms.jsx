import CanadaExpressEntry from "./CanadaExpressEntry";
import CanadaFamilySponsorship from "./CanadaFamilySponsorship";
import CanadaOpportunityCard from "./CanadaOpportunityCard";
import CanadaPNPOverview from "./CanadaPNPOverview";
import CanadaVisaStartup from "./CanadaVisaStartup";
import CanadaWorkPermits from "./CanadaWorkPermits";

const CanadaImmigrationPrograms = () => {
  return (
    <section
      id="canada-immigration-programs" className="pb-10 scroll-mt-25">
      {/* Shared background decorations */}
    

      <div
        className="
          relative z-10
          mx-auto w-full max-w-[1500px]
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center mb-10">
        

          <h2
            className="
              mt-4 text-3xl font-bold
              leading-tight tracking-[-0.03em]
              text-darkPrimary
              sm:text-4xl
              lg:text-4xl
            "
          >
            Canada Immigration Programs
          </h2>

          <p
            className="
              mx-auto mt-4 max-w-2xl
              text-sm leading-6 text-slate-600
              sm:text-base sm:leading-7
            "
          >
            Explore two popular Canadian immigration pathways and understand
            their important stages, requirements and opportunities.
          </p>
        </div>

        {/* Shared parent card */}
        <div
          className=""
        >
          <div
            className="
              grid grid-cols-1 gap-5
              xl:grid-cols-2
              xl:items-stretch
              xl:gap-6
            "
          >
            <CanadaExpressEntry />
            <CanadaVisaStartup />
            <CanadaPNPOverview />
            <CanadaFamilySponsorship />
            <CanadaWorkPermits />
            <CanadaOpportunityCard />

          </div>
        </div>
      </div>
    </section>
  );
};

export default CanadaImmigrationPrograms;