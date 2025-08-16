import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import paystackLogo from '@/images/paystack.png';
import {
  BookOpen,
  Briefcase,
  Award,
  GraduationCap,
  Group,
  Laptop2,
  MonitorPlay,
  Users,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';

export default function Home() {
  // State management
  const [countdown, setCountdown] = useState({});
  const targetDate = new Date('2025-09-30T00:00:00');
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  const [mode, setMode] = useState('physical');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Navigation items data
  const navItems = [
    { name: "Home", href: "#", section: 'home' },
    { name: "Programs", href: "#courses", section: 'courses' },
    { name: "About Us", href: "#about", section: 'about' },
    { name: "News", href: "#news", section: 'news' },
    { name: "Contact", href: "#contact", section: 'contact' }
  ];

  // Course data
  const courses = [
    {
      title: "UI/UX Design",
      duration: "3 Months",
      physicalPrice: "₦600,000",
      virtualPrice: "₦450,000",
      features: [
        "Pay in full (5% discount)",
        "3-month installment plan",
        "6-month payment plan (+10%)",
        "Access to design resources"
      ],
      popular: false
    },
    {
      title: "Fullstack Development",
      duration: "6 Months",
      physicalPrice: "₦850,000",
      virtualPrice: "₦650,000",
      features: [
        "Pay in full (7% discount)",
        "4-month installment plan",
        "8-month payment plan (+12%)",
        "Career support included"
      ],
      popular: true
    },
    {
      title: "Data Science",
      duration: "5 Months",
      physicalPrice: "₦750,000",
      virtualPrice: "₦550,000",
      features: [
        "Pay in full (5% discount)",
        "4-month installment plan",
        "6-month payment plan (+8%)",
        "Cloud credits included"
      ],
      popular: false
    }
  ];

  // Image slider data
  const images = [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80'
  ];

  // Set active section based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      setCurrentSection(hash || 'home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Image slider timer
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(imageTimer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head title="Welcome" />
      
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-xl">SFA</span>
              </div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              SkillFusion <span className="font-extrabold">Africa</span>
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`relative font-medium transition duration-300 ${
                  currentSection === item.section 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setCurrentSection(item.section)}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#F7A400] to-yellow-300 transition-all duration-300 ${
                  currentSection === item.section ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
                
                {currentSection === item.section && (
                  <span className="absolute -top-1 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                )}
              </a>
            ))}
          </div>
          
          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Login
            </button>
            <button className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg group-hover:-translate-y-0.5 inline-flex items-center">
                Apply Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-700 hover:text-blue-600 p-2 rounded-md focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <a 
                      key={item.name}
                      href={item.href} 
                      className={`text-lg font-medium transition duration-300 ${
                        currentSection === item.section 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => {
                        setCurrentSection(item.section);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                  
                  <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                    <button className="w-full text-gray-700 hover:text-blue-600 font-medium transition duration-300 text-left py-2">
                      Login
                    </button>
                    <button className="relative group w-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg group-hover:-translate-y-0.5 inline-flex items-center justify-center w-full">
                        Apply Now
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Banner with Image Slider */}
<div className="relative w-full h-screen max-h-[95vh] overflow-hidden">
  {/* Image slider with fade transition */}
  <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
    {images.map((image, index) => (
      <div 
        key={index}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
    ))}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
  </div>
  
  {/* Hero content with adjusted padding-bottom for countdown */}
  <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10 pb-32 sm:pb-0">
    <div className="max-w-4xl space-y-6 animate-fade-in-up">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-[#F7A400]">Empowering Africa</span> with Future Tech Skills
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
        Transform your career with industry-relevant training in high-demand tech fields. Join our community of innovators.
      </p>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white scale-150' : 'bg-white/50'}`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
              )}
            </button>
          ))}
          <span className="text-xs text-white ml-2 font-medium">
            {currentImageIndex + 1}/{images.length}
          </span>
        </div>
      {/* Button container with flex-wrap for mobile */}
      <div className="flex flex-wrap justify-center gap-2">
        <button className="relative group min-w-[200px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7A400] to-yellow-500 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative bg-gradient-to-r from-[#F7A400] to-yellow-400 hover:from-yellow-500 hover:to-[#F7A400] text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center w-full">
            Explore Programs
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </button>
        <button className="relative group min-w-[200px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center w-full">
            Watch Video
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>

        {/* Countdown Card */}
        <div className="absolute left-1/2 bottom-[-80px] transform -translate-x-1/2 w-full max-w-md bg-white text-blue-900 shadow-2xl rounded-xl p-4 z-20 border border-blue-100 hover:border-blue-200 transition-all duration-300 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-10 group-hover:opacity-20 blur-sm transition-opacity duration-300 -z-10"></div>
          
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-center bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
            Web Development & UI/UX
          </h2>
          <p className="text-center text-gray-600 mb-4 font-medium">Next cohort starts in:</p>
          
          <div className="flex justify-center space-x-3 sm:space-x-4 text-center">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Mins', value: countdown.minutes },
              { label: 'Secs', value: countdown.seconds }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-gradient-to-b from-blue-600 to-indigo-700 text-white text-xl font-bold w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  {item.value?.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm mt-2 text-gray-600 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 text-white px-8 py-3 rounded-full font-medium inline-flex items-center hover:shadow-lg transition-all duration-300">
                Reserve Your Spot
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        
      </div>

   {/* Advanced Courses Section */}
<section id="courses" className="relative overflow-hidden py-24 bg-gradient-to-b from-blue-50 to-white">
  <div className="absolute top-0 left-0 w-full h-full opacity-5">
    <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute top-40 right-0 w-96 h-96 bg-[#F7A400] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center mb-20">
      <span className="inline-block mb-4 text-[#F7A400] font-semibold tracking-widest uppercase">Our Programs</span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Master In-Demand</span> Tech Skills
      </h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-[#F7A400] mx-auto mb-6 rounded-full"></div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Industry-aligned programs designed to transform beginners into job-ready professionals through immersive, project-based learning.
      </p>
    </div>

    {/* Mobile Slider */}
    <div className="md:hidden relative">
      <div className="overflow-x-auto pb-6">
        <div className="flex space-x-6 w-max px-4">
          {[
            {
              title: 'UI/UX Design',
              desc: 'Master user-centered design principles and create professional interfaces that delight users and drive engagement.',
              duration: '3 Months',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>,
              features: ['Figma & Adobe XD', 'User Research', 'Prototyping', 'Design Systems']
            },
            {
              title: 'Backend Development',
              desc: 'Build scalable, high-performance server-side applications with modern architectures and cloud integration.',
              duration: '4 Months',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>,
              features: ['Node.js/Python', 'RESTful APIs', 'Database Design', 'Cloud Deployment']
            },
            {
              title: 'Cyber Security',
              desc: 'Develop expertise in identifying vulnerabilities and implementing robust security measures for systems.',
              duration: '5 Months',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>,
              features: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Incident Response']
            },
            {
              title: 'Frontend Development',
              desc: 'Create stunning, responsive user interfaces with modern frameworks and cutting-edge techniques.',
              duration: '4 Months',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>,
              features: ['React/Vue.js', 'TypeScript', 'State Management', 'Performance Optimization']
            },
            {
              title: 'FullStack Development',
              desc: 'Become a versatile developer capable of building complete applications from database to UI.',
              duration: '6 Months',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>,
              features: ['MERN Stack', 'Authentication', 'API Integration', 'DevOps Basics']
            },
            {
              title: 'Data Analysis',
              desc: 'Transform raw data into actionable insights using statistical methods and visualization tools.',
              duration: '4 Months',
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>,
              features: ['Python/R', 'SQL', 'Machine Learning', 'Data Visualization']
            }
          ].map((course, i) => (
            <div 
              key={i} 
              className="w-80 flex-shrink-0 relative group bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-[#F7A400] rounded-t-2xl"></div>
              
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-xl mr-4 shadow-inner">
                  <div className="bg-gradient-to-br from-[#F7A400] to-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                    {course.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                  <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                    {course.duration}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{course.desc}</p>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">You'll Learn:</h4>
                <ul className="space-y-2">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#F7A400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full mt-auto group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white border-2 border-blue-600 text-blue-600 hover:shadow-md px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center">
                Explore Program
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
    </div>

    {/* Desktop Grid (hidden on mobile) */}
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: 'UI/UX Design',
          desc: 'Master user-centered design principles and create professional interfaces that delight users and drive engagement.',
          duration: '3 Months',
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>,
          features: ['Figma & Adobe XD', 'User Research', 'Prototyping', 'Design Systems']
        },
        {
          title: 'Backend Development',
          desc: 'Build scalable, high-performance server-side applications with modern architectures and cloud integration.',
          duration: '4 Months',
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>,
          features: ['Node.js/Python', 'RESTful APIs', 'Database Design', 'Cloud Deployment']
        },
        {
          title: 'Cyber Security',
          desc: 'Develop expertise in identifying vulnerabilities and implementing robust security measures for systems.',
          duration: '5 Months',
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>,
          features: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Incident Response']
        },
        {
          title: 'Frontend Development',
          desc: 'Create stunning, responsive user interfaces with modern frameworks and cutting-edge techniques.',
          duration: '4 Months',
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>,
          features: ['React/Vue.js', 'TypeScript', 'State Management', 'Performance Optimization']
        },
        {
          title: 'FullStack Development',
          desc: 'Become a versatile developer capable of building complete applications from database to UI.',
          duration: '6 Months',
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>,
          features: ['MERN Stack', 'Authentication', 'API Integration', 'DevOps Basics']
        },
        {
          title: 'Data Analysis',
          desc: 'Transform raw data into actionable insights using statistical methods and visualization tools.',
          duration: '4 Months',
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>,
          features: ['Python/R', 'SQL', 'Machine Learning', 'Data Visualization']
        }
      ].map((course, i) => (
        <div 
          key={i} 
          className="relative group bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-[#F7A400] rounded-t-2xl"></div>
          
          <div className="flex items-start mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-xl mr-4 shadow-inner">
              <div className="bg-gradient-to-br from-[#F7A400] to-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                {course.icon}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
              <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                {course.duration}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">{course.desc}</p>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">You'll Learn:</h4>
            <ul className="space-y-2">
              {course.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#F7A400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <button className="w-full mt-auto group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white border-2 border-blue-600 text-blue-600 hover:shadow-md px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center">
            Explore Program
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      ))}
    </div>

    <div className="mt-16 text-center">
      <button className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
        <span className="relative z-10">View All Programs</span>
        <span className="absolute inset-0 bg-gradient-to-r from-[#F7A400] to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
    </div>
  </div>
</section>

      {/* Why Study at SFA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Why Study at SFA?</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover the benefits of learning with us and how we help you grow into a world-class tech professional.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-left">
            {[
              {
                icon: <Laptop2 className="w-10 h-10 text-[#F7A400]" />, 
                title: "Project Based Learning",
                desc: "Our courses are practical, hands-on learning. Practice and apply knowledge with real world projects that contribute largely to your portfolio."
              },
              {
                icon: <GraduationCap className="w-10 h-10 text-[#F7A400]" />,
                title: "Expert Instructors",
                desc: "Get to interact with different mentors and draw from their loads of experience."
              },
              {
                icon: <MonitorPlay className="w-10 h-10 text-[#F7A400]" />,
                title: "Physical & Virtual Class",
                desc: "You can now choose physical class experience or online classroom and learn from anywhere in the world."
              },
              {
                icon: <Group className="w-10 h-10 text-[#F7A400]" />,
                title: "Free Access to Our Hub & Community",
                desc: "You will have access to our fully functional hub for co-working and working on projects, assignments and even begin a start-up."
              },
              {
                icon: <Award className="w-10 h-10 text-[#F7A400]" />,
                title: "Certification",
                desc: "Be certified by an accredited and globally recognized institution. SFA got its accreditation in Sept 2021 from the NBTE, Nigeria."
              },
              {
                icon: <Users className="w-10 h-10 text-[#F7A400]" />,
                title: "Alumni Support",
                desc: "Our students have access to alumni who currently work at top tech organizations in the world such as Google, Microsoft, Interswitch etc."
              },
              {
                icon: <Briefcase className="w-10 h-10 text-[#F7A400]" />,
                title: "Job Opportunity",
                desc: "78.5% of our students found secure employment within three months of graduation. Students leave from learning to getting job roles."
              },
              {
                icon: <BookOpen className="w-10 h-10 text-[#F7A400]" />,
                title: "Access to Study Materials",
                desc: "Students have access to prerecorded videos and resources they can make use of to further solidify their knowledge."
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 border border-blue-50">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Our alumni work at world-class companies
          </h2>
          <p className="text-blue-100 mb-10 max-w-xl mx-auto">
            Including global tech giants and leading African startups.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
            {[
              { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
              { name: 'Paystack', logo: paystackLogo },
              { name: 'PayPro', logo: 'https://cdn.worldvectorlogo.com/logos/paypro.svg' },
              { name: 'Easinovation', logo: 'https://via.placeholder.com/100x60?text=Easinovation' },
              { name: 'Rifelink Tech', logo: 'https://via.placeholder.com/100x60?text=Rifelink' },
              { name: 'Africore', logo: 'https://via.placeholder.com/100x60?text=Africore' },
            ].map((company, i) => (
              <div key={i} className="flex items-center justify-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-12 object-contain grayscale brightness-0 invert hover:grayscale-0 hover:brightness-100 hover:invert-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Section */}
<section id="payment" className="relative py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F7A400] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center mb-16">
      <span className="inline-block mb-4 text-[#F7A400] font-semibold tracking-widest uppercase">Flexible Learning</span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Investment</span> Options
      </h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-[#F7A400] mx-auto mb-6 rounded-full"></div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Choose your preferred learning mode and discover flexible payment plans tailored to your needs
      </p>
    </div>

    {/* Interactive mode selector */}
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-white rounded-full p-1 shadow-lg border border-gray-200">
        <button 
          className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center ${
            mode === 'physical' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
          onClick={() => setMode('physical')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Physical Classes
        </button>
        <button 
          className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center ${
            mode === 'virtual' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
          onClick={() => setMode('virtual')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Virtual Classes
        </button>
      </div>
    </div>

    {/* Mobile Slider */}
    <div className="lg:hidden relative">
      <div className="overflow-x-auto pb-6">
        <div className="flex space-x-6 w-max px-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="w-80 flex-shrink-0 relative"
            >
              {course.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#F7A400] to-yellow-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-10">
                  MOST POPULAR
                </div>
              )}
              <div className={`h-full bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border-2 ${
                hoveredCard === index 
                  ? 'border-blue-500 shadow-2xl' 
                  : course.popular 
                    ? 'border-[#F7A400]' 
                    : 'border-transparent'
              }`}>
                <div className={`p-6 text-white ${
                  course.popular 
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-700' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                }`}>
                  <h3 className="text-2xl font-bold">{course.title}</h3>
                  <p className="opacity-90">{course.duration} Program</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-6 text-center">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {mode === 'physical' ? 'On-Campus Price' : 'Online Price'}
                    </h4>
                    <p className="text-4xl font-bold text-gray-900 mb-1">
                      {mode === 'physical' ? course.physicalPrice : course.virtualPrice}
                    </p>
                    <p className="text-blue-600 font-medium">
                      Save ₦{mode === 'physical' ? '150,000' : '100,000'} with online
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Payment Options
                    </h4>
                    <ul className="space-y-3">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="bg-blue-100 p-1 rounded-full mr-3">
                            <svg className="w-4 h-4 text-[#F7A400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className={`w-full px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                    course.popular
                      ? 'bg-gradient-to-r from-[#F7A400] to-yellow-500 text-white hover:shadow-lg hover:-translate-y-1'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md'
                  }`}>
                    Enroll Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="flex justify-center mt-4">
        <div className="flex space-x-2">
          {courses.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
    </div>

    {/* Desktop Grid (hidden on mobile) */}
    <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <div
          key={index}
          className={`relative ${course.popular ? 'lg:-mt-6' : ''}`}
        >
          {course.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#F7A400] to-yellow-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-10">
              MOST POPULAR
            </div>
          )}
          <div className={`h-full bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border-2 ${
            hoveredCard === index 
              ? 'border-blue-500 shadow-2xl' 
              : course.popular 
                ? 'border-[#F7A400]' 
                : 'border-transparent'
          }`}>
            <div className={`p-6 text-white ${
              course.popular 
                ? 'bg-gradient-to-r from-blue-700 to-indigo-700' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600'
            }`}>
              <h3 className="text-2xl font-bold">{course.title}</h3>
              <p className="opacity-90">{course.duration} Program</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6 text-center">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {mode === 'physical' ? 'On-Campus Price' : 'Online Price'}
                </h4>
                <p className="text-4xl font-bold text-gray-900 mb-1">
                  {mode === 'physical' ? course.physicalPrice : course.virtualPrice}
                </p>
                <p className="text-blue-600 font-medium">
                  Save ₦{mode === 'physical' ? '150,000' : '100,000'} with online
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Payment Options
                </h4>
                <ul className="space-y-3">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3">
                        <svg className="w-4 h-4 text-[#F7A400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className={`w-full px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                course.popular
                  ? 'bg-gradient-to-r from-[#F7A400] to-yellow-500 text-white hover:shadow-lg hover:-translate-y-1'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md'
              }`}>
                Enroll Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
            ))}
          </div>

          {/* Comparison CTA */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Need help deciding?</h3>
                <p className="text-gray-600">
                  Compare all programs side-by-side to find your perfect match
                </p>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center">
                Compare Programs
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scholarship CTA */}
          <div className="mt-8 bg-gradient-to-r from-[#F7A400] to-yellow-500 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mb-10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Limited Time Scholarship!</h3>
              <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
                Apply now for up to 40% tuition discount for our upcoming cohort
              </p>
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-xl font-bold shadow-md transition-all duration-300 hover:-translate-y-1">
                Apply for Scholarship
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          It's time for you to take your tech career to the next level
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Ready to Get Started?
        </p>
        <p className="max-w-2xl mx-auto text-blue-100 mb-8">
          We provide and lead others in quality education, service, industry, and character as well as discipline.
        </p>
        <button className="bg-[#F7A400] hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
          Join Us Today
        </button>
      </div>

      {/* FAQ Section */}
<section id="faq" className="bg-gradient-to-b from-blue-50 to-white py-24">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Need Help?</span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="w-20 h-1.5 bg-blue-600 mx-auto mb-6 rounded-full"></div>
      <p className="text-gray-500 text-lg max-w-3xl mx-auto">Find quick answers to common questions about SFA. Can't find what you need? <a href="#contact" className="text-blue-600 hover:underline">Contact us</a>.</p>
    </div>

    <div className="max-w-4xl mx-auto space-y-6">
      {[
        {
          question: "How do I get into the college?",
          answer: "You can apply directly on our website by filling the admission form. After submission, our team will contact you for further steps."
        },
        {
          question: "Are your classes physical or virtual?",
          answer: "We offer both physical and virtual classes. You can choose your preferred mode of learning during application."
        },
        {
          question: "Will I get a job after my training?",
          answer: "68.5% of our students found secure employment within three months of graduation. Students graduate from class to land job roles immediately."
        }
      ].map((faq, index) => (
        <div 
          key={index} 
          className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <button 
            onClick={() => toggle(index)} 
            className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
          >
            <span className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
              {faq.question}
            </span>
            <div className="ml-4 flex-shrink-0">
              {open === index ? (
                <svg className="w-6 h-6 text-blue-600 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </button>
          
          <div 
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${open === index ? 'max-h-96 pb-6' : 'max-h-0'}`}
          >
            <div className="prose prose-blue text-gray-600">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-16 text-center">
      <p className="text-gray-500 mb-6">Still have questions?</p>
      <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150">
        Contact Support
        <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  </div>
</section>
        {/* Advanced Contact Section */}
<section id="contact" className="relative py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F7A400] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center mb-16">
      <span className="inline-block mb-4 text-[#F7A400] font-semibold tracking-widest uppercase">Contact Us</span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Let's Connect</span> & Start Your Journey
      </h2>
      <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-[#F7A400] mx-auto mb-6 rounded-full"></div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Our team is ready to guide you through your tech education journey. Reach out and we'll respond within 24 hours.
      </p>
    </div>

    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      {/* Contact Form */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="peer w-full border-b-2 border-gray-300 py-3 px-1 focus:border-blue-600 outline-none transition-all"
                  placeholder=" "
                  required
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-1 top-3 text-gray-500 peer-focus:text-blue-600 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:font-medium peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 transition-all"
                >
                  Your Name
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer w-full border-b-2 border-gray-300 py-3 px-1 focus:border-blue-600 outline-none transition-all"
                  placeholder=" "
                  required
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-1 top-3 text-gray-500 peer-focus:text-blue-600 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:font-medium peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 transition-all"
                >
                  Your Email
                </label>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                id="subject"
                className="peer w-full border-b-2 border-gray-300 py-3 px-1 focus:border-blue-600 outline-none transition-all"
                placeholder=" "
                required
              />
              <label 
                htmlFor="subject" 
                className="absolute left-1 top-3 text-gray-500 peer-focus:text-blue-600 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:font-medium peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 transition-all"
              >
                Subject
              </label>
            </div>
            
            <div className="relative">
              <textarea
                id="message"
                rows="4"
                className="peer w-full border-b-2 border-gray-300 py-3 px-1 focus:border-blue-600 outline-none transition-all"
                placeholder=" "
                required
              ></textarea>
              <label 
                htmlFor="message" 
                className="absolute left-1 top-3 text-gray-500 peer-focus:text-blue-600 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:font-medium peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 transition-all"
              >
                Your Message
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
            >
              Send Message
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      {/* Contact Info */}
      <div className="w-full lg:w-1/2">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 h-full text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Our Location</h4>
                <p className="opacity-90">123 Tech Street, Lagos, Nigeria</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Phone Number</h4>
                <p className="opacity-90">+234 812 345 6789</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Email Address</h4>
                <p className="opacity-90">info@skillfusion.africa</p>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-blue-900 to-blue-950 text-white pt-16 pb-8 overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7A400] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* Brand Column */}
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-white to-gray-100 w-12 h-12 rounded-full flex items-center justify-center mr-3 shadow-md">
            <span className="text-blue-800 font-bold text-xl">SFA</span>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            SkillFusion Africa
          </h3>
        </div>
        <p className="text-blue-200 leading-relaxed">
          Empowering the next generation of African tech talent with industry-relevant skills.
        </p>
        <div className="flex space-x-4">
          {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
            <a 
              key={social}
              href="#" 
              className="bg-blue-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              aria-label={social}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {social === 'facebook' && (
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                )}
                {social === 'twitter' && (
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                )}
                {social === 'instagram' && (
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                )}
                {social === 'linkedin' && (
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                )}
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-lg font-bold mb-6 text-white flex items-center">
          <span className="bg-gradient-to-r from-[#F7A400] to-yellow-500 w-4 h-0.5 mr-3"></span>
          Quick Links
        </h4>
        <ul className="space-y-3">
          {[
            { name: 'Home', href: '#' },
            { name: 'Courses', href: '#courses' },
            { name: 'Tuition', href: '#payment' },
            { name: 'About Us', href: '#' },
            { name: 'Contact', href: '#contact' }
          ].map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-blue-200 hover:text-white transition-all duration-300 flex items-center group"
              >
                <span className="w-2 h-2 bg-[#F7A400] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-lg font-bold mb-6 text-white flex items-center">
          <span className="bg-gradient-to-r from-[#F7A400] to-yellow-500 w-4 h-0.5 mr-3"></span>
          Contact Us
        </h4>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="bg-blue-800 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-blue-200">123 Tech Street, Lagos, Nigeria</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-800 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-blue-200">+234 812 345 6789</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-800 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-blue-200">info@skillfusion.africa</span>
          </li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="text-lg font-bold mb-6 text-white flex items-center">
          <span className="bg-gradient-to-r from-[#F7A400] to-yellow-500 w-4 h-0.5 mr-3"></span>
          Newsletter
        </h4>
        <p className="text-blue-200 mb-4">
          Subscribe to get updates on new courses and events
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-3 rounded-l-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F7A400]"
          />
          <button className="bg-gradient-to-r from-[#F7A400] to-yellow-500 hover:from-yellow-500 hover:to-[#F7A400] text-black px-4 py-3 rounded-r-lg font-medium transition-all duration-300 hover:shadow-lg">
            Join
          </button>
        </div>
        <p className="text-blue-300 text-sm mt-2">
          We'll never share your email with anyone else.
        </p>
      </div>
    </div>

    {/* Copyright */}
    <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-blue-300 mb-4 md:mb-0">
        © {new Date().getFullYear()} Skill Fusion Africa. All rights reserved.
      </p>
      <div className="flex space-x-6">
        <a href="#" className="text-blue-300 hover:text-white transition">Privacy Policy</a>
        <a href="#" className="text-blue-300 hover:text-white transition">Terms of Service</a>
        <a href="#" className="text-blue-300 hover:text-white transition">Cookies</a>
      </div>
    </div>
  </div>
</footer>
    </>
  );
}