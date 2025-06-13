import { useState, useEffect } from 'react';

interface UserProgress {
  quizzes: any[];
  attempts: any[];
  settings: any;
  lastUpdated: string;
}

export const useProgressStorage = (userId: string | null) => {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    if (userId) {
      const savedProgress = localStorage.getItem(`user_progress_${userId}`);
      if (savedProgress) {
        try {
          setProgress(JSON.parse(savedProgress));
        } catch (error) {
          console.error('Error loading progress:', error);
        }
      }
    }
  }, [userId]);

  // Save progress to localStorage
  const saveProgress = (newProgress: Partial<UserProgress>) => {
    if (!userId) return;

    const updatedProgress = {
      ...progress,
      ...newProgress,
      lastUpdated: new Date().toISOString()
    };

    setProgress(updatedProgress);
    localStorage.setItem(`user_progress_${userId}`, JSON.stringify(updatedProgress));
  };

  // Get quiz progress
  const getQuizProgress = () => {
    return progress?.quizzes || [];
  };

  // Save quiz progress
  const saveQuizProgress = (quizzes: any[]) => {
    saveProgress({ quizzes });
  };

  // Get user attempts
  const getUserAttempts = () => {
    return progress?.attempts || [];
  };

  // Save user attempt
  const saveUserAttempt = (attempt: any) => {
    const attempts = getUserAttempts();
    const updatedAttempts = [...attempts, attempt];
    saveProgress({ attempts: updatedAttempts });
  };

  // Clear progress (for logout)
  const clearProgress = () => {
    if (userId) {
      localStorage.removeItem(`user_progress_${userId}`);
      setProgress(null);
    }
  };

  return {
    progress,
    saveProgress,
    getQuizProgress,
    saveQuizProgress,
    getUserAttempts,
    saveUserAttempt,
    clearProgress
  };
};