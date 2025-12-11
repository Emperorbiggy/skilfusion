// components/AssignmentSubmissionPage.js
import React from 'react';

const AssignmentSubmissionPage = ({
  selectedAssignment,
  setSelectedAssignment,
  submission,
  setSubmission,
  file,
  setFile,
  error,
  handleSubmitAssignment
}) => {
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
};

export default AssignmentSubmissionPage;