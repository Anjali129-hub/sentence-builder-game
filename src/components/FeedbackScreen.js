import React from "react";

const FeedbackScreen = ({ questions, userAnswers }) => {
  const getQuestionById = (id) => questions.find((q) => q.questionId === id);

  const correctCount = userAnswers.filter((ans) => ans.correct).length;

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Game Over!</h1>
      <p className="text-lg mb-6">
        You scored {correctCount} out of {questions.length}
      </p>

      {userAnswers.map((ans, idx) => {
        const question = getQuestionById(ans.questionId);
        return (
          <div key={idx} className="mb-4 p-4 border rounded">
            <p className="font-semibold mb-2">{question.question}</p>
            <p className="mb-1">
              <strong>Your Answer:</strong>{" "}
              {ans.selected.length > 0 ? ans.selected.join(" ") : "No answer"}
            </p>
            <p className="mb-1">
              <strong>Correct Answer:</strong> {question.correctAnswer.join(" ")}
            </p>
            <p>{ans.correct ? "✅ Correct" : "❌ Incorrect"}</p>
          </div>
        );
      })}

      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Restart Game
      </button>
    </div>
  );
};

export default FeedbackScreen;

