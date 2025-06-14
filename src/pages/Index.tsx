import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { quizTopics } from '../data/quizQuestions';


const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center transition-colors duration-300">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 dark:bg-purple-400/10 rounded-full blur-xl floating-animation"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white/15 dark:bg-blue-400/10 rounded-full blur-2xl floating-animation" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-40 w-40 h-40 bg-white/10 dark:bg-indigo-400/10 rounded-full blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/25 dark:bg-purple-400/15 rounded-full blur-xl floating-animation" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 drop-shadow-2xl">
              Test Your <span className="text-yellow-300 dark:text-yellow-400">Knowledge</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 dark:text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Challenge yourself with our interactive quizzes and discover how much you really know!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button
                onClick={() => navigate('/quiz')}
                className="bg-white text-gray-800 hover:bg-gray-100 dark:bg-white dark:hover:bg-gray-100 font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-3xl text-lg sm:text-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl transform hover:-translate-y-1"
              >
                🚀 Start Quiz Now
              </button>
              <button
                onClick={() => navigate(user ? (user.role === 'teacher' ? '/teacher-dashboard' : user.role === 'student' ? '/student-dashboard' : '/dashboard') : '/auth')}
                className="border-2 border-white text-white hover:bg-white/20 dark:hover:bg-white/10 font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-3xl text-lg sm:text-xl transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                📊 View Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>


      {/* Featured Quizzes */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold gradient-text mb-6">Featured Quizzes</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our most popular quizzes and challenge yourself with questions across various topics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {quizTopics.map((quiz, index) => (
              <div
                key={index}
                className="quiz-card p-8 cursor-pointer card-3d group dark:bg-gray-800/50 dark:border dark:border-gray-700/50 dark:hover:border-purple-500/30"
                onClick={() => navigate(`/quiz?topic=${quiz.id}`)}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 quiz-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    <span className="text-white font-bold text-2xl">
                      {quiz.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{quiz.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 text-center leading-relaxed">{quiz.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <span className="font-semibold">⏱️ {quiz.duration}</span>
                  <span className="font-semibold">📋 {quiz.questions.length} questions</span>
                </div>
                <button className="w-full quiz-button text-lg py-4 hover:opacity-90 transition-opacity">
                  🎯 Start Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-16 h-16 quiz-gradient rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">Q</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold gradient-text">Quiz App</h3>
                <p className="text-gray-300 text-lg">Learn. Challenge. Grow.</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-300 text-lg">
                © 2025 Quiz App. All rights reserved.
              </p>
              <p className="text-gray-400 mt-2">
                Created with ❤️ by <span className="font-semibold text-purple-300">Krish Yadav</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
