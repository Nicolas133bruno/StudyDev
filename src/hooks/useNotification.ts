import { useCallback } from 'react';

interface NotificationOptions {
  duration?: number;
  action?: () => void;
  actionLabel?: string;
}

export const useNotification = () => {
  const show = useCallback(
    (message: string, options: NotificationOptions = {}) => {
      const { duration = 3000, action, actionLabel } = options;
      console.log('Notification:', message, { duration, action, actionLabel });
    },
    []
  );

  const success = useCallback((message: string) => show(message), [show]);
  const error = useCallback((message: string) => show(message), [show]);
  const warning = useCallback((message: string) => show(message), [show]);
  const info = useCallback((message: string) => show(message), [show]);

  return { show, success, error, warning, info };
};
