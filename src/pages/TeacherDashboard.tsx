
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Plus, Users, Clock, BarChart3, History, Share2, Image, Type, Trash2 } from 'lucide-react';
import { createQuizInDB } from '../lib/quizStorage';

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  timeLimit?: number;
  shareLink: string;
  attempts: QuizAttempt[];
  isActive: boolean;
  teacher_id?: string;
  is_public?: boolean;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  type: 'text' | 'image';
  imageUrl?: string;
}

interface QuizAttempt {
  id: string;
  studentName: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  answers: number[];
}

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [createdQuizLink, setCreatedQuizLink] = useState<string>('');

  useEffect(() => {
    if (user) {
      // Load quizzes with better error handling
      try {
        const savedQuizzes = JSON.parse(localStorage.getItem(`teacher_quizzes_${user.id}`) || '[]');
        setQuizzes(savedQuizzes);
      } catch (error) {
        console.error('Error loading teacher quizzes:', error);
        setQuizzes([]);
      }
    }
  }, [user, activeTab]);

  if (!user || user.role !== 'teacher') {
    return <Navigate to="/auth" replace />;
  }

  const saveQuizzes = (newQuizzes: Quiz[]) => {
    setQuizzes(newQuizzes);
    try {
      localStorage.setItem(`teacher_quizzes_${user.id}`, JSON.stringify(newQuizzes));
    } catch (error) {
      console.error('Error saving teacher quizzes:', error);
    }
  };

  const handleCreateQuiz = async (quizData: Omit<Quiz, 'id' | 'createdAt' | 'shareLink' | 'attempts'>) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      if (quizData.questions.length === 0) {
        throw new Error('Please add at least one question to the quiz');
      }

      // Prepare questions for database
      const questionsForDb = quizData.questions.map((q, index) => ({
        id: index + 1, // Generate sequential IDs
        question: q.question,
        options: q.options,
        correct: q.correct,
        type: q.type,
        imageUrl: q.imageUrl,
        // Add any other required fields here
      }));

      // First save to database
      const quizId = await createQuizInDB({
        title: quizData.title,
        description: quizData.description,
        timeLimit: quizData.timeLimit || 15, // Default to 15 minutes if not specified
        questions: questionsForDb,
        isActive: true
      }, user.id);

      if (!quizId) {
        throw new Error('Failed to create quiz in database');
      }

      // Then save to local state
      const newQuiz: Quiz = {
        ...quizData,
        id: quizId,
        teacher_id: user.id,
        is_public: true,
        createdAt: new Date(),
        shareLink: `${window.location.origin}/quiz/shared/${quizId}`,
        attempts: []
      };
      
      const updatedQuizzes = [...quizzes, newQuiz];
      saveQuizzes(updatedQuizzes);
      setActiveTab('overview');
      setCreatedQuizLink(newQuiz.shareLink);
      
      // Show success message with the share link
      alert(`Quiz created successfully!\n\nShare this link with your students:\n${newQuiz.shareLink}`);
      
    } catch (error: any) {
      console.error('Error creating quiz:', error);
      alert(`Failed to create quiz: ${error.message || 'Unknown error'}`);
    }
  };

  const toggleQuizStatus = (quizId: string) => {
    const updatedQuizzes = quizzes.map(quiz =>
      quiz.id === quizId ? { ...quiz, isActive: !quiz.isActive } : quiz
    );
    saveQuizzes(updatedQuizzes);
  };

  const deleteQuiz = (quizId: string) => {
    if (confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
      saveQuizzes(updatedQuizzes);
    }
  };

  const getQuizStats = () => {
    const totalQuizzes = quizzes.length;
    const totalAttempts = quizzes.reduce((acc, quiz) => acc + quiz.attempts.length, 0);
    const activeQuizzes = quizzes.filter(quiz => quiz.isActive).length;
    const avgScore = totalAttempts > 0 
      ? quizzes.reduce((acc, quiz) => 
          acc + quiz.attempts.reduce((sum, attempt) => sum + (attempt.score / attempt.totalQuestions), 0), 0
        ) / totalAttempts * 100
      : 0;

    return { totalQuizzes, totalAttempts, activeQuizzes, avgScore };
  };

  const stats = getQuizStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/90 backdrop-blur-sm shadow-xl h-screen sticky top-0">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 quiz-gradient rounded-lg flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <div>
                <h1 className="font-bold text-xl gradient-text">Teacher Portal</h1>
                <p className="text-sm text-gray-600">{user.name}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'create', label: 'Create Quiz', icon: Plus },
                { id: 'history', label: 'Quiz History', icon: History },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-purple-100 text-purple-700 shadow-lg'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Quizzes', value: stats.totalQuizzes, icon: BarChart3, color: 'purple' },
                  { label: 'Active Quizzes', value: stats.activeQuizzes, icon: Clock, color: 'green' },
                  { label: 'Total Attempts', value: stats.totalAttempts, icon: Users, color: 'blue' },
                  { label: 'Avg Score', value: `${stats.avgScore.toFixed(1)}%`, icon: BarChart3, color: 'orange' },
                ].map((stat, index) => (
                  <div key={index} className="sidebar-card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`text-${stat.color}-600`} size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Created Quiz Link */}
              {createdQuizLink && (
                <div className="sidebar-card p-6 mb-6 bg-green-50 border border-green-200">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Quiz Created Successfully! 🎉</h3>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-green-700">Share this link with students:</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={createdQuizLink}
                        readOnly
                        className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-lg text-sm"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(createdQuizLink);
                          alert('Link copied to clipboard!');
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-green-600">Students can access this quiz directly using this link</p>
                    <button
                      onClick={() => setCreatedQuizLink('')}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {/* Recent Quizzes */}
              <div className="sidebar-card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Quizzes</h3>
                <div className="space-y-4">
                  {quizzes.slice(-5).map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                        <p className="text-sm text-gray-600">{quiz.attempts.length} attempts</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleQuizStatus(quiz.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            quiz.isActive 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {quiz.isActive ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => setCreatedQuizLink(quiz.shareLink)}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                          title="Show share link"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <CreateQuizForm onSubmit={handleCreateQuiz} onCancel={() => setActiveTab('overview')} />
          )}

          {activeTab === 'history' && (
            <QuizHistory quizzes={quizzes} onToggleStatus={toggleQuizStatus} onDelete={deleteQuiz} />
          )}
        </div>
      </div>
    </div>
  );
};

// Create Quiz Form Component
const CreateQuizForm: React.FC<{
  onSubmit: (quiz: Omit<Quiz, 'id' | 'createdAt' | 'shareLink' | 'attempts'>) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    question: '',
    options: ['', '', '', ''],
    correct: 0,
    type: 'text'
  });

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.options?.every(opt => opt.trim())) {
      setQuestions([...questions, {
        ...currentQuestion,
        id: Date.now(),
        options: currentQuestion.options || ['', '', '', ''],
        correct: currentQuestion.correct || 0,
        type: currentQuestion.type || 'text'
      } as Question]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correct: 0,
        type: 'text'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && questions.length > 0) {
      onSubmit({
        title,
        description,
        questions,
        timeLimit: timeLimit > 0 ? timeLimit : undefined,
        isActive: true
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Create New Quiz</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="sidebar-card p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quiz Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                placeholder="0 for no limit"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Add Question Section */}
        <div className="sidebar-card p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Question</h3>
          
          <div className="space-y-4">
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setCurrentQuestion({...currentQuestion, type: 'text'})}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentQuestion.type === 'text' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                }`}
              >
                <Type size={16} />
                <span>Text Question</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentQuestion({...currentQuestion, type: 'image'})}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentQuestion.type === 'image' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                }`}
              >
                <Image size={16} />
                <span>Image Question</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <input
                type="text"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                placeholder="Enter your question"
              />
            </div>

            {currentQuestion.type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setCurrentQuestion({...currentQuestion, imageUrl: event.target?.result as string});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                />
                {currentQuestion.imageUrl && (
                  <div className="mt-2">
                    <img src={currentQuestion.imageUrl} alt="Preview" className="max-w-xs h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Options (Click to select correct answer)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={currentQuestion.correct === index}
                      onChange={() => setCurrentQuestion({...currentQuestion, correct: index})}
                      className="text-purple-600 w-4 h-4"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(currentQuestion.options || [])];
                        newOptions[index] = e.target.value;
                        setCurrentQuestion({...currentQuestion, options: newOptions});
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-200 ${
                        currentQuestion.correct === index 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200'
                      }`}
                      placeholder={`Option ${index + 1}`}
                    />
                    {currentQuestion.correct === index && (
                      <span className="text-green-600 text-sm font-medium">Correct</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={addQuestion}
              className="quiz-button-3d"
            >
              Add Question
            </button>
          </div>
        </div>

        {/* Questions List */}
        {questions.length > 0 && (
          <div className="sidebar-card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions ({questions.length})</h3>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{index + 1}. {question.question}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {question.options.map((option, optIndex) => (
                      <span
                        key={optIndex}
                        className={`px-2 py-1 rounded ${
                          question.correct === optIndex 
                            ? 'bg-green-100 text-green-700 font-medium' 
                            : 'bg-white text-gray-600'
                        }`}
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={!title || !description || questions.length === 0}
            className="quiz-button-3d disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Quiz
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Quiz History Component
const QuizHistory: React.FC<{
  quizzes: Quiz[];
  onToggleStatus: (quizId: string) => void;
  onDelete: (quizId: string) => void;
}> = ({ quizzes, onToggleStatus, onDelete }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Quiz History</h2>
      
      <div className="space-y-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="sidebar-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
                <p className="text-gray-600 mt-1">{quiz.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>{quiz.questions.length} questions</span>
                  <span>{quiz.attempts.length} attempts</span>
                  {quiz.timeLimit && <span>{quiz.timeLimit} min limit</span>}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onToggleStatus(quiz.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    quiz.isActive 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {quiz.isActive ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(quiz.shareLink)}
                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                  title="Copy share link"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(quiz.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete quiz"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {quiz.attempts.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Recent Attempts</h4>
                <div className="space-y-2">
                  {quiz.attempts.slice(-3).map((attempt) => (
                    <div key={attempt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{attempt.studentName}</span>
                        <span className="text-gray-500 ml-2">
                          {new Date(attempt.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-gray-900">
                          {attempt.score}/{attempt.totalQuestions}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
