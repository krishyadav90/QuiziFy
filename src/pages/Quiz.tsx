
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, CheckCircle } from 'lucide-react';
import { quizTopics, Question } from '../data/quizQuestions';
import { useAuth } from '../contexts/AuthContext';
import { getQuizWithQuestions, storeQuizAttempt, getDefaultQuizzes } from '../lib/quizStorage';

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);

  // Handle both shared quizzes and topic quizzes
  const sharedQuizId = params.id;
  const searchParams = new URLSearchParams(location.search);
  const topicId = searchParams.get('topic') || 'mathematics';

  useEffect(() => {
    const loadQuiz = async () => {
      if (sharedQuizId) {
        // Load shared quiz from database
        try {
          const quiz = await getQuizWithQuestions(sharedQuizId);
          if (quiz && quiz.is_public) {
            setQuizData({
              ...quiz,
              title: quiz.title,
              name: quiz.title,
              timeLimit: quiz.time_limit ? Math.floor(quiz.time_limit / 60) : 5,
            });
            setTimeLeft(quiz.time_limit || 300);
          } else {
            console.error('Quiz not found or inactive');
            navigate('/');
          }
        } catch (error) {
          console.error('Error loading shared quiz:', error);
          navigate('/');
        }
      } else {
        // Load default quiz topics from database
        try {
          const defaultQuizzes = await getDefaultQuizzes();
          const selectedQuiz = defaultQuizzes.find(quiz => quiz.title.toLowerCase() === topicId.toLowerCase());
          
          if (selectedQuiz) {
            const quizWithQuestions = await getQuizWithQuestions(selectedQuiz.id);
            if (quizWithQuestions) {
              setQuizData({
                ...quizWithQuestions,
                name: quizWithQuestions.title,
                timeLimit: quizWithQuestions.time_limit ? Math.floor(quizWithQuestions.time_limit / 60) : 5,
              });
              setTimeLeft(quizWithQuestions.time_limit || 300);
            } else {
              // Fallback to hardcoded topics
              const selectedTopic = quizTopics.find(topic => topic.id === topicId) || quizTopics[0];
              setQuizData(selectedTopic);
              setTimeLeft(300);
            }
          } else {
            // Fallback to hardcoded topics
            const selectedTopic = quizTopics.find(topic => topic.id === topicId) || quizTopics[0];
            setQuizData(selectedTopic);
            setTimeLeft(300);
          }
        } catch (error) {
          console.error('Error loading quiz:', error);
          // Fallback to hardcoded topics
          const selectedTopic = quizTopics.find(topic => topic.id === topicId) || quizTopics[0];
          setQuizData(selectedTopic);
          setTimeLeft(300);
        }
      }
    };

    loadQuiz();
  }, [sharedQuizId, topicId, navigate]);

  const questions = quizData?.questions || [];

  const handleComplete = async () => {
    setIsCompleted(true);
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer;
    }
    
    const score = finalAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correct ? 1 : 0);
    }, 0);

    // Save student attempt data if user is logged in
    if (user) {
      const quizId = sharedQuizId || quizData?.id || 'topic-quiz';
      const timeSpent = sharedQuizId ? (quizData?.timeLimit ? quizData.timeLimit * 60 - timeLeft : 300 - timeLeft) : (300 - timeLeft);
      
      // Store attempt in database
      await storeQuizAttempt(
        quizId,
        user.id,
        score,
        questions.length,
        timeSpent,
        finalAnswers
      );
    }
    
    navigate('/results', { 
      state: { 
        score, 
        total: questions.length, 
        answers: finalAnswers,
        questions,
        quizTitle: quizData?.title || quizData?.name || 'Quiz'
      }
    });
  };

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleComplete();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleComplete();
      }
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  // Don't render until quiz data is loaded
  if (!quizData || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Quiz...</h2>
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock size={20} />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="quiz-card p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        {questions[currentQuestion]?.question}
        </h2>

        {/* Display image if it's an image question */}
        {questions[currentQuestion]?.type === 'image' && questions[currentQuestion]?.imageUrl && (
          <div className="mb-6 flex justify-center">
            <img 
              src={questions[currentQuestion].imageUrl} 
              alt="Question image" 
              className="max-w-full h-64 object-contain rounded-lg border border-gray-200"
            />
          </div>
        )}

        <div className="space-y-4">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <CheckCircle size={16} className="text-white" />
                  )}
                </div>
                <span className="text-lg">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`quiz-button ${
            selectedAnswer === null
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-xl'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
