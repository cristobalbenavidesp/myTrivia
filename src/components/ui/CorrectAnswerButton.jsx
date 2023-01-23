import React from "react";

function CorrectAnswerButton({ children, handleClick }) {
  return (
    <button
      className="bg-white rounded-xl p-4 text-lg lg:text-xl w-1/2 font-semibold border-4 border-green-600"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default CorrectAnswerButton;
