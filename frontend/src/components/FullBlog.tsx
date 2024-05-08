import { useState } from "react";
import axios from "axios";
import { Blog } from "../hooks";
import {Appbar} from "./Appbar";
import { Avatar } from "./BlogCard";
import { format } from "date-fns";
import { BiCalendar, BiShare } from "react-icons/bi";
import { HiOutlineClock } from "react-icons/hi";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
// import { HiSpeakerWave } from "react-icons/hi2";
import { BACKEND_URL } from "../config";

const FullBlog = ({ post }: { post: Blog }) => {
  const [likeCount, setLikeCount] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const formattedCreatedAt = format(new Date(post.createdAt), "MMMM dd, yyyy");

  const handleLike = async () => {
    if (liked || loading) return; // If already liked or loading, return
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/like/${post.id}`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLikeCount(response.data.likes);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 mt-24 max-w-screen-xl pt-12 mb-20">
          <div className="col-span-8 max-w-screen-md">
            <div className="text-3xl font-extrabold">{post.title}</div>
            <div className="text-slate-500 pt-4">{formattedCreatedAt}</div>
            <div className="text-1xl font-semibold pt-2">{post.content}</div>
         
          <div className="flex items-center justify-between text-sm mt-4 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <BiCalendar className="h-4 w-4" />
                <span> {formattedCreatedAt}</span>
              </div>
              <span className="pl-0">.</span>

              <div className="flex items-center gap-1">
                <HiOutlineClock className="h-4 w-4" />
                <span>{`${Math.ceil(
                  post.content.length / 100
                )} minutes read`}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FaRegThumbsUp  onClick={handleLike}
 style={{ color: liked ? "gray" : "red", cursor: liked ? "not-allowed" : "pointer" }} className="h-4 w-4" />
                <span>{likeCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRegThumbsDown className="h-4 w-4" />
                <span>{post.dislikes}</span>
              </div>
              <div className="flex items-center gap-1">
                <BiShare className="h-4 w-4" />
                <span>Share</span>
              </div>
            </div>
          </div>
          </div>

          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex">
              <div className="pr-4 flex flex-col justify-center ">
                <Avatar size={"big"} name={post.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {post.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                 {post.author.aboutuser || "Random catch phrase about the author's ability to grab use"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
