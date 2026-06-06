import { useEffect, useRef, useState } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGermanPrograms } from "../redux/slices/germanProgramSlice";

const defaultGermanPrograms = [{ label: "FSJ", to: "/germanPrograms/6" }];

function ExploreMenu() {
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
  ].filter((item, index, array) => {
    return array.findIndex((program) => program.to === item.to) === index;
  });

  const closeMenus = () => {
    setOpenExplore(false);
    setOpenGerman(false);
  };

  useEffect(() => {
    dispatch(fetchGermanPrograms({ uid: 0, id: 6 }));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li ref={menuRef} className="relative list-none">
      <button
        type="button"
        onClick={() => setOpenExplore((prev) => !prev)}
        className="flex items-center gap-1 font-medium text-black transition hover:text-primary"
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
        <ul className="absolute left-0 top-full z-50 mt-4 w-[310px] overflow-auto rounded-3xl border border-gray-100 bg-white p-3 shadow-2xl ring-1 ring-black/5">
         
         
         
          <li>
            <button
              type="button"
              onClick={() => setOpenGerman((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition hover:bg-primary/10"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-content-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap size={20} />
                </span>

                <span>
                  <span className="block text-sm font-bold text-gray-800">
                    German Programs
                  </span>
                  <span className="block text-xs text-gray-500">
                    Ausbildung, FSJ, Studienkollegs & more
                  </span>
                </span>
              </span>

              <ChevronDown
                size={16}
                className={`shrink-0 text-gray-500 transition-transform duration-300 ${
                  openGerman ? "rotate-180" : ""
                }`}
              />
            </button>

            {openGerman && (
              <ul className="mt-2 flex max-h-[220px] flex-col gap-1 overflow-y-auto overflow-x-hidden rounded-2xl bg-gray-50 p-2">
                {germanPrograms.map((item) => (
                  <li key={item.to} className="w-full">
                    <SubMenuLink to={item.to} onClick={closeMenus}>
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

function SubMenuLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block w-full rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-primary hover:shadow-sm"
    >
      {children}
    </Link>
  );
}

export default ExploreMenu;