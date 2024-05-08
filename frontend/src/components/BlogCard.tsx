import { Link } from "react-router-dom";
import { format } from "date-fns"; // Import format function from date-fns

import { BiCalendar, BiShare } from "react-icons/bi";
import { HiOutlineClock } from "react-icons/hi";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

interface BlogCardProps {
  id: string;
  author: string;
  title: string;
  content: string;
  created: string; // Modify the type to string for consistency
  like: number;
  dislike: number;
  
}

export const BlogCard = ({
  id,
  author,
  title,
  content,
  created,
  like,
  dislike,
}: BlogCardProps) => {
  const formattedCreatedAt = format(new Date(Date.parse(created)), "MMMM dd, yyyy");
  return (

    <div className="border-b p-4 border-slate-700 pb-4 max-w-screen-md w-[18rem] sm:min-w-[30rem] md:min-w-[50rem] cursor-pointer mt-4">
      <div className="flex items-center">
        {/* Avatar component */}
        <Avatar name={author} />
        <div className="font-extralight pl-2">{author}</div>
        <span className="pl-1">.</span>
      </div>
      <div className="text-xl font-bold pt-2">{title}</div>
      <div>
        <div className="text-md font-semibold inline ">
          {content.slice(0, 250) + "..."}{" "}
          <Link to={`/blog/${id}`}>
            <span className="text-blue-600 underline">Read more</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm mt-4 text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <BiCalendar className="h-4 w-4" />
            <span> {formattedCreatedAt}</span>
          </div>
          <span className="pl-0">.</span>

          <div className="flex items-center gap-1">
            <HiOutlineClock className="h-4 w-4" />
            <span>{`${Math.ceil(content.length / 100)} minutes read`}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FaRegThumbsUp className="h-4 w-4" />
            <span>{like}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegThumbsDown className="h-4 w-4" />
            <span>{dislike}</span>
          </div>
          <div className="flex items-center gap-1">
            <BiShare className="h-4 w-4" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center  ${
        size === "small" ? "w-7 h-7" : "w-10 h-10"
      } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={` ${
          size === "small" ? "text-xs" : "text-md"
        }  font-extralight text-gray-600 dark:text-gray-300 cursor-pointer`}
      >
        {name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()}
      </span>
    </div>
  );
}
