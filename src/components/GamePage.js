// src/components/GamePage.jsx

import React from 'react';
import { motion } from 'framer-motion';

const GamePage = ({
  question,
  options,
  timer,
  selectedOptions,
  handleOptionClick,
  handleSubmit,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Timer */}
      <div className="bg-white shadow-md rounded-full px-6 py-2 text-lg font-semibold text-gray-700 mb-6">
        Time Left: {timer} sec
      </div>

      {/* Progress */}
      <div className="text-sm text-gray-500 mb-4">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>

      {/* Question */}
      <motion.h2
        className="text-2xl font-bold text-gray-800 mb-8 text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {question}
      </motion.h2>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg font-medium text-lg shadow-md transition ${
              selectedOptions.includes(option)
                ? 'bg-green-400 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-200'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Submit Button */}
      {selectedOptions.length > 0 && (
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg font-semibold shadow-md"
        >
          Submit Answer
        </motion.button>
      )}
    </motion.div>
  );
};

export default GamePage;


