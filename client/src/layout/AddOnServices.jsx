import { useEffect, useState } from "react";
import axios from "axios";
import { Phone, ArrowRight, HandHelpingIcon } from "lucide-react";
import mapBg from "../assets/mapBg.png";

export default function AddOnServices() {
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ pagination state (VIEW MORE)
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "https://overseas.technocitysolutions.com/public/api/getServices",
          {
            api: "overseas@Miak2023",
            uid: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response?.data;

        setImageBaseUrl(data?.services_image_path || "");
        setServices(Array.isArray(data?.services) ? data.services : []);
      } catch (error) {
        console.error("Services API Error:", error?.response || error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ✅ featured services
  const featuredServices = services.filter(
    (service) => service?.home === "yes"
  );

  // ✅ safe image
  const getImage = (img) =>
    img && imageBaseUrl
      ? `${imageBaseUrl}${img}`
      : "https://placehold.co/600x400?text=No+Image";

  // ✅ visible services (3 by 3)
  const visibleServices = services.slice(0, visibleCount);

  return (
    <div className="bg-slate-50">
      {/* FEATURED */}
      {featuredServices.length > 0 && (
        <section
          className="container mx-auto max-w-7xl px-4 py-16 lg:px-8 bg-no-repeat"
          style={{ backgroundImage: `url(${mapBg})` }}
        >
          <div className="text-center mb-10">
            <span className="p-4 bg-red-100 grid place-content-center mx-auto size-20 rounded-full shadow-xl">
              <HandHelpingIcon className="size-12 text-primary" />
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mt-8">
              Featured <span className="text-primary">Services</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 place-content-center">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="overflow-hidden rounded-3xl bg-white shadow-xl"
              >
                <img
                  src={getImage(service.image)}
                  alt={service.name}
                  className="w-full h-56 object-contain"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/600x400?text=Service")
                  }
                />

                <div className="p-6">
                  <p className="mt-1 text-slate-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ALL SERVICES */}
      <section className="container mx-auto px-4 py-10 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary">
            Complete <span className="text-primary">Service</span> Portfolio
          </h2>
        </div>

        {loading ? (
          <div className="py-20 text-center">Loading Services...</div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {visibleServices.map((service) => (
                <div
                  key={service.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl transition"
                >
                  <img
                    src={getImage(service.image)}
                    alt={service.name}
                    className="h-52 w-full object-contain"
                    onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/600x400?text=Service")
                    }
                  />

                  <div className="p-5">
                    {/* <h3 className="font-bold text-lg text-secondary">
                      {service.name}
                    </h3> */}

                    <p className="text-sm text-slate-600 mt-2 line-clamp-6">
                      {service.description}
                    </p>

                    {/* <a
                      href="#"
                      className="mt-4 inline-flex items-center gap-2 text-primary font-semibold"
                    >
                      Connect with us <ArrowRight size={16} />
                    </a> */}
                  </div>
                </div>
              ))}
            </div>

            {/* VIEW MORE BUTTON */}
            {visibleCount < services.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:opacity-90 hover:cursor-pointer hover:bg-secondary"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="rounded-[32px] bg-gradient-to-r from-secondary to-primary p-10 text-white text-center">
          <h3 className="text-3xl font-bold">
            Need Help with Any Service?
          </h3>

          <p className="mt-3 text-white/80">
            We’re here to guide you anytime.
          </p>

          <a
            href="tel:+919072982555"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-primary"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </section>
    </div>
  );
}