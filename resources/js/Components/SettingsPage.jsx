// components/SettingsPage.js
import React from 'react';

const SettingsPage = ({ studentData, darkMode, setDarkMode, setActivePage }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Profile Information</h3>
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl text-blue-800 mr-4">
              {studentData.name.charAt(0)}
            </div>
            <div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Change Photo
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={studentData.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={studentData.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Student ID</label>
              <input 
                type="text" 
                value={studentData.id}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Security Settings</h3>
          
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h4 className="font-bold text-gray-800 mb-3">Password</h4>
            <p className="text-gray-600 mb-4">Last changed: Sept 20, 2023</p>
            <button 
              onClick={() => setActivePage('resetPassword')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Change Password
            </button>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h4 className="font-bold text-gray-800 mb-3">Two-Factor Authentication</h4>
            <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
            <div className="flex items-center">
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="2fa-toggle"
                  className="sr-only"
                />
                <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
              </div>
              <label htmlFor="2fa-toggle" className="text-gray-700">Enable 2FA</label>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-800 mb-3">Notification Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="email-notifications"
                  defaultChecked
                  className="mr-3"
                />
                <label htmlFor="email-notifications" className="text-gray-700">Email notifications</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="push-notifications"
                  defaultChecked
                  className="mr-3"
                />
                <label htmlFor="push-notifications" className="text-gray-700">Push notifications</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="assignment-reminders"
                  defaultChecked
                  className="mr-3"
                />
                <label htmlFor="assignment-reminders" className="text-gray-700">Assignment reminders</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="community-updates"
                  className="mr-3"
                />
                <label htmlFor="community-updates" className="text-gray-700">Community updates</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input 
              type="checkbox" 
              id="dark-mode-toggle"
              className="sr-only"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className={`block w-10 h-6 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform duration-300 ease-in-out" style={{ transform: darkMode ? 'translateX(16px)' : 'none' }}></div>
          </div>
          <label htmlFor="dark-mode-toggle" className="text-gray-700">Dark Mode</label>
        </div>
        
        <div>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg mr-3">
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;