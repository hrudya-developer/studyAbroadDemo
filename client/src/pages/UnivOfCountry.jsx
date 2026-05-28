import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";

const UnivOfCountry = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { uid } = useSelector((state) => state.auth);

  const { universities, universityImagePath, loading, error } = useSelector(
    (state) => state.universityData
  );

  const safeUid = uid ?? 0;

  useEffect(() => {
    dispatch(
      fetchUniversitiesByCountry({
        uid: safeUid,
        id: Number(id),
        offset: 0,
        keyword: "alluniversities",
      })
    );
  }, [dispatch, safeUid, id]);

  if (loading) {
    return <div className="p-6 text-center font-bold">Loading universities...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {universities?.length > 0 ? (
          universities.map((item) => {
            const image =
              item?.image && universityImagePath
                ? `${universityImagePath}/${item.image}`
                : null;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {image && (
                  <img
                    src={image}
                    alt={item?.university || item?.name}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  <h3 className="font-bold text-lg text-secondary">
                    {item?.university || item?.name}
                  </h3>

                  {item?.location && (
                    <p className="text-sm text-slate-500 mt-2">
                      {item.location}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-slate-500">No universities found.</p>
        )}
      </div>
    </section>
  );
};

export default UnivOfCountry;