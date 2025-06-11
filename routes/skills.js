const express = require('express');
const router = express.Router();

// Skills data
const skillsData = {
  categories: [
    {
      id: 'ml',
      category: 'Machine Learning',
      skills: [
        {
          name: 'PyTorch',
          level: 90,
          description: 'Deep learning framework for neural networks',
          icon: '🔥'
        },
        {
          name: 'TensorFlow',
          level: 85,
          description: 'End-to-end ML platform',
          icon: '🧠'
        },
        {
          name: 'Scikit-learn',
          level: 88,
          description: 'Machine learning library for Python',
          icon: '📊'
        },
        {
          name: 'Pandas',
          level: 92,
          description: 'Data manipulation and analysis',
          icon: '🐼'
        },
        {
          name: 'NumPy',
          level: 90,
          description: 'Numerical computing with Python',
          icon: '🔢'
        }
      ]
    },
    {
      id: 'backend',
      category: 'Backend Development',
      skills: [
        {
          name: 'Node.js',
          level: 88,
          description: 'JavaScript runtime for server-side development',
          icon: '🟢'
        },
        {
          name: 'Express.js',
          level: 85,
          description: 'Web framework for Node.js',
          icon: '⚡'
        },
        {
          name: 'Flask',
          level: 82,
          description: 'Lightweight Python web framework',
          icon: '🌶️'
        },
        {
          name: 'MySQL',
          level: 80,
          description: 'Relational database management',
          icon: '🗄️'
        },
        {
          name: 'MongoDB',
          level: 75,
          description: 'NoSQL document database',
          icon: '🍃'
        }
      ]
    },
    {
      id: 'frontend',
      category: 'Frontend Development',
      skills: [
        {
          name: 'React',
          level: 85,
          description: 'JavaScript library for building UIs',
          icon: '⚛️'
        },
        {
          name: 'Next.js',
          level: 82,
          description: 'React framework for production',
          icon: '▲'
        },
        {
          name: 'JavaScript',
          level: 88,
          description: 'Programming language for web development',
          icon: '🟨'
        },
        {
          name: 'TypeScript',
          level: 78,
          description: 'Typed superset of JavaScript',
          icon: '🔷'
        },
        {
          name: 'Tailwind CSS',
          level: 90,
          description: 'Utility-first CSS framework',
          icon: '🎨'
        }
      ]
    },
    {
      id: 'tools',
      category: 'Tools & Technologies',
      skills: [
        {
          name: 'Git',
          level: 85,
          description: 'Version control system',
          icon: '📝'
        },
        {
          name: 'Docker',
          level: 70,
          description: 'Containerization platform',
          icon: '🐳'
        },
        {
          name: 'AWS',
          level: 65,
          description: 'Cloud computing services',
          icon: '☁️'
        },
        {
          name: 'Vercel',
          level: 80,
          description: 'Frontend deployment platform',
          icon: '▲'
        },
        {
          name: 'Render',
          level: 75,
          description: 'Backend deployment platform',
          icon: '🚀'
        }
      ]
    }
  ]
};

// GET /api/skills - Get all skills
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: skillsData,
      total_categories: skillsData.categories.length,
      total_skills: skillsData.categories.reduce((sum, cat) => sum + cat.skills.length, 0)
    });
  } catch (error) {
    console.error('Skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching skills data'
    });
  }
});

// GET /api/skills/:category - Get skills by category
router.get('/:category', (req, res) => {
  try {
    const { category } = req.params;
    const categoryData = skillsData.categories.find(cat => 
      cat.id === category || cat.category.toLowerCase() === category.toLowerCase()
    );

    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: categoryData
    });
  } catch (error) {
    console.error('Skills category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching skills category'
    });
  }
});

module.exports = router;
