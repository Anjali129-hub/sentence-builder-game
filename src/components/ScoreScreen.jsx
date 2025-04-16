import React from 'react';

const ScoreScreen = ({ score, total, onRestart }) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-green-600">Game Over!</h2>
      <p className="text-xl text-gray-700">You scored {score} out of {total}</p>
      <p className="text-sm text-gray-500">
        {score === total
          ? 'Perfect! You got all answers correct.'
          : score >= total / 2
          ? 'Great job! You did well.'
          : 'Keep practicing, you’ll get better!'}
      </p>
      <button
        onClick={onRestart}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Restart Game
      </button>
    </div>
  );
};

export default ScoreScreen;


