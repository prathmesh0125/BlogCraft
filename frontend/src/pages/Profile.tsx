import { FaUser } from 'react-icons/fa'; // Example import for user icon
import { MdArrowForward } from 'react-icons/md'; // Example import for arrow forward icon

export  function Profile() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center">
            <FaUser className="text-4xl text-gray-600" /> {/* Example user icon */}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Olivia Davis</h1>
            <p className="text-gray-500 dark:text-gray-400">@olivia_davis</p>
          </div>
        </div>
        <div className="w-full max-w-4xl space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Introducing the Joke Tax</h2>
              <p className="text-gray-600">The king's brilliant plan to solve the kingdom's financial woes.</p>
              <div>
                <a href="#" className="text-blue-500 font-medium hover:underline flex items-center">
                  Read more <MdArrowForward className="ml-1" /> {/* Example arrow forward icon */}
                </a>
              </div>
            </div>
            {/* Repeat similar structure for other cards */}
          </div>
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
