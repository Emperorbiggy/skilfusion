import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StudentPortal = () => {
  const [activePage, setActivePage] = useState('login');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submission, setSubmission] = useState('');
  const [file, setFile] = useState(null);

  // Mock student data
  const studentData = {
    id: "SF2023-00789",
    name: "Aisha Bello",
    email: "aisha.bello@skillfusion.edu",
    course: "Fullstack Development",
    startDate: "Sept 15, 2023",
    classesTaken: 18,
    totalClasses: 48,
    assignments: [
      {
        id: 1,
        title: "Responsive Portfolio Website",
        course: "Frontend Fundamentals",
        dueDate: "Oct 10, 2023",
        status: "submitted",
        score: 92,
        maxScore: 100,
        description: "Create a responsive portfolio website using HTML, CSS, and JavaScript. Implement at least 3 pages with responsive design principles."
      },
      {
        id: 2,
        title: "React E-commerce Cart",
        course: "React Development",
        dueDate: "Oct 18, 2023",
        status: "pending",
        score: null,
        maxScore: 100,
        description: "Build a shopping cart functionality using React. Implement add/remove items, quantity adjustment, and total calculation."
      },
      {
        id: 3,
        title: "Node.js REST API",
        course: "Backend Development",
        dueDate: "Oct 25, 2023",
        status: "pending",
        score: null,
        maxScore: 100,
        description: "Create a RESTful API for a blog system using Node.js and Express. Implement CRUD operations for posts and comments."
      },
      {
        id: 4,
        title: "UI Design for Mobile App",
        course: "UI/UX Design",
        dueDate: "Nov 2, 2023",
        status: "submitted",
        score: 87,
        maxScore: 100,
        description: "Design a mobile app interface for a fitness tracking application. Create 5 key screens with consistent design language."
      }
    ]
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login validation
    if (studentId === "SF2023-00789" && password === "SF2023-00789") {
      setActivePage('resetPassword');
    } else {
      setError("Invalid student ID or password");
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    // Password reset successful
    setActivePage('dashboard');
  };

  const handleAssignmentSelect = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!submission && !file) {
      setError("Please add your submission or upload a file");
      return;
    }
    // Simulate submission
    alert("Assignment submitted successfully!");
    setSelectedAssignment(null);
    setSubmission('');
    setFile(null);
  };

  const progressPercentage = (studentData.classesTaken / studentData.totalClasses) * 100;

  // Login Page
  if (activePage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <h1 className="text-2xl font-bold text-white">SkillFusion Africa</h1>
            <p className="text-blue-200 mt-2">Student Portal Login</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="studentId">
                  Student ID
                </label>
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SF2023-00000"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <p className="text-sm text-gray-500 mt-2">First-time users: Use your temporary password</p>
              </div>
              
              {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                Login to Portal
              </button>
              
              <div className="mt-6 text-center">
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Password Reset Page
  if (activePage === 'resetPassword') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
            <h1 className="text-2xl font-bold text-white">Set New Password</h1>
            <p className="text-blue-200 mt-2">Create a secure password for your account</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handlePasswordReset}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <p className="text-sm text-gray-500 mt-2">Must be at least 8 characters</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              
              {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                Set New Password
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Assignment Submission Page
  if (selectedAssignment) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button 
              onClick={() => setSelectedAssignment(null)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <h1 className="text-2xl font-bold">{selectedAssignment.title}</h1>
              <div className="flex flex-wrap items-center mt-2">
                <span className="bg-blue-800 text-xs px-2 py-1 rounded mr-2">{selectedAssignment.course}</span>
                <span className="text-blue-200">Due: {selectedAssignment.dueDate}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Assignment Description</h2>
                <p className="text-gray-600">{selectedAssignment.description}</p>
              </div>
              
              <form onSubmit={handleSubmitAssignment}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="submission">
                    Your Submission
                  </label>
                  <textarea
                    id="submission"
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your assignment solution here..."
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="file">
                    Or Upload File
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, ZIP (MAX. 10MB)</p>
                      </div>
                      <input 
                        id="file" 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                  {file && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected file: {file.name}
                    </div>
                  )}
                </div>
                
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                
                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    Submit Assignment
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSelectedAssignment(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg text-white p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {studentData.name}</h1>
              <p className="text-blue-200">Student Portal Dashboard</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <div className="bg-blue-800 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{studentData.name}</p>
                  <p className="text-sm text-blue-200">{studentData.id}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Student Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Student Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-medium">{studentData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{studentData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Course</p>
                <p className="font-medium">{studentData.course}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{studentData.startDate}</p>
              </div>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Course Progress</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-blue-600 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (progressPercentage / 100) * 251.2}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600">
                {studentData.classesTaken} of {studentData.totalClasses} classes completed
              </p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-4 rounded-lg flex flex-col items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Resources</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-4 rounded-lg flex flex-col items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Schedule</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-4 rounded-lg flex flex-col items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Community</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-4 rounded-lg flex flex-col items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Assignments Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Assignments & Projects</h2>
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Submission
              </button>
              <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
                Filter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 text-sm font-semibold tracking-wide">Assignment</th>
                  <th className="p-3 text-sm font-semibold tracking-wide">Course</th>
                  <th className="p-3 text-sm font-semibold tracking-wide">Due Date</th>
                  <th className="p-3 text-sm font-semibold tracking-wide">Status</th>
                  <th className="p-3 text-sm font-semibold tracking-wide">Score</th>
                  <th className="p-3 text-sm font-semibold tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentData.assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-700 font-medium">{assignment.title}</td>
                    <td className="p-3 text-sm text-gray-700">{assignment.course}</td>
                    <td className="p-3 text-sm text-gray-700">{assignment.dueDate}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        assignment.status === "submitted" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {assignment.status === "submitted" ? "Submitted" : "Pending"}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      {assignment.score ? (
                        <span className="font-medium">{assignment.score}/{assignment.maxScore}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleAssignmentSelect(assignment)}
                        className={`text-sm px-3 py-1 rounded ${
                          assignment.status === "submitted" 
                            ? "bg-gray-200 text-gray-700" 
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        disabled={assignment.status === "submitted"}
                      >
                        {assignment.status === "submitted" ? "View" : "Submit"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Upcoming Classes */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Advanced React Patterns",
                date: "Oct 12, 2023",
                time: "10:00 AM - 12:00 PM",
                instructor: "Mr. Adebayo"
              },
              {
                title: "Database Optimization",
                date: "Oct 14, 2023",
                time: "2:00 PM - 4:00 PM",
                instructor: "Dr. Nwankwo"
              },
              {
                title: "UI Design Systems",
                date: "Oct 16, 2023",
                time: "9:00 AM - 11:00 AM",
                instructor: "Ms. Okoro"
              }
            ].map((cls, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-800 mb-2">{cls.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {cls.date} | {cls.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Instructor: {cls.instructor}
                </div>
                <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;