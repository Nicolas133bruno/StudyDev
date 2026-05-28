import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function calculateProgress(
  currentValue: number,
  targetValue: number
): number {
  return Math.min((currentValue / targetValue) * 100, 100);
}

export function getStreak(lastSessionDate: Date | undefined): number {
  if (!lastSessionDate) return 0;

  const today = new Date();
  const last = new Date(lastSessionDate);

  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 1 ? 1 : 0;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
