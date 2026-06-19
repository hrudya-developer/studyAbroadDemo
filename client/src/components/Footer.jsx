import {
  GraduationCap,
  BriefcaseBusiness,
  Plane,
  MapPin,
  Mail,
  ArrowRight,
  Phone,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#070707] text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
  
  {/* Main Background Gradient */}
<<<<<<< HEAD
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168, 13, 65, 0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(211, 39, 159, 0.4),transparent_30%),linear-gradient(135deg,rgba(255,0,0,0.08),transparent_40%)]" />
=======
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,0,0,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(220,0,0,0.4),transparent_30%),linear-gradient(135deg,rgba(255,0,0,0.08),transparent_40%)]" />
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

  {/* Left Top Dots */}
  <div className="absolute left-0 top-0 grid grid-cols-10 gap-3 opacity-20">
    {Array.from({ length: 100 }).map((_, i) => (
      <span key={i} className="h-1 w-1 rounded-full bg-white" />
    ))}
  </div>

  {/* Right Bottom Dots */}
  <div className="absolute bottom-0 right-0 hidden grid-cols-10 gap-3 opacity-20 lg:grid">
    {Array.from({ length: 100 }).map((_, i) => (
      <span key={i} className="h-1 w-1 rounded-full bg-white" />
    ))}
  </div>

  {/* World Map Pattern */}
  <div className="absolute right-10 top-8 hidden opacity-20 lg:block">
    <svg width="340" height="180" viewBox="0 0 340 180" fill="none">
      {Array.from({ length: 220 }).map((_, i) => {
        const x = (i * 31) % 330;
        const y = (i * 17) % 170;

        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.4"
            fill="white"
            opacity={x > 40 && y > 10 ? 0.8 : 0.2}
          />
        );
      })}

      {/* Red glowing points */}
<<<<<<< HEAD
      <circle cx="80" cy="70" r="3" fill="#c01f53" />
      <circle cx="150" cy="40" r="3" fill="#c01f53" />
      <circle cx="230" cy="110" r="3" fill="#c01f53" />
      <circle cx="300" cy="75" r="3" fill="#c01f53" />
=======
      <circle cx="80" cy="70" r="3" fill="#ff0000" />
      <circle cx="150" cy="40" r="3" fill="#ff0000" />
      <circle cx="230" cy="110" r="3" fill="#ff0000" />
      <circle cx="300" cy="75" r="3" fill="#ff0000" />
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    </svg>
  </div>

  {/* Left Bottom Red Wavy Lines */}
<<<<<<< HEAD
  {/* <div className="absolute -bottom-10 left-0 opacity-70">
=======
  <div className="absolute -bottom-10 left-0 opacity-70">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    <svg width="520" height="220" viewBox="0 0 520 220" fill="none">
      {Array.from({ length: 18 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${120 + i * 6} C140 ${30 + i * 5}, 280 ${
            180 - i * 4
          }, 520 ${70 + i * 4}`}
<<<<<<< HEAD
          stroke="#c01f53"
=======
          stroke="#ff0000"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          strokeWidth="1"
          opacity="0.45"
        />
      ))}
    </svg>
<<<<<<< HEAD
  </div> */}

  {/* Right Bottom Red Wavy Lines */}
  {/* <div className="absolute -bottom-6 right-0 opacity-60">
=======
  </div>

  {/* Right Bottom Red Wavy Lines */}
  <div className="absolute -bottom-6 right-0 opacity-60">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    <svg width="380" height="180" viewBox="0 0 380 180" fill="none">
      {Array.from({ length: 14 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${100 + i * 5} C100 ${40 + i * 3}, 220 ${
            160 - i * 4
          }, 380 ${50 + i * 3}`}
<<<<<<< HEAD
          stroke="#c01f53"
=======
          stroke="#ff0000"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          strokeWidth="1"
          opacity="0.4"
        />
      ))}
    </svg>
<<<<<<< HEAD
  </div> */}
=======
  </div>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

  {/* Existing Footer Content */}
  <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 lg:grid-cols-3 lg:px-8">
    
    {/* Logo Section */}
    <div className="flex flex-col items-start text-center lg:items-start lg:text-left">
      <img src={logo} alt="Medcity International" className="mb-8 w-72" />

      <div className="flex items-center gap-5">
        <CircleIcon icon={<GraduationCap />} />
        <Divider />
        <CircleIcon icon={<BriefcaseBusiness />} />
        <Divider />
        <CircleIcon icon={<Plane />} />
      </div>
    </div>

    {/* About */}
    <div className="border-white/15 lg:border-l lg:px-8">
      <h3 className="text-2xl font-bold">About Us</h3>
      <div className="mt-4 h-1 w-10 bg-primary" />

      <p className="mt-6 max-w-md text-sm leading-7 text-white/80">
        Since 2012, Medcity International Overseas Corporation has been
        offering gamut of Professional Services to students who inspire to
        study overseas and proficient professionals who dream of working
        overseas.
      </p>

<<<<<<< HEAD
      <button className="mt-7 flex items-center gap-4 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary">
=======
      <button className="mt-7 flex items-center gap-4 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        Learn More
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>

    {/* Contact */}
    <div className="border-white/15 lg:border-l lg:px-8">
      <h3 className="text-2xl font-bold">Contact Us</h3>
<<<<<<< HEAD
      <div className="mt-4 h-1 w-10 bg-primary" />
=======
      <div className="mt-4 h-1 w-10 bg-red-600" />
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

      <div className="mt-6 space-y-6">
        <ContactItem icon={<MapPin />}>
          Medcity International Overseas Corporation, Chettipeedika,
          Kannur - 4, Kerala, India.
        </ContactItem>

          <ContactItem icon={<Phone />}>+918943280333 <br /> +919645020503</ContactItem>

        <ContactItem icon={<Mail />}>info@mioc.in</ContactItem>
      </div>

      <div className="mt-10 flex gap-5 justify-center items-center">
        <SocialIcon icon={<FaInstagram />} />
        <SocialIcon icon={<FaFacebookF />} />
        <SocialIcon icon={<FaLinkedinIn />} />
        <SocialIcon icon={<FaTwitter />} />
      </div>
    </div>
  </div>


</footer>
  );
}

function CircleIcon({ icon }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white">
      <div className="h-7 w-7 grid place-content-center">{icon}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-10 w-px bg-white/25" />;
}

function ContactItem({ icon, children }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-primary">
        <div className="h-5 w-5 grid place-content-center">{icon}</div>
      </div>

      <p className="text-sm leading-7 text-white/80">{children}</p>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <a
      href="#"
<<<<<<< HEAD
      className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-white transition hover:bg-primary"
=======
      className="flex h-12 w-12 items-center justify-center rounded-full border border-red-600 text-white transition hover:bg-red-600"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    >
      <div className="h-5 w-5 grid place-content-center">{icon}</div>
    </a>
  );
}