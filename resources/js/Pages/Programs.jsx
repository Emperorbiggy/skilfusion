import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import {
  BookOpen,
  Briefcase,
  Award,
  GraduationCap,
  Users,
  ChevronDown,
  ChevronUp,
  X,
  ArrowLeft,
  Clock,
  User,
  DollarSign,
  Calendar,
  CheckCircle
} from 'lucide-react';

export default function Programs({ courseId = null }) {
  // Get URL parameters from Inertia
  const { url } = usePage();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // All courses data (could also come from props/backend)
  const courses = [
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      duration: '3 Months',
      physicalPrice: '₦600,000',
      virtualPrice: '₦450,000',
      description: 'Master user-centered design principles and create professional interfaces that delight users and drive engagement.',
      features: [
        "Figma & Adobe XD",
        "User Research",
        "Prototyping",
        "Design Systems",
        "Usability Testing",
        "Interaction Design"
      ],
      syllabus: [
        { week: 1, topic: "Introduction to UX Design Principles" },
        { week: 2, topic: "User Research Methods" },
        { week: 3, topic: "Information Architecture" },
        { week: 4, topic: "Wireframing & Prototyping" },
        { week: 5, topic: "UI Design Fundamentals" },
        { week: 6, topic: "Design Systems & Style Guides" },
        { week: 7, topic: "Interaction Design" },
        { week: 8, topic: "Usability Testing" },
        { week: 9, topic: "Portfolio Project" },
        { week: 10, topic: "Career Preparation" }
      ],
      outcomes: [
        "Create professional-grade UI designs",
        "Conduct user research",
        "Build interactive prototypes",
        "Develop design systems",
        "Prepare a job-ready portfolio"
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>,
      popular: false
    },
    {
      id: 'fullstack-development',
      title: 'Fullstack Development',
      duration: '6 Months',
      physicalPrice: '₦850,000',
      virtualPrice: '₦650,000',
      description: 'Become a versatile developer capable of building complete applications from database to UI.',
      features: [
        "MERN Stack",
        "Authentication",
        "API Integration",
        "DevOps Basics",
        "Database Design",
        "Cloud Deployment"
      ],
      syllabus: [
        { week: 1, topic: "HTML, CSS & JavaScript Fundamentals" },
        { week: 2, topic: "Responsive Design" },
        { week: 3, topic: "React Fundamentals" },
        { week: 4, topic: "Advanced React" },
        { week: 5, topic: "Node.js & Express" },
        { week: 6, topic: "MongoDB & Database Design" },
        { week: 7, topic: "Authentication & Authorization" },
        { week: 8, topic: "RESTful APIs" },
        { week: 9, topic: "Deployment & DevOps" },
        { week: 10, topic: "Final Project & Career Prep" }
      ],
      outcomes: [
        "Build fullstack applications",
        "Implement authentication",
        "Design RESTful APIs",
        "Deploy applications",
        "Work with databases"
      ],
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>,
      popular: true
    },
    // Add other courses similarly...
  ];

  // Set selected course based on URL or courseId prop
  useEffect(() => {
    if (courseId) {
      const course = courses.find(c => c.id === courseId);
      setSelectedCourse(course);
    } else {
      // Check URL hash for course ID
      const hash = window.location.hash.substring(1);
      if (hash) {
        const course = courses.find(c => c.id === hash);
        setSelectedCourse(course);
      }
    }
  }, [courseId, url]);

  // Clear selected course
  const clearSelectedCourse = () => {
    setSelectedCourse(null);
    window.history.pushState({}, '', '/programs');
  };

  return (
    <>
      <Head title="Our Programs" />
      
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <span className="text-white font-bold text-xl">SFA</span>
                </div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                SkillFusion<span className="font-extrabold">Africa</span>
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
            <Link href="/programs" className="font-semibold text-blue-600 transition duration-300">Programs</Link>
            <Link href="#about" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300">About</Link>
            <Link href="#contact" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link>
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
        {mobileMenuOpen && (
          <div className="lg:hidden container mx-auto px-4 py-4 bg-white">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-lg font-medium text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/programs" className="text-lg font-semibold text-blue-600">Programs</Link>
              <Link href="#about" className="text-lg font-medium text-gray-700 hover:text-blue-600">About</Link>
              <Link href="#contact" className="text-lg font-medium text-gray-700 hover:text-blue-600">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {selectedCourse ? (
          /* Single Course Detail View */
          <div className="container mx-auto px-6 py-12">
            <button 
              onClick={clearSelectedCourse}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to all programs
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Course Header */}
              <div className={`p-8 text-white ${selectedCourse.popular ? 'bg-gradient-to-r from-blue-700 to-indigo-800' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedCourse.title}</h1>
                    <p className="text-lg opacity-90">{selectedCourse.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 bg-white/20 px-4 py-2 rounded-lg">
                    <span className="font-semibold">{selectedCourse.duration} Program</span>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Program</h2>
                    <p className="text-gray-700 mb-6">
                      Our {selectedCourse.title} program is designed to take you from beginner to job-ready professional. 
                      Through hands-on projects and expert instruction, you'll gain the skills needed to excel in this field.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {selectedCourse.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="flex-shrink-0 h-5 w-5 text-[#F7A400] mr-2 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Program Syllabus</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                      {selectedCourse.syllabus.map((item, index) => (
                        <div 
                          key={index} 
                          className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200 last:border-b-0`}
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 font-medium">
                              {item.week}
                            </div>
                            <span className="font-medium text-gray-800">{item.topic}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Outcomes</h3>
                    <ul className="space-y-3 mb-8">
                      {selectedCourse.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-blue-100 p-1 rounded-full mr-3">
                            <svg className="w-4 h-4 text-[#F7A400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span className="text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Pricing Card */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Program Investment</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center">
                          <MonitorPlay className="w-5 h-5 mr-2 text-blue-600" />
                          Virtual Classes
                        </span>
                        <span className="font-bold text-gray-900">{selectedCourse.virtualPrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center">
                          <Users className="w-5 h-5 mr-2 text-blue-600" />
                          Physical Classes
                        </span>
                        <span className="font-bold text-gray-900">{selectedCourse.physicalPrice}</span>
                      </div>
                    </div>

                    <div className="mt-6 bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Payment Options</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="flex-shrink-0 h-4 w-4 text-[#F7A400] mr-2 mt-0.5" />
                          Pay in full (5% discount)
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="flex-shrink-0 h-4 w-4 text-[#F7A400] mr-2 mt-0.5" />
                          3-month installment plan
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="flex-shrink-0 h-4 w-4 text-[#F7A400] mr-2 mt-0.5" />
                          6-month payment plan (+10%)
                        </li>
                      </ul>
                    </div>

                    <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300">
                      Enroll Now
                    </button>
                  </div>

                  {/* Key Details */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Program Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Clock className="flex-shrink-0 w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Duration</h4>
                          <p className="text-gray-600">{selectedCourse.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <User className="flex-shrink-0 w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Instructor</h4>
                          <p className="text-gray-600">Industry Expert</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="flex-shrink-0 w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Next Cohort</h4>
                          <p className="text-gray-600">Starting September 30, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* All Courses Grid View */
          <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Tech</span> Programs
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Industry-aligned programs designed to transform beginners into job-ready professionals through immersive, project-based learning.
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div 
                  key={course.id}
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
                  
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">You'll Learn:</h4>
                    <ul className="space-y-2">
                      {course.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#F7A400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    href={`/programs#${course.id}`}
                    className="w-full mt-auto group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white border-2 border-blue-600 text-blue-600 hover:shadow-md px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    Explore Program
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}