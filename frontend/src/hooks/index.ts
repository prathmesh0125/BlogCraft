import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": string
    "author": {
        "name": string
    }
    "createdAt":"MMMM dd, yyyy",
    "likes":number,
    "dislikes":number
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

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((response) => {
                setBlog(response.data.blog);
                setLoading(false);
                localStorage.setItem(`cachedBlog_${id}`, JSON.stringify(response.data.blog));
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

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((response) => {
                setBlogs(response.data.blogs);
                setLoading(false);
                localStorage.setItem("cachedBlogs", JSON.stringify(response.data.blogs));
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