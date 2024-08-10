import Popularblogs from "./Popularblogs";
import Topuser from "./Topuser";

const RightSide = () => {
  return (
    <div>
      <div className="space-y-8 w-[30rem]">
        <div className="rounded-lg border bg-background p-6">
          <h1 className="text-2xl font-bold">Top users</h1>
          <Topuser />
        </div>
        <div className="rounded-lg border bg-background p-6">
          <h2 className="text-xl font-bold">Popular Blogs</h2>
          <Popularblogs />
        </div>
      </div>
    </div>
  );
};

export default RightSide;
