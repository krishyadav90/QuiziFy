import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Settings, Users, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    const baseItems = [
      { name: 'Home', path: '/', icon: Home },
    ];

    if (!isAuthenticated) {
      return baseItems;
    }

    const roleBasedItems = {
      teacher: [
        { name: 'Teacher Dashboard', path: '/teacher-dashboard', icon: Users },
      ],
      student: [
        { name: 'Student Dashboard', path: '/student-dashboard', icon: BookOpen },
      ],
      personal: []
    };

    const userItems = user ? roleBasedItems[user.role] || [] : [];
    
    const commonItems = [
      { name: 'Profile', path: '/profile', icon: User },
      { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return [...baseItems, ...userItems, ...commonItems];
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 quiz-gradient rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="font-bold text-2xl gradient-text">QuizApp</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 button-3d ${
                  location.pathname === item.path
                     ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 shadow-xl scale-105'
                     : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-lg'
                 }`}
              >
                <item.icon size={22} />
                <span className="font-semibold">{item.name}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-6 ml-6 pl-6 border-l border-gray-200/50">
                 <div className="text-right">
                   <p className="font-semibold text-gray-900 dark:text-white text-lg">{user?.name}</p>
                   <p className="text-gray-500 dark:text-gray-400 capitalize text-sm">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 button-3d hover:shadow-lg"
                >
                  <LogOut size={20} />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="quiz-button-3d text-lg px-8 py-3"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></div>
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></div>
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></div>
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-purple-100 dark:border-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 ${
                location.pathname === item.path
                  ? 'bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="quiz-button-3d w-full justify-center"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
