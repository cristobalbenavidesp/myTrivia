import { ScoreContext } from "../context/ScoreContext";
import { useContext } from "react";

function useScore() {
  const { currentScore, highScore, score, resetScore } =
    useContext(ScoreContext);
  return [currentScore, highScore, score, resetScore];
}

export default useScore;
