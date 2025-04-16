import React, { useState } from "react";

const Game = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);

  if (!questions || questions.length === 0) {
    return <p>Game data is not available</p>;
  }

  const currentQuestion = questions[currentIndex];

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
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedWords([]);
      setAnswerSubmitted(false);
    } else {
      console.log("Game Over! Display feedback.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="mb-4">{currentQuestion.question}</p>

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

      <div className="grid grid-cols-2 gap-4 mb-4">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleWordClick(option)}
            disabled={selectedWords.includes(option)}
            className={`py-2 px-4 rounded border ${
              selectedWords.includes(option) ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

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
    </div>
  );
};

export default Game;
