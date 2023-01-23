import React, { useState, useEffect } from "react";
import CorrectAnswerButton from "./ui/CorrectAnswerButton";
import IncorrectAnswerButton from "./ui/IncorrectAnswerButton";
import useTrivia from "../hooks/useTrivia";
import useScore from "../hooks/useScore";
function AlternativesGrid() {
  const [question, _, answer] = useTrivia();
  const [alternatives, setAlternatives] = useState([]);
  const [, , score, resetScore] = useScore();

  useEffect(() => {
    question.question &&
      question.answer === undefined &&
      setAlternatives(
        [...question.incorrect_answers, question.correct_answer].sort(
          () => Math.random() - 0.5
        )
      );
  }, [question]);

  const handleClick = (alternative) => {
    if (question.answer !== undefined) return;
    answer(alternative);
    alternative === question.correct_answer ? score() : resetScore();
  };

  return (
    <div className="grid gap-4 mt-20 w-[40em] lg:w-[50%] place-items-center">
      {alternatives.map((alternative) => {
        if (question.answer === alternative) {
          return alternative === question.correct_answer ? (
            <CorrectAnswerButton
              key={alternative}
              handleClick={() => {
                handleClick(alternative);
              }}
            >
              {alternative}
            </CorrectAnswerButton>
          ) : (
            <IncorrectAnswerButton
              key={alternative}
              handleClick={() => {
                handleClick(alternative);
              }}
            >
              {alternative}
            </IncorrectAnswerButton>
          );
        }
        return (
          <button
            key={alternative}
            onClick={() => {
              handleClick(alternative);
            }}
            className="bg-white rounded-xl p-4 w-1/2 text-xl font-semibold"
          >
            {alternative}
          </button>
        );
      })}
    </div>
  );
}

export default AlternativesGrid;
