'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, 
  Server, 
  Palette, 
  Database, 
  Code, 
  GitBranch, 
  Cpu, 
  Link, 
  MessageSquare,
  Hexagon,
  Component,
  Layers
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Skills data as specified in SRS
  const skillsData = [
    {
      category: 'ML/AI',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      skills: [
        { name: 'PyTorch', icon: Brain, level: 95, description: 'Deep learning framework' },
        { name: 'TensorFlow', icon: Cpu, level: 90, description: 'ML platform' },
        { name: 'LLM Integration', icon: MessageSquare, level: 85, description: 'Large Language Models' }
      ]
    },
    {
      category: 'Backend',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      skills: [
        { name: 'Flask', icon: Server, level: 95, description: 'Python web framework' },
        { name: 'API Integration', icon: Link, level: 90, description: 'RESTful APIs' },
        { name: 'Node.js', icon: Hexagon, level: 80, description: 'JavaScript runtime' }
      ]
    },
    {
      category: 'Database',
      color: 'bg-green-100 text-green-700 border-green-200',
      skills: [
        { name: 'MySQL', icon: Database, level: 85, description: 'Relational database' },
        { name: 'Database Design', icon: Layers, level: 80, description: 'Schema optimization' }
      ]
    },
    {
      category: 'Frontend',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      skills: [
        { name: 'React.js', icon: Component, level: 85, description: 'UI library' },
        { name: 'Tailwind CSS', icon: Palette, level: 90, description: 'Utility-first CSS' },
        { name: 'UI/UX Design', icon: Palette, level: 80, description: 'User experience' }
      ]
    },
    {
      category: 'Tools',
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      skills: [
        { name: 'Git', icon: GitBranch, level: 90, description: 'Version control' },
        { name: 'VS Code', icon: Code, level: 95, description: 'Code editor' }
      ]
    }
  ];

  const categories = ['all', ...skillsData.map(cat => cat.category)];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(cat => cat.category === activeCategory);

  const SkillCard = ({ skill, categoryColor, index }) => {
    const IconComponent = skill.icon;
    
    return (
      <div 
        className={`skill-card transition-all duration-500 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${categoryColor}`}>
              <IconComponent size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{skill.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
            </div>
          </div>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{skill.level}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: isVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 100 + 500}ms`
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="section-title">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {category === 'all' ? 'All Skills' : category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {filteredSkills.map((category, categoryIndex) => (
            <div key={category.category} className="space-y-6">
              {/* Category Title */}
              <div className={`text-center transition-all duration-1000 ${
                isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'
              }`} style={{ animationDelay: `${categoryIndex * 200}ms` }}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {category.category}
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full"></div>
              </div>

              {/* Skills in Category */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    categoryColor={category.color}
                    index={categoryIndex * 3 + skillIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Always Learning & Growing
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Technology evolves rapidly, and I'm committed to staying at the forefront. 
              I continuously explore new frameworks, tools, and methodologies to deliver 
              cutting-edge solutions. My current focus areas include advanced AI/ML techniques, 
              cloud technologies, and modern development practices.
            </p>
            
            {/* Current Learning */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200">
                🔥 Currently Learning: Advanced LLMs
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                🚀 Next: Cloud Architecture
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                ⚡ Exploring: Edge AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
