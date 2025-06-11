'use client';

import { Github, Linkedin, Mail, Phone, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

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

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Sandip Hembram
              </h3>
              <p className="text-gray-400 text-lg">
                ML Engineer | Backend Developer | UI/UX Designer
              </p>
            </div>
            
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed mb-6 max-w-md">
              Passionate about creating intelligent solutions with machine learning, 
              building robust backend systems, and designing intuitive user experiences. 
              Always ready to tackle new challenges and bring innovative ideas to life.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`w-10 h-10 bg-gray-800 hover:bg-primary-600 text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={16} />
                <a 
                  href="mailto:sandiphembram2021@gmail.com"
                  className="hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  sandiphembram2021@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={16} />
                <a 
                  href="tel:+919832382762"
                  className="hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  +91 9832382762
                </a>
              </div>
            </div>

            {/* Download CV */}
            <div className="mt-6">
              <button
                onClick={async () => {
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
                    }
                  } catch (error) {
                    console.error('Error downloading CV:', error);
                  }
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Download CV
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start space-x-1">
                <span>© {currentYear} Sandip Hembram. Made with</span>
                <Heart size={16} className="text-red-500 animate-pulse" />
                <span>using Next.js & Tailwind CSS</span>
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Next.js</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Tailwind</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Node.js</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>MySQL</span>
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6 text-xs text-gray-500">
            <p>
              This portfolio is open source and available on{' '}
              <a 
                href="https://github.com/sandiphembram2021" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
