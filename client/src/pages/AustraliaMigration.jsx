import AustraliaHero from "./AusraliaHero";
import AustraliaImmigrationPathways from "./AustraliaImmigrationPathways";
import AustraliaMigrationBenefits from "./AustraliaMigrationBenefits";
import AustraliaMigrationSEO from "./AustraliaMigrationSEO";
import AustraliaPostMigration from "./AustraliaPostMigration";
import FAQ from "../layout/FAQ/FAQ";

const AustraliaMigration = () => {
  return (
    <>
      <AustraliaMigrationSEO />

      <main>
        <AustraliaHero />

        <AustraliaMigrationBenefits />

        <AustraliaImmigrationPathways />

        <AustraliaPostMigration />
        <FAQ />
      </main>
    </>
  );
};

export default AustraliaMigration;