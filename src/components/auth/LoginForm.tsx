import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Lock, Mail } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password. Please check your credentials and try again.');
      
      // Show notification for error
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Quiz App', { body: 'Sign in failed. Please check your credentials.' });
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="glass-card p-10 rounded-3xl shadow-2xl card-3d">
        <div className="text-center mb-10">
          <div className="w-20 h-20 quiz-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl pulse-glow">
            <User className="text-white" size={40} />
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-4">Welcome Back</h2>
          <p className="text-gray-600 text-lg">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" size={22} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modern-input pl-14"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" size={22} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modern-input pl-14"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full quiz-button-3d disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-8">
          <button
            onClick={onToggleMode}
            className="text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 hover:underline text-lg"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
