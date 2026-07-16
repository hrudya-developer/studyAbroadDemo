import { useEffect, useRef, useState } from "react";
import {
  BookOpenText,
  ChevronDown,
  HandHelping,
  Search,
  StickyNote,
} from "lucide-react";
import { Link } from "react-router-dom";

function ExploreMenu({ mobile = false, onNavigate }) {
  const [openExplore, setOpenExplore] = useState(false);
  const menuRef = useRef(null);

  const closeMenus = () => {
    setOpenExplore(false);
    onNavigate?.();
  };

  useEffect(() => {
    if (mobile) return undefined;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenExplore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobile]);

  return (
    <li
      ref={menuRef}
      className={`relative list-none ${
        mobile ? "w-full" : "flex items-center"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpenExplore((previous) => !previous)}
        className={`flex items-center rounded-lg font-semibold transition-colors duration-200 ${
          mobile
            ? "w-full justify-between bg-secondary/10 px-4 py-3 text-black"
            : "justify-center gap-1.5 whitespace-nowrap px-3 py-2 text-white hover:bg-white/10"
        }`}
        aria-expanded={openExplore}
        aria-haspopup="menu"
      >
        <span className="flex gap-2 items-center"><span className=" lg:hidden text-primary"><Search size={18}/></span>Explore</span>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 ${
            openExplore ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {openExplore && (
        <ul
          className={`animate-[slideDown_0.25s_ease-out] ${
            mobile
              ? "mt-2 max-h-[300px] w-full overflow-y-auto rounded-xl bg-darkPrimary p-2 text-white"
              : "absolute left-1/2 top-full z-50 mt-3 max-h-[300px] w-[340px] -translate-x-1/2 overflow-y-auto rounded-3xl border border-gray-100 bg-gray-50 p-3 text-gray-900 shadow-2xl ring-1 ring-black/5"
          }`}
        >
          <li>
            <MenuLink
              to="/popularCoursePublic"
              onClick={closeMenus}
              mobile={mobile}
              icon={BookOpenText}
            >
              Popular Courses
            </MenuLink>
          </li>

          <li>
            <MenuLink
              to="/addOnServices"
              onClick={closeMenus}
              mobile={mobile}
              icon={HandHelping}
            >
              Add On Services
            </MenuLink>
          </li>

          <li>
            <MenuLink
              to="/communityPosts"
              onClick={closeMenus}
              mobile={mobile}
              icon={StickyNote}
            >
              View Community Posts
            </MenuLink>
          </li>
        </ul>
      )}
    </li>
  );
}

function MenuLink({
  to,
  children,
  onClick,
  mobile,
  icon: Icon,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${
        mobile
          ? "text-white hover:bg-white/10"
          : "text-gray-900 hover:bg-primary/10"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          mobile
            ? "bg-white/10 text-white"
            : "bg-primary/10 text-primary"
        }`}
      >
        <Icon size={19} />
      </span>

      <span>{children}</span>
    </Link>
  );
}

export default ExploreMenu;