import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, BarChart2, User } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [difficulty, setDifficulty] = useState('');
  const [interviewer, setInterviewer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (difficulty && interviewer) {
      // Here you would typically save the settings
      navigate('/interview');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Interview Setup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Difficulty Level
            </label>
            <div className="flex justify-between">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-md ${
                    difficulty === level
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition duration-300`}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choose Interviewer
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Software', icon: <Briefcase size={24} /> },
                { name: 'Product', icon: <BarChart2 size={24} /> },
                { name: 'Marketing', icon: <User size={24} /> },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={`flex flex-col items-center justify-center p-4 rounded-md ${
                    interviewer === item.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition duration-300`}
                  onClick={() => setInterviewer(item.name)}
                >
                  {item.icon}
                  <span className="mt-2 text-sm">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={!difficulty || !interviewer}
          >
            Start Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;