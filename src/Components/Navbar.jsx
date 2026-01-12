import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiBell } from 'react-icons/fi';

function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="bg-white shadow-md fixed top-0 right-0 left-0 lg:left-64 z-30 transition-all duration-300">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Welcome message */}
          <div className="flex items-center ml-12 lg:ml-0">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Welcome, <span className="text-blue-600">{currentUser?.username || 'User'}</span>
            </h2>
          </div>

          {/* Right side - User info & notifications */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FiBell className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2 md:gap-3 bg-blue-50 px-3 md:px-4 py-2 rounded-full">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FiUser className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="hidden sm:block text-sm md:text-base font-medium text-gray-700">
                {currentUser?.username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;