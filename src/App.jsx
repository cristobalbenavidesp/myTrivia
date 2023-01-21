import { useEffect, useState, useMemo } from "react";
import ProgressBar from "./components/ProgressBar";
import useTrivia from "./hooks/useTrivia";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [question, progress, answer] = useTrivia();
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useLocalStorage("highscore", 0);
  const [alternatives, setAlternatives] = useState([]);

  const score = () => {
    setCurrentScore((prev) => prev + 1);
  };

  const handleClick = (alternative) => {
    if (question.answer !== undefined) return;
    answer(alternative);
    alternative === question.correct_answer ? score() : setCurrentScore(0);
  };

  useEffect(() => {
    if (currentScore < highScore) return;
    setHighScore(currentScore);
  }, [currentScore]);

  useEffect(() => {
    question.question &&
      question.answer === undefined &&
      setAlternatives(
        [...question.incorrect_answers, question.correct_answer].sort(
          () => Math.random() - 0.5
        )
      );
  }, [question]);

  const answers = useMemo(() => {}, [question]);
  return (
    <div className="w-full h-[100vh] bg-gray-800 flex flex-col items-center">
      <h1 className="text-7xl font-extrabold text-white text-center max-w-[80%] mt-20">
        {question.question || "Loading..."}
      </h1>

      <div className="grid gap-4 mt-20 w-[50%] place-items-center">
        {alternatives.map((alternative) => {
          if (question.answer === alternative) {
            return alternative === question.correct_answer ? (
              <button
                key={alternative}
                onClick={() => {
                  handleClick(alternative);
                }}
                className="bg-white rounded p-4 w-1/2 text-xl font-semibold border-4 border-green-600"
              >
                {alternative}
              </button>
            ) : (
              <button
                key={alternative}
                onClick={() => {
                  handleClick(alternative);
                }}
                className="bg-white rounded p-4 w-1/2 text-xl font-semibold border-4 border-red-600"
              >
                {alternative}
              </button>
            );
          }
          return (
            <button
              key={alternative}
              onClick={() => {
                handleClick(alternative);
              }}
              className="bg-white rounded p-4 w-1/2 text-xl font-semibold"
            >
              {alternative}
            </button>
          );
        })}
      </div>

      <div className="w-1/2 mt-10">
        <ProgressBar progressPercentage={progress} />
      </div>

      <div className="flex gap-5 mt-20">
        <span className="font-bold text-white text-xl">
          Score: <output>{currentScore}</output>
        </span>
        <span className="font-bold text-white text-xl">
          Highscore: <output>{highScore}</output>
        </span>
      </div>
    </div>
  );
}

export default App;
