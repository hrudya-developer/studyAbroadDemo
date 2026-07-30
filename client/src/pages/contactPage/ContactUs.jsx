import FAQ from "../../layout/FAQ/FAQ";
import OurBranches from "../../layout/OurBranches";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactUsSEO from "./ContactUsSEO";

const ContactUs = () => {
  return (
    <>
      <ContactUsSEO />

      <main id="main-content">
        <ContactHero />

        <section
          id="contact-form"
          aria-labelledby="contact-form-heading"
        >
          <h2 id="contact-form-heading" className="sr-only">
            Contact our study abroad counsellors
          </h2>

          <ContactForm />
        </section>

        <section
          id="our-branches"
          aria-labelledby="branches-heading"
        >
          <h2 id="branches-heading" className="sr-only">
            Find a Medcity Study Abroad branch near you
          </h2>

          <OurBranches />
          <ContactInfo />
          <FAQ />
        </section>
      </main>
    </>
  );
};

export default ContactUs;