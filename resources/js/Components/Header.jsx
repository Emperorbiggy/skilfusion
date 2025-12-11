// components/Header.js
import React from 'react';

const Header = ({ studentData, notificationCount }) => {
  const fullName = `${studentData.first_name || ''} ${studentData.middle_name || ''} ${studentData.last_name || ''}`.trim();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg text-white p-6 mb-8">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {fullName || 'Student'}</h1>
          <p className="text-blue-200">Student Portal Dashboard</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center">
            <div className="relative mr-4">
              <button className="p-2 text-blue-200 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
            <div className="bg-blue-800 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">{fullName || 'Student'}</p>
              <p className="text-sm text-blue-200">{studentData.student_id || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
