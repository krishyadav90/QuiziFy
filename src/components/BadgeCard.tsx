import React from 'react';
import { Star, Award, Trophy } from 'lucide-react';

interface BadgeCardProps {
  title: string;
  description: string;
  type: 'bronze' | 'silver' | 'gold';
  earned: boolean;
  progress?: number;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ title, description, type, earned, progress = 0 }) => {
  const iconMap = {
    bronze: Award,
    silver: Star,
    gold: Trophy,
  };

  const colorMap = {
    bronze: earned ? 'text-orange-500' : 'text-gray-400',
    silver: earned ? 'text-gray-500' : 'text-gray-400',
    gold: earned ? 'text-yellow-500' : 'text-gray-400',
  };

  const bgMap = {
    bronze: earned ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200',
    silver: earned ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-200',
    gold: earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200',
  };

  const Icon = iconMap[type];

  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${bgMap[type]} ${earned ? 'hover:shadow-lg' : ''}`}>
      <div className="flex items-center space-x-3 mb-2">
        <Icon size={24} className={colorMap[type]} />
        <h3 className={`font-semibold ${earned ? 'text-gray-900' : 'text-gray-500'}`}>{title}</h3>
      </div>
      <p className={`text-sm mb-3 ${earned ? 'text-gray-600' : 'text-gray-400'}`}>{description}</p>
      
      {!earned && progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
          <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
        </div>
      )}
      
      {earned && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Earned
        </span>
      )}
    </div>
  );
};

export default BadgeCard;
