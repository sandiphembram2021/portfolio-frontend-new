const express = require('express');
const axios = require('axios');
const router = express.Router();

// Static projects data (can be enhanced with database)
const staticProjects = [
  {
    id: 'portfolio-website',
    name: 'AI-Powered Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js and Node.js, featuring dynamic content loading, PDF CV generation, contact form with email integration, and GitHub API integration.',
    technologies: ['Next.js', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'Vercel', 'Render'],
    category: 'Full-Stack',
    featured: true,
    status: 'completed',
    demo_url: 'https://sandip-portfolio.vercel.app',
    github_url: 'https://github.com/sandiphembram/portfolio',
    image_url: 'https://res.cloudinary.com/drh369n9m/image/upload/v1749597275/portfolio-preview.jpg',
    features: [
      'Responsive design with dark/light mode',
      'Dynamic GitHub projects integration',
      'PDF CV generation',
      'Contact form with email notifications',
      'Skills showcase with interactive elements',
      'SEO optimized'
    ],
    created_at: '2024-01-15',
    updated_at: '2024-01-20'
  },
  {
    id: 'ml-project-template',
    name: 'Machine Learning Project Template',
    description: 'A comprehensive template for ML projects with data preprocessing, model training, evaluation, and deployment pipelines using PyTorch and Flask.',
    technologies: ['Python', 'PyTorch', 'Flask', 'Docker', 'Scikit-learn', 'Pandas'],
    category: 'Machine Learning',
    featured: true,
    status: 'completed',
    github_url: 'https://github.com/sandiphembram/ml-template',
    features: [
      'Modular code structure',
      'Data preprocessing pipelines',
      'Model training and evaluation',
      'REST API for model serving',
      'Docker containerization',
      'Comprehensive documentation'
    ],
    created_at: '2023-12-01',
    updated_at: '2024-01-10'
  }
];

// GET /api/projects - Get all projects (static + GitHub)
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    
    let projects = [...staticProjects];
    
    // Try to fetch GitHub projects
    try {
      const githubResponse = await axios.get(`${process.env.BACKEND_URL || 'http://localhost:5000'}/api/github/repos`);
      if (githubResponse.data.success) {
        const githubProjects = githubResponse.data.data
          .filter(repo => repo.description && !repo.name.includes('config'))
          .slice(0, 10)
          .map(repo => ({
            id: `github-${repo.id}`,
            name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description,
            technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
            category: 'GitHub',
            featured: false,
            status: 'completed',
            github_url: repo.html_url,
            demo_url: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            created_at: repo.created_at,
            updated_at: repo.updated_at
          }));
        
        projects = [...projects, ...githubProjects];
      }
    } catch (githubError) {
      console.log('GitHub projects fetch failed, using static projects only');
    }

    // Apply filters
    if (category) {
      projects = projects.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      projects = projects.filter(p => p.featured);
    }

    // Sort by updated date
    projects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Apply limit
    if (limit) {
      projects = projects.slice(0, parseInt(limit));
    }

    res.json({
      success: true,
      data: projects,
      total: projects.length,
      filters: {
        category: category || 'all',
        featured: featured === 'true',
        limit: limit ? parseInt(limit) : null
      }
    });

  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/projects/:id - Get specific project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check static projects first
    let project = staticProjects.find(p => p.id === id);
    
    if (!project && id.startsWith('github-')) {
      // Try to fetch from GitHub
      const githubId = id.replace('github-', '');
      try {
        const githubResponse = await axios.get(`${process.env.BACKEND_URL || 'http://localhost:5000'}/api/github/repos`);
        if (githubResponse.data.success) {
          const githubRepo = githubResponse.data.data.find(repo => repo.id.toString() === githubId);
          if (githubRepo) {
            project = {
              id: `github-${githubRepo.id}`,
              name: githubRepo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              description: githubRepo.description,
              technologies: [githubRepo.language, ...(githubRepo.topics || [])].filter(Boolean),
              category: 'GitHub',
              featured: false,
              status: 'completed',
              github_url: githubRepo.html_url,
              demo_url: githubRepo.homepage,
              stars: githubRepo.stargazers_count,
              forks: githubRepo.forks_count,
              language: githubRepo.language,
              created_at: githubRepo.created_at,
              updated_at: githubRepo.updated_at
            };
          }
        }
      } catch (githubError) {
        console.log('GitHub project fetch failed');
      }
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Project details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project details',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/projects/categories - Get project categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = [
      { id: 'all', name: 'All Projects', count: 0 },
      { id: 'full-stack', name: 'Full-Stack', count: 0 },
      { id: 'machine-learning', name: 'Machine Learning', count: 0 },
      { id: 'frontend', name: 'Frontend', count: 0 },
      { id: 'backend', name: 'Backend', count: 0 },
      { id: 'github', name: 'GitHub', count: 0 }
    ];

    // Count projects in each category
    staticProjects.forEach(project => {
      const category = categories.find(cat => 
        cat.id === project.category.toLowerCase().replace(' ', '-')
      );
      if (category) category.count++;
    });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
});

module.exports = router;
