import logo from "../assets/logo.png";
import ButtonPrimary from "./ButtonPrimary";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ExploreMenu from "./ExploreMenu";
import FreeCounsellingForm from "../pages/FreeCounsellingForm";
import { createPortal } from "react-dom";

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
<header data-theme="mytheme" className="sticky top-0 z-50 bg-primary">
  <div
    className={`navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-nunito transition-all duration-300 ${
      scrolled
        ? "h-14 min-h-14 shadow-lg"
        : "h-16 lg:h-[76px] min-h-16 lg:min-h-[76px]"
    }`}
  >
    {/* LEFT - LOGO */}
    <div className="navbar-start flex-1">
      <Link
        to="/"
        onClick={closeMenu}
        className="flex items-center shrink-0 max-w-[190px] sm:max-w-[220px] lg:max-w-[240px]"
      >
        <img
          src={logo}
          alt="Medicity Study Abroad"
          className={`w-full object-contain object-left transition-all duration-300 ${
            scrolled
              ? "max-h-9 sm:max-h-10"
              : "max-h-10 sm:max-h-11 lg:max-h-12"
          }`}
        />
      </Link>
    </div>

    {/* CENTER - DESKTOP MENU */}
    <div className="navbar-center hidden lg:flex flex-none">
      <ul className="menu menu-horizontal gap-1 px-0 text-sm xl:text-base font-semibold text-white">
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
    <div className="navbar-end flex-1">
      <div className="hidden lg:flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowCounsellingPopup(true)}
          className={`rounded-xl bg-white text-black font-semibold transition-all duration-300 hover:opacity-90 ${
            scrolled ? "h-9 px-4 text-sm" : "h-10 px-5 text-sm"
          }`}
        >
          Get Free Counselling
        </button>

        <Link
          to="/loginViaOtp"
          className={`rounded-xl border border-logoYellow text-logoYellow font-semibold flex items-center justify-center transition-all duration-300 ${
            scrolled ? "h-9 px-4 text-sm" : "h-10 px-5 text-sm"
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
          className="btn btn-ghost btn-sm text-white hover:bg-transparent"
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
          <div className="absolute right-0 top-full mt-3 max-h-[75vh] w-[280px] sm:w-[320px] overflow-y-auto rounded-xl bg-white p-4 shadow-xl z-[999] animate-[slideDown_0.25s_ease-out]">
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

  {showCounsellingPopup &&
    createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
        onClick={() => setShowCounsellingPopup(false)}
      >
        <div
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setShowCounsellingPopup(false)}
            className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white hover:opacity-90"
          >
            ×
          </button>

          <FreeCounsellingForm onSuccess={() => setShowCounsellingPopup(false)} />
        </div>
      </div>,
      document.body
    )}
</header>
  );
};

export default Navbar;