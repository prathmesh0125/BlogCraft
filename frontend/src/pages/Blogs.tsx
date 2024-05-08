import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

    useEffect(() => {
        // Check if user is logged in (for example, by checking if there's a token in local storage)
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, otherwise false
      }, []);

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center mt-0">
        <div className="px-6 mt-20">
            <div>
            {isLoggedIn ? (
            // Render posts if user is logged in
            blogs.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                author={post.author.name || "Anonymous"}
                title={post.title}
                content={post.content}
                created={post.createdAt}
                like={post.likes}
                dislike={post.dislikes}
              />
            ))
          ) : (
            // Show message and button if user is not logged in
            <div className="flex flex-col items-center justify-center mt-32 bg-white ">
            <div className="bg- p-8 rounded-lg shadow-md w-full max-w-md">
              <div className="flex flex-col items-center space-y-4">
              <FaLock className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-800 ">You are not logged in</h2>
                <p className="text-gray-600 ">Please login to continue.</p>
                <Link
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
                  to="/signin"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
          )}
            </div> 
            </div> 
        </div>
    </div>
}

