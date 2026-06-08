import logo from "../assets/logo.png";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import { Link } from "react-router-dom";

import { useState } from "react";
import ExploreMenu from "./ExploreMenu";

const Navbar = () => {
 

  return (
    <header
      data-theme="mytheme"
      className="relative z-[999] bg-secondary lg:bg-[#fafdff]"
    >
      <div className="navbar mx-auto max-w-7xl px-3 sm:px-5 md:px-8 font-nunito animate__animated animate__zoomIn shadow-xs">

        {/* LEFT - LOGO */}
        <div className="navbar-start">
          <Link to = "/"><div
            className="
              bg-secondary
              w-[230px]
              sm:w-[200px]
              md:w-[320px]
              lg:w-[240px]
              xl:w-[260px]
              rounded-md
              rounded-tr-[80px]
              md:rounded-tr-[100px]
              shrink-0
              p-2
              md:p-5
            "
          >
            <img
              src={logo}
              alt="logo"
              className="block h-auto w-full object-contain"
            />
          </div></Link>
        </div>

        {/* CENTER - DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[17px] font-semibold font-nunito text-black">
            <li><Link to="/destinationList">Destinations</Link></li>
            <li><Link to="/allUniversities">Universities</Link></li>
            <li><Link to="/courseSearch">Courses</Link></li>
        <ExploreMenu />
           <li><Link to="/studyAbroadBlog">Blogs</Link></li>
          
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end">

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex gap-3">
            <ButtonPrimary>
              <a href="#gfc_wrapper" className="w-full h-full">Get Free Counselling</a>
            </ButtonPrimary>

           <Link to="/loginViaOtp"><ButtonSecondary>Login</ButtonSecondary></Link>
          </div>

          {/* MOBILE MENU */}
          <div className="dropdown dropdown-end lg:hidden relative">
            <button
              tabIndex={0}
              type="button"
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
            </button>

            <ul
              tabIndex={0}
              className="
                dropdown-content
                menu
                absolute
                right-0
                top-full
                mt-3
                w-64
                rounded-box
                bg-base-100
                p-4
                shadow-xl
                gap-2
                z-[999]
              "
            >
              <li><a>Destinations</a></li>
              <li><a>Universities</a></li>
              <li><a>Courses</a></li>
              <li><a>Scholarships</a></li>
              <li><a>Visa Process</a></li>

              {/* MOBILE BUTTONS */}
              <div className="mt-4 flex flex-col gap-3">
                <ButtonPrimary className="w-full">
                  Book Free Counselling
                </ButtonPrimary>

                <ButtonSecondary className="w-full">
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