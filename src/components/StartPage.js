import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StartGame = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-600">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full text-center">
        {/* Title with animation */}
        <motion.h1
          className="text-5xl font-extrabold text-blue-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sentence Construction Game
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Select the correct words to fill in the blanks and form meaningful sentences.
        </motion.p>

        {/* Start Button with hover effects */}
        <motion.button
          onClick={handleStart}
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
        </motion.button>
      </div>
    </div>
  );
};

export default StartGame;
