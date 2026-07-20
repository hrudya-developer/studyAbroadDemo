import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/medcitystudyabroad?igsh=Nmt2dGZqbjNrZDVk&utm_source=qr",
    icon: <FaInstagram />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1D8vQXJskS/?mibextid=wwXIfr",
    icon: <FaFacebookF />,
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/medcity-study-abroad",
    icon: <FaLinkedinIn />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@medcitystudyabroad?si=eU1G7UToEzt_H2yj",
    icon: <AiOutlineYoutube />,
  },
];

const BottomBar = () => {
  return (
    <div data-aos="fade-up" className="bg-[#070707] w-full">
      <div className="relative mx-auto max-w-9xl border-t border-dotted border-primary/20 px-4 py-3 text-[13px] text-white sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-center text-[11px] sm:text-left">
            © 2026 Medcity International Overseas Corporation. All rights
            reserved.
          </p>

          <div className="flex items-center justify-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-darkPrimary text-lg text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;