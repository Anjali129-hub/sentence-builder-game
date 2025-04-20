import React, { useState, useEffect } from "react";
import GamePage from "./components/GamePage"; // ✅ Corrected import
import FeedbackScreen from "./components/FeedbackScreen";
import StartPage from "./components/StartPage";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showStartPage, setShowStartPage] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sentence-builder-game-2.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load questions", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {loading ? (
        <p className="text-xl text-gray-700">Loading questions...</p>
      ) : showStartPage ? (
        <StartPage onStart={() => setShowStartPage(false)} />
      ) : !showFeedback ? (
        <GamePage
          questions={questions}
          setShowFeedback={setShowFeedback}
          setUserAnswers={setUserAnswers}
        />
      ) : (
        <FeedbackScreen questions={questions} userAnswers={userAnswers} />
      )}
    </div>
  );
}

export default App;
