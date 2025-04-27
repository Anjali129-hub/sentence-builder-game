import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://sentence-builder-game-2.onrender.com/questions");
        if (!res.ok) throw new Error("Failed to fetch questions.");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load game questions.");
      } finally {
        setLoading(false); 
      }
    };
  
    fetchQuestions();
  }, []);
  

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  const currentQuestion = filteredQuestions[currentIndex];

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    setCurrentIndex(0);
    setSelectedWords([]);
    setAnswerSubmitted(false);
    setAnswers([]);
    setShowFeedback(false);
  };

  const handleWordClick = (word) => {
    if (!answerSubmitted && selectedWords.length < currentQuestion.correctAnswer.length) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleWordUnselect = (word) => {
    setSelectedWords(selectedWords.filter((w) => w !== word));
  };

  const handleSubmit = () => {
    const correct = JSON.stringify(selectedWords) === JSON.stringify(currentQuestion.correctAnswer);
    const answerRecord = {
      questionId: currentQuestion.questionId,
      question: currentQuestion.question,
      selected: selectedWords,
      correctAnswer: currentQuestion.correctAnswer,
      correct,
    };
    setAnswers([...answers, answerRecord]);
    setAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedWords([]);
      setAnswerSubmitted(false);
    } else {
      setShowFeedback(true);
    }
  };

  return (
    <div className="p-4">
      {/* Difficulty selection */}
      <div className="mb-4 flex gap-2">
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`px-4 py-2 rounded text-white capitalize ${
              level === "easy" ? "bg-green-500" :
              level === "medium" ? "bg-yellow-500" : "bg-red-500"
            } ${difficulty === level ? "ring-2 ring-black" : ""}`}
          >
            {level}
          </button>
        ))}
      </div>

      {showFeedback ? (
        <div className="bg-white p-6 rounded shadow w-full max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Game Over!</h2>
          <p className="mb-4">
            Your Score: {answers.filter((a) => a.correct).length} / {filteredQuestions.length}
          </p>
          {answers.map((ans, i) => (
            <div key={i} className="mb-4 border-t pt-2">
              <p className="font-medium">{ans.question}</p>
              <p>
                <span className="font-semibold">Your Answer:</span> {ans.selected.join(" ")}
              </p>
              <p>
                <span className="font-semibold">Correct Answer:</span> {ans.correctAnswer.join(" ")}
              </p>
              <p className={ans.correct ? "text-green-600" : "text-red-600"}>
                {ans.correct ? "Correct ✅" : "Incorrect ❌"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded shadow w-full max-w-2xl mx-auto"
        >
          <h2 className="text-xl font-bold mb-2">
            Question {currentIndex + 1} of {filteredQuestions.length}
          </h2>
          <p className="mb-4">{currentQuestion.question}</p>

          {/* Selected Words */}
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedWords.map((word, idx) => (
              <span
                key={idx}
                onClick={() => handleWordUnselect(word)}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer"
              >
                {word}
              </span>
            ))}
          </div>

          {/* Option Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleWordClick(opt)}
                disabled={selectedWords.includes(opt)}
                className={`py-2 px-4 rounded border transition ${
                  selectedWords.includes(opt)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Submit / Next */}
          {!answerSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedWords.length !== currentQuestion.correctAnswer.length}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
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

export default GamePage;

