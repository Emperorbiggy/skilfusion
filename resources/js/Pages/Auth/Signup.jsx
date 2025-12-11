import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const FreeBootcampRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    country: '',
    otherCountry: '',
    state: '',
    city: '',
    phone: '',
    whatsapp: '',
    course: 'web-development',
    agreeTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtherCountry, setShowOtherCountry] = useState(false);
  const [studentCredentials, setStudentCredentials] = useState({ studentId: '', password: '' });
  const [submitError, setSubmitError] = useState('');

  const courses = [
    {
      id: 'web-development',
      title: "Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript and build responsive websites in just 2 weeks",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: [
        "HTML5 & CSS3 Fundamentals",
        "JavaScript Essentials",
        "Responsive Design Techniques",
        "Git & GitHub Basics",
        "Build 3 Real Projects"
      ]
    },
    {
      id: 'ui-ux',
      title: "UI/UX Design Bootcamp",
      description: "Master design principles, Figma, and create stunning interfaces in 2 weeks",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      features: [
        "UI Design Principles",
        "Figma Masterclass",
        "User Research Methods",
        "Wireframing & Prototyping",
        "Create 3 Portfolio Projects"
      ]
    }
  ];

  const countries = [
    "Nigeria", "Ghana", "South Africa", "Kenya", "Egypt", 
    "Ethiopia", "Tanzania", "Uganda", "Rwanda", "Cameroon",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (name === 'country') {
      setShowOtherCountry(value === 'Other');
      if (value !== 'Other') {
        setFormData(prev => ({...prev, otherCountry: ''}));
      }
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.country) newErrors.country = 'Country is required';
    if (formData.country === 'Other' && !formData.otherCountry.trim()) {
      newErrors.otherCountry = 'Please specify your country';
    }
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    
    // Phone validation - must start with + and have at least 8 digits
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+\d{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number with country code (e.g. +2348123456789)';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^\+\d{8,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp number with country code (e.g. +2348123456789)';
    }
    
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Prepare data for backend
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          middleName: formData.middleName,
          email: formData.email,
          country: formData.country === 'Other' ? formData.otherCountry : formData.country,
          state: formData.state,
          city: formData.city,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          course: formData.course,
          agreeTerms: formData.agreeTerms
        };

        // Send registration data to backend
        const response = await axios.post('/api/register-bootcamp', payload);
        
        // Store generated credentials
        setStudentCredentials({
          studentId: response.data.student_id,
          password: response.data.password
        });
        
        setIsSubmitted(true);
      } catch (error) {
        console.error('Registration error:', error);
        
        // Handle different error types
        if (error.response) {
          // Server responded with error status
          if (error.response.status === 422) {
            // Validation errors from backend
            setErrors(error.response.data.errors || {});
          } else {
            setSubmitError(error.response.data.message || 'Registration failed. Please try again.');
          }
        } else if (error.request) {
          // No response received
          setSubmitError('No response from server. Please check your connection.');
        } else {
          // Other errors
          setSubmitError('An error occurred. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      country: '',
      otherCountry: '',
      state: '',
      city: '',
      phone: '',
      whatsapp: '',
      course: 'web-development',
      agreeTerms: false
    });
    setShowOtherCountry(false);
    setErrors({});
    setIsSubmitted(false);
    setStudentCredentials({ studentId: '', password: '' });
    setSubmitError('');
  };

  const selectedCourse = courses.find(course => course.id === formData.course);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#F7A400] to-yellow-400 rounded-full mb-6">
              <span className="text-white font-bold uppercase text-sm tracking-wider">Limited Time Offer</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Free 2-Week Tech Bootcamp
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master in-demand skills with our intensive bootcamp - 100% free!
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Registration Form */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
              <h2 className="text-2xl font-bold">Secure Your Spot Now</h2>
              <p className="opacity-90">Only 50 spots available per cohort</p>
            </div>
            
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Registration Successful!</h3>
                  <p className="text-gray-600 mb-6">
                    Congratulations! You've secured your spot in our free {selectedCourse.title}. 
                    We've sent a confirmation email with all the details.
                  </p>
                  
                  {/* Credentials Box */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 text-center border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Your Login Credentials</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-left">
                        <span className="text-sm text-gray-600 block">Student ID:</span>
                        <span className="font-bold text-lg text-blue-700">{studentCredentials.studentId}</span>
                      </div>
                      <div className="text-left">
                        <span className="text-sm text-gray-600 block">Password:</span>
                        <span className="font-bold text-lg text-blue-700">{studentCredentials.password}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-red-500">
                      Please save these credentials. You'll need them to access the bootcamp portal.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                    <h4 className="font-semibold text-gray-800 mb-2">Next Steps:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F7A400] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Check your email for the welcome package</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F7A400] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Join our WhatsApp group for updates</span>
                      </li>
                      {/* <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F7A400] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Bootcamp starts in 3 days - be prepared!</span>
                      </li> */}
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F7A400] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Use your credentials to log in to the portal</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    Register Another Person
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Submit Error Message */}
                  {submitError && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="firstName">
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.firstName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="lastName">
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.lastName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="middleName">
                          Middle Name
                        </label>
                        <input
                          id="middleName"
                          name="middleName"
                          type="text"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                        }`}
                        placeholder="john.doe@example.com"
                      />
                      {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="country">
                          Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.country ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                          }`}
                        >
                          <option value="">Select Country</option>
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        {errors.country && <p className="mt-1 text-red-500 text-sm">{errors.country}</p>}
                      </div>
                      
                      {showOtherCountry && (
                        <div>
                          <label className="block text-gray-700 mb-2" htmlFor="otherCountry">
                            Specify Your Country *
                          </label>
                          <input
                            id="otherCountry"
                            name="otherCountry"
                            type="text"
                            value={formData.otherCountry}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                              errors.otherCountry ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                            }`}
                            placeholder="Enter your country name"
                          />
                          {errors.otherCountry && <p className="mt-1 text-red-500 text-sm">{errors.otherCountry}</p>}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2" htmlFor="state">
                            State/Region *
                          </label>
                          <input
                            id="state"
                            name="state"
                            type="text"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                              errors.state ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                            }`}
                            placeholder="Lagos"
                          />
                          {errors.state && <p className="mt-1 text-red-500 text-sm">{errors.state}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-2" htmlFor="city">
                            City *
                          </label>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                              errors.city ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                            }`}
                            placeholder="Ikeja"
                          />
                          {errors.city && <p className="mt-1 text-red-500 text-sm">{errors.city}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="phone">
                          Phone Number (with country code) *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.phone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                          }`}
                          placeholder="+2348123456789"
                        />
                        {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="whatsapp">
                          WhatsApp Number (with country code) *
                        </label>
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.whatsapp ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                          }`}
                          placeholder="+2348123456789"
                        />
                        {errors.whatsapp && <p className="mt-1 text-red-500 text-sm">{errors.whatsapp}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Select Your Bootcamp</h3>
                    
                    <div className="grid grid-cols-1 gap-6 mb-6">
                      {courses.map((course) => (
                        <label 
                          key={course.id}
                          className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
                            formData.course === course.id 
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-4 mb-4 md:mb-0">
                              {course.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-900 text-lg mb-2">{course.title}</span>
                                <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                                <ul className="space-y-1 text-sm text-gray-600">
                                  {course.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      <span className="truncate">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-4">
                              <input
                                type="radio"
                                name="course"
                                value={course.id}
                                checked={formData.course === course.id}
                                onChange={handleInputChange}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#F7A400] to-yellow-500 rounded-xl p-4 text-center">
                      <p className="font-bold text-white">Both bootcamps include free career coaching and certificate!</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <span className="text-gray-700">
                        I agree to the SkillFusion Africa <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agreeTerms && <p className="mt-1 text-red-500 text-sm">{errors.agreeTerms}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#F7A400] to-yellow-500 hover:from-[#e69500] hover:to-[#F7A400] text-white font-bold px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Securing Your Spot...
                      </span>
                    ) : (
                      "Enroll in Free Bootcamp"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          
          {/* Right Column - Benefits */}
          <motion.div 
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6">Why Join Our Free Bootcamp?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">100% Free Access</h3>
                  <p className="opacity-90">No hidden fees - all learning materials, resources, and mentorship included at zero cost</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Intensive 2-Week Program</h3>
                  <p className="opacity-90">Quickly gain practical skills with our focused, project-based curriculum</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Expert Mentorship</h3>
                  <p className="opacity-90">Learn from industry professionals with real-world experience</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Certificate of Completion</h3>
                  <p className="opacity-90">Earn a verifiable certificate to showcase your new skills</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Career Opportunities</h3>
                  <p className="opacity-90">Top performers get access to job placement assistance</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-bold text-xl mb-3">Bootcamp Schedule</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Start Date:</span>
                  <span className="font-bold">July 15, 2023</span>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Duration:</span>
                  <span className="font-bold">2 Weeks</span>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Time Commitment:</span>
                  <span className="font-bold">3 hours/day</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Delivery:</span>
                  <span className="font-bold">100% Virtual</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-[#F7A400] to-yellow-500 rounded-xl p-6 text-center">
              <h3 className="font-bold text-xl mb-2">Special Bonus!</h3>
              <p className="mb-3">First 50 registrants get:</p>
              <ul className="space-y-2 font-medium">
                <li className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free access to premium learning resources
                </li>
                <li className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1:1 career coaching session
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Testimonials */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Past Participants Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Aisha Bello",
                course: "UI/UX Bootcamp",
                testimonial: "This bootcamp transformed my design skills in just 2 weeks! I landed my first freelance gig before we even finished.",
                avatar: "AB"
              },
              {
                name: "Chinedu Okoro",
                course: "Web Development Bootcamp",
                testimonial: "I went from zero coding experience to building my own portfolio website. The instructors were amazing!",
                avatar: "CO"
              },
              {
                name: "Fatima Mohammed",
                course: "UI/UX Bootcamp",
                testimonial: "The hands-on projects and expert feedback helped me build a portfolio that got me hired within a month!",
                avatar: "FM"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-800">{testimonial.avatar}</span>
                </div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-blue-600 mb-4">{testimonial.course}</p>
                <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeBootcampRegistration;