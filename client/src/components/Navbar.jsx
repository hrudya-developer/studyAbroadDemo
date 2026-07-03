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
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });

        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header data-theme="mytheme" className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8 bg-primary">
        <div
          className={`navbar font-nunito transition-all duration-300 ease-in-out ${
            scrolled
              ? "h-14 min-h-14 shadow-lg"
              : "h-16 min-h-16 lg:h-[76px] lg:min-h-[76px]"
          }`}
        >
          {/* LEFT - LOGO */}
          <div className="navbar-start">
           <Link
  to="/"
  onClick={closeMenu}
  className="
    flex shrink-0 items-center
    max-w-[190px]
    sm:max-w-[200px]
    lg:max-w-[210px]
  "
>
              <img
                src={logo}
                alt="Medicity Study Abroad"
                className={`w-full object-contain object-left transition-all duration-300 ease-in-out ${
                  scrolled
                    ? "max-h-8 sm:max-h-9"
                    : "max-h-10 sm:max-h-11 lg:max-h-12"
                }`}
              />
            </Link>
          </div>

          {/* CENTER - DESKTOP MENU */}
          <div className="navbar-center hidden flex-none lg:flex min-[1025px]:max-[1071px]:-ml-20">
            <ul className="menu menu-horizontal gap-1 px-0 text-sm font-semibold text-white xl:text-base">
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
          <div className="navbar-end ml-auto">
            <div className="hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={() => setShowCounsellingPopup(true)}
                className={`rounded-xl bg-white font-semibold text-black transition-all duration-300 ease-in-out hover:opacity-90 ${
                  scrolled ? "h-9 px-4 text-sm" : "h-10 px-5 text-sm"
                }`}
              >
                Get Free Counselling
              </button>

              <Link
                to="/loginViaOtp"
                className={`flex items-center justify-center rounded-xl border border-logoYellow font-semibold text-logoYellow transition-all duration-300 ease-in-out ${
                  scrolled ? "h-9 px-4 text-sm" : "h-10 px-5 text-sm"
                }`}
              >
                Sign In
              </Link>
            </div>

            {/* MOBILE MENU */}
            <div ref={mobileMenuRef} className="relative lg:hidden">
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
                <div className="absolute right-0 top-full z-[999] mt-3 max-h-[75vh] w-[280px] overflow-y-auto rounded-xl bg-white p-4 shadow-xl animate-[slideDown_0.25s_ease-out] sm:w-[320px]">
                  <ul className="menu w-full gap-2 font-semibold text-black">
                    <li className="rounded-lg bg-secondary/10">
                      <Link onClick={closeMenu} to="/destinationList">
                        Destinations
                      </Link>
                    </li>

                    <li className="rounded-lg bg-secondary/10">
                      <Link onClick={closeMenu} to="/allUniversities">
                        Universities
                      </Link>
                    </li>

                    <li className="rounded-lg bg-secondary/10">
                      <Link onClick={closeMenu} to="/courseSearch">
                        Courses
                      </Link>
                    </li>

                    <ExploreMenu mobile onNavigate={closeMenu} />

                    <li className="rounded-lg bg-secondary/10">
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
                      className="flex w-full items-center justify-center rounded-xl bg-secondary px-5 py-2 text-[14px] text-white hover:cursor-pointer"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              )}
            </div>
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

              <FreeCounsellingForm
                onSuccess={() => setShowCounsellingPopup(false)}
              />
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Navbar;