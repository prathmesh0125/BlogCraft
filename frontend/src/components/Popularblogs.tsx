import { useEffect, useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../config";


const Popularblogs = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/getposts`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }) // Replace with the actual path to your API route
      .then((response) => {
        setTopPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top posts:", error);
        // setError("Failed to load top posts.");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div  className="mt-4">
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-4 space-y-4">
        <a href="#" className=" items-start gap-4">
          <ul>
            {topPosts.map((post: any) => (
              <li key={post.id}>
                <h3 className="text-xl font-semibold hover:underline">
                  {post.title.slice(0,40)+"..."}
                </h3>
                <p>{post.content.slice(0, 100) + "..."}</p>
                <hr />
              </li>
            ))}
          </ul>
        </a>
      </div>
    </div>
  );
};

export default Popularblogs;
