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
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#070707] text-white max-w-9xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
  
  {/* Main Background Gradient */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168, 13, 65, 0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(211, 39, 159, 0.4),transparent_30%),linear-gradient(135deg,rgba(255,0,0,0.08),transparent_40%)]" />

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
      <circle cx="80" cy="70" r="3" fill="#c01f53" />
      <circle cx="150" cy="40" r="3" fill="#c01f53" />
      <circle cx="230" cy="110" r="3" fill="#c01f53" />
      <circle cx="300" cy="75" r="3" fill="#c01f53" />
    </svg>
  </div>

  {/* Left Bottom Red Wavy Lines */}
  {/* <div className="absolute -bottom-10 left-0 opacity-70">
    <svg width="520" height="220" viewBox="0 0 520 220" fill="none">
      {Array.from({ length: 18 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${120 + i * 6} C140 ${30 + i * 5}, 280 ${
            180 - i * 4
          }, 520 ${70 + i * 4}`}
          stroke="#c01f53"
          strokeWidth="1"
          opacity="0.45"
        />
      ))}
    </svg>
  </div> */}

  {/* Right Bottom Red Wavy Lines */}
  {/* <div className="absolute -bottom-6 right-0 opacity-60">
    <svg width="380" height="180" viewBox="0 0 380 180" fill="none">
      {Array.from({ length: 14 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${100 + i * 5} C100 ${40 + i * 3}, 220 ${
            160 - i * 4
          }, 380 ${50 + i * 3}`}
          stroke="#c01f53"
          strokeWidth="1"
          opacity="0.4"
        />
      ))}
    </svg>
  </div> */}

  {/* Existing Footer Content */}
  <div className="relative z-10 mx-auto grid max-w-9xl gap-10 px-6 py-16 md:grid-cols-3 lg:grid-cols-3 lg:px-8">
    
    {/* Logo Section */}
  <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
  <img
    src={logo}
    alt="Medcity International"
    className="mb-6 w-48 sm:w-56 md:w-60 lg:w-64"
  />

  <div className="flex w-full max-w-xs items-center justify-center gap-3 sm:justify-start sm:gap-4 lg:gap-5">
    <CircleIcon icon={<GraduationCap />} />
    <Divider />
    <CircleIcon icon={<BriefcaseBusiness />} />
    <Divider />
    <CircleIcon icon={<Plane />} />
  </div>


</div>

    {/* About */}
    <div className="border-white/15 lg:border-l lg:px-8">
      <h3 className="text-xl font-bold text-center sm:text-left">About Us</h3>
      <div className="mt-4 h-1 w-10 bg-primary flex mx-auto sm:mx-0" />

      <p className="mt-6 max-w-md text-[12px] leading-loose text-white/90 text-center sm:text-left mx-auto sm:mx-0">
        Since 2012, Medcity International Overseas Corporation has been
        offering gamut of Professional Services to students who inspire to
        study overseas and proficient professionals who dream of working
        overseas.
      </p>

      <Link to="/loginViaOtp"><button className="mt-7 flex items-center justify-center sm:justify-start mx-auto sm:mx-0 gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary">
        Login
        <ArrowRight className="h-4 w-4" />
      </button></Link>
    </div>

    {/* Contact */}
  <div className="border-white/15 lg:border-l lg:px-8">
  <h3 className="text-center text-2xl font-bold sm:text-left">Contact Us</h3>
  <div className="mx-auto mt-4 h-1 w-10 bg-primary sm:mx-0" />

  <div className="mt-6 flex flex-col items-center gap-6 sm:items-start">
    <ContactItem icon={<MapPin />}>
      Medcity International Overseas Corporation, Chettipeedika, Kannur - 4,
      Kerala, India.
    </ContactItem>

    <ContactItem icon={<Phone />}>
      +918943280333 <br /> +919645020503
    </ContactItem>

    <ContactItem icon={<Mail />}>info@mioc.in</ContactItem>
  </div>
</div>
  </div>


</footer>
  );
}

function CircleIcon({ icon }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-white/20 text-darkPrimary sm:h-12 sm:w-12 lg:h-14 lg:w-14">
      <div className="grid h-5 w-5 place-content-center sm:h-6 sm:w-6 lg:h-7 lg:w-7">
        {icon}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-10 w-px bg-white/25" />;
}

function ContactItem({ icon, children }) {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-3 text-center sm:max-w-none sm:flex-row sm:items-start sm:text-left">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-primary">
        {icon}
      </div>

      <p className="text-[12px] leading-6 text-white/80 sm:leading-7">
        {children}
      </p>
    </div>
  );
}



function StatDivider() {
  return (
    <div className="hidden h-16 w-px bg-white/20 sm:block" />
  );
}