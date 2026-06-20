import { useEffect, useState } from "react";
import axios from "axios";
import CommunityHero from "./CommunityHero";

const CommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [offsets, setOffsets] = useState([0]);
  const [nextOffset, setNextOffset] = useState(null);

  const fetchCommunityPosts = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const offset = offsets[page - 1] ?? 0;

      const formData = new FormData();
      formData.append("api", "overseas@Miak2023");
      formData.append("uid", "0");
      formData.append("offset", offset.toString());

      const response = await axios.post(
        "https://overseas.technocitysolutions.com/public/api/getCommunityPosts",
        formData
      );

      if (response.data?.status === true) {
        const apiPosts = response.data.posts || [];

        setPosts(apiPosts);
        setImagePath(response.data.post_image_path || "");

        const apiNextOffset = response.data.nextoffset;

        if (apiNextOffset !== undefined && apiNextOffset !== null) {
          setNextOffset(Number(apiNextOffset));

          setOffsets((prev) => {
            if (prev.includes(Number(apiNextOffset))) return prev;
            return [...prev, Number(apiNextOffset)];
          });
        } else {
          setNextOffset(null);
        }

        if (apiPosts.length === 0 && page === 1) {
          setError("No posts found");
        }
      } else {
        setPosts([]);
        setNextOffset(null);

        if (page === 1) {
          setError("No posts found");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load community posts");
      setNextOffset(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityPosts(currentPage);
  }, [currentPage]);

  const goPrev = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    if (nextOffset === null || posts.length === 0) return;
    setCurrentPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = offsets.map((_, index) => index + 1);

  if (loading) {
    return (
      <div className="py-20 text-center font-semibold text-[#081c47]">
        Loading community posts...
      </div>
    );
  }

  return (
<>
    <CommunityHero />
    <section className="min-h-screen bg-[#f7f9fc] px-4 py-10">
      <div className="mx-auto max-w-7xl">
       

        {error ? (
          <div className="py-20 text-center font-semibold text-red-500">
            {error}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const postImage = post.attach
                  ? `${imagePath}${post.attach}`
                  : null;

                return (
                  <div
                    key={post.id}
                    className="overflow-hidden rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  >
                  {post.post?.trim() && (
  <p className="mb-4 text-sm leading-relaxed text-gray-700">
    {post.post}
  </p>
)}

{postImage && (
  <img
    src={postImage}
    alt="Community post"
    className="h-full w-full rounded-xl object-cover"
  />
)}

{post.link?.trim() && (
  <a
    href={post.link}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-block rounded-lg bg-darkPrimary px-4 py-2 text-sm font-semibold text-white hover:bg-primary"
  >
    click Here
  </a>
)}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-[#081c47] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    currentPage === page
                      ? "bg-darkPrimary text-white"
                      : "border bg-white text-[#081c47]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={goNext}
                disabled={nextOffset === null || posts.length === 0}
                className="rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-[#081c47] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
    </>
  );
};

export default CommunityPosts;