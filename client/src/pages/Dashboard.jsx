import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Dashboard = ({ user, logout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header user={user} logout={logout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
              Welcome, {user}!
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              What would you like to do today?
            </p>

            <div className="flex justify-center space-x-8">
              <Link
                to="/post-jobs"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-xl"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <div>POST JOBS</div>
                  <div className="text-sm font-normal">I want to hire someone</div>
                </div>
              </Link>

              <Link
                to="/find-jobs"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-8 rounded-lg text-xl"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <div>FIND JOBS</div>
                  <div className="text-sm font-normal">I want to work on projects</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
