import axios from "axios";
import { useEffect, useState } from "react";
import { ImBlog } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { jwtDecode } from "jwt-decode";
import { LuPenSquare } from "react-icons/lu";
export const Appbar = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Adjust the duration as needed to match your animation
  };
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ username: string }>(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b flex justify-between  px-4 py-1">
      <div className="text-2xl flex flex-row ce justify-center items-center gap-3">
        <div>
          <ImBlog
            onClick={handleClick}
            className={isAnimating ? "animate-bounce" : ""}
          />
        </div>
        <Link to="/blogs">
          <div>BlogCraft</div>
        </Link>
      </div>
      <div className="flex">
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4   bg-slate-200 focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center   border "
          >
            <span className="flex justify-center items-center gap-2 ">
              <LuPenSquare />
              New
            </span>
          </button>
        </Link>
        <Avatardropdown size={"big"} name={username || "Anoynmous"} />
      </div>
    </div>
  );
};

function Avatardropdown({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const [loading, setLoading] = useState(false);

  async function sendSignoutRequest() {
    try {
      setLoading(true); // Set loading to true when request starts
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signout`,
        {},
        {
          headers: {
            Authorization: token, // Pass the token in the Authorization header
          },
        }
      );
      // If the response status is 200, sign-out was successful
      if (response.status === 200) {
        localStorage.removeItem("token");
        // Display a toast message indicating successful sign-out
        toast.success("Signed out successfully!");
        navigate("/signin");
      } else {
        // Handle other response statuses if necessary
      }
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false); // Reset loading to false when request completes
    }
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-7 h-7" : "w-10 h-10"
      }  bg-gray-100 rounded-full dark:bg-gray-600 `}
      onClick={toggleDropdown}
    >
      <span
        className={` ${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-gray-600 dark:text-gray-300 cursor-pointer`}
      >
        {name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()}
      </span>
      {isDropdownOpen && (
        <div
          className="absolute z-10 mt-32 py-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:divide-gray-600"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to={"/signin"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:text-gray-800 "
            onClick={sendSignoutRequest}
          >
            {loading ? "loading" : "Sign out"}
          </Link>
          <Link
            to={"/profile"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:text-gray-800 "
            // onClick={sendSignoutRequest}
          >
            {loading ? "loading" : "Profile"}
          </Link>
        </div>
      )}
    </div>
  );
}
