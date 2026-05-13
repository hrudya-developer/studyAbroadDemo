import logo from "../assets/logo.png";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";

const Navbar = () => {
  return (
    <header
      data-theme="mytheme"
      className="bg-secondary lg:bg-transparent"
    >
      <div className="navbar max-w-7xl mx-auto px-3 sm:px-5 md:px-8 font-nunito animate__animated animate__zoomIn">

        {/* LEFT - LOGO */}
<div className="navbar-start">

  <div
    className="
      bg-secondary
      w-[275px]
      sm:w-[200px]
      md:w-[220px]
      lg:w-[240px]
      xl:w-[260px] rounded-md
      rounded-tr-[80px]
      md:rounded-tr-[100px]
      shrink-0 p-0 md:p-5
    "
  >
    <img
      src={logo}
      alt="logo"
      className="
        w-full
        h-auto
        object-contain
        block
      "
    />
  </div>

</div>

        {/* CENTER - DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black text-[14px] md:[14px] lg:text-[16px] font-medium">
            <li><a>Destinations</a></li>
            <li><a>Universities</a></li>
            <li><a>Courses</a></li>
            <li><a>Scholarships</a></li>
            <li><a>Visa Process</a></li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end">

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex gap-3">
            <ButtonPrimary>
              Get Free Counselling
            </ButtonPrimary>

            <ButtonSecondary>
              Login
            </ButtonSecondary>
          </div>

          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white hover:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content text-[16px] right-0 bg-base-100 rounded-box z-10 mt-3 w-64 p-4 shadow gap-2"
            >
              <li><a>Destinations</a></li>
              <li><a>Universities</a></li>
              <li><a>Courses</a></li>
              <li><a>Scholarships</a></li>
              <li><a>Visa Process</a></li>

              {/* MOBILE BUTTONS */}
              <div className="flex flex-col gap-3 mt-4">
                <ButtonPrimary>
                  Book Free Counselling
                </ButtonPrimary>

                <ButtonSecondary>
                  Sign In
                </ButtonSecondary>
              </div>
            </ul>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;