import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { StudySession } from '@/types';

const api = axios.create({
  baseURL: '/api',
});

export const useStudySessions = (userId?: string) => {
  return useQuery({
    queryKey: ['study-sessions', userId],
    queryFn: async () => {
      const { data } = await api.get(`/study-sessions`);
      return data as StudySession[];
    },
    enabled: !!userId,
  });
};

export const useCreateStudySession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (session: Partial<StudySession>) => {
      const { data } = await api.post('/study-sessions', session);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-sessions'] });
    },
  });
};

export const useUpdateStudySession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<StudySession>;
    }) => {
      const { data } = await api.patch(`/study-sessions/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-sessions'] });
    },
  });
};
