import { memo, useState } from "react";
import { Link } from "react-router-dom";

import DesktopNavigation from "./DesktopNavigation";
import NavbarActions from "./NavbarActions";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import CounsellingModal from "./CounsellingModal";


const Navbar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCounselling, setShowCounselling] = useState(false);


  const closeMobileMenu = () => {
    setMobileOpen(false);
  };


  const openCounsellingPopup = () => {
    closeMobileMenu();
    setShowCounselling(true);
  };


  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          bg-primary
        "
      >

        <div
          className="
            relative
            mx-auto
            flex
            h-16
            max-w-9xl
            items-center
            justify-between
            px-4
            sm:px-6
            lg:h-[76px]
            lg:px-8
          "
        >


          {/* Logo */}
          <Link
            to="/"
            aria-label="Medicity Study Abroad Home"
            onClick={closeMobileMenu}
            className="shrink-0"
          >

            <img
              src="/logo.png"
              alt="Medicity Study Abroad - Study Abroad Consultancy"
              width="180"
              height="50"
              loading="eager"
              className="
                h-9
                w-auto
                object-contain
                sm:h-10
                lg:h-12
              "
            />

          </Link>



          {/* Desktop Navigation */}
          <DesktopNavigation />



          {/* Desktop Buttons */}
          <NavbarActions
            openCounsellingPopup={openCounsellingPopup}
          />



          {/* Mobile Navigation */}
          <div
            className="
              relative
              lg:hidden
            "
          >

            <MobileMenuButton
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />


            <MobileMenu
              open={mobileOpen}
              closeMenu={closeMobileMenu}
              openCounsellingPopup={openCounsellingPopup}
            />

          </div>


        </div>

      </header>



      {/* Counselling Modal */}
      <CounsellingModal
        open={showCounselling}
        close={() => setShowCounselling(false)}
      />

    </>
  );
};


export default memo(Navbar);