import { useState } from "react";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const API_KEY = "overseas@Miak2023";

export default function SDBStudentAccountRemove() {
  const { uid } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete Account?",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonColor: "#cb0e10",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("api", API_KEY);
      formData.append("uid", String(uid));

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/deleteAccount",
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
            "Failed to delete account."
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Account Deleted",
        text: "Your account has been deleted successfully.",
        confirmButtonColor: "#cb0e10",
      });

      localStorage.clear();
      sessionStorage.clear();

      window.location.href = "/";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error?.message || "Something went wrong.",
        confirmButtonColor: "#cb0e10",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDeleteAccount}
      disabled={loading}
      className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-4 text-base font-bold text-primary shadow-sm transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 size={18} />
      {loading ? "Deleting..." : "Delete Account"}
    </button>
  );
}