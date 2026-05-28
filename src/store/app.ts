import { create } from 'zustand';
import type { Analytics, Goal, Project, StudySession, Subject } from '@/types';

interface AppState {
  analytics: Analytics | null;
  setAnalytics: (analytics: Analytics) => void;

  currentSession: StudySession | null;
  setCurrentSession: (session: StudySession | null) => void;

  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;

  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
  addSubject: (subject: Subject) => void;
  updateSubject: (subjectId: string, updates: Partial<Subject>) => void;
  deleteSubject: (subjectId: string) => void;

  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  analytics: null,
  setAnalytics: (analytics) => set({ analytics }),

  currentSession: null,
  setCurrentSession: (session) => set({ currentSession: session }),

  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, ...updates } : p
      ),
    })),
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
    })),

  subjects: [],
  setSubjects: (subjects) => set({ subjects }),
  addSubject: (subject) =>
    set((state) => ({ subjects: [...state.subjects, subject] })),
  updateSubject: (subjectId, updates) =>
    set((state) => ({
      subjects: state.subjects.map((s) =>
        s.id === subjectId ? { ...s, ...updates } : s
      ),
    })),
  deleteSubject: (subjectId) =>
    set((state) => ({
      subjects: state.subjects.filter((s) => s.id !== subjectId),
    })),

  goals: [],
  setGoals: (goals) => set({ goals }),
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  updateGoal: (goalId, updates) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId ? { ...g, ...updates } : g
      ),
    })),
  deleteGoal: (goalId) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== goalId),
    })),

  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
