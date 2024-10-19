import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { format, differenceInDays } from 'date-fns';
import { Calendar, Clock, BarChart2, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalConversations: 0,
    streak: 0,
    practiceDays: 0,
  });

  useEffect(() => {
    // Remove the navigation to /auth if there's no user
    if (!loading && !user) {
      // Instead of redirecting, we'll use placeholder data
      setStats({
        totalConversations: 5,
        streak: 3,
        practiceDays: 7,
      });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (user) {
        // Fetch real user data here
        // For now, we'll use placeholder data
        setStats({
          totalConversations: 5,
          streak: 3,
          practiceDays: 7,
        });
      }
    };

    fetchUserStats();
  }, [user]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-4 py-5 border-b border-gray-200 sm:px-6">
          <h1 className="text-2xl leading-6 font-bold text-white">User Profile</h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <img
              className="h-20 w-20 rounded-full mr-4"
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'Demo User'}`}
              alt="Profile"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.displayName || 'Demo User'}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'demo@example.com'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard icon={<BarChart2 />} title="Total Conversations" value={stats.totalConversations} />
            <StatCard icon={<Calendar />} title="Current Streak" value={`${stats.streak} days`} />
            <StatCard icon={<Clock />} title="Practice Days" value={stats.practiceDays} />
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => navigate('/onboarding')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start New Interview
            </button>
            {user ? (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Exit Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number }> = ({ icon, title, value }) => (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center">
    <div className="flex-shrink-0 mr-4 text-blue-500">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export default ProfilePage;