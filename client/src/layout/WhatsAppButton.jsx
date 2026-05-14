import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed right-[100px] top-1/2 -translate-y-1/2
        z-[9999]
        bg-[#25D366]
        text-white
        p-4
        rounded-full
        shadow-2xl
        hover:scale-110
        transition-all duration-300
        invisible md:block lg:block xxl:invisible
      "
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default WhatsAppButton;