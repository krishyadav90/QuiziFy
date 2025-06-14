import React from 'react';
import ProgressChart from '../components/ProgressChart';
import BadgeCard from '../components/BadgeCard';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';

const Dashboard = () => {
  const performanceData = [
    { name: 'Correct', value: 75 },
    { name: 'Incorrect', value: 25 },
  ];

  const progressData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 7 },
    { name: 'Wed', value: 5 },
    { name: 'Thu', value: 9 },
    { name: 'Fri', value: 6 },
    { name: 'Sat', value: 8 },
    { name: 'Sun', value: 3 },
  ];

  const badges = [
    {
      title: 'First Quiz',
      description: 'Complete your first quiz',
      type: 'bronze' as const,
      earned: true,
    },
    {
      title: 'Perfect Score',
      description: 'Score 100% on any quiz',
      type: 'gold' as const,
      earned: true,
    },
    {
      title: 'Quiz Master',
      description: 'Complete 10 quizzes',
      type: 'silver' as const,
      earned: false,
      progress: 60,
    },
    {
      title: 'Speed Demon',
      description: 'Complete a quiz in under 2 minutes',
      type: 'bronze' as const,
      earned: false,
      progress: 0,
    },
  ];

  const stats = [
    {
      title: 'Total Score',
      value: '1,247',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Quizzes Completed',
      value: '23',
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Time Spent',
      value: '12h 30m',
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Badges Earned',
      value: '8',
      icon: Award,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="quiz-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Chart */}
        <div className="quiz-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Performance</h3>
          <ProgressChart type="pie" data={performanceData} />
        </div>

        {/* Weekly Progress */}
        <div className="quiz-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
          <ProgressChart type="bar" data={progressData} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
