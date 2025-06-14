import React, { useState } from 'react';
import { Bell, Shield, Heart, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

interface ToggleSetting {
  id: string;
  label: string;
  type: 'toggle';
  value: boolean;
  setter: (value: boolean) => void;
}

interface SelectSetting {
  id: string;
  label: string;
  type: 'select';
  value: string;
  setter: (value: string) => void;
  options: string[];
}

type Setting = ToggleSetting | SelectSetting;

interface SettingSection {
  title: string;
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  settings: Setting[];
}

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const settingSections: SettingSection[] = [
    {
      title: 'Appearance',
      icon: theme === 'dark' ? Moon : Sun,
      settings: [
        { id: 'theme', label: 'Dark Mode', type: 'toggle', value: theme === 'dark', setter: toggleTheme },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { id: 'push', label: 'Push Notifications (Sign in/up alerts)', type: 'toggle', value: pushNotifications, setter: setPushNotifications },
      ]
    },
    {
      title: 'Privacy & Data',
      icon: Shield,
      settings: [
        { id: 'analytics', label: 'Usage Analytics', type: 'toggle', value: analytics, setter: setAnalytics },
        { id: 'data_sharing', label: 'Share Data for Improvements', type: 'toggle', value: dataSharing, setter: setDataSharing },
      ]
    },
    {
      title: 'About',
      icon: Heart,
      settings: []
    }
  ];

  const showNotification = (message: string) => {
    if (pushNotifications && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Quiz App', { body: message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Quiz App', { body: message });
          }
        });
      }
    }
    
    // Also show toast notification
    toast({
      title: "Settings Updated",
      description: message,
    });
  };

  React.useEffect(() => {
    // Request notification permission on load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Customize your quiz experience</p>
      </div>

      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="quiz-card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <section.icon size={24} className="text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
            </div>

            {section.title === 'About' ? (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">About Quiz App</h4>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    A modern quiz platform designed to make learning fun and interactive. 
                    Create, share, and take quizzes with ease.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Created by Krish Yadav</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Passionate developer focused on creating engaging educational experiences. 
                    Building tools that make learning accessible and enjoyable for everyone.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Privacy Notes</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    We respect your privacy. All quiz data is stored locally on your device. 
                    We only collect anonymous usage statistics to improve the app experience. 
                    Your personal information is never shared with third parties.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <label htmlFor={setting.id} className="text-gray-700 dark:text-gray-300 font-medium">
                      {setting.label}
                    </label>

                    {setting.type === 'toggle' && (
                      <button
                        id={setting.id}
                        onClick={() => {
                          if (setting.id === 'theme') {
                            toggleTheme();
                          } else {
                            setting.setter(!setting.value);
                            if (setting.id === 'push' && !setting.value) {
                              showNotification('Push notifications enabled!');
                            }
                          }
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          setting.value ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}

                    {setting.type === 'select' && (
                      <select
                        id={setting.id}
                        value={setting.value}
                        onChange={(e) => setting.setter(e.target.value)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        {setting.options.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button 
          onClick={() => {
            showNotification('Settings saved successfully!');
          }}
          className="quiz-button"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
