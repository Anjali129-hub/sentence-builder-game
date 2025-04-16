import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/questions")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !gameFinished) {
      handleNextQuestion();
    }
  }, [gameStarted, timeLeft, gameFinished]);

  const handleOptionClick = (option) => {
    const updatedWords = [...selectedWords];
    const filledIndex = updatedWords.findIndex((word) => word === option);

    if (filledIndex !== -1) {
      updatedWords[filledIndex] = "";
    } else {
      const emptyIndex = updatedWords.findIndex((word) => word === "");
      if (emptyIndex !== -1) {
        updatedWords[emptyIndex] = option;
      }
    }

    setSelectedWords(updatedWords);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let correctAnswers = 0;

    selectedWords.forEach((word, index) => {
      if (word === currentQuestion.correctAnswer[index]) correctAnswers++;
    });

    // ✅ Give 1 score only if all 4 blanks are correct
    if (correctAnswers === 4) {
      setScore((prev) => prev + 1);
    }

    setFeedback((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: selectedWords,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: correctAnswers === 4,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedWords(["", "", "", ""]);
      setTimeLeft(30);
    } else {
      setGameFinished(true);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameFinished(false);
    setScore(0);
    setFeedback([]);
    setCurrentQuestionIndex(0);
    setSelectedWords(["", "", "", ""]);
    setTimeLeft(30);
  };

  const handlePlayAgain = () => {
    handleStartGame();
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <h1 className="text-4xl font-bold mb-4">Sentence Construction Game</h1>
        <p className="mb-6 text-lg text-gray-700">
          Select the correct words to fill in the blanks and form meaningful sentences.
        </p>
        <button
          onClick={handleStartGame}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 md:px-8 lg:px-16 overflow-y-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-indigo-800">
          🎉 Game Over!
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-center text-gray-800">
          Your Score: <span className="font-semibold text-indigo-700">{score}</span> /{" "}
          {questions.length}
        </p>

        <div className="w-full max-w-3xl space-y-4">
          {feedback.map((item, index) => (
            <motion.div
              key={index}
              className="p-4 md:p-5 border rounded-xl bg-white shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-base md:text-lg font-semibold mb-2 text-indigo-800">
                {index + 1}. {item.question}
              </h3>

              <p className="mb-1 text-sm md:text-base flex items-center gap-2">
                <strong>Result:</strong>
                {item.isCorrect ? (
                  <span className="text-green-600 flex items-center gap-1">
                    ✅ Correct
                    <CheckCircle className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1">
                    ❌ Incorrect
                    <XCircle className="w-4 h-4" />
                  </span>
                )}
              </p>

              <p className="mb-1 text-sm md:text-base">
                <strong>Your Answer:</strong>{" "}
                <span className="font-medium">{item.userAnswer.join(", ")}</span>
              </p>

              {!item.isCorrect && (
                <p className="mb-1 text-sm md:text-base">
                  <strong>Correct Answer:</strong>{" "}
                  <span className="font-semibold text-blue-600">
                    {item.correctAnswer.join(", ")}
                  </span>
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayAgain}
          className="mt-8 bg-indigo-600 text-white px-6 py-3 text-sm md:text-base rounded-lg hover:bg-indigo-700 transition"
        >
          🔁 Play Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Sentence Construction Game</h1>

      <div className="mb-8 p-4 border rounded-lg bg-white">
        <h2 className="mb-4 text-lg">
          {currentQuestion?.question?.split("____________").map((part, index) => (
            <span key={index}>
              {part}
              {selectedWords[index] && (
                <span className="font-semibold">{selectedWords[index]}</span>
              )}
              {index < 3 && selectedWords[index] === "" && " _____ "}
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`p-2 rounded-lg font-semibold ${
                selectedWords.includes(option)
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xl mb-4">Time Left: {timeLeft}s</p>
        {selectedWords.every((word) => word !== "") && (
          <button
            onClick={handleNextQuestion}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default App;



