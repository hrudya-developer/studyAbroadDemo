import {
  useCallback,
  useRef,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import FAQ from "../../layout/FAQ/FAQ";

// import AusbildungVideoSection from "./AusbildungVideoSection";
import UniversityAbout from "./UniversityAbout";
import UniversityCourses from "./UniversityCourses";
import UniversityDetailsSEO from "./UniversityDetailsSEO";
import UniversityError from "./UniversityError";
import UniversityHero from "./UniversityHero";
import UniversityLoading from "./UniversityLoading";
import UniversityTabs from "./UniversityTabs";
import useUniversityDetails from "./useUniversityDetails";

const VALID_TABS = [
  "about",
  "courses",
];

export default function UniversityDetails() {
  const navigate = useNavigate();

  const tabsRef = useRef(null);

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const {
    id,
    loading,
    error,
    data,
  } = useUniversityDetails();

  const requestedTab =
    searchParams.get("tab");

  const activeTab = VALID_TABS.includes(
    requestedTab
  )
    ? requestedTab
    : "about";

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/allUniversities");
  }, [navigate]);

  const handleTabChange = useCallback(
    (tab) => {
      if (!VALID_TABS.includes(tab)) {
        return;
      }

      setSearchParams(
        (currentParams) => {
          const nextParams =
            new URLSearchParams(
              currentParams
            );

          /*
           * Keep the clean default URL for
           * the About tab.
           */
          if (tab === "about") {
            nextParams.delete("tab");
          } else {
            nextParams.set(
              "tab",
              tab
            );
          }

          return nextParams;
        },
        {
          replace: true,
        }
      );

      window.requestAnimationFrame(
        () => {
          tabsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      );
    },
    [setSearchParams]
  );

  if (loading) {
    return <UniversityLoading />;
  }

  if (error) {
    return (
      <UniversityError
        title="Failed to load university details"
        message={error}
        onBack={handleBack}
      />
    );
  }

  if (!data?.university) {
    return (
      <UniversityError
        title="University details not found"
        message="The requested university may be unavailable or the URL may be incorrect."
        onBack={handleBack}
      />
    );
  }

  const courses = Array.isArray(
    data.selectedCourses
  )
    ? data.selectedCourses
    : [];

  return (
    <>
      <UniversityDetailsSEO
        university={data.university}
        universityId={id}
        countryName={data.countryName}
        locationText={data.locationText}
        universityType={
          data.universityType
        }
        ranking={data.ranking}
        aboutText={data.aboutText}
        logo={data.logo}
        universityImagePath={
          data.universityImagePath
        }
        sliderImages={
          data.sliderImages
        }
        courses={courses}
      />

      <main
        className="
          min-h-screen
          bg-[#f7f9fd]
          text-[#081c47]
        "
      >
        <UniversityHero
          data={data}
          onBack={handleBack}
          onCourses={() =>
            handleTabChange("courses")
          }
        />

        <div
          ref={tabsRef}
          className="scroll-mt-20"
        >
          <UniversityTabs
            activeTab={activeTab}
            universityName={
              data.universityName
            }
            onChange={
              handleTabChange
            }
          />
        </div>

        {activeTab === "about" && (
          <UniversityAbout
            data={data}
            onCourses={() =>
              handleTabChange(
                "courses"
              )
            }
          />
        )}

        {activeTab === "courses" && (
          <UniversityCourses
            universityName={
              data.universityName
            }
            courses={courses}
          />
        )}

        <section
          aria-label="Frequently asked questions"
          className="
            mx-auto max-w-7xl
            px-4 pb-16 pt-6
            sm:px-8
            lg:px-10
          "
        >
          <FAQ />
        </section>
      </main>
    </>
  );
}