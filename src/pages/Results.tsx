import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';
import ProgressChart from '../components/ProgressChart';
import { useAuth } from '../contexts/AuthContext';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { score, total, answers, questions, quizTitle } = location.state || {};


  if (!score && score !== 0) {
    navigate('/');
    return null;
  }

  const percentage = Math.round((score / total) * 100);
  const chartData = [
    { name: 'Correct', value: score },
    { name: 'Incorrect', value: total - score },
  ];

  const getGradeMessage = () => {
    if (percentage >= 90) return { message: "Outstanding!", color: "text-green-600", emoji: "🎉" };
    if (percentage >= 80) return { message: "Great job!", color: "text-blue-600", emoji: "👏" };
    if (percentage >= 70) return { message: "Good work!", color: "text-yellow-600", emoji: "👍" };
    if (percentage >= 60) return { message: "Not bad!", color: "text-orange-600", emoji: "💪" };
    return { message: "Keep practicing!", color: "text-red-600", emoji: "📚" };
  };

  const grade = getGradeMessage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Congratulations Section */}
      <div className="text-center mb-8">
        <div className="quiz-gradient w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <p className="text-xl text-gray-600">{grade.emoji} {grade.message}</p>
      </div>

      {/* Score Display */}
      <div className="quiz-card p-8 text-center mb-8">
        <div className="text-6xl font-bold quiz-gradient bg-clip-text text-transparent mb-4">
          {percentage}%
        </div>
        <div className="text-2xl text-gray-700 mb-2">
          {score} out of {total} correct
        </div>
        <div className="flex items-center justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={24}
              className={`${
                i < Math.floor(percentage / 20)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Chart */}
        <div className="quiz-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Breakdown</h3>
          <ProgressChart type="pie" data={chartData} />
        </div>

        {/* Question Review */}
        <div className="quiz-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {questions?.map((question: any, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  answers[index] === question.correct
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Question {index + 1}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    answers[index] === question.correct
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {answers[index] === question.correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {question.question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate('/quiz')}
          className="quiz-button flex items-center justify-center space-x-2"
        >
          <RotateCcw size={20} />
          <span>Retake Quiz</span>
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default Results;
