'use client';

import { useState, useEffect } from 'react';
import { User, MapPin, Calendar, Award, Coffee, Code, Heart } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    experience: '3+',
    projects: '15+',
    technologies: '10+',
    coffees: '500+'
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, []);

  const personalInfo = [
    {
      icon: User,
      label: 'Full Name',
      value: 'Sandip Hembram'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India'
    },
    {
      icon: Calendar,
      label: 'Experience',
      value: '3+ Years'
    },
    {
      icon: Award,
      label: 'Specialization',
      value: 'ML Engineering & Backend Development'
    }
  ];

  const quickFacts = [
    {
      icon: Code,
      number: stats.projects,
      label: 'Projects Completed',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      number: stats.technologies,
      label: 'Technologies Mastered',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      number: stats.experience,
      label: 'Years Experience',
      color: 'text-purple-600'
    },
    {
      icon: Coffee,
      number: stats.coffees,
      label: 'Cups of Coffee',
      color: 'text-orange-600'
    }
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">
            Get to know more about my background, skills, and passion for technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Quick Facts */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'
          }`}>
            {/* Profile Image */}
            <div className="relative mb-8">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-100 to-primary-200">
                <img
                  src="https://res.cloudinary.com/drh369n9m/image/upload/c_fill,w_400,h_400,g_face,f_auto,q_auto/v1749597275/pp_r6qtnu.jpg"
                  alt="Sandip Hembram - ML Engineer and Backend Developer"
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    // Fallback to original image if optimized version fails
                    e.target.src = 'https://res.cloudinary.com/drh369n9m/image/upload/v1749597275/pp_r6qtnu.jpg';
                    e.target.onError = () => {
                      // Final fallback to icon if image completely fails
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    };
                  }}
                />
                {/* Final fallback placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center" style={{ display: 'none' }}>
                  <div className="text-6xl text-primary-600">
                    <User size={120} />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-10 group">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-600 rounded-xl shadow-xl hover:shadow-2xl p-3 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                      <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-green-800 dark:text-green-200 whitespace-nowrap">
                      Available for work
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                      Ready for new opportunities!
                      <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Frame Effect */}
              <div className="absolute inset-0 rounded-2xl border-4 border-white dark:border-gray-700 shadow-xl pointer-events-none"></div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {quickFacts.map((fact, index) => {
                const IconComponent = fact.icon;
                return (
                  <div key={index} className="card p-6 text-center card-hover">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-3 ${fact.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{fact.number}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{fact.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - About Content */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'
          }`}>
            {/* Main Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Passionate ML Engineer & Full-Stack Developer
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  I'm a dedicated <strong className="text-primary-600 dark:text-primary-400">Machine Learning Engineer</strong> and
                  <strong className="text-primary-600 dark:text-primary-400"> Backend Developer</strong> with a passion for creating
                  intelligent solutions that make a real impact. My journey in technology has been driven by
                  curiosity and a desire to solve complex problems using cutting-edge AI and modern web technologies.
                </p>
                <p>
                  With expertise in <strong className="text-primary-600 dark:text-primary-400">PyTorch</strong>,
                  <strong className="text-primary-600 dark:text-primary-400"> TensorFlow</strong>, and
                  <strong className="text-primary-600 dark:text-primary-400"> Flask</strong>, I specialize in building scalable
                  machine learning applications and robust backend systems. I also have a keen eye for
                  <strong className="text-primary-600 dark:text-primary-400"> UI/UX design</strong>, ensuring that the solutions
                  I build are not only powerful but also user-friendly.
                </p>
                <p>
                  Currently, I'm focused on <strong className="text-primary-600 dark:text-primary-400">AI-IoT integration</strong>,
                  <strong className="text-primary-600 dark:text-primary-400"> LLM applications</strong>, and building modern web
                  applications that leverage the latest in artificial intelligence and machine learning.
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <IconComponent size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{info.label}</div>
                        <div className="font-medium text-gray-900">{info.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What I Love */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart size={24} className="text-red-500 mr-2" />
                What I Love Doing
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  'Machine Learning',
                  'Backend Development',
                  'UI/UX Design',
                  'API Integration',
                  'Problem Solving',
                  'Learning New Tech',
                  'Open Source',
                  'AI Research'
                ].map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200 hover:bg-primary-100 transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary text-center"
              >
                Let's Work Together
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-secondary text-center"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
