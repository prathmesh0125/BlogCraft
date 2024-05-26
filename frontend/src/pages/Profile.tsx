import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";
import { useFetchProfile } from "../hooks";
import { Link } from "react-router-dom";


export function Profile() {
  const { userData,userName, userPosts, isLoading, error } = useFetchProfile();

  if (isLoading) {
    return  <div className="h-screen flex flex-col justify-center">
                
    <div className="flex justify-center">
        <Spinner />
    </div>
</div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-8 px-4 md:px-6 lg:px-8">

      <Appbar/>
      <div className="flex flex-col items-center space-y-6  mx-auto mt-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-24 w-24 bg-gray-500 rounded-full flex items-center justify-center">
          <Userprofile  name={userName || "Anonymous"} />
            {/* Example user icon */}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold"> @{userName}</h1>
            <p className="text-gray-500 dark:text-gray-400">
            {  userData?.user.aboutuser || ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas odio
              vitae dolorem. Reiciendis modi quasi aliquam`}
             
            </p>
          </div>
          <div className="flex justify-center">
            <Link to={"/publish"} className="bg-red-400 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300">
              Create New Post
            </Link>
          </div>
        </div>
        <div className="w-full max-w-4xl space-y-6">
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 ">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-4 rounded-lg shadow-md md:flex md:flex-col gap-4 "
                >
                  <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600">
                    {post.content.slice(0, 250) + "..."}
                  </p>

                  <div>
                    <Link
                      to={`/blog/${"376f2936-0086-438d-b647-23753e04ec5a"}`}
                    >
                      <span className="text-blue-600 underline">Read more</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Userprofile({
  name,
}: {
  name: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center  overflow-hidden w-20 h-20 bg-gray-100 rounded-full `}
    >
      <span
        className={` -mt-3 text-4xl text-gray-600 cursor-pointer`}
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