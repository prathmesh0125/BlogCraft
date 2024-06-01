import  { useContext, useState } from "react";
import "../../styles/main.css";
import { FaMicrophone } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { Context } from "./Context";
// import Resources from "../AI/Resources";
import { HiMenuAlt2 } from "react-icons/hi";
import { HiSpeakerWave } from "react-icons/hi2";
import { GiMoebiusStar } from "react-icons/gi";
import { RiStackLine } from "react-icons/ri";
// import BottomStrip from "../AI/BottomStrip";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    renderComplete,
  }:any = useContext(Context);


  // // const [relatedQuestions, setRelatedQuestions] = useState([]);
  // const [defaultPrompt, setDefaultPrompt] = useState([
  //   "Provide an overview of Microsoft's business.",
  //   "Provide an overview of Microsoft's business.",
  //   "Provide an overview of Microsoft's business.",
  //   "How are you?",
  // ]);
  // const [animatedIndex, setAnimatedIndex] = useState(0);

  // useEffect(() => {
    // const interval = setInterval(() => {
    //   setAnimatedIndex((prevIndex) =>
    //     prevIndex < defaultPrompt.length - 1
    //       ? prevIndex + 1
    //       : defaultPrompt.length
    //   );
    // }, 500); // Adjust the interval time as needed

    // return () => clearInterval(interval);
  // }, []);
// 
  const [tooltipText, setTooltipText] = useState("Speak Loud");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipText("Speak Loud");
  };
  const handleKeyPress = (event:any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of submitting a form
      onSent();
      // handleSearch();
    }
  };

  return (
    <div className="main bg-[#f0f0f0]">
      <div className="main-container  ">
        {!showResult ? (
          <>
        
            
          </>
        ) : (
          <section className="Main-page grid  mt-4  gap-8 px-10 lg:px-52 p-2">
            <div className="result  bg-neutral-300 shadow-lg  rounded-lg transition-transform duration-300 ease-in-out px-6">
              <div className="result-title">
                <img src="images/user.jpg" alt="" />
                <p>{recentPrompt}</p>
              </div>
              {loading ? (
                ""
              ) : (
                <div>
                  {showResult && (
                    <div>
                      <p className="-mt-6 mb-3  text-black text-lg flex  items-center gap-1">
                        {" "}
                        <i className="text-2xl">
                          <HiMenuAlt2 />
                        </i>
                        Sources{" "}
                      </p>
                      {/* <Resources /> */}
                    </div>
                  )}
                </div>
              )}
              <div className="">
                {/* <img src="images/chankya.png" alt="" /> */}

                {loading ? (
                  <div className="flex result-data relative">
                    <i className="text-3xl rotate">
                      <GiMoebiusStar className="rotate-on-click" />
                    </i>
                    {/* {loading ? "" : <p>Answer</p>} */}
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  </div>
                ) : (
                  <div className="flex result-data relative">
                    <i
                      className="text-3xl"
                    >
                      <GiMoebiusStar className="rotate-on-click" />
                    </i>
                    <div>
                      <h1 className="text-lg font-medium">Answer</h1>
                      {/* <br/> */}
                      <div>
                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                      </div>
                    </div>
                    <div></div>
                    {showTooltip && (
                      <div className="tooltip absolute bg-white text-gray-500 px-3 py-0 rounded  -right-6 -top-4">
                        {" "}
                        {tooltipText}{" "}
                      </div>
                    )}

                    <HiSpeakerWave
                      className="copy-icon absolute right-3 top-3 cursor-pointer text-2xl"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                )}
              </div>
              {showResult && renderComplete && (
                <div className="relative rel-question overflow-hidden rounded-lg  bg-white mt-2 shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out mb-5">
                  <div className="section related-questions-section">
                    <h2 className="flex gap-2">
                      <i className="text-2xl">
                        <RiStackLine />
                      </i>
                      Related Questions
                    </h2>

                    <div className="related-questions-container">
                      {loading ? (
                        <div className="loader  text-black pl-4">
                          loading....{" "}
                        </div>
                      ) : (
                      <div>hi</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Card 4 */}
          </section>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              name=""
              id=""
              placeholder="Enter a prompt here"
              onKeyPress={handleKeyPress}
            />
            <div>
              <i>
                <MdOutlineAddPhotoAlternate />
              </i>
              <i>
                <FaMicrophone />
              </i>
              {input ? (
                <i
                  onClick={() => {
                    onSent();
                  }}
                >
                  <IoSendSharp />
                </i>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
