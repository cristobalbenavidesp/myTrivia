import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const TriviaContext = createContext();

function TriviaContextProvider({ children }) {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});

  useEffect(() => {
    if (questionsData.length > 10) return;

    const abortController = new AbortController();
    fetch("https://opentdb.com/api.php?amount=40&encode=base64", {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((resJSON) => {
        setQuestionsData([...questionsData, ...resJSON.results]);
      })
      .catch((err) => {
        if (err.name === "Cleanup") return;
      });

    return () => {
      abortController.abort("Cleanup");
    };
  }, [questionsData]);

  const value = {
    questionsData,
    setQuestionsData,
    currentQuestion,
    setCurrentQuestion,
  };

  return (
    <TriviaContext.Provider value={value}>{children}</TriviaContext.Provider>
  );
}

export default TriviaContextProvider;
