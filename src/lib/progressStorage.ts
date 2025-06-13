// Progress storage utilities for maintaining user data across sessions

export interface UserProgressData {
  userId: string;
  quizzes: any[];
  attempts: any[];
  settings: Record<string, any>;
  lastUpdated: string;
}

class ProgressStorage {
  private getStorageKey(userId: string): string {
    return `quiz_app_progress_${userId}`;
  }

  saveUserProgress(userId: string, data: Partial<UserProgressData>): void {
    try {
      const existingData = this.loadUserProgress(userId);
      const updatedData: UserProgressData = {
        ...existingData,
        ...data,
        userId,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(this.getStorageKey(userId), JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  }

  loadUserProgress(userId: string): UserProgressData {
    try {
      const data = localStorage.getItem(this.getStorageKey(userId));
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
    
    return {
      userId,
      quizzes: [],
      attempts: [],
      settings: {},
      lastUpdated: new Date().toISOString()
    };
  }

  clearUserProgress(userId: string): void {
    try {
      localStorage.removeItem(this.getStorageKey(userId));
    } catch (error) {
      console.error('Error clearing user progress:', error);
    }
  }

  // Specific helpers for quiz data
  saveQuizAttempt(userId: string, attempt: any): void {
    const progress = this.loadUserProgress(userId);
    progress.attempts = [...progress.attempts, attempt];
    this.saveUserProgress(userId, progress);
  }

  getQuizAttempts(userId: string): any[] {
    const progress = this.loadUserProgress(userId);
    return progress.attempts || [];
  }

  saveQuizData(userId: string, quizzes: any[]): void {
    this.saveUserProgress(userId, { quizzes });
  }

  getQuizData(userId: string): any[] {
    const progress = this.loadUserProgress(userId);
    return progress.quizzes || [];
  }
}

export const progressStorage = new ProgressStorage();