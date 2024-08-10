// import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, otherwise false
  // }, []);

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex mt-0 ">
        <div className="px-6 mt-20 ">
          <div className="flex gap-1">
            <div className="md:flex gap-10  ">
              <div className="overflow-y-scroll scroling h-screen ">
                <h3 className="text-2xl font-semibold">Blogs</h3>
                {blogs.map((post) => (
                  <div>
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      author={post.author.name || "Anonymous"}
                      title={post.title}
                      content={post.content}
                      created={post.createdAt}
                      like={post.likes}
                      dislike={post.dislikes}
                      imageUrl={post.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
