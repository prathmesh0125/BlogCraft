import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
    aboutuser: string;
  };
  createdAt: "MMMM dd, yyyy";
  likes: number;
  dislikes: number;
}
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | undefined>();

  useEffect(() => {
    const cachedBlog = localStorage.getItem(`cachedBlog_${id}`);
    if (cachedBlog) {
      setBlog(JSON.parse(cachedBlog));
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
        localStorage.setItem(
          `cachedBlog_${id}`,
          JSON.stringify(response.data.blog)
        );
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const cachedBlogs = localStorage.getItem("cachedBlogs");
    if (cachedBlogs) {
      setBlogs(JSON.parse(cachedBlogs));
      setLoading(false);
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
        localStorage.setItem(
          "cachedBlogs",
          JSON.stringify(response.data.blogs)
        );
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
interface User {
  name: string;
  aboutuser: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  authorId: string;
  imageUrl: string | null;
  likes: number;
  dislikes: number;
}

interface UserData {
  user: User;
  posts: Post[];
}

export const useFetchProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<UserData>(`${BACKEND_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setUserData(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    };

    fetchProfile();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  // Accessing user's name and all posts made by the user
  const userName = userData?.user.name || "Anonymous";
  const userPosts = userData?.posts || [];

  return {
    userData,
    isLoading,
    error,
    userName,
    userPosts
  };
};