import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  GraduationCap,
  Globe2,
  Wallet,
  Route,
  PlayCircle,
  Play,
  GraduationCapIcon,
  HandFist,
} from "lucide-react";

import heroGermany from "../assets/heroGermany.png";
import { fetchGermanPrograms } from "../redux/slices/germanProgramSlice";
// import aeroPlanePath from "../assets/aeroPlanePath.png";
import mapBackground from "../assets/mapBg.png";

const GermanPrograms = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const programId = id || 6;

  const {
    mainData = null,
    benefits = [],
    stipend = [],
    eligibility = [],
    streams = [],
    relatedPrograms = [],
    youtube = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.germanProgramData || {});
  

  useEffect(() => {
    dispatch(fetchGermanPrograms({ uid: 0, id: programId }));
  }, [dispatch, programId]);

  return (
    <section className="bg-white px-4 py-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px]">
        <div className="grid items-center lg:grid-cols-2">
          <div className="relative z-10 p-8 md:p-14 bg-no-repeat bg-right" style={{backgroundImage:`url(${mapBackground})`}}>
            <p className="mb-4 text-sm inline-block sm:text-md font-bold text-black px-3 py-2 mb-5 rounded-full bg-logoYellow">
              Build Your Future
            </p>

            <h1 className="text-3xl font-black leading-tight text-black md:text-4xl">
              {mainData?.name || "German Program"}
              <br />
              <span className="text-darkPrimary">Germany</span>
            </h1>

            <p className="mt-6 max-w-xl text-md font-medium text-slate-700">
              {mainData?.titleWhy || "Learn. Grow. Succeed in Germany."}
            </p>

            <button className="mt-10 bg-primary hover:bg-secondary text-white p-2 px-4 rounded-lg hover:cursor-pointer mr-4 mb-4">Read More</button>
             <button className="mt-10 bg-secondary hover:bg-primary text-white p-2 px-4 rounded-lg hover:cursor-pointer">Find a Course</button>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[50px]" style={{backgroundImage:`url(${heroGermany})`}}>
            <div className="flex">
              <div className="bg-white/100 text-black grid place-content-center rounded-br-4xl rounded-tl-4xl font-bold text-md p-8 shadow-lg">
<span className="">
  <span className="bg-primary w-16 h-16 rounded-full shadow-lg grid place-content-center text-white my-3 mx-auto"><GraduationCapIcon /></span>10 K + Students</span> <span className="text-primary">World wide</span> 
              </div>

            </div>
            <div className="flex absolute right-0 bottom-0">
              <div className="bg-white/100 text-black grid place-content-center rounded-tl-4xl rounded-tr-none font-bold text-md p-8 shadow-lg">
<span className="">
  <span className="bg-secondary w-16 h-16 rounded-full shadow-lg grid place-content-center text-white my-3 mx-auto"><HandFist /></span>Opportunities</span> <span className="text-primary">Beyond Borders</span> 
              </div>

            </div>
          
          </div>
        </div>

        <div className="px-6 py-10 md:px-14">
          {loading && (
            <p className="mb-8 text-center font-semibold text-slate-500">
              Loading program details...
            </p>
          )}

          {error && (
            <p className="mb-8 text-center font-semibold text-primary">
              {error}
            </p>
          )}

          {!loading && !error && (
            <>
              <div className="mb-10 flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-blue-100 md:flex-row md:items-start">
                <div className="grid h-16 w-16 shrink-0 place-content-center rounded-2xl bg-blue-50 text-secondary">
                  {mainData?.iconUrl ? (
                    // <img
                    //   src={mainData.iconUrl}
                    //   alt={mainData?.name || "Program icon"}
                    //   className="h-9 w-9 object-contain"
                    // />
                      <img
              src={mainData?.imageUrl || heroGermany}
              alt={mainData?.name || "Germany Program"}
              className="object-cover"
            />
                  ) : (
                    <BookOpen size={34} />
                  )}
                </div>

                <div>
                  <h2 className="mb-3 text-2xl font-bold text-secondary">
                    {mainData?.titleWhy || "About Program"}
                  </h2>

                  <p className="leading-8 text-slate-700">
                    {mainData?.why ||
                      "This program offers real-world skills and qualifications in Germany."}
                  </p>
                </div>
              </div>

              {benefits.length > 0 && (
                <SectionBlock title="Benefits" icon={CheckCircle} items={benefits} />
              )}

              {stipend.length > 0 && (
                <SectionBlock title="Stipend" icon={Wallet} items={stipend} />
              )}

              {eligibility.length > 0 && (
                <SectionBlock
                  title="Eligibility"
                  icon={GraduationCap}
                  items={eligibility}
                />
              )}

              {streams.length > 0 && (
                <SectionBlock title="Work Sectors" icon={Briefcase} items={streams} />
              )}

              {relatedPrograms.length > 0 && (
                <div className="mt-12">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-content-center rounded-xl bg-secondary text-white">
                      <Route />
                    </div>

                    <h2 className="text-3xl font-bold text-secondary">
                      Related Programs
                    </h2>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {relatedPrograms.map((program, index) => (
                      <Link
                        to={`/germanPrograms/${program?.id}`}
                        key={program?.id || index}
                        className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        {program?.imageUrl && (
                          <img
                            src={program.imageUrl}
                            alt={program.name}
                            className="h-44 w-full object-cover"
                          />
                        )}

                        <div className="p-5 text-center">
                          <h3 className="text-lg font-bold text-secondary">
                            {program?.name}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {youtube.length > 0 && (
                <div className="mt-12">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="grid h-12 w-12 place-content-center rounded-xl bg-primary text-white">
                      <PlayCircle />
                    </div>

                    <h2 className="text-3xl font-bold text-secondary">Videos</h2>
                  </div>

                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                   
                    {youtube.map((item, index) => (
                      <a
                        key={item?.id || index}
                        href={item?.link}
                        target="_blank"
                        rel="noreferrer"
                        className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg relative"
                      >
                         <div className="w-14 h-14 grid place-content-center bg-primary text-white mx-auto items-center rounded-full shadow-lg absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-1/2 hover:cursor-pointer hover:bg-black"><Play /></div>
                        {item?.thumbnailUrl && (
                          <img
                            src={item.thumbnailUrl}
                            alt={item?.title || "Video"}
                            className="h-56 w-full object-cover"
                          />
                        )}

                        <div className="p-5">
                          <p className="font-bold text-secondary">
                            {item?.title || "Watch Video"}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-blue-50 p-6 md:flex-row md:items-center">
                <div className="grid h-16 w-16 shrink-0 place-content-center rounded-full bg-secondary text-white">
                  <Globe2 size={34} />
                </div>

                <p className="text-lg font-medium leading-8 text-slate-700">
                  {mainData?.name || "This program"} helps students gain
                  practical experience and build a strong career pathway in
                  Germany.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

function SectionBlock({ title, icon: Icon, items = [] }) {
  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center gap-4">
        <div className="grid h-12 w-12 place-content-center rounded-xl bg-secondary text-white">
          <Icon />
        </div>

        <h2 className="text-3xl font-bold text-secondary">{title}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={item?.id || index}
            className="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {item?.iconUrl ? (
              <img
                src={item.iconUrl}
                alt={item?.text || item?.name}
                className="mx-auto mb-3 h-10 w-10 object-contain"
              />
            ) : (
              <div className="mx-auto mb-3 grid place-content-center text-sm font-extrabold text-primary">
                {item?.icon || "✓"}
              </div>
            )}

            <p className="text-sm font-bold text-slate-800">
              {item?.text || item?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GermanPrograms;