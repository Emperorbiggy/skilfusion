// components/SchedulePage.js
import React from 'react';

const SchedulePage = ({ schedule }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Class Schedule</h2>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Calendar
            </button>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">View:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>This Week</option>
              <option>Next Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schedule.map(cls => (
          <div key={cls.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{cls.title}</h3>
                <p className="text-gray-600">Instructor: {cls.instructor}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {cls.location}
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{cls.date} | {cls.time}</span>
            </div>
            
            <p className="text-gray-600 mb-4">{cls.description}</p>
            
            <div className="flex space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Join Class
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm">
                View Materials
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-lg p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-3">Upcoming Classes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Class</th>
                <th className="p-3 text-left text-sm font-semibold">Date & Time</th>
                <th className="p-3 text-left text-sm font-semibold">Instructor</th>
                <th className="p-3 text-left text-sm font-semibold">Location</th>
                <th className="p-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(cls => (
                <tr key={cls.id} className="border-b border-gray-200">
                  <td className="p-3 text-sm text-gray-700 font-medium">{cls.title}</td>
                  <td className="p-3 text-sm text-gray-700">{cls.date}, {cls.time}</td>
                  <td className="p-3 text-sm text-gray-700">{cls.instructor}</td>
                  <td className="p-3 text-sm text-gray-700">{cls.location}</td>
                  <td className="p-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                      Join
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;