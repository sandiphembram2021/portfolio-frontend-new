'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Github, Calendar, Star, GitFork, Eye, Loader2 } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      observer.observe(projectsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch GitHub projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/github-projects?type=featured');
        const data = await response.json();
        
        if (data.success) {
          setProjects(data.data.repositories);
        } else {
          throw new Error(data.error || 'Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        // Fallback to static data
        setProjects(getFallbackProjects());
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fallback projects data
  const getFallbackProjects = () => [
    {
      id: 1,
      name: 'ppi-tui-predictor',
      full_name: 'sandiphembram2021/ppi-tui-predictor',
      description: 'Advanced protein-protein interaction prediction using machine learning with an intuitive terminal user interface.',
      html_url: 'https://github.com/sandiphembram2021/ppi-tui-predictor',
      homepage: null,
      language: 'Python',
      languages: [
        { name: 'Python', percentage: '85.0' },
        { name: 'Shell', percentage: '15.0' }
      ],
      stargazers_count: 5,
      forks_count: 2,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-06-01T00:00:00Z',
      topics: ['machine-learning', 'bioinformatics', 'protein-prediction', 'tui']
    },
    {
      id: 2,
      name: 'solar-ai-assistant',
      full_name: 'sandiphembram2021/solar-ai-assistant',
      description: 'Intelligent solar energy management system with AI-powered optimization and real-time monitoring capabilities.',
      html_url: 'https://github.com/sandiphembram2021/solar-ai-assistant',
      homepage: null,
      language: 'Python',
      languages: [
        { name: 'Python', percentage: '70.0' },
        { name: 'JavaScript', percentage: '20.0' },
        { name: 'HTML', percentage: '10.0' }
      ],
      stargazers_count: 8,
      forks_count: 3,
      created_at: '2024-02-10T00:00:00Z',
      updated_at: '2024-05-20T00:00:00Z',
      topics: ['ai', 'solar-energy', 'iot', 'optimization']
    },
    {
      id: 3,
      name: 'surgical-nav-ai',
      full_name: 'sandiphembram2021/surgical-nav-ai',
      description: 'AI-powered surgical navigation system using computer vision and machine learning for enhanced precision.',
      html_url: 'https://github.com/sandiphembram2021/surgical-nav-ai',
      homepage: null,
      language: 'Python',
      languages: [
        { name: 'Python', percentage: '80.0' },
        { name: 'C++', percentage: '15.0' },
        { name: 'CMake', percentage: '5.0' }
      ],
      stargazers_count: 12,
      forks_count: 4,
      created_at: '2024-03-05T00:00:00Z',
      updated_at: '2024-06-10T00:00:00Z',
      topics: ['ai', 'computer-vision', 'medical-ai', 'surgical-navigation']
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getLanguageColor = (language) => {
    const colors = {
      'Python': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-600',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-blue-400',
      'Shell': 'bg-green-500',
      'C++': 'bg-pink-500',
      'CMake': 'bg-gray-500'
    };
    return colors[language] || 'bg-gray-400';
  };

  const ProjectCard = ({ project, index }) => (
    <div 
      className={`project-card transition-all duration-700 ${
        isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
            {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar size={16} />
            <span>{formatDate(project.updated_at)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {project.description || 'An innovative project showcasing modern development practices and cutting-edge technology solutions.'}
        </p>

        {/* Languages */}
        {project.languages && project.languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.languages.slice(0, 4).map((lang, langIndex) => (
              <span
                key={langIndex}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(lang.name)}`}></div>
                <span className="text-gray-700">{lang.name}</span>
                <span className="text-gray-500">({lang.percentage}%)</span>
              </span>
            ))}
          </div>
        )}

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic, topicIndex) => (
              <span
                key={topicIndex}
                className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium border border-primary-200"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star size={16} />
              <span>{project.stargazers_count || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork size={16} />
              <span>{project.forks_count || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></div>
              <span>{project.language || 'Multiple'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors duration-200"
                title="Live Demo"
              >
                <ExternalLink size={18} />
                <span className="text-sm font-medium">Demo</span>
              </a>
            )}
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              title="View Source"
            >
              <Github size={18} />
              <span className="text-sm font-medium">Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my recent work in machine learning, backend development, and AI applications
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-3 text-primary-600">
              <Loader2 size={24} className="animate-spin" />
              <span className="text-lg font-medium">Loading projects...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">Failed to load projects from GitHub</p>
              <p className="text-sm text-red-500">Showing cached project data</p>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* View More */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <a
            href="https://github.com/sandiphembram2021"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center space-x-2"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
