const ButtonPrimary = ({ children,onClick,className = "",}) => {
  return (
    <button onClick={onClick}
      className={`
        relative overflow-hidden
        py-3 px-5 rounded-xl
        text-[14px] sm:text-[14px] md:text-[14px] lg:text-[14px] xl:text-[15px]
        bg-darkPrimary text-white
        group
        hover:cursor-pointer border-darkPrimary

        flex items-center justify-center

        ${className}
      `}
    >
      {/* Sliding Background */}
      <span
        className="
          absolute inset-0
          bg-secondary
          -translate-x-full
          group-hover:translate-x-0
          transition-transform duration-500 ease-in-out
        "
      ></span>

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 w-full text-center">
        {children}
      </span>
    </button>
  );
};

export default ButtonPrimary;