import useProgress from "./useProgress";
import { useContext, useEffect } from "react";
import { TriviaContext } from "../context/TriviaContext";
import { Base64 } from "js-base64";

export default function useTrivia() {
  const {
    questionsData,
    setQuestionsData,
    currentQuestion,
    setCurrentQuestion,
  } = useContext(TriviaContext);

  const decodeBase64 = (data) => {
    return Base64.decode(data);
  };

  const answer = (alternative) => {
    setCurrentQuestion((question) => {
      const newQuestion = { ...question };
      newQuestion.answer = alternative;
      return newQuestion;
    });
  };

  useEffect(() => {
    if (questionsData.length === 0) return;
    !currentQuestion.question && console.log("AAAA");
    !currentQuestion.question && nextQuestion();
  }, [questionsData]);

  function nextQuestion() {
    if (questionsData.length < 1) return;
    const encodedQuestion = questionsData[0];
    const encodedQuestionEntries = Object.entries(encodedQuestion);
    const decodedQuestion = Object.fromEntries(
      encodedQuestionEntries.map(([key, value]) => {
        if (key !== "incorrect_answers") return [key, decodeBase64(value)];

        const decodedValue = value.map((data) => {
          return decodeBase64(data);
        });

        return [key, decodedValue];
      })
    );
    setCurrentQuestion({ ...decodedQuestion, answer: undefined });
    setQuestionsData((prev) => {
      const prevCopy = [...prev];
      prevCopy.shift();
      return prevCopy;
    });
  }
  const progress = useProgress(nextQuestion, 10, 0, 1000);
  return [currentQuestion, progress, answer];
}
