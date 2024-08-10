import  { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Avatar } from "./BlogCard";

const Topuser = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/top-users`)

      .then((response) => {
        setTopUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex items-center mt-4">
          <svg
            className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center gap-4">
        <ul>
          {topUsers.map((user: any) => (
            <div
              key={user.id}
              className="flex  text-center items-center gap-3 user-item mt-4"
            >
              <h1>
                <Avatar size={"big"} name={user.name || "Anonymous"} />
              </h1>
              <h3 className="text-sm font-semibold text-gray-700 flex justify-start">
                {user.name}
              </h3>
              {/* <p>since {new Date(user.createdAt).toLocaleDateString()}</p> */}
              {/* <p>About: {user.aboutuser}</p> */}
              {/* <p>Posts: {user._count.posts}</p> */}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Topuser;
