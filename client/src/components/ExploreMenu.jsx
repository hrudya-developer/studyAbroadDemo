import { useEffect, useRef, useState } from "react";
import {
  BookOpenText,
  ChevronDown,
  GraduationCap,
  HandHelping,
  StickyNote,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGermanPrograms } from "../redux/slices/germanProgramSlice";

const defaultGermanPrograms = [{ label: "FSJ", to: "/germanPrograms/6" }];

function ExploreMenu({ mobile = false, onNavigate }) {
  const dispatch = useDispatch();

  const { relatedPrograms = [] } = useSelector(
    (state) => state.germanProgramData || {}
  );

  const [openExplore, setOpenExplore] = useState(false);
  const [openGerman, setOpenGerman] = useState(false);
  const menuRef = useRef(null);

  const germanPrograms = [
    ...defaultGermanPrograms,
    ...relatedPrograms.map((item) => ({
      label: item.name,
      to: `/germanPrograms/${item.id}`,
    })),
  ].filter(
    (item, index, array) =>
      array.findIndex((program) => program.to === item.to) === index
  );

  const closeMenus = () => {
    setOpenExplore(false);
    setOpenGerman(false);
    onNavigate?.();
  };

  useEffect(() => {
    dispatch(fetchGermanPrograms({ uid: 0, id: 6 }));
  }, [dispatch]);

  useEffect(() => {
    if (mobile) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenExplore(false);
        setOpenGerman(false);
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
        className={`flex w-full items-center justify-between gap-1 font-medium transition duration-300 ${
          mobile ? "py-3 text-black" : "text-white"
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

          <li>
            <button
              type="button"
              onClick={() => setOpenGerman((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                mobile ? "hover:bg-white/10" : "hover:bg-primary/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap
                  size={20}
                  className={mobile ? "text-logoYellow" : "text-primary"}
                />

                <span
                  className={`text-sm font-medium ${
                    mobile ? "text-logoYellow" : "text-gray-900"
                  }`}
                >
                  German Programs
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  mobile ? "text-logoYellow" : "text-gray-900"
                } ${openGerman ? "rotate-180" : ""}`}
              />
            </button>

            {openGerman && (
              <ul
                className={`mt-2 rounded-xl py-1 animate-[slideDown_0.25s_ease-out] ${
                  mobile
                    ? "bg-white/10"
                    : "border border-gray-100 bg-white text-gray-900"
                }`}
              >
                {germanPrograms.map((item) => (
                  <li key={item.to}>
                    <SubMenuLink
                      to={item.to}
                      onClick={closeMenus}
                      mobile={mobile}
                    >
                      {item.label}
                    </SubMenuLink>
                  </li>
                ))}
              </ul>
            )}
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

function SubMenuLink({ to, children, onClick, mobile }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`mx-2 block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        mobile
          ? "text-white hover:bg-white/10"
          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}

export default ExploreMenu;