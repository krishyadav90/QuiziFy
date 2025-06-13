import { supabase } from '@/integrations/supabase/client';
import { QuizTopic, Question } from '@/data/quizQuestions';

export interface DatabaseQuiz {
  id: string;
  title: string;
  description: string;
  time_limit: number;
  is_public: boolean;
  teacher_id: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  question_type: string;
  order_index: number;
  points: number;
}

export interface DatabaseQuizAttempt {
  id: string;
  quiz_id: string;
  student_id: string;
  score: number;
  total_points: number;
  time_taken: number;
  answers: number[];
  completed_at: string;
}

// Store a quiz with its questions in the database
export const createQuizInDB = async (
  quizData: {
    title: string;
    description: string;
    timeLimit: number;
    questions: Question[];
    isActive?: boolean;
  },
  userId: string
): Promise<string | null> => {
  try {
    // Insert quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        title: quizData.title,
        description: quizData.description,
        time_limit: quizData.timeLimit,
        is_public: quizData.isActive ?? true,
        teacher_id: userId,
      })
      .select()
      .single();

    if (quizError) {
      console.error('Error creating quiz:', quizError);
      return null;
    }

    // Insert questions
    const questionsToInsert = quizData.questions.map((question, index) => ({
      quiz_id: quiz.id,
      question_text: question.question,
      options: question.options,
      correct_answer: question.correct.toString(),
      order_index: index,
      question_type: 'text',
      points: 1,
    }));

    const { error: questionsError } = await supabase
      .from('questions')
      .insert(questionsToInsert);

    if (questionsError) {
      console.error('Error creating questions:', questionsError);
      // Cleanup - delete the quiz if questions failed
      await supabase.from('quizzes').delete().eq('id', quiz.id);
      return null;
    }

    return quiz.id;
  } catch (error) {
    console.error('Error creating quiz:', error);
    return null;
  }
};

// Get all quizzes created by a teacher
export const getTeacherQuizzes = async (userId: string): Promise<DatabaseQuiz[]> => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('teacher_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching teacher quizzes:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching teacher quizzes:', error);
    return [];
  }
};

// Get a quiz with its questions
export const getQuizWithQuestions = async (quizId: string) => {
  try {
    // Get quiz details
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single();

    if (quizError) {
      console.error('Error fetching quiz:', quizError);
      return null;
    }

    // Get questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', quizId)
      .order('order_index');

    if (questionsError) {
      console.error('Error fetching questions:', questionsError);
      return null;
    }

    return {
      ...quiz,
      questions: questions.map(q => ({
        id: q.id,
        question: q.question_text,
        options: q.options as string[],
        correct: parseInt(q.correct_answer),
        type: q.question_type,
      }))
    };
  } catch (error) {
    console.error('Error fetching quiz with questions:', error);
    return null;
  }
};

// Store a quiz attempt
export const storeQuizAttempt = async (
  quizId: string,
  userId: string,
  score: number,
  totalQuestions: number,
  timeSpent: number,
  answers: number[]
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('quiz_attempts')
      .insert({
        quiz_id: quizId,
        student_id: userId,
        score,
        total_points: totalQuestions,
        time_taken: timeSpent,
        answers,
        completed_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error storing quiz attempt:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error storing quiz attempt:', error);
    return false;
  }
};

// Get user's quiz attempts
export const getUserQuizAttempts = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        quiz:quizzes(title)
      `)
      .eq('student_id', userId)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching user quiz attempts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user quiz attempts:', error);
    return [];
  }
};

// Store default quiz topics in database (for system-wide quizzes)
export const storeDefaultQuizTopics = async (): Promise<void> => {
  try {
    // We'll store these as system quizzes with a special system user ID
    const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';
    
    // First check if default quizzes already exist
    const { data: existingQuizzes } = await supabase
      .from('quizzes')
      .select('id')
      .eq('teacher_id', SYSTEM_USER_ID);

    if (existingQuizzes && existingQuizzes.length > 0) {
      // Default quizzes already exist
      return;
    }

    // Import quiz topics dynamically to avoid circular dependencies
    const { quizTopics } = await import('@/data/quizQuestions');
    
    for (const topic of quizTopics) {
      await createQuizInDB({
        title: topic.title,
        description: topic.description,
        timeLimit: 15, // Default 15 minutes
        questions: topic.questions,
        isActive: true,
      }, SYSTEM_USER_ID);
    }
  } catch (error) {
    console.error('Error storing default quiz topics:', error);
  }
};

// Get system default quizzes
export const getDefaultQuizzes = async (): Promise<DatabaseQuiz[]> => {
  try {
    const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';
    
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('teacher_id', SYSTEM_USER_ID)
      .order('title');

    if (error) {
      console.error('Error fetching default quizzes:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching default quizzes:', error);
    return [];
  }
};