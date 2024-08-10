import RightSide from "../components/RightSide";
import { Blogs } from "./Blogs";

const Home = () => {
  return (
    <>
      <div>
        <div className="flex justify-between px-4 sm:px-16 flex-col md:flex-row">
          <div>
            <Blogs />
          </div>
          <div className="mt-16">
            <RightSide />
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Home;
