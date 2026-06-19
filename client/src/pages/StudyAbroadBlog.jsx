import { useEffect, useState } from "react";
import axios from "axios";
import mapBg from "../assets/mapBg.png";
import { GrBlog } from "react-icons/gr";

function StudyAbroadBlog() {
  const [blogs, setBlogs] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const formData = new FormData();
        formData.append("api", "overseas@Miak2023");
        formData.append("uid", "0");

        const response = await axios.post(
          "https://overseas.technocitysolutions.com/public/api/getBlog",
          formData
        );

        setBlogs(response.data?.blog || []);
        setImagePath(response.data?.blog_image_path || "");
      } catch (error) {
        console.error("Blog API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading blogs...</p>;
  }

  return (
   <section
  className="mx-auto max-w-7xl bg-no-repeat bg-right-top px-4 py-12 md:px-10 lg:px-20"
  style={{
    backgroundImage: `url(${mapBg})`,
  }}
>
  <div className="flex justify-center mb-5"><span className="size-16 bg-red-50 grid place-content-center rounded-full shadow-2xl"><GrBlog className="text-primary size-8"/></span></div>
     
     <h5 className="text-primary text-center font-extrabold my-2 text-lg mb-5">Stay Updated</h5>
     
      <h2 className="mb-8 text-5xl font-bold text-secondary text-center">Latest Blogs</h2>


      <div className="flex gap-2 justify-center">
        <div className="w-[55px] h-[5px] bg-primary">

        </div> <div className="w-[55px] h-[5px] bg-secondary">

        </div></div>
      <p className="text-gray-800 py-10 px-10 text-lg">Stay informed with our Study Abroad Blog, featuring expert advice, visa guidance, scholarship updates, student experiences, and destination-specific insights to help you navigate your international education journey with confidence.</p>
     
      
      

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={`${imagePath}${blog.image}`}
              alt={blog.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <p className="mb-2 text-sm text-primary">{blog.date}</p>

              <h3 className="mb-4 text-lg font-bold text-secondary">
                {blog.title}
              </h3>

              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-secondary"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StudyAbroadBlog;