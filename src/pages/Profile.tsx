import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, Camera, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BadgeCard from '../components/BadgeCard';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null);

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: editedName,
        email: editedEmail,
        profilePicture
      };
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => u.id === user.id ? { ...u, ...updatedUser } : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setIsEditing(false);
      window.location.reload(); // Refresh to show updated data
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const recentBadges = [
    {
      title: 'Perfect Score',
      description: 'Score 100% on any quiz',
      type: 'gold' as const,
      earned: true,
    },
    {
      title: 'Quick Thinker',
      description: 'Answer 5 questions in under 30 seconds',
      type: 'silver' as const,
      earned: true,
    },
    {
      title: 'Quiz Enthusiast',
      description: 'Complete 20 quizzes',
      type: 'bronze' as const,
      earned: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account and view your achievements</p>
      </div>

      {/* Profile Header */}
      <div className="quiz-card p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 quiz-gradient rounded-full flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
            )}
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white p-2 rounded-full cursor-pointer transition-colors">
                <Camera size={16} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-purple-300 dark:border-purple-600 focus:border-purple-600 dark:focus:border-purple-400 outline-none"
                />
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="block text-gray-600 dark:text-gray-300 bg-transparent border-b border-purple-300 dark:border-purple-600 focus:border-purple-600 dark:focus:border-purple-400 outline-none"
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{user?.name}</h2>
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Mail size={16} />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Calendar size={16} />
                    <span>Joined {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown'}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSaveProfile}
                  className="quiz-button flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditedName(user?.name || '');
                    setEditedEmail(user?.email || '');
                    setProfilePicture(user?.profilePicture || null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="quiz-button flex items-center space-x-2"
              >
                <Edit size={16} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Profile;
