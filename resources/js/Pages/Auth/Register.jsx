import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, X } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    mode: 'virtual',
    paymentPlan: 'full',
    agreeTerms: false
  });
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const courses = [
    {
      id: 'ui-ux',
      title: "UI/UX Design",
      duration: "3 Months",
      physicalPrice: "₦600,000",
      virtualPrice: "₦450,000",
      description: "Master user-centered design principles and create professional interfaces that delight users and drive engagement."
    },
    {
      id: 'fullstack',
      title: "Fullstack Development",
      duration: "6 Months",
      physicalPrice: "₦850,000",
      virtualPrice: "₦650,000",
      description: "Become a versatile developer capable of building complete applications from database to UI.",
      popular: true
    },
    {
      id: 'data-science',
      title: "Data Science",
      duration: "5 Months",
      physicalPrice: "₦750,000",
      virtualPrice: "₦550,000",
      description: "Transform raw data into actionable insights using statistical methods and visualization tools."
    }
  ];

  const paymentPlans = [
    { id: 'full', label: 'Full Payment', description: 'Pay once and get 5% discount' },
    { id: 'installment3', label: '3-Month Installment', description: 'Equal monthly payments' },
    { id: 'installment6', label: '6-Month Installment', description: 'Monthly payments with 10% fee' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const selectCourse = (course) => {
    setFormData({ ...formData, course: course.id });
    setSelectedCourse(course);
    setShowCourseDropdown(false);
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
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log('Form submitted:', formData);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      course: '',
      mode: 'virtual',
      paymentPlan: 'full',
      agreeTerms: false
    });
    setSelectedCourse(null);
    setErrors({});
    setIsSubmitted(false);
  };

  const formatCurrency = (amount) => {
    return amount.replace('₦', '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Register for <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">SkillFusion Africa</span>
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our next cohort and transform your career with industry-relevant tech skills
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering for <span className="font-semibold">{selectedCourse?.title}</span> at SkillFusion Africa. 
              Our admissions team will contact you shortly with further details.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Registration Details:</h3>
              <p><span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}</p>
              <p><span className="text-gray-600">Email:</span> {formData.email}</p>
              <p><span className="text-gray-600">Course:</span> {selectedCourse?.title}</p>
              <p><span className="text-gray-600">Mode:</span> {formData.mode === 'physical' ? 'Physical Classes' : 'Virtual Classes'}</p>
            </div>
            <button
              onClick={resetForm}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              Register Another Course
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Registration</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="firstName">
                      First Name
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
                      Last Name
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
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email Address
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
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Phone Number
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
                    placeholder="+234 812 345 6789"
                  />
                  {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="course">
                    Select Course
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                      className={`w-full flex justify-between items-center px-4 py-3 border rounded-lg text-left ${
                        errors.course ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <span>
                        {selectedCourse ? selectedCourse.title : "Choose a course"}
                      </span>
                      <ChevronDown className={`transition-transform ${showCourseDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showCourseDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => selectCourse(course)}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-medium">{course.title}</span>
                              {course.popular && (
                                <span className="bg-gradient-to-r from-[#F7A400] to-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                                  POPULAR
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{course.duration}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.course && <p className="mt-1 text-red-500 text-sm">{errors.course}</p>}
                </div>
                
                {selectedCourse && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{selectedCourse.title}</h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {selectedCourse.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{selectedCourse.description}</p>
                    <div className="flex justify-between">
                      <div>
                        <span className="text-gray-700 font-medium">Physical:</span>
                        <span className="ml-2 text-gray-900">{selectedCourse.physicalPrice}</span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Virtual:</span>
                        <span className="ml-2 text-gray-900">{selectedCourse.virtualPrice}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-3">Learning Mode</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.mode === 'physical' 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="mode"
                        value="physical"
                        checked={formData.mode === 'physical'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">Physical Classes</span>
                      </div>
                    </label>
                    
                    <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.mode === 'virtual' 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="mode"
                        value="virtual"
                        checked={formData.mode === 'virtual'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="font-medium">Virtual Classes</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-3">Payment Plan</label>
                  <div className="space-y-3">
                    {paymentPlans.map((plan) => (
                      <label key={plan.id} className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.paymentPlan === plan.id 
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          name="paymentPlan"
                          value={plan.id}
                          checked={formData.paymentPlan === plan.id}
                          onChange={handleInputChange}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className="font-medium">{plan.label}</div>
                          <div className="text-sm text-gray-600">{plan.description}</div>
                        </div>
                      </label>
                    ))}
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
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </form>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6">Your Registration Summary</h2>
              
              {selectedCourse ? (
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3">{selectedCourse.title}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span>{selectedCourse.duration} Program</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {formData.mode === 'physical' ? 'Physical' : 'Virtual'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Program Fee:</span>
                        <span className="font-bold">
                          {formData.mode === 'physical' ? selectedCourse.physicalPrice : selectedCourse.virtualPrice}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Payment Plan:</span>
                        <span className="font-bold">
                          {paymentPlans.find(p => p.id === formData.paymentPlan)?.label}
                        </span>
                      </div>
                      
                      <div className="pt-3 border-t border-white/20">
                        <div className="flex justify-between font-bold">
                          <span>Total Due:</span>
                          <span>
                            {formData.mode === 'physical' ? selectedCourse.physicalPrice : selectedCourse.virtualPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="font-bold mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Access to all course materials and resources</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Personal mentorship from industry experts</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Lifetime access to alumni network</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Career support and job placement assistance</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Certificate upon completion</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#F7A400] to-yellow-500 rounded-xl p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Special Offer!</h3>
                    <p>Register today and get access to our exclusive career prep workshop for free!</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-lg opacity-90">
                    Select a course to see details about your registration
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;