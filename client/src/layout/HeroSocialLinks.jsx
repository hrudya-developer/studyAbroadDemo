import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";

const socialLinks = [
      {
    name: "WhatsApp",
    href: "https://wa.me/919876543210", // Replace with your WhatsApp number
    icon: FaWhatsapp,
    buttonClass: "bg-[#25D366]",
    delay: "0ms",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/medcitystudyabroad?igsh=Nmt2dGZqbjNrZDVk&utm_source=qr",
    icon: FaInstagram,
    buttonClass:
      "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]",
    delay: "0ms",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1D8vQXJskS/?mibextid=wwXIfr",
    icon: FaFacebookF,
    buttonClass: "bg-[#1877F2]",
    delay: "180ms",
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/medcity-study-abroad",
    icon: FaLinkedinIn,
    buttonClass: "bg-[#0A66C2]",
    delay: "360ms",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@medcitystudyabroad?si=eU1G7UToEzt_H2yj",
    icon: AiOutlineYoutube,
    buttonClass: "bg-[#ff0000]",
    delay: "540ms",
  },
];

const HeroSocialLinks = ({ visible = true }) => {
  return (
    <aside
      aria-label="Medcity social media links"
      className={`
        absolute
        right-0
        top-1/2
        z-40
        hidden
        -translate-y-1/2
        transition-[transform,opacity]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        lg:block
        ${
          visible
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }
      `}
    >
      <div className="flex flex-col items-end">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              style={{
                animationDelay: social.delay,
              }}
              className={`
                group
                relative
                flex
                h-16
                w-16
                items-center
                justify-center
                overflow-visible
                mb-1
                text-3xl
                text-white
                shadow-[-8px_8px_18px_rgba(15,23,42,0.24)]
                transition-[width,transform,box-shadow]
                duration-300
                animate-[socialIconFloat_3.2s_ease-in-out_infinite]
                first:border-t
                first:border-white/20
                hover:w-16
                hover:-translate-x-1
                hover:shadow-[-12px_10px_25px_rgba(15,23,42,0.38)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-inset
                focus-visible:ring-white
                ${social.buttonClass}
              `}
            >
              {/* Top light effect */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  h-px
                  bg-white/50
                "
              />

              {/* Left glow line */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-1/2
                  h-7
                  w-[3px]
                  -translate-y-1/2
                  bg-white/70
                  opacity-0
                  shadow-[0_0_10px_rgba(255,255,255,0.8)]
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              {/* Icon */}
              <Icon
                aria-hidden="true"
                className="
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              {/* Tooltip */}
              <span
                role="tooltip"
                className="
                  pointer-events-none
                  absolute
                  right-[calc(100%+12px)]
                  top-1/2
                  z-50
                  -translate-y-1/2
                  translate-x-2
                  whitespace-nowrap
                  bg-slate-950
                  px-3
                  py-2
                  text-[11px]
                  font-semibold
                  text-white
                  opacity-0
                  shadow-[0_10px_24px_rgba(15,23,42,0.35)]
                  transition-all
                  duration-200
                  group-hover:translate-x-0
                  group-hover:opacity-100
                  group-focus-visible:translate-x-0
                  group-focus-visible:opacity-100
                "
              >
                {social.name}

                <span
                  className="
                    absolute
                    left-full
                    top-1/2
                    -translate-y-1/2
                    border-[6px]
                    border-transparent
                    border-l-slate-950
                  "
                />
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default HeroSocialLinks;