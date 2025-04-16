import React, { useState } from "react";
import { motion } from 'framer-motion';

const Game = ({ questions }) => {
  const [difficulty, setDifficulty] = useState("easy"); // Difficulty state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);  // To show feedback after game ends

  // Filter questions based on selected difficulty
  const filteredQuestions = questions.filter((question) => question.difficulty === difficulty);
  const currentQuestion = filteredQuestions[currentIndex] || questions[0]; // Fallback to first question

  // Difficulty change handler
  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    setCurrentIndex(0);  // Reset to first question when difficulty changes
  };

  if (!questions || questions.length === 0) {
    return <p>Game data is not available</p>;
  }

  const handleWordClick = (word) => {
    if (!answerSubmitted && selectedWords.length < currentQuestion.correctAnswer.length) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    const correct =
      JSON.stringify(selectedWords) === JSON.stringify(currentQuestion.correctAnswer);
    const answerRecord = {
      questionId: currentQuestion.questionId,
      selected: selectedWords,
      correct: correct,
    };

    setAnswers((prev) => [...prev, answerRecord]);
    setAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedWords([]);
      setAnswerSubmitted(false);
    } else {
      console.log("Game Over! Display feedback.");
      setShowFeedback(true); // Show feedback after game ends
    }
  };

  return (
    <div>
      {/* Difficulty Selection */}
      <div className="mb-4">
        <button onClick={() => handleDifficultyChange("easy")} className="mr-2 p-2 border bg-blue-500 text-white">Easy</button>
        <button onClick={() => handleDifficultyChange("medium")} className="mr-2 p-2 border bg-yellow-500 text-white">Medium</button>
        <button onClick={() => handleDifficultyChange("hard")} className="mr-2 p-2 border bg-red-500 text-white">Hard</button>
      </div>

      {/* Feedback Screen */}
      {showFeedback ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Game Over!</h2>
          <p>Your score: {answers.filter((answer) => answer.correct).length} / {filteredQuestions.length}</p>
          <div>
            {answers.map((answer, idx) => (
              <div key={idx}>
                <p>Question {answer.questionId}: {answer.selected.join(" ")}</p>
                <p>Correct answer: {currentQuestion.correctAnswer.join(" ")}</p>
                <p>{answer.correct ? "Correct" : "Incorrect"}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded shadow-md w-full max-w-2xl"
        >
          <h2 className="text-xl font-semibold mb-4">
            Question {currentIndex + 1} of {filteredQuestions.length}
          </h2>
          <p className="mb-4">{currentQuestion.question}</p>

          {/* Display selected words */}
          <div className="mb-4">
            {selectedWords.map((word, idx) => (
              <span
                key={idx}
                onClick={() => setSelectedWords(selectedWords.filter((w) => w !== word))}
                className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded mr-2 mb-2 cursor-pointer"
              >
                {word}
              </span>
            ))}
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleWordClick(option)}
                disabled={selectedWords.includes(option)}
                className={`py-2 px-4 rounded border ${
                  selectedWords.includes(option) ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Submit/Next button */}
          {!answerSubmitted ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Next Question
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Game;
