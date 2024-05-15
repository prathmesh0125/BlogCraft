import { FaUser } from 'react-icons/fa'; // Example import for user icon
import { useFetchProfile } from "../hooks";
import { Link } from 'react-router-dom';

export function Profile() {

  const { userName, userPosts, isLoading, error } = useFetchProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center">
            <FaUser className="text-4xl text-gray-600" /> {/* Example user icon */}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold"> @{userName}</h1>
            <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas odio vitae dolorem. Reiciendis modi quasi aliquam </p>
          </div>
        </div>
        <div className="w-full max-w-4xl space-y-6">
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {userPosts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600">{post.content.slice(0, 250) + "..."}</p>
                  
                  <div>
                  <Link to={`/blog/${'376f2936-0086-438d-b647-23753e04ec5a'}`}>
            <span className="text-blue-600 underline">Read more</span>
          </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts found</p>
          )}
          <div className="flex justify-center">
            <button className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300">
              Create New Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
