import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Building2,
  CheckCircle,
  MapPin,
  FileUser,
} from "lucide-react";
import { useSelector } from "react-redux";

const API_KEY = "overseas@Miak2023";
const ITEMS_PER_PAGE = 6;

export default function SDBApplications() {
  const { uid } = useSelector((state) => state.auth);

  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);

  const paginatedApplications = applications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchApplications = async () => {
      if (!uid) return;

      try {
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("api", API_KEY);
        formData.append("uid", String(uid));

        const response = await fetch(
          "https://overseas.technocitysolutions.com/public/api/getUserEnquiries",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        setApplications(Array.isArray(result?.data) ? result.data : []);
        setCurrentPage(1);
      } catch (err) {
        setError(err.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [uid]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <p className="font-bold text-[#081c47]">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <p className="font-bold text-primary">{error}</p>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg py-10">
        <h2 className="text-xl font-bold text-black mt-3 mb-2">My Applications</h2>
        <p className="mt-2 text-sm text-slate-500">
          No applied courses found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-black my-5 mb-3 flex gap-4 items-center"><span className=""><FileUser className="text-secondary"/></span>My Applications</h2>

      {paginatedApplications.map((application, index) => (
        <ApplicationCard
          key={application?.id || application?.c_id || index}
          application={application}
        />
      ))}

    {totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 pt-4">
    <button
      type="button"
      onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
      disabled={currentPage === 1}
      className="rounded-lg border px-3 py-2 text-sm font-medium disabled:opacity-50"
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;

      return (
        <button
          key={page}
          type="button"
          onClick={() => setCurrentPage(page)}
          className={`h-10 w-10 rounded-lg text-sm font-bold transition ${
            currentPage === page
              ? "bg-[#081c47] text-white"
              : "border bg-white text-[#081c47] hover:bg-slate-100"
          }`}
        >
          {page}
        </button>
      );
    })}

    <button
      type="button"
      onClick={() =>
        setCurrentPage((page) => Math.min(page + 1, totalPages))
      }
      disabled={currentPage === totalPages}
      className="rounded-lg border px-3 py-2 text-sm font-medium disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
    </div>
  );
}

function ApplicationCard({ application }) {
  const time = application?.created_at?.split(" ")?.[1];

  return (
    <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg transition hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-md font-bold text-darkPrimary">
            {application?.course || "N/A"}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-sm text-primary">
            <Building2 className="h-4 w-4" />
            <span>{application?.name || "N/A"}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
          <CheckCircle className="h-4 w-4" />
          Applied
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <InfoItem
          icon={<MapPin className="h-4 w-4" />}
          label="Country"
          value={application?.country}
        />

        <InfoItem
          icon={<Calendar className="h-4 w-4" />}
          label="Date"
          value={application?.date}
        />

        <InfoItem
          icon={<Clock className="h-4 w-4" />}
          label="Time"
          value={time}
        />

        <InfoItem
          icon={<CheckCircle className="h-4 w-4" />}
          label="Status"
          value={application?.enquiry_status || "Applied"}
        />
      </div>

      {application?.created_at && (
        <div className="mt-5 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
          Applied on: {application.created_at}
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
      <div className="text-secondary">{icon}</div>

      <div>
        <p className="text-xs font-semibold uppercase text-slate-400">
          {label}
        </p>

        <p className="text-sm font-bold text-[#081c47]">{value || "N/A"}</p>
      </div>
    </div>
  );
}