'use client';

import { useState } from 'react';
import { ChevronDown, LogOut } from 'lucide-react'; // Using lucide-react for icons
import { handleLogout } from '../api/add-custom-token';
import { useAuth } from '../AuthProvider';


const UserAdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    user,
    isAuthenticated,
    isInitialized,
    dispatch,
    error
  } = useAuth();

  const onLogout = async () => {
    console.log("onLogout");

    dispatch({
      type: "LOGOUT"
    })
    await handleLogout();
  };

  // Simple initial generation for the circular avatar placeholder
  const initials = user?.email.charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">

        {/* Left Section: Logo Text */}
        <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
          WIT-3.0
        </div>

        {/* Right Section: User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            {/* Circular Avatar Placeholder */}
            <div className="flex items-center justify-center text-sm font-semibold text-gray-700 ">
              {user?.email}
            </div>

            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              <div className="py-1" role="none">
                {/* Email Display */}
                {
                  /*<div className="block px-4 py-2 text-sm text-gray-700 truncate border-b border-gray-100" role="menuitem">
                  {user.email}
                </div>*/
                }

                {/* Logout Item */}
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false); // Close dropdown after action
                  }}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>

  );
};

export default UserAdminHeader;