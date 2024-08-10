import { Link } from 'react-router-dom';
// import Head from 'next/head';

const Herosection = () => {

  return (
    <>
      {/* <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head> */}
      <main className="flex flex-col items-center justify-center min-h-[100vh] bg-gray-50 px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold w-full tracking-tight text-gray-900  sm:text-5xl md:text-6xl">
              Discover the Art of Storytelling  
            </h1>
            <p className="text-lg text-gray-600  md:text-xl">
              Immerse yourself in a world of captivating narratives, where words come alive and inspire the soul.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/signin" className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2  hover:text-gray-900  hover:bg-gray-200  focus:ring-offset-gray-900">
              Get Started
            </Link>
            
          </div>
          <div className="grid grid-cols-1 m-auto md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white  rounded-lg shadow-md p-6 text-left hover:scale-105 ">
              <h3 className="text-xl font-bold mb-2">Captivating Narratives</h3>
              <p className="text-gray-600">
                Discover stories that ignite your imagination and touch your heart.
              </p>
            </div>
            <div className="bg-white  rounded-lg shadow-md p-6 text-left hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Inspiring Perspectives</h3>
              <p className="text-gray-600 ">
                Explore diverse voices and gain new insights that challenge and empower you.
              </p>
            </div>
            <div className="bg-white   rounded-lg shadow-md p-6 text-left hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Timeless Wisdom</h3>
              <p className="text-gray-600  ">
                Uncover timeless lessons that inspire personal growth and transformation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Herosection;
