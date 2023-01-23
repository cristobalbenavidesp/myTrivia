import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
export const ScoreContext = createContext();

function ScoreContextProvider({ children }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useLocalStorage("highScore", 0);

  const score = () => {
    if (currentScore + 1 > highScore) setHighScore(currentScore + 1);
    setCurrentScore((prevScore) => prevScore + 1);
  };

  const resetScore = () => {
    setCurrentScore(0);
  };

  const value = {
    currentScore,
    highScore,
    score,
    resetScore,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

export default ScoreContextProvider;
