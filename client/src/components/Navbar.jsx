import logo from "../assets/logo.png";
import ButtonPrimary from "./ButtonPrimary";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ExploreMenu from "./ExploreMenu";
import FreeCounsellingForm from "../pages/FreeCounsellingForm";

const Navbar = () => {
  const [showCounsellingPopup, setShowCounsellingPopup] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const closeMenu = () => setMobileOpen(false);

useEffect(() => {
  if (!showCounsellingPopup) return;

  const originalBodyOverflow = document.body.style.overflow;
  const originalHtmlOverflow = document.documentElement.style.overflow;

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = originalBodyOverflow;
    document.documentElement.style.overflow = originalHtmlOverflow;
  };
}, [showCounsellingPopup]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  return (
<header data-theme="mytheme" className="sticky top-0 z-10 max-w-7xl mx-auto bg-primary">
  <div
    className={`navbar mx-auto max-w-7xl bg-primary px-3 sm:px-5 md:px-8 font-nunito transition-all duration-500 ease-in-out ${
      scrolled
        ? "min-h-[60px] py-0 shadow-lg"
        : "min-h-[96px] py-0 shadow-xs"
    }`}
  >
        {/* LEFT - LOGO */}
        <div className="navbar-start">
          <Link to="/" onClick={closeMenu}>
           <div
  className={`shrink-0 transition-all duration-500 ease-in-out ${
    scrolled
      ? "w-[210px] sm:w-[210px] lg:w-[210px] p-1"
      : "w-[220px] sm:w-[230px] md:w-[240px] lg:w-[250px] xl:w-[260px] p-2 md:p-3"
  }`}
>
              <img
                src={logo}
                alt="logo"
                className="block h-auto w-full object-contain"
              />
            </div>
          </Link>
        </div>

        {/* CENTER - DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-md [@media(min-width:1024px)_and_(max-width:1086px)]:text-[14px] lg:text-base font-semibold font-nunito text-white">
            <li>
              <Link to="/destinationList">Destinations</Link>
            </li>
            <li>
              <Link to="/allUniversities">Universities</Link>
            </li>
            <li>
              <Link to="/courseSearch">Courses</Link>
            </li>

            <ExploreMenu />

            <li>
              <Link to="/studyAbroadBlog">Blogs</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end">
          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex gap-3">
<button
  type="button"
  onClick={() => setShowCounsellingPopup(true)}
  className={`rounded-xl text-[12px] lg:text-[14px] font-semibold text-black bg-white border-white hover:cursor-pointer flex items-center justify-center transition-all duration-500 ease-in-out ${
    scrolled ? "py-2 px-4" : "py-2 px-5"
  }`}
>
  Get Free Counselling
</button>

         <Link
  to="/loginViaOtp"
  className={`rounded-xl text-[12px] lg:text-[14px] text-logoYellow bg-transparent border border-logoYellow hover:cursor-pointer flex items-center justify-center transition-all duration-500 ease-in-out ${
    scrolled ? "py-2 px-4" : "py-3 px-5"
  }`}
>
  Sign In
</Link>
          </div>

          {/* MOBILE MENU */}
          <div ref={mobileMenuRef} className="lg:hidden relative">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="btn btn-ghost text-white hover:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                )}
              </svg>
            </button>

            {mobileOpen && (
              <div className="absolute right-0 top-full mt-3 w-[92vw] max-w-[340px] max-h-[75vh] overflow-y-auto rounded-xl bg-white p-4 shadow-xl z-[999] animate-[slideDown_0.25s_ease-out]">
                <ul className="menu w-full text-black font-semibold gap-2">
                  <li className="bg-secondary/10 rounded-lg">
                    <Link onClick={closeMenu} to="/destinationList">
                      Destinations
                    </Link>
                  </li>

                  <li className="bg-secondary/10 rounded-lg">
                    <Link onClick={closeMenu} to="/allUniversities">
                      Universities
                    </Link>
                  </li>

                  <li className="bg-secondary/10 rounded-lg">
                    <Link onClick={closeMenu} to="/courseSearch">
                      Courses
                    </Link>
                  </li>

                  <ExploreMenu mobile onNavigate={closeMenu} />

                  <li className="bg-secondary/10 rounded-lg">
                    <Link onClick={closeMenu} to="/studyAbroadBlog">
                      Blogs
                    </Link>
                  </li>
                </ul>

                {/* MOBILE BUTTONS */}
                <div className="mt-4 flex flex-col gap-3">
                <button
  type="button"
  onClick={() => {
    closeMenu();
    setShowCounsellingPopup(true);
  }}
  className="w-full"
>
  <ButtonPrimary className="w-full">
    Book Free Counselling
  </ButtonPrimary>
</button>

                  <Link
                    to="/loginViaOtp"
                    onClick={closeMenu}
                    className="w-full py-2 px-5 rounded-xl text-[14px] text-white bg-secondary hover:cursor-pointer flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
 {showCounsellingPopup && (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 px-4"
    onClick={() => setShowCounsellingPopup(false)}
  >
    <div
      className="relative max-h-[90vh] w-[90%] sm:w-[90%] md:w-[90%] lg:w-[60%] max-w-3xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    > <button
        type="button"
        onClick={() => setShowCounsellingPopup(false)}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl font-bold text-white"
      >
        ×
      </button>

      <FreeCounsellingForm
  onSuccess={() => setShowCounsellingPopup(false)}
/>
    </div>
  </div>
)}
    </header>
  );
};

export default Navbar;