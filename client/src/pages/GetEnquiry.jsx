import { useEffect, useState } from "react";

const GetEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("api", "overseas@Miak2023");

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getEnquiries",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      setEnquiries(result?.data || []);
    } catch (err) {
      console.error("Get enquiry error:", err);
      setError("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading enquiries...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Enquiries</h1>

        <button
          onClick={fetchEnquiries}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Study Level</th>
              <th className="px-4 py-3">Counselling</th>
              <th className="px-4 py-3">Start Time</th>
              <th className="px-4 py-3">Fund</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {item.firstname} {item.lastname}
                  </td>
                  <td className="px-4 py-3">{item.email || "-"}</td>
                  <td className="px-4 py-3">{item.mobile || "-"}</td>
                  <td className="px-4 py-3">{item.destination || "-"}</td>
                  <td className="px-4 py-3">{item.studylevel || "-"}</td>
                  <td className="px-4 py-3">
                    {item.modeofcounselling || "-"}
                  </td>
                  <td className="px-4 py-3">{item.starttime || "-"}</td>
                  <td className="px-4 py-3">{item.fund || "-"}</td>
                  <td className="px-4 py-3">{item.date || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GetEnquiry;