'use client';

import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useState } from 'react';

const ThemeToggle = ({ variant = 'button' }) => {
  const { theme, toggleTheme, mounted } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    );
  }

  // Simple toggle button variant
  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className="relative w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center group"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {/* Sun icon for light mode */}
        <Sun 
          size={20} 
          className={`absolute transition-all duration-300 text-yellow-500 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-75'
          }`}
        />
        
        {/* Moon icon for dark mode */}
        <Moon 
          size={20} 
          className={`absolute transition-all duration-300 text-blue-400 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75'
          }`}
        />
        
        {/* Hover effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    );
  }

  // Dropdown variant with system option
  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="relative w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center group"
          aria-label="Theme options"
        >
          {theme === 'light' && <Sun size={20} className="text-yellow-500" />}
          {theme === 'dark' && <Moon size={20} className="text-blue-400" />}
          {theme === 'system' && <Monitor size={20} className="text-gray-600 dark:text-gray-400" />}
        </button>

        {showOptions && (
          <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[120px] z-50">
            <button
              onClick={() => {
                setTheme('light');
                setShowOptions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-gray-700 dark:text-gray-300"
            >
              <Sun size={16} className="text-yellow-500" />
              <span>Light</span>
            </button>
            <button
              onClick={() => {
                setTheme('dark');
                setShowOptions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-gray-700 dark:text-gray-300"
            >
              <Moon size={16} className="text-blue-400" />
              <span>Dark</span>
            </button>
            <button
              onClick={() => {
                setTheme('system');
                setShowOptions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-gray-700 dark:text-gray-300"
            >
              <Monitor size={16} className="text-gray-600 dark:text-gray-400" />
              <span>System</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Segmented control variant
  if (variant === 'segmented') {
    return (
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => toggleTheme()}
          className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ${
            theme === 'light'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label="Light mode"
        >
          <Sun size={16} className={theme === 'light' ? 'text-yellow-500' : 'text-gray-500'} />
        </button>
        <button
          onClick={() => toggleTheme()}
          className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-white dark:bg-gray-700 shadow-sm'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          aria-label="Dark mode"
        >
          <Moon size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-gray-500'} />
        </button>
      </div>
    );
  }

  // Floating action button variant
  if (variant === 'fab') {
    return (
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <Sun 
          size={24} 
          className={`absolute transition-all duration-300 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-75'
          }`}
        />
        <Moon 
          size={24} 
          className={`absolute transition-all duration-300 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-75'
          }`}
        />
      </button>
    );
  }

  return null;
};

export default ThemeToggle;
