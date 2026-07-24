import { Link } from "react-router-dom";
import ExploreMenu from "./ExploreMenu";
import navItem from "./navItem";

const DesktopNavigation = () => {
  return (
    <nav
      aria-label="Primary navigation"
      className="
        hidden
        flex-1
        items-center
        justify-center
        lg:flex
      "
    >
      <ul
        className="
          flex
          items-center
          gap-1
          text-sm
          font-semibold
          text-white
          xl:text-base
        "
      >
        {navItem.slice(0,4).map((item)=>(
          <li key={item.path}>
            <Link
              to={item.path}
              className="
                rounded-lg
                px-3
                py-2
                whitespace-nowrap
                hover:bg-white/10
              "
            >
              {item.name}
            </Link>
          </li>
        ))}

        <ExploreMenu />

        <li>
          <Link
            to="/studyAbroadBlog"
            className="
              rounded-lg
              px-3
              py-2
              hover:bg-white/10
            "
          >
            Blogs
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default DesktopNavigation;