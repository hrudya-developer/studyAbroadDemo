import { Globe, Globe2, House } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCountries } from "../redux/slices/countrySlice";
import map_bg from "../assets/mapBg.png";

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
    <div className="relative min-h-screen bg-white max-w-7xl mx-auto px-4">
      <div style={{backgroundImage:`url(${map_bg})`}} className="h-auto grid place-content-center gap-5">
        <span className="flex gap-2 text-primary justify-center items-center mt-20"><span className="p-2 bg-secondary text-white rounded-full"><Globe2 /></span><span className="p-2 px-4 border border-secondary text-secondary rounded-full text-sm">Explore.Learn.Succeed</span></span>
<h1 className="text-5xl font-extrabold text-center my-5">
          Study Abroad <span className="text-[#d70707]">Destinations</span>
        </h1>
        <div className="flex gap-2 justify-center">
        <div className="w-[25%] h-[6px] bg-primary grid place-content-center"></div>
        <div className="w-[25%] h-[6px] bg-gray-200 grid place-content-center"></div>
        </div>
        <p className="text-center text-lg mt-5 mb-20">Discover world-class education and endless opportunitiesin top study destinations around the globe.</p>
      </div>
       
      <main className="">

       

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {countries?.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-gray-50 shadow-md hover:shadow-xl transition"
            >
              <div className="p-4">
                <h3 className="font-bold text-lg">{item.country}</h3>

                <div className="relative h-52 mt-3 overflow-hidden rounded-xl">
                  <img
                    src={`${imagePath}/${item.image}`}
                    alt={item.country}
                    className="w-full h-full object-cover"
                  />

                  <Link to={`/destination/${item.id}`}>
                    <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full text-[#d70707]">
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </section>
      </main>
    </div>
  );
};

export default DestinationList;