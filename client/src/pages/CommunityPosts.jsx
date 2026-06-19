import { useEffect, useState } from "react";
import axios from "axios";

const CommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCommunityPosts = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://overseas.technocitysolutions.com/public/api/getCommunityPosts",
        {
          uid: 0,
        }
      );

      if (response.data?.status) {
        setPosts(response.data.data || []);
      } else {
        setError("No posts found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load community posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center font-semibold">
        Loading community posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold text-[#081c47]">
        Community Posts
      </h2>

      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl border bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.profile_image}
              alt={post.name}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <h4 className="font-semibold">{post.name}</h4>
              <p className="text-xs text-gray-500">
                {post.created_at}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-700">
            {post.post_content}
          </p>

          {post.post_image && (
            <img
              src={post.post_image}
              alt="post"
              className="mt-3 w-full rounded-lg object-cover"
            />
          )}

          <div className="mt-3 flex gap-4 text-sm text-gray-500">
            <span>👍 {post.likes_count || 0}</span>
            <span>💬 {post.comments_count || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPosts;