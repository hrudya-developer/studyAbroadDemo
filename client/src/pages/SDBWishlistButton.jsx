import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const API_KEY = "overseas@Miak2023";

function getWishlistCourseId(item) {
  return item?.id || item?.course_id || item?.uc_id || item?.cid || "";
}

export default function SDBWishlistButton({ courseId }) {
  const { uid } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [added, setAdded] = useState(false);

  const safeCourseId = String(courseId || "");

  useEffect(() => {
    let isMounted = true;

    const checkWishlistStatus = async () => {
      if (!uid || !safeCourseId) {
        if (isMounted) setAdded(false);
        return;
      }

      try {
        setChecking(true);

        const formData = new FormData();
        formData.append("api", API_KEY);
        formData.append("uid", String(uid));

        const response = await fetch(
          "https://overseas.technocitysolutions.com/public/api/getPrefereList",
          {
            method: "POST",
            body: formData,
          }
        );

        const text = await response.text();
        const result = text ? JSON.parse(text) : {};

        const courses = Array.isArray(result?.course) ? result.course : [];

        const alreadyAdded = courses.some(
          (item) => String(getWishlistCourseId(item)) === safeCourseId
        );

        if (isMounted) setAdded(alreadyAdded);
      } catch {
        if (isMounted) setAdded(false);
      } finally {
        if (isMounted) setChecking(false);
      }
    };

    checkWishlistStatus();

    return () => {
      isMounted = false;
    };
  }, [uid, safeCourseId]);

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading || checking || added) return;

    if (!uid) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add this course to wishlist.",
        confirmButtonColor: "#cb0e10",
      });
      return;
    }

    if (!safeCourseId) {
      Swal.fire({
        icon: "error",
        title: "Course Missing",
        text: "Course ID is missing.",
        confirmButtonColor: "#cb0e10",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("api", API_KEY);
      formData.append("uid", String(uid));
      formData.append("id", safeCourseId);
      formData.append("type", "course");

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/addToPreferlist",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok || result?.status === false) {
        throw new Error(
          result?.msg ||
            result?.message ||
            `Failed to add wishlist. Status: ${response.status}`
        );
      }

      setAdded(true);

      window.dispatchEvent(new CustomEvent("wishlistUpdated"));

      Swal.fire({
        icon: "success",
        title: "Successfully Added",
        text: "Course added to wishlist.",
        confirmButtonColor: "#cb0e10",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.message || "Something went wrong.",
        confirmButtonColor: "#cb0e10",
      });
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || checking || added;
  const tooltipText = added ? "Added to Wishlist" : "Add to Wishlist";

  return (
    <button
      type="button"
      onClick={handleAddToWishlist}
      disabled={isDisabled}
      aria-label={tooltipText}
      className={`group relative grid place-content-center rounded-full p-2 text-white transition ${
        added
          ? "cursor-not-allowed bg-primary opacity-90"
          : "bg-primary hover:bg-secondary"
      } ${checking || loading ? "cursor-wait opacity-70" : ""}`}
    >
      <Heart size={18} fill={added ? "currentColor" : "none"} />

      <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white shadow-lg group-hover:block">
        {checking ? "Checking..." : loading ? "Adding..." : tooltipText}
      </span>
    </button>
  );
}