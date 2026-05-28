export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  theme: 'light' | 'dark';
}

export interface StudySession {
  id: string;
  duration: number;
  focusStreak: number;
  completed: boolean;
  startedAt: Date;
  endedAt: Date;
  notes?: string;
  xpGained: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  status: 'active' | 'archived' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline?: Date;
  totalTimeStudied: number;
  progress: number;
  tags: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  estimatedTime?: number;
  tags: string[];
  order: number;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  color: string;
  totalTimeStudied: number;
  lastStudied?: Date;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: Date;
  reviewCount: number;
}

export interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly';
  targetValue: number;
  currentValue: number;
  status: 'active' | 'completed' | 'abandoned';
  targetDate: Date;
}

export interface Analytics {
  totalHoursStudied: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionTime: number;
  levelXp: number;
  level: number;
}

export interface Achievement {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: 'pomodoro' | 'streak' | 'level' | 'milestone';
}
