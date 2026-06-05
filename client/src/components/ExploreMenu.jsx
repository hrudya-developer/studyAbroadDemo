import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function ExploreMenu() {
  const [openExplore, setOpenExplore] = useState(false);
  const [openGerman, setOpenGerman] = useState(false);

  return (
    <li className="relative list-none">
      <button
        type="button"
        onClick={() => setOpenExplore((prev) => !prev)}
        className="flex items-center gap-1 font-medium text-black transition"
      >
        Explore
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            openExplore ? "rotate-180" : ""
          }`}
        />
      </button>

      {openExplore && (
        <ul className="absolute left-0 top-full z-50 mt-3 min-w-[250px] rounded-2xl border border-gray-100 bg-white py-3 shadow-xl">
          <MenuLink to="/scholarships">Scholarships</MenuLink>
          <MenuLink to="/visa-process">Visa Process</MenuLink>

          <li>
            <button
              type="button"
              onClick={() => setOpenGerman((prev) => !prev)}
              className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-primary/10 hover:text-primary"
            >
              German Programs
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openGerman ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openGerman ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="mx-3 mb-2 rounded-xl bg-gray-50 py-2">
                <SubMenuLink to="/ausbildung">Ausbildung</SubMenuLink>
                <SubMenuLink to="/fsj">FSJ</SubMenuLink>
                <SubMenuLink to="/bfd">BFD</SubMenuLink>
                <SubMenuLink to="/language-programs">
                  Language Programs
                </SubMenuLink>
              </ul>
            </div>
          </li>

          
          <MenuLink to="/news-events">News & Events</MenuLink>
        </ul>
      )}
    </li>
  );
}

function MenuLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="block px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-primary/10 hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}

function SubMenuLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="block rounded-lg px-5 py-2.5 text-sm text-gray-600 transition hover:bg-white hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}

export default ExploreMenu;