import React from 'react';
function Header({user, logout}){
    return (
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">NeatNest</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user}</span>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    );
}
export default Header;