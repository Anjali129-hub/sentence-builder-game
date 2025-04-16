import React, { useState, useEffect } from "react";
import { questions } from "./db"; // Assuming you're importing your questions from db.json

const GamePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // For current question
  const [answered, setAnswered] = useState(false);  // To track if the question is answered
  const [selectedAnswers, setSelectedAnswers] = useState([]);  // To track selected answers
  const [score, setScore] = useState(0);  // To track the score
  const [showFeedback, setShowFeedback] = useState(false);  // To display feedback screen
  const [userAnswers, setUserAnswers] = useState([]);  // To track user answers for feedback screen

  // Handle selecting answers (add to selectedAnswers state)
  const handleSelectAnswer = (option) => {
    if (!answered) {
      setSelectedAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers, option];
        return newAnswers;
      });
    }
  };

  // Handle submit button click
  const handleAnswerSubmit = () => {
    const correctAnswers = questions[currentQuestionIndex].correctAnswer;
    const userAnswer = selectedAnswers;

    // Check if the answer is correct
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswers);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Store the user answer and whether it was correct or not
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: questions[currentQuestionIndex].question,
        userAnswer,
        correctAnswer: correctAnswers,
        isCorrect,
      },
    ]);

    // Set answered to true and show the next button
    setAnswered(true);
  };

  // Handle next button click (move to next question or show feedback)
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setAnswered(false); // Reset the answered state
      setSelectedAnswers([]); // Reset selected answers
    } else {
      setShowFeedback(true); // Show feedback screen after all questions are answered
    }
  };

  // Render options for the current question
  const renderOptions = () => {
    return questions[currentQuestionIndex].options.map((option, index) => (
      <button
        key={index}
        onClick={() => handleSelectAnswer(option)}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${answered ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={answered}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="container mx-auto">
      {!showFeedback ? (
        <>
          <div className="text-xl mb-4">
            <p>Time Left: {/* Implement timer here */} </p>
            <p>
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="mb-4">
            <p>{questions[currentQuestionIndex].question}</p>
            <div className="space-y-2 mt-4">{renderOptions()}</div>
          </div>

          <div className="mt-4">
            {!answered ? (
              <button
                onClick={handleAnswerSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded"
                disabled={selectedAnswers.length === 0}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Next Question
              </button>
            )}
          </div>
        </>
      ) : (
        // Feedback screen after the game ends
        <div className="feedback-screen">
          <h1 className="text-2xl font-bold">Game Over</h1>
          <p className="mt-2">Your score: {score} / {questions.length}</p>

          <div className="mt-4">
            <h2 className="font-semibold">Your Answers:</h2>
            {userAnswers.map((answer, index) => (
              <div key={index} className="mt-2">
                <p>{answer.question}</p>
                <p className="text-sm">Your Answer: {answer.userAnswer.join(", ")}</p>
                <p className={`text-sm ${answer.isCorrect ? "text-green-500" : "text-red-500"}`}>
                  {answer.isCorrect ? "Correct!" : `Incorrect! Correct Answer: ${answer.correctAnswer.join(", ")}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
