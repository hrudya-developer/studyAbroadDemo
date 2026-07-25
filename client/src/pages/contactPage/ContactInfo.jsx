import { Mail, MapPin, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";

const offices = [
  {
    id: 1,
    type: "Head Office",
    name: "Medcity International Academy",
    address: "Chettipeedika, Kannur, Kerala, India, 670004",
    locality: "Kannur",
    region: "Kerala",
    postalCode: "670004",
    phone: "+91 8086776222",
    phoneLink: "+918086776222",
    email: "info@miak.in",
  },
  {
    id: 2,
    type: "Corporate Office",
    name: "Medcity International Academy",
    address:
      "Civil Line Rd, Chembumukku, Vazhakkala, Ernakulam, Kochi, Kerala 682021",
    locality: "Kochi",
    region: "Kerala",
    postalCode: "682021",
    phone: "+91 90480 59999",
    phoneLink: "+919048059999",
    email: "medcitykochi@miak.in",
  },
];

// LocalBusiness / EducationalOrganization schema per office —
// makes each branch eligible for local map-pack results.
const officesSchema = offices.map((office) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#office-${office.id}`,
  name: `${office.name} - ${office.type}`,
  parentOrganization: {
    "@id": `${SITE_URL}/#organization`,
  },
  telephone: office.phone,
  email: office.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: office.address,
    addressLocality: office.locality,
    addressRegion: office.region,
    postalCode: office.postalCode,
    addressCountry: "IN",
  },
}));

const ContactItem = ({ icon: Icon, children, href, label, border = true }) => {
  const content = (
    <div
      className={`
        group flex items-start gap-4 py-4
        ${border ? "border-b border-dashed border-primary/20" : ""}
      `}
    >
      <div
        className="
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-full bg-primary/10 text-primary
          transition duration-300
          group-hover:bg-primary group-hover:text-white
        "
      >
        <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
      </div>

      <div className="pt-1 text-sm leading-6 text-slate-700 sm:text-base">
        {children}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      aria-label={label}
      className="block transition hover:text-primary"
    >
      {content}
    </a>
  );
};

const OfficeCard = ({ office }) => {
  return (
    <article
      className="
        group relative overflow-hidden
        rounded-2xl border border-primary/10
        bg-white
        shadow-[0_14px_35px_rgba(99,26,51,0.10)]
      "
    >
      <div className="relative grid min-h-[340px] sm:min-h-[360px]">
        <div className="relative z-20 px-5 py-6 sm:px-6 sm:py-7">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />

            <p
              className="
                text-[11px] font-extrabold uppercase
                tracking-[0.15em] text-primary
              "
            >
              {office.type}
            </p>
          </div>

          <h3
            className="
              text-xl font-extrabold leading-snug
              text-slate-900 sm:text-2xl
            "
          >
            {office.name}
          </h3>

          <address className="mt-4 not-italic">
            <ContactItem icon={MapPin}>{office.address}</ContactItem>

            <ContactItem
              icon={Phone}
              href={`tel:${office.phoneLink}`}
              label={`Call ${office.name}, ${office.type}`}
            >
              {office.phone}
            </ContactItem>

            <ContactItem
              icon={Mail}
              href={`mailto:${office.email}`}
              label={`Email ${office.name}, ${office.type}`}
              border={false}
            >
              {office.email}
            </ContactItem>
          </address>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 h-1
          bg-gradient-to-r
          from-primary via-[#e1477c] to-darkPrimary
        "
      />
    </article>
  );
};

const ContactInfo = () => {
  return (
    <section
      className="
        relative overflow-hidden bg-[#fffafb]
        px-4 py-16 sm:px-6 sm:py-20 lg:px-8
      "
      aria-labelledby="offices-heading"
    >
      <Helmet>
        {officesSchema.map((schema) => (
          <script key={schema["@id"]} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-24 -top-24
          h-80 w-80 rounded-full bg-primary/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-24 -right-24
          h-80 w-80 rounded-full bg-secondary/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-4 top-8
          grid grid-cols-4 gap-2 opacity-20
        "
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className="h-2 w-2 rounded-full bg-primary" />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h2
            id="offices-heading"
            className="
              text-3xl font-extrabold leading-tight text-slate-900
              sm:text-4xl lg:text-5xl
            "
          >
            Our <span className="text-primary">Offices</span>
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto mt-4 flex max-w-sm items-center gap-3"
          >
            <span className="h-px flex-1 bg-primary/25" />
            <span className="h-3 w-3 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-primary/25" />
          </div>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            We’re here to support you throughout your global education
            journey.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {offices.map((office) => (
            <OfficeCard key={office.id} office={office} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;