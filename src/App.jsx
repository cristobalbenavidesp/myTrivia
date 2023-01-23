import { useEffect, useState } from "react";
import AlternativesGrid from "./components/AlternativesGrid";
import ProgressBar from "./components/ProgressBar";
import ScoreBar from "./components/ScoreBar";
import ScoreContextProvider from "./context/ScoreContext";
import useTrivia from "./hooks/useTrivia";

function App() {
  const [question, progress] = useTrivia();

  return (
    <div className="w-full h-[100vh] bg-gray-800 flex flex-col items-center overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl md:text-5xl xl:text-7xl font-extrabold text-white text-center max-w-[80%] mt-20">
        {question.question || "Loading..."}
      </h1>
      <ScoreContextProvider>
        <AlternativesGrid />
        <div className="w-[20rem] lg:w-1/4 mt-10">
          <ProgressBar progressPercentage={progress} />
        </div>

        <ScoreBar />
      </ScoreContextProvider>
    </div>
  );
}

export default App;
