const ButtonPrimary = ({ children,onClick,className = "",}) => {
  return (
    <button onClick={onClick}
      className={`
        relative overflow-hidden
        p-2.5 rounded-xl
        text-[14px] sm:text-[14px] md:text-[13px] lg:text-[14px] xl:text-[15px]
<<<<<<< HEAD
        bg-darkPrimary text-white
=======
        bg-primary text-white
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        group
        hover:cursor-pointer

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