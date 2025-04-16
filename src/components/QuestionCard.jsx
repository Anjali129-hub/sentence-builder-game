import React, { useState } from 'react';

const QuestionCard = ({ question, onAnswer }) => {
  const [selectedWords, setSelectedWords] = useState([]);

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      // Deselect the word
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else if (selectedWords.length < question.correctAnswer.length) {
      // Add the word to next blank
      setSelectedWords([...selectedWords, word]);
    }
  };

  const renderSentence = () => {
    const parts = question.question.split('_____________');
    return parts.map((part, index) => (
      <span key={index} className="text-lg">
        {part}
        {index < question.correctAnswer.length && (
          <span className="mx-1 font-semibold underline text-blue-600">
            {selectedWords[index] || '_____'}
          </span>
        )}
      </span>
    ));
  };

  const handleSubmit = () => {
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(question.correctAnswer);
    onAnswer(isCorrect);
    setSelectedWords([]);
  };

  return (
    <div className="text-center">
      {/* Sentence with blanks */}
      <div className="mb-6 text-lg leading-8">{renderSentence()}</div>

      {/* Word option buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {question.options.map((word, index) => (
          <button
            key={index}
            onClick={() => handleWordClick(word)}
            className={`px-4 py-2 rounded-full border text-sm md:text-base transition-all duration-200 ${
              selectedWords.includes(word)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-blue-300'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={selectedWords.length !== question.correctAnswer.length}
        className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuestionCard;

