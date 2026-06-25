import {
  MapPin,
  ChevronRight,
  Headphones,
  ShieldCheck,
  FileText,
  Globe2,
  Plane,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../redux/slices/countrySlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const features = [
  {
    icon: <Headphones />,
    title: "Expert Guidance",
    text: "Personalized support every step of the way.",
  },
  {
    icon: <ShieldCheck />,
    title: "Trusted by Thousands",
    text: "12+ years of experience & global presence.",
  },
  {
    icon: <FileText />,
    title: "Visa Assistance",
    text: "End-to-end help for a hassle-free process.",
  },
  {
    icon: <Globe2 />,
    title: "Global Opportunities",
    text: "Unlock your future with world-class education.",
  },
];

export default function StudyDestinations() {

  const dispatch = useDispatch();

const { countries, imagePath, loading } = useSelector(
  (state) => state.countryData
);


const { uid } = useSelector((state) => state.auth);


useEffect(() => {
  

  if (countries.length === 0) {
    dispatch(fetchCountries(uid || 0));
  }
}, [uid, dispatch, countries.length]);

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
    <section className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    


      {/* Plane */}
   

      <div className="relative mx-auto max-w-7xl" data-aos="fade-up">
        {/* Heading */}
        <div className="text-center">
           <h1 className="font-nunito font-bold text-3xl sm:text-4xl lg:text-5xl text-darkPrimary">
            Explore Top{" "}
            <span className="text-primary">Study Destinations</span>
          </h1>

          <p className="mt-5 text-lg text-black">
            Choose your dream destination and start your global journey today!
          </p>

          <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-primary" />
        </div>

        {/* Destination Cards */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {countries.slice(0, 12).map((item) => (
  <Link
    key={item.id}
    to={`/destination/${item.id}`}
    state={{ country: item }}
    className="group flex items-center justify-between rounded-2xl border border-gray-50 bg-white px-5 py-4 shadow-[0_8px_25px_rgba(220,0,0,0.08)] transition hover:-translate-y-1 hover:border-primary hover:shadow-[0_12px_30px_rgba(220,0,0,0.16)]"
  >
    <div className="flex items-center gap-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-primary">
        <MapPin className="h-6 w-6 fill-primary text-white" />
      </span>

      <span className="font-semibold text-secondary">
        {item.country}
      </span>
    </div>

   

    <ChevronRight className="h-6 w-6 text-primary transition group-hover:translate-x-1" />
  </Link>
))}
        </div>

        {/* Feature Box */}
        <div className="mt-12 rounded-3xl bg-darkPrimary px-6 py-8 shadow-lg">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 border-slate-200 lg:border-r lg:pr-6 last:border-r-0"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <div className="h-8 w-8 grid place-content-center">{item.icon}</div>
                </div>

                <div>
                  <h3 className="font-bold text-logoYellow">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}