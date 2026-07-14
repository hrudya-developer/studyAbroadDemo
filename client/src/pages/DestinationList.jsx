import { Globe, Globe2, House } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCountries } from "../redux/slices/countrySlice";
import map_bg from "../assets/mapBg.png";
import DestinationExcerpts from "./DestinationExcerpts";

const Dots = ({ className = "" }) => (
  <div className={`grid grid-cols-5 gap-3 ${className}`}>
    {Array.from({ length: 25 }).map((_, i) => (
      <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#d70707]" />
    ))}
  </div>
);

const DestinationList = () => {
  const dispatch = useDispatch();

  const { countries, imagePath, loading } = useSelector(
    (state) => state.countryData
  );

  const { uid } = useSelector((state) => state.auth);

  const safeUid = uid ?? 0;

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-bold text-slate-700">
          Loading destinations...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white max-w-9xl mx-auto px-4">
      <div   style={{
    backgroundImage: `url(${map_bg})`,
    backgroundSize: "100% auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
  }} className="bg-cover bg-no-repeat bg-center w-full min-h-[450px] grid place-content-center gap-5">
        <span className="flex gap-2 text-primary justify-center items-center mt-20"><span className="p-2 bg-secondary text-white rounded-full"><Globe2 /></span><span className="p-2 px-4 border border-secondary text-secondary rounded-full text-sm">Explore.Learn.Succeed</span></span>
<h1 className="text-4xl sm:text-5xl font-extrabold text-center my-5 text-darkPrimary">
          Study Abroad <span className="text-primary">Destinations</span>
        </h1>
        <div className="flex gap-2 justify-center">
        <div className="w-[25%] h-[6px] bg-primary grid place-content-center"></div>
        <div className="w-[25%] h-[6px] bg-gray-200 grid place-content-center"></div>
        </div>
        <p className="text-center text-lg mt-5 mb-20">Discover world-class education and endless opportunitiesin top study destinations around the globe.</p>
      </div>
       
      <main className="">

<section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {countries?.map((item) => (
    <div
      key={item.id}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-gray-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <img
        src={`${imagePath}/${item.image}`}
        alt={item.country}
        className="h-56 w-full object-cover"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-bold text-black">
            {item.country}
          </h3>

          {item.flag && (
            <img
              src={`${imagePath}/${item.flag}`}
              alt={`${item.country} flag`}
              className="h-9 w-9 rounded-full border border-gray-200 object-cover"
            />
          )}
        </div>

        {/* Excerpt */}
        <p className="flex-1 text-md leading-7 text-slate-700">
          {DestinationExcerpts(item.country)}
        </p>

        {/* Explore Button */}
        <Link
          to={`/destination/${item.id}`}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-darkPrimary px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary hover:gap-3"
        >
          Learn More
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  ))}
</section>

       
      </main>
    </div>
  );
};

export default DestinationList;