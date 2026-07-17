import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpenText, Handshake, Headset, MapPin, Rss, University, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import ButtonPrimary from "./ButtonPrimary";
import ExploreMenu from "./ExploreMenu";
import FreeCounsellingForm from "../pages/FreeCounsellingForm";
import WebsiteSwitchHorizontal from "../layout/WebsiteSwitchHorizontal";

const Navbar = () => {
  const [showCounsellingPopup, setShowCounsellingPopup] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const mobileMenuRef = useRef(null);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const openCounsellingPopup = () => {
    setMobileOpen(false);
    setShowCounsellingPopup(true);
  };

  useEffect(() => {
    if (!showCounsellingPopup) return undefined;

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
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      setMobileOpen(false);
      setShowCounsellingPopup(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        data-theme="mytheme"
        className="sticky top-0 z-50 max-w-9xl mx-auto bg-primary"
      >
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div
            className={`flex w-full items-center justify-between gap-3 font-nunito transition-all duration-300 ${
              scrolled
                ? "h-14 shadow-lg lg:h-16"
                : "h-16 lg:h-[76px]"
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex shrink-0 items-center"
              aria-label="Go to home page"
            >
              <img
                src={logo}
                alt="Medicity Study Abroad"
                className={`w-auto object-contain object-left transition-all duration-300 ${
                  scrolled
                    ? "h-8 sm:h-9"
                    : "h-10 sm:h-11 lg:h-12"
                }`}
              />
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Primary navigation"
              className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
            >
              <ul className="menu menu-horizontal flex-nowrap gap-0.5 px-0 text-sm font-semibold text-white xl:gap-1 xl:text-base">
                <li>
                  <Link
                    to="/destinationList"
                    className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-white/10"
                  >
                    Destinations
                  </Link>
                </li>

                <li>
                  <Link
                    to="/allUniversities"
                    className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-white/10"
                  >
                    Universities
                  </Link>
                </li>

                <li>
                  <Link
                    to="/courseSearch"
                    className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-white/10"
                  >
                    Courses
                  </Link>
                </li>

                <ExploreMenu />

                <li>
                  <Link
                    to="/studyAbroadBlog"
                    className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-white/10"
                  >
                    Blogs
                  </Link>
                </li>
                
              </ul>
            </nav>

            {/* Right-side desktop actions */}
            <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
              <button
                type="button"
                onClick={openCounsellingPopup}
                className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:opacity-95 ${
                  scrolled
                    ? "h-9 px-3 text-xs xl:text-sm"
                    : "h-11 px-4 text-sm"
                }`}
              >
                <Headset
                  size={18}
                  strokeWidth={2.3}
                  className="shrink-0 text-primary"
                  aria-hidden="true"
                />

                <span>Get Free Counselling</span>
              </button>

              <Link
                to="/loginViaOtp"
                className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-primary ${
                  scrolled
                    ? "h-9 px-3 text-xs xl:text-sm"
                    : "h-11 px-4 text-sm"
                }`}
              >
                <UserRound
                  size={18}
                  strokeWidth={2.3}
                  className="shrink-0"
                  aria-hidden="true"
                />

                <span>Student Login</span>
              </Link>
            </div>

            {/* Mobile navigation */}
            <div ref={mobileMenuRef} className="relative shrink-0 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((previous) => !previous)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-white/10"
                aria-label={
                  mobileOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
                <div
                  id="mobile-navigation"
                  className="absolute right-0 top-full z-[999] mt-3 max-h-[75vh] w-[280px] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl animate-[slideDown_0.25s_ease-out] sm:w-[320px]"
                >
                  <nav aria-label="Mobile navigation">
                    <ul className="menu w-full gap-2 p-0 font-semibold text-slate-900">
                      <li>
                        <Link
                          onClick={closeMenu}
                          to="/destinationList"
                          className="rounded-xl bg-secondary/10 px-4 py-3 hover:bg-secondary/15"
                        >
                         <span className="text-darkPrimary flex items-center gap-2"><MapPin size={18}/></span> Destinations
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={closeMenu}
                          to="/allUniversities"
                          className="rounded-xl bg-secondary/10 px-4 py-3 hover:bg-secondary/15"
                        >
                          <span className="text-secondary flex items-center gap-2"><University size={18}/></span>Universities
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={closeMenu}
                          to="/courseSearch"
                          className="rounded-xl bg-secondary/10 px-4 py-3 hover:bg-secondary/15"
                        >
                          <span className="text-orange-400 flex items-center gap-2"><BookOpenText size={18}/></span>Courses
                        </Link>
                      </li>

                      <ExploreMenu
                        mobile
                        onNavigate={closeMenu}
                      />

                      <li>
                        <Link
                          onClick={closeMenu}
                          to="/studyAbroadBlog"
                          className="rounded-xl bg-secondary/10 px-4 py-3 hover:bg-secondary/15"
                        >
                          <span className="flex gap-2 items-center text-violet-500"><Rss size={18}/></span>Blogs
                        </Link>
                      </li>
                      <WebsiteSwitchHorizontal onNavigate={closeMenu} />
                    </ul>
                  </nav>

                  <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={openCounsellingPopup}
                      className="w-full"
                    >
                      <ButtonPrimary className="flex w-full items-center justify-center gap-2 bg-darkPrimary">
                        <Headset
                          size={18}
                          className="shrink-0"
                          aria-hidden="true"
                        />
                        <span>Book Free Counselling</span>
                      </ButtonPrimary>
                    </button>

{/* <Link
  to="/partnersLoginPage"
  onClick={closeMenu}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-logoYellow py-3 text-sm font-semibold text-darkPrimary transition hover:bg-yellow-300"
>
  <Handshake
    size={18}
    className="shrink-0"
    aria-hidden="true"
  />

  <span>Partners Login</span>
</Link> */}


                    <Link
                      to="/loginViaOtp"
                      onClick={closeMenu}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-darkPrimary hover:text-white"
                    >
                      <UserRound
                        size={18}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                      <span>Student Login</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showCounsellingPopup &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowCounsellingPopup(false)}
            role="presentation"
          >
            <div
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Free counselling form"
            >
              <button
                type="button"
                onClick={() => setShowCounsellingPopup(false)}
                className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white shadow-md transition hover:opacity-90"
                aria-label="Close counselling form"
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
    </>
  );
};

export default Navbar;