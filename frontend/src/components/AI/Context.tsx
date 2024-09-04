import { createContext } from "react";
import runChat from "../component/../AI/gemini";
import { useState, useEffect } from "react"; // Import useEffect hook
// @ts-ignore
export const Context = createContext();
const ContextProvider = (props: any) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevoisPrompt, setPrevoisPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [renderComplete, setRenderComplete] = useState(false); // New state to track rendering completion

  const delayPara = (formattedResponse: any) => {
    const words = formattedResponse.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const nextword = words[i];
      setTimeout(function () {
        setResultData((prev) => prev + nextword + " ");
        if (i === words.length - 1) {
          // If it's the last word
          setRenderComplete(true); // Set rendering completion to true
        }
      }, 75 * i);
    }
  };
  useEffect(() => {
    // Reset renderComplete state when input changes
    setRenderComplete(false);
  }, [input]);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };
  const defaultPromt = () => {
    setRenderComplete(false);

    setLoading(false);
    setShowResult(false);
  };
  const onSent = async (prompt: any) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    // setRelatedQuestions([]);

    // let question = await runChat(`give me 3 related question of ${prompt}`);
    // console.log(question);
    if (prompt !== undefined) {
      response = await runChat(
        `genrate blog with title and content for this ${prompt}`
      );
      // @ts-ignore
      setPrevoisPrompt((prev) => [...prev, prompt]);
      setRenderComplete(false);

      setRecentPrompt(prompt);
    } else {
      prompt = input; // Assign input to prompt if it's undefined
      // @ts-ignore

      setPrevoisPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(
        `genrate blog with title and content for this ${prompt}`
      );
    }

    // Format response for rendering
    let formattedResponse = response
      .replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: 600;">$1</span>')
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>") // Replace newline characters with <br/>
      .replace(/\* /g, "</li><ul><li>") // New bullet point for each main point
      .replace(/\*\* /g, '</li><ul><li><span style="font-weight: 400;">') // New sub-bullet point for each main point
      .replace(
        /(?:^|\n)\s*(\d+\.)(.*?)(?=\n|$)/g,
        '<li style="margin-left: 20px;">$1 $2</li>'
      );

    formattedResponse = `<ul style="list-style: none;">${formattedResponse}</ul>`;
    // const organizedRelatedQuestions = question.split('\n').map(q => q.trim()).filter(q => q !== '');
    // setRelatedQuestions(organizedRelatedQuestions);
    delayPara(formattedResponse);

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevoisPrompt,
    setPrevoisPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    defaultPromt,
    renderComplete, // Provide renderComplete to consumers
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
