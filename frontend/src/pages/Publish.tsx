import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../components/AI/Context";
import "../styles/main.css";

// import { HiMenuAlt2 } from "react-icons/hi";
import { GiMoebiusStar } from "react-icons/gi";

export const Publish = () => {

    const {
        onSent,
        loading,
        resultData,
        setInput,
      }:any = useContext(Context);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [isPublishing, setIsPublishing] = useState(false);

    const publishpost = async () => {

        if (!localStorage.getItem("token")) {
            toast.error("You are not logged in. Please log in to publish a post.");
            return;
        }

        setIsPublishing(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            toast.success("Publish post successfully");
            navigate(`/blog/${response.data.id}`);
        } catch (error: any) {
            toast.error("Error publishing post:", error);
        } finally {
            setIsPublishing(false);
        }
    }

    return (
        <div className="bg-slate-300 h-screen overflow-x-hidden">
            <Appbar />
            <div className="flex justify-center gap-10 max-h-full w-full pt-8 mt-10 ">
                <div className="flex flex-col  gap-10 md:flex-row w-full max-w-screen-xl  ">
                    <div className="flex-1 p-4 shadow-md bg-white">
                        <input
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setInput(e.target.value)
                            }}
                            type="text"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            placeholder="Title"
                        />
                        <TextEditor onChange={(e) => setDescription(e.target.value)} />
                        <button
                            onClick={publishpost}
                            type="submit"
                            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            {isPublishing ? "Publishing..." : "Publish post"}
                        </button>
                        <button
                            onClick={() => onSent()}
                            type="submit"
                            className="mt-4 ml-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Generate blog
                        </button>
                    </div>
                    <div className="flex-1 p-4 flex justify-center items-center h-[40rem]">
                        {loading ? (
                            <div className="flex result-data relative w-full max-h-[40rem] justify-center items-center -mt-80">
                                <i className="text-3xl rotate">
                                    <GiMoebiusStar className="rotate-on-click" />
                                </i>
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            </div>
                        ) : (
                            <div className="flex result  relative w-full  p-4 h-[40rem] overflow-auto shadow-md bg-white -mt-1">
                                <i className="text-3xl">
                                    <GiMoebiusStar className="rotate-on-click" />
                                </i>
                                <div>
                                    <h1 className="text-lg font-medium ml-2">Blog</h1>
                                    <div>
                                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                    </div>
                                </div>
                                {/* <HiSpeakerWave
                                    className="copy-icon absolute right-3 top-3 cursor-pointer text-2xl"
                                /> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            onChange={onChange}
                            id="editor"
                            rows={22}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
