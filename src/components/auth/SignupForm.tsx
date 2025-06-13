
import React, { useState } from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { User, Lock, Mail, Users } from 'lucide-react';

interface SignupFormProps {
  onToggleMode: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('personal');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await signup(email, password, name, role);
    if (!success) {
      setError('Unable to create account. User with this email may already exist.');
      
      // Show notification for error
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Quiz App', { body: 'Account creation failed. Please try again.' });
      }
    } else {
      // Show success notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Quiz App', { body: 'Account created! Please check your email to confirm.' });
      }
    }
    setLoading(false);
  };

  const roleOptions = [
    { value: 'teacher', label: 'Teacher', icon: Users },
    { value: 'student', label: 'Student', icon: User },
    { value: 'personal', label: 'Personal', icon: User },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="glass-card p-10 rounded-3xl shadow-2xl card-3d">
        <div className="text-center mb-10">
          <div className="w-20 h-20 quiz-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl pulse-glow">
            <User className="text-white" size={40} />
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-4">Create Account</h2>
          <p className="text-gray-600 text-lg">Join our modern quiz platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <User className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" size={22} />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modern-input pl-14"
              required
            />
          </div>

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
              placeholder="Password (minimum 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modern-input pl-14"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-5">Choose your role</label>
            <div className="grid grid-cols-1 gap-4">
              {roleOptions.map((option) => (
                <label key={option.value} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={role === option.value}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="sr-only"
                  />
                  <div className={`flex items-center p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    role === option.value 
                      ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 shadow-xl scale-105' 
                      : 'border-gray-200/50 bg-white/70 backdrop-blur-sm hover:border-purple-300 hover:bg-white/90'
                  }`}>
                    <div className={`p-3 rounded-xl ${role === option.value ? 'bg-purple-100' : 'bg-gray-100'}`}>
                      <option.icon size={24} className={role === option.value ? 'text-purple-600' : 'text-gray-500'} />
                    </div>
                    <div className="ml-4">
                      <span className={`text-lg font-semibold ${role === option.value ? 'text-purple-700' : 'text-gray-700'}`}>
                        {option.label}
                      </span>
                      <p className={`text-sm ${role === option.value ? 'text-purple-600' : 'text-gray-500'}`}>
                        {option.value === 'teacher' && 'Create and manage quizzes'}
                        {option.value === 'student' && 'Join and take quizzes'}
                        {option.value === 'personal' && 'Individual quiz practice'}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
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
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="text-center mt-8">
          <button
            onClick={onToggleMode}
            className="text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 hover:underline text-lg"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
