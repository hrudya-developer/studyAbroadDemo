import { useEffect, useRef, useState } from "react";
import {
  BookOpenText,
  ChevronDown,
  HandHelping,
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
    if (mobile) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenExplore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobile]);

  return (
    <li ref={menuRef} className="relative list-none">
      <button
        type="button"
        onClick={() => setOpenExplore((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-1 rounded-lg bg-secondary/10 font-medium transition duration-300 lg:bg-transparent ${
          mobile ? "py-2 text-black" : "text-white"
        }`}
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
        <ul
          className={`${
            mobile
              ? "mt-2 max-h-[300px] w-full overflow-y-auto rounded-xl bg-primary p-2 text-white"
              : "absolute left-0 top-full z-50 mt-4 max-h-[300px] w-[340px] overflow-y-auto rounded-3xl border border-gray-100 bg-gray-50 p-3 text-gray-900 shadow-2xl ring-1 ring-black/5"
          } animate-[slideDown_0.25s_ease-out]`}
        >
          <li>
            <MenuLink
              to="/popularCoursePublic"
              onClick={closeMenus}
              mobile={mobile}
              icon={<BookOpenText size={20} />}
            >
              Popular Courses
            </MenuLink>
          </li>

          <li>
            <MenuLink
              to="/addOnServices"
              onClick={closeMenus}
              mobile={mobile}
              icon={<HandHelping size={20} />}
            >
              Add On Services
            </MenuLink>
          </li>

          <li>
            <MenuLink
              to="/communityPosts"
              onClick={closeMenus}
              mobile={mobile}
              icon={<StickyNote size={20} />}
            >
              View Community Posts
            </MenuLink>
          </li>
        </ul>
      )}
    </li>
  );
}

function MenuLink({ to, children, onClick, mobile, icon }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
        mobile
          ? "text-white hover:bg-white/10"
          : "text-gray-900 hover:bg-primary/10"
      }`}
    >
      <span className={mobile ? "text-white" : "text-primary"}>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

export default ExploreMenu;