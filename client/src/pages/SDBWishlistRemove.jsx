import { useState } from "react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const API_KEY = "overseas@Miak2023";

export default function SDBWishlistRemove({ courseId, onRemoved }) {
  const { uid } = useSelector((state) => state.auth);
  const [removing, setRemoving] = useState(false);

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (removing) return;

    if (!uid || !courseId) {
      Swal.fire({
        icon: "error",
        title: "Missing Data",
        text: "Unable to remove this course.",
        confirmButtonColor: "#cb0e10",
      });
      return;
    }

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Remove from wishlist?",
      text: "This course will be removed from your wishlist.",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#cb0e10",
    });

    if (!confirm.isConfirmed) return;

    try {
      setRemoving(true);

      const formData = new FormData();
      formData.append("api", API_KEY);
      formData.append("uid", String(uid));
      formData.append("id", String(courseId));
      formData.append("type", "course");

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/removePreferlist",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || result?.status !== true) {
        throw new Error(result?.msg || result?.message || "Remove failed");
      }

      onRemoved?.(courseId);

      window.dispatchEvent(new CustomEvent("wishlistUpdated"));

      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Course removed from wishlist.",
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
      setRemoving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={removing}
      className="rounded-full p-2 text-secondary transition hover:bg-red-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
      aria-label="Remove from wishlist"
    >
      <Trash2 size={20} />
    </button>
  );
}