'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone, Download, User } from 'lucide-react';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const roles = [
    'ML Engineer',
    'Backend Developer',
    'UI/UX Designer',
    'AI-IoT Developer'
  ];

  // Typing animation for roles
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = async () => {
    try {
      const response = await fetch('/api/generate-cv');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Sandip_Hembram_CV_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Failed to generate CV');
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/sandip-hembram-400099261',
      color: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/sandiphembram2021',
      color: 'hover:text-gray-900'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:sandiphembram2021@gmail.com',
      color: 'hover:text-red-600'
    },
    {
      name: 'Phone',
      icon: Phone,
      href: 'tel:+919832382762',
      color: 'hover:text-green-600'
    }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center">
          {/* Main Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Profile Photo */}
            <div className="mb-8 animate-slide-up">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-primary-100 to-primary-200">
                <img
                  src="https://res.cloudinary.com/drh369n9m/image/upload/c_fill,w_160,h_160,g_face,f_auto,q_auto/v1749597275/pp_r6qtnu.jpg"
                  alt="Sandip Hembram - ML Engineer and Backend Developer"
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
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
                  <div className="text-3xl text-primary-600">
                    <User size={60} />
                  </div>
                </div>
              </div>
            </div>

            {/* Greeting */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 animate-slide-in-left">
              Hello, I'm
            </p>

            {/* Name */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 animate-slide-up">
              <span className="text-gradient">Sandip Hembram</span>
            </h1>

            {/* Dynamic Role */}
            <div className="h-16 md:h-20 flex items-center justify-center mb-8">
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 animate-slide-in-right">
                <span className="inline-block min-w-[300px] md:min-w-[400px] text-left">
                  <span className="text-primary-600 dark:text-primary-400 transition-all duration-500">
                    {roles[currentRole]}
                  </span>
                </span>
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in">
              Passionate about building intelligent solutions with{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">Machine Learning</span>,{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">Backend Development</span>, and{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">Modern UI/UX Design</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up">
              <button
                onClick={handleDownloadCV}
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Download size={20} />
                <span>Download CV</span>
              </button>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Mail size={20} />
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-16 animate-fade-in">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`social-icon ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent size={24} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={scrollToAbout}
              className="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              aria-label="Scroll to about section"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full opacity-20 animate-bounce-slow"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 dark:bg-blue-800/30 rounded-full opacity-30 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary-200 dark:bg-primary-800/30 rounded-full opacity-25 animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-20 animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
    </section>
  );
};

export default Hero;
