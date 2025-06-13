
import React, { useState } from 'react';
import { ChevronRight, Clock, Star } from 'lucide-react';

interface QuizCardProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  questions: number;
  rating: number;
  onStart: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  difficulty,
  duration,
  questions,
  rating,
  onStart,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  };

  return (
    <div
      className="quiz-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onStart}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{duration}</span>
        </div>
        <span>{questions} questions</span>
        <div className="flex items-center space-x-1">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span>{rating}</span>
        </div>
      </div>
      
      <button className={`w-full quiz-button flex items-center justify-center space-x-2 ${
        isHovered ? 'transform scale-105' : ''
      }`}>
        <span>Start Quiz</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default QuizCard;
