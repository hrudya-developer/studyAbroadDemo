import FAQ from "../layout/FAQ/FAQ";

import CanadaImmigrationPrograms from "./CanadaImmigrationPrograms";
import CanadaMigrationBenefits from "./CanadaMigrationBenefits";
import CanadaMigrationHero from "./CanadaMigrationHero";
import CanadaMigrationSEO from "./CanadaMigrationSEO";
import CanadaPRSteps from "./CanadaPRSteps";

const CanadaMigration = () => {
  return (
    <>
      <CanadaMigrationSEO />

      <main>
        <CanadaMigrationHero />

        <CanadaMigrationBenefits />

        <CanadaPRSteps />

        <CanadaImmigrationPrograms />

        <FAQ />
      </main>
    </>
  );
};

export default CanadaMigration;