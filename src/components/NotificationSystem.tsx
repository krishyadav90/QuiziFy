import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NotificationSystemProps {
  children: React.ReactNode;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ children }) => {
  const { toast } = useToast();

  useEffect(() => {
    // Request notification permission on load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
    
    // Show toast notification
    toast({
      title,
      description: message,
      variant: type === 'error' ? 'destructive' : 'default',
    });
  };

  // Make showNotification available globally
  useEffect(() => {
    (window as any).showNotification = showNotification;
  }, []);

  return <>{children}</>;
};

export default NotificationSystem;