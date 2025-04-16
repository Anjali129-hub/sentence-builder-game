import React from 'react';
import { useHistory } from 'react-router-dom';

const StartGame = () => {
  const history = useHistory();

  const handleStart = () => {
    history.push('/game');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Sentence Construction Game
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Select the correct words to fill in the blanks and form meaningful sentences.
        </p>
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartGame;
