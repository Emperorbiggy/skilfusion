// StudentPortal.js
import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from '../components/LoginPage';
import ResetPasswordPage from '../components/ResetPasswordPage';
import Sidebar from '../components/Sidebar';
import DashboardPage from '../components/DashboardPage';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import { studentApi } from '../utils/api';

const StudentPortal = () => {
  const [activePage, setActivePage] = useState('login');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [darkMode, setDarkMode] = useState(false);

  const { user, login, logout, resetPassword, loading: authLoading, getCurrentUser } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Fetch dashboard data and merge with current user info
  const fetchDashboardData = useCallback(async () => {
    try {
      setApiLoading(true);

      const dashboard = await studentApi.getDashboard();
      const currentUser = await getCurrentUser();

      // Merge user info and dashboard metrics into a flat object
      const combinedData = {
        ...currentUser,   // personal info: first_name, last_name, email, phone, etc.
        ...dashboard      // metrics: classesTaken, totalClasses, assignments, startDate, etc.
      };

      setStudentData(combinedData);
      localStorage.setItem('student_data', JSON.stringify(combinedData));
    } catch (err) {
      setApiError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setApiLoading(false);
    }
  }, [getCurrentUser]);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('student_data');

    if (token && savedUser) {
      setActivePage('dashboard');
      fetchDashboardData(); // fetch fresh dashboard data
    }
  }, [fetchDashboardData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({ studentId, password });

      if (result && result.student) {
        if (result.first_login) {
          localStorage.setItem('reset_student_id', studentId);
          setActivePage('resetPassword');
        } else {
          await fetchDashboardData(); // fetch dashboard after login
          setActivePage('dashboard');
        }
      }
    } catch (err) {
      setError(err.message || "Invalid student ID or password");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const resetStudentId = localStorage.getItem('reset_student_id') || studentId;

      await resetPassword({
        studentId: resetStudentId,
        newPassword,
        confirmPassword,
      });

      localStorage.removeItem('reset_student_id');
      await fetchDashboardData(); // fetch dashboard after password reset
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message || "Failed to reset password");
    }
  };

  // Loading state
  if (apiLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600"></p>
        </div>
      </div>
    );
  }

  // Error state
  if (apiError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">Error</div>
          <p className="text-gray-600">{apiError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (activePage === 'login') {
    return (
      <LoginPage
  studentId={studentId}
  setStudentId={setStudentId}
  password={password}
  setPassword={setPassword}
  error={error}
  setError={setError}   // ✅ added
  handleLogin={handleLogin}
  loading={authLoading}
/>

    );
  }

  if (activePage === 'resetPassword') {
    return (
      <ResetPasswordPage
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        error={error}
        handlePasswordReset={handlePasswordReset}
        loading={authLoading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header
          studentData={studentData || {}}
          notificationCount={notificationCount}
          logout={logout}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Sidebar
              studentData={studentData || {}}
              activePage={activePage}
              setActivePage={setActivePage}
              logout={logout}
            />
          </div>

          <div className="md:col-span-3">
            {activePage === 'dashboard' && (
              <DashboardPage
                studentData={studentData || {}}
                setActivePage={setActivePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
