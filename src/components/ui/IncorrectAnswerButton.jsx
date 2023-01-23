import React from "react";

function IncorrectAnswerButton({ handleClick, children }) {
  return (
    <button
      className="bg-white rounded-xl p-4 w-1/2 text-xl font-semibold border-4 border-red-600"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default IncorrectAnswerButton;
