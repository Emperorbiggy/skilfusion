// components/DashboardPage.js
import React from "react";

const DashboardPage = ({ studentData, handleAssignmentSelect, setActivePage }) => {
  // Compute overall progress if classes data exists
  const progressPercentage =
    studentData?.totalClasses > 0
      ? (studentData.classesTaken / studentData.totalClasses) * 100
      : 0;

  const upcomingClasses = studentData?.upcomingClasses || [];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your progress overview</p>
      </div>

      {/* Student Info, Progress & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Student Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {studentData?.first_name?.[0] || "S"}
            </div>
            <div className="ml-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Student Information</h2>
              <p className="text-gray-600">{studentData?.course || "No course enrolled"}</p>
            </div>
          </div>

          <div className="space-y-4">
            <InfoRow label="Student ID" value={studentData?.student_id || "-"} />
            <InfoRow
              label="Full Name"
              value={`${studentData?.first_name || ""} ${
                studentData?.middle_name || ""
              } ${studentData?.last_name || ""}`}
            />
            <InfoRow label="Email" value={studentData?.email || "-"} />
            <InfoRow label="Phone" value={studentData?.phone || "-"} />
            <InfoRow label="WhatsApp" value={studentData?.whatsapp || "-"} />
            <InfoRow
              label="Location"
              value={`${studentData?.city || "-"}, ${
                studentData?.state || "-"
              }, ${studentData?.country || "-"}`}
            />
          </div>
        </div>

        {/* Progress Card - Redesigned */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-1 lg:col-span-1">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6">Course Progress</h2>

          {studentData?.sessions?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {studentData.sessions.map((session) => {
                const sessionProgress = session.completed ? 100 : (session.progress || 0);

                return (
                  <div
                    key={session.session_id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-base md:text-lg mb-2 line-clamp-2">
                          {session.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 md:w-16 md:h-16">
                              <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                  className="text-gray-200 stroke-current"
                                  strokeWidth="8"
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="transparent"
                                />
                                <circle
                                  className="text-blue-600 stroke-current"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  fill="transparent"
                                  strokeDasharray={251.2}
                                  strokeDashoffset={251.2 - (sessionProgress / 100) * 251.2}
                                  transform="rotate(-90 50 50)"
                                />
                              </svg>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="text-xs md:text-sm font-bold text-blue-600">
                                  {Math.round(sessionProgress)}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex-grow">
                            <div className="text-xs md:text-sm text-gray-600 mb-2">
                              <p><span className="font-medium">Start:</span> {session.startDate || "-"}</p>
                              <p><span className="font-medium">End:</span> {session.endDate || "-"}</p>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${sessionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            session.completed
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {session.completed ? "Completed" : "In Progress"}
                        </span>
                      </div>

                      <button
                        onClick={() => setActivePage("schedule")}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 md:px-4 rounded-lg text-xs md:text-sm transition-colors whitespace-nowrap mt-3 md:mt-0"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              You are not enrolled in any sessions yet.
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-1 lg:col-span-1">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <ActionButton 
              icon={<CalendarIcon />} 
              label="Schedule" 
              onClick={() => setActivePage("schedule")} 
            />
            <ActionButton 
              icon={<ResourceIcon />} 
              label="Resources" 
              onClick={() => setActivePage("resources")} 
            />
            <ActionButton 
              icon={<CommunityIcon />} 
              label="Community" 
              onClick={() => setActivePage("community")} 
            />
            <ActionButton 
              icon={<SettingsIcon />} 
              label="Settings" 
              onClick={() => setActivePage("settings")} 
            />
          </div>

          {/* Stats Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-medium text-gray-700 mb-4">Your Statistics</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <StatCard value={studentData?.classesTaken || 0} label="Classes Taken" />
              <StatCard value={studentData?.assignments?.length || 0} label="Assignments" />
              <StatCard value={`${Math.round(progressPercentage)}%`} label="Completion" />
            </div>
          </div>
        </div>
      </div>

      {/* Assignments Section */}
      <AssignmentsTable
        assignments={studentData?.assignments}
        handleAssignmentSelect={handleAssignmentSelect}
      />

      {/* Upcoming Classes */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Upcoming Classes</h2>
          <button 
            onClick={() => setActivePage("schedule")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View all
          </button>
        </div>

        {upcomingClasses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingClasses.map((cls, index) => (
              <UpcomingClassCard
                key={index}
                cls={cls}
                setActivePage={setActivePage}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No upcoming classes</p>
        )}
      </div>
    </div>
  );
};

/* ---------------------- Subcomponents ---------------------- */

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
    <p className="text-xs md:text-sm text-gray-500">{label}</p>
    <p className="font-medium text-right text-xs md:text-sm">{value}</p>
  </div>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-3 md:p-4 rounded-xl flex flex-col items-center justify-center transition-colors"
  >
    <div className="text-lg md:text-xl mb-2">
      {icon}
    </div>
    <span className="text-xs md:text-sm font-medium">{label}</span>
  </button>
);

const StatCard = ({ value, label }) => (
  <div className="bg-gray-50 rounded-lg p-2 md:p-3 text-center">
    <div className="text-base md:text-lg font-bold text-gray-800">{value}</div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);

const AssignmentsTable = ({ assignments, handleAssignmentSelect }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 sm:mb-0">
        Assignments & Projects
      </h2>
      <div className="flex items-center space-x-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm flex items-center">
          <PlusIcon />
          <span className="ml-1">New Submission</span>
        </button>
        <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm">
          Filter
        </button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 text-xs md:text-sm font-semibold tracking-wide">Assignment</th>
            <th className="p-3 text-xs md:text-sm font-semibold tracking-wide hidden md:table-cell">Course</th>
            <th className="p-3 text-xs md:text-sm font-semibold tracking-wide">Due Date</th>
            <th className="p-3 text-xs md:text-sm font-semibold tracking-wide">Status</th>
            <th className="p-3 text-xs md:text-sm font-semibold tracking-wide">Score</th>
            <th className="p-3 text-xs md:text-sm font-semibold tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments?.length > 0 ? (
            assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3 text-xs md:text-sm text-gray-700 font-medium">
                  {assignment.title}
                </td>
                <td className="p-3 text-xs md:text-sm text-gray-700 hidden md:table-cell">
                  {assignment.course}
                </td>
                <td className="p-3 text-xs md:text-sm text-gray-700">
                  {assignment.dueDate}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      assignment.status === "submitted"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {assignment.status === "submitted"
                      ? "Submitted"
                      : "Pending"}
                  </span>
                </td>
                <td className="p-3 text-xs md:text-sm">
                  {assignment.score ? (
                    <span className="font-medium">
                      {assignment.score}/{assignment.maxScore}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleAssignmentSelect(assignment)}
                    className={`text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded ${
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
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="p-3 text-center text-gray-500 text-sm"
              >
                No assignments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const UpcomingClassCard = ({ cls, setActivePage }) => (
  <div className="border border-gray-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow bg-white">
    <h3 className="font-bold text-gray-800 text-base md:text-lg mb-3">{cls.title}</h3>

    <div className="flex items-center text-xs md:text-sm text-gray-600 mb-2">
      <CalendarIcon />
      <span className="ml-2">{cls.date} | {cls.time}</span>
    </div>

    <div className="flex items-center text-xs md:text-sm text-gray-600 mb-4">
      <UserIcon />
      <span className="ml-2">Instructor: {cls.instructor}</span>
    </div>

    <button
      onClick={() => setActivePage("schedule")}
      className="text-blue-600 hover:text-blue-800 text-xs md:text-sm flex items-center font-medium"
    >
      <span>View Details</span>
      <ArrowRightIcon />
    </button>
  </div>
);

/* Icons */
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ResourceIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CommunityIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default DashboardPage;