import useScore from "../hooks/useScore";

function ScoreBar() {
  const [currentScore, highScore] = useScore();

  return (
    <div className="flex gap-5 mt-20">
      <span className="font-bold text-white text-xl">
        Score: <output className="font-normal">{currentScore}</output>
      </span>
      <span className="font-bold text-white text-xl">
        Highscore: <output className="font-normal">{highScore}</output>
      </span>
    </div>
  );
}

export default ScoreBar;
