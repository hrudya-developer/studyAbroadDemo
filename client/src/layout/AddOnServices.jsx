import {
  ChevronDown,
  ChevronUp,
  HandHelpingIcon,
  Phone,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import mapBg from "../assets/mapBg.png";

import AddOnServiceCard from "./AddOnServiceCard";
import AddOnServicesSEO from "./AddOnServicesSEO";
import FAQ from "./FAQ/FAQ";

const INITIAL_VISIBLE_COUNT = 3;
const LOAD_COUNT = 3;

const API_URL =
  "https://overseas.technocitysolutions.com/public/api/getServices";

export default function AddOnServices() {
  const [imageBaseUrl, setImageBaseUrl] =
    useState("");

  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.post(
          API_URL,
          {
            api: "overseas@Miak2023",
            uid: 0,
          },
          {
            headers: {
              "Content-Type":
                "application/json",
            },
            signal: controller.signal,
          }
        );

        const data = response?.data || {};

        setImageBaseUrl(
          data?.services_image_path ||
            data?.service_image_path ||
            data?.image_path ||
            ""
        );

        const serviceData =
          data?.services ||
          data?.service ||
          data?.data ||
          [];

        setServices(
          Array.isArray(serviceData)
            ? serviceData
            : []
        );
      } catch (requestError) {
        if (
          requestError?.name ===
            "CanceledError" ||
          requestError?.code ===
            "ERR_CANCELED"
        ) {
          return;
        }

        console.error(
          "Services API Error:",
          requestError?.response ||
            requestError
        );

        setError(
          "Unable to load services at the moment."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setVisibleCount(
      INITIAL_VISIBLE_COUNT
    );
  }, [services.length]);

  const featuredServices = useMemo(
    () =>
      services.filter((service) => {
        const featuredValue = String(
          service?.home ||
            service?.featured ||
            service?.is_featured ||
            ""
        ).toLowerCase();

        return [
          "yes",
          "true",
          "1",
        ].includes(featuredValue);
      }),
    [services]
  );

  const visibleServices = useMemo(
    () =>
      services.slice(0, visibleCount),
    [services, visibleCount]
  );

  const canLoadMore =
    visibleCount < services.length;

  const canShowLess =
    visibleCount >
    INITIAL_VISIBLE_COUNT;

  const getServiceId = (
    service,
    index
  ) =>
    service?.id ||
    service?.service_id ||
    service?.s_id ||
    `service-${index + 1}`;

  const getServiceImageName = (
    service
  ) =>
    service?.image ||
    service?.service_image ||
    service?.image_name ||
    service?.thumbnail ||
    service?.icon ||
    "";

  const getImage = (service) => {
    const imageName =
      getServiceImageName(service);

    if (!imageName) {
      return "";
    }

    const normalizedImage =
      String(imageName).trim();

    if (
      normalizedImage.startsWith(
        "http://"
      ) ||
      normalizedImage.startsWith(
        "https://"
      )
    ) {
      return normalizedImage;
    }

    const normalizedBaseUrl =
      String(
        imageBaseUrl || ""
      ).replace(/\/+$/, "");

    const normalizedFile =
      normalizedImage.replace(
        /^\/+/,
        ""
      );

    if (!normalizedBaseUrl) {
      return "";
    }

    return `${normalizedBaseUrl}/${normalizedFile}`;
  };

  const handleLoadMore = () => {
    setVisibleCount(
      (previousCount) =>
        Math.min(
          previousCount + LOAD_COUNT,
          services.length
        )
    );
  };

  const handleShowLess = () => {
    setVisibleCount(
      INITIAL_VISIBLE_COUNT
    );

    document
      .getElementById(
        "all-services-heading"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <>
      <AddOnServicesSEO
        services={services}
        imageBaseUrl={imageBaseUrl}
      />

      <main className="overflow-hidden bg-slate-50">
        {/* Page heading remains visible while loading */}
        <section
          aria-labelledby="featured-services-heading"
          className="
            relative px-4 py-16
            lg:px-8 lg:py-20
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -left-28 top-10
              size-72 rounded-full
              bg-secondary/10 blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-28 bottom-10
              size-72 rounded-full
              bg-primary/10 blur-3xl
            "
          />

          <div
            className="
              container relative mx-auto
              max-w-7xl bg-contain
              bg-center bg-no-repeat
            "
            style={{
              backgroundImage: `url(${mapBg})`,
            }}
          >
            <header
              className="
                mx-auto mb-12
                max-w-3xl text-center
              "
            >
              <span
                aria-hidden="true"
                className="
                  mx-auto grid size-20
                  place-content-center
                  rounded-full
                  bg-primary/10
                  shadow-lg
                  shadow-primary/10
                "
              >
                <HandHelpingIcon
                  className="size-11 text-primary"
                />
              </span>

              <p
                className="
                  mt-7 text-sm font-bold
                  uppercase tracking-[0.18em]
                  text-primary
                "
              >
                Complete Student Support
              </p>

              <h1
                id="featured-services-heading"
                className="
                  mt-3 text-4xl
                  font-extrabold leading-tight
                  text-secondary
                  md:text-5xl
                "
              >
                Study Abroad{" "}
                <span className="text-primary">
                  Add-On Services
                </span>
              </h1>

              <p
                className="
                  mx-auto mt-5 max-w-2xl
                  text-base leading-7
                  text-slate-600
                  md:text-lg
                "
              >
                Get expert assistance with
                admissions, visas, finance,
                accommodation, travel and every
                important stage of your overseas
                education journey.
              </p>
            </header>

            {!loading &&
              !error &&
              featuredServices.length >
                0 && (
                <div
                  className="
                    grid justify-items-center
                    gap-8
                    md:grid-cols-2
                    lg:grid-cols-3
                  "
                >
                  {featuredServices.map(
                    (
                      service,
                      index
                    ) => {
                      const serviceId =
                        getServiceId(
                          service,
                          index
                        );

                      return (
                        <AddOnServiceCard
                          key={serviceId}
                          service={service}
                          imageUrl={getImage(
                            service
                          )}
                          featured
                          priority={
                            index === 0
                          }
                          serviceId={`featured-service-${serviceId}`}
                        />
                      );
                    }
                  )}
                </div>
              )}
          </div>
        </section>

        {/* All services */}
        <section
          aria-labelledby="all-services-heading"
          className="
            relative overflow-hidden
            bg-gradient-to-b
            from-white via-slate-50
            to-primary/[0.04]
            px-4 py-16
            lg:px-8 lg:py-20
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -left-28 top-20
              size-72 rounded-full
              bg-secondary/10 blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-28 bottom-20
              size-72 rounded-full
              bg-primary/10 blur-3xl
            "
          />

          <div
            className="
              container relative mx-auto
              max-w-7xl
            "
          >
            <header
              className="
                mx-auto mb-12
                max-w-3xl text-center
              "
            >
              <p
                className="
                  text-sm font-bold uppercase
                  tracking-[0.18em]
                  text-primary
                "
              >
                Everything You Need
              </p>

              <h2
                id="all-services-heading"
                className="
                  mt-3 text-4xl
                  font-extrabold leading-tight
                  text-secondary
                  md:text-5xl
                "
              >
                Complete{" "}
                <span className="text-primary">
                  Service Portfolio
                </span>
              </h2>

              <p
                className="
                  mx-auto mt-5
                  max-w-2xl
                  text-base leading-7
                  text-slate-600
                  md:text-lg
                "
              >
                Discover reliable support for
                admissions, documentation,
                finance, accommodation, travel
                and settling abroad.
              </p>
            </header>

            {loading && (
              <div
                role="status"
                aria-live="polite"
                className="
                  mx-auto max-w-md
                  rounded-3xl bg-white
                  px-6 py-14 text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    mx-auto size-10
                    animate-spin rounded-full
                    border-4
                    border-primary/20
                    border-t-primary
                  "
                />

                <p
                  className="
                    mt-4 font-semibold
                    text-slate-500
                  "
                >
                  Loading services...
                </p>
              </div>
            )}

            {!loading && error && (
              <div
                role="alert"
                className="
                  mx-auto max-w-xl
                  rounded-3xl
                  border border-red-100
                  bg-red-50
                  px-6 py-12
                  text-center
                  font-semibold
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {!loading &&
              !error &&
              services.length === 0 && (
                <div
                  className="
                    mx-auto max-w-xl
                    rounded-3xl
                    border border-slate-200
                    bg-white
                    px-6 py-12
                    text-center
                    text-slate-500
                    shadow-sm
                  "
                >
                  No services are currently
                  available.
                </div>
              )}

            {!loading &&
              !error &&
              services.length > 0 && (
                <>
                  <div
                    id="services-list"
                    className="
                      grid justify-items-center
                      gap-8
                      sm:grid-cols-2
                      lg:grid-cols-3
                    "
                  >
                    {visibleServices.map(
                      (
                        service,
                        index
                      ) => {
                        const serviceId =
                          getServiceId(
                            service,
                            index
                          );

                        return (
                          <AddOnServiceCard
                            key={serviceId}
                            service={
                              service
                            }
                            imageUrl={getImage(
                              service
                            )}
                            priority={
                              index === 0
                            }
                            serviceId={`service-${serviceId}`}
                          />
                        );
                      }
                    )}
                  </div>

                  <p
                    className="sr-only"
                    aria-live="polite"
                  >
                    Showing{" "}
                    {
                      visibleServices.length
                    }{" "}
                    of {services.length}{" "}
                    services.
                  </p>

                  {(canLoadMore ||
                    canShowLess) && (
                    <div
                      className="
                        mt-12 flex flex-wrap
                        justify-center gap-3
                      "
                    >
                      {canLoadMore && (
                        <button
                          type="button"
                          onClick={
                            handleLoadMore
                          }
                          aria-controls="services-list"
                          className="
                            inline-flex min-w-40
                            items-center
                            justify-center gap-2
                            rounded-xl
                            bg-primary px-6 py-3
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-primary/20
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-secondary
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                            focus-visible:ring-offset-2
                          "
                        >
                          View More

                          <ChevronDown
                            size={18}
                            aria-hidden="true"
                          />
                        </button>
                      )}

                      {canShowLess && (
                        <button
                          type="button"
                          onClick={
                            handleShowLess
                          }
                          aria-controls="services-list"
                          className="
                            inline-flex min-w-40
                            items-center
                            justify-center gap-2
                            rounded-xl
                            border border-primary
                            bg-white px-6 py-3
                            font-semibold
                            text-primary
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-primary
                            hover:text-white
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                            focus-visible:ring-offset-2
                          "
                        >
                          Show Less

                          <ChevronUp
                            size={18}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
          </div>
        </section>

        {/* CTA and FAQ */}
        <section
          aria-labelledby="services-cta-heading"
          className="
            container mx-auto
            max-w-7xl px-4
            py-16 lg:px-8
            lg:py-20
          "
        >
          <div
            className="
              relative overflow-hidden
              rounded-[36px]
              bg-gradient-to-r
              from-secondary
              via-[#235f96]
              to-primary
              px-6 py-12
              text-center text-white
              shadow-[0_24px_70px_rgba(15,23,42,0.18)]
              sm:px-10
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute -left-20 -top-20
                size-56 rounded-full
                bg-white/10 blur-2xl
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute -bottom-24
                -right-20 size-64
                rounded-full
                bg-white/10 blur-2xl
              "
            />

            <div className="relative">
              <p
                className="
                  text-sm font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/80
                "
              >
                We Are Here to Help
              </p>

              <h2
                id="services-cta-heading"
                className="
                  mt-3 text-3xl
                  font-extrabold
                  sm:text-4xl
                "
              >
                Need Help with Any Service?
              </h2>

              <p
                className="
                  mx-auto mt-4
                  max-w-2xl
                  text-base leading-7
                  text-white/85
                "
              >
                Speak with our experienced team
                for personalised guidance
                throughout your study abroad
                journey.
              </p>

              <a
  href="tel:+918943280333"
  className="
    mt-7 inline-flex
    items-center gap-3
    rounded-full bg-white
    px-8 py-4
    font-bold text-primary
    shadow-xl
    transition-all duration-300
    hover:-translate-y-1
    hover:bg-slate-50
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-white
  "
>
  <Phone
    size={18}
    aria-hidden="true"
  />

  <span>Call : +91 89432 80333</span>
</a>
            </div>
          </div>

          <div className="mt-16">
            <FAQ />
          </div>
        </section>
      </main>
    </>
  );
}