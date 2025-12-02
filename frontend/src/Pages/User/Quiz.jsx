import { useGetQuiz } from '@/hooks/Quiz/quiz.hook';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { quizId } = useParams();
  const { data, isLoading, isError, error } = useGetQuiz(quizId);
  console.log(data)
  
  // State to store user's selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Handle answer selection
  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  // Calculate score and show results
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let correctCount = 0;
    data.quiz.questions.forEach(question => {
      if (selectedAnswers[question._id] === question.correctOption) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading quiz...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  const questions = data?.quiz?.questions || [];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quiz</h1>
        <p className="text-gray-600">
          Answer all questions and submit to see your score
        </p>
        <div className="mt-2 text-sm text-gray-500">
          Progress: {answeredCount}/{totalQuestions} questions answered
        </div>
      </div>

      {/* Results Screen */}
      {showResults ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Your Score: {score}/{totalQuestions}
          </h2>
          <p className="text-xl mb-6">
            {score === totalQuestions
              ? '🎉 Perfect Score!'
              : score >= totalQuestions * 0.7
              ? '👍 Great Job!'
              : score >= totalQuestions * 0.5
              ? '👌 Good Effort!'
              : '📚 Keep Learning!'}
          </p>
          
          {/* Show answers breakdown */}
          <div className="mt-8 text-left space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Review Answers</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[question._id];
              const isCorrect = userAnswer === question.correctOption;
              
              return (
                <div
                  key={question._id}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="font-semibold">Q{index + 1}.</span>
                    <p className="font-medium">{question.content}</p>
                  </div>
                  <div className="ml-6 text-sm space-y-1">
                    <p>
                      <span className="font-semibold">Your answer:</span>{' '}
                      <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {userAnswer}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p>
                        <span className="font-semibold">Correct answer:</span>{' '}
                        <span className="text-green-600">{question.correctOption}</span>
                      </p>
                    )}
                    {question.explanation && (
                      <p className="mt-2 text-gray-700">
                        <span className="font-semibold">Explanation:</span> {question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setShowResults(false);
              setSelectedAnswers({});
              setScore(0);
            }}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        /* Quiz Form */
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, index) => (
            <div key={question._id} className="bg-white rounded-lg shadow-md p-6">
              {/* Question */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Question {index + 1} of {totalQuestions}
                </h3>
                <p className="mt-2 text-gray-800">{question.content}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedAnswers[question._id] === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={selectedAnswers[question._id] === option}
                      onChange={() => handleAnswerSelect(question._id, option)}
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <span className="flex-1">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={answeredCount < totalQuestions}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
                answeredCount < totalQuestions
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {answeredCount < totalQuestions
                ? `Answer all questions (${answeredCount}/${totalQuestions})`
                : 'Submit Quiz'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Quiz;
