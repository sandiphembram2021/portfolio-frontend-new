const express = require('express');
const PDFDocument = require('pdfkit');
const axios = require('axios');
const router = express.Router();

// CV data structure
const cvData = {
  personal: {
    name: 'Sandip Hembram',
    title: 'ML Engineer & Full-Stack Developer',
    email: 'sandiphembram@gmail.com',
    phone: '+91 XXXXX XXXXX',
    location: 'India',
    linkedin: 'https://linkedin.com/in/sandip-hembram',
    github: 'https://github.com/sandiphembram',
    website: 'https://sandip-portfolio.vercel.app'
  },
  summary: 'Passionate Machine Learning Engineer and Full-Stack Developer with expertise in PyTorch, TensorFlow, Flask, and modern web technologies. Experienced in building scalable ML applications and robust backend systems with a keen eye for UI/UX design.',
  experience: [
    {
      title: 'ML Engineer & Backend Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: [
        'Developed and deployed machine learning models using PyTorch and TensorFlow',
        'Built scalable backend APIs with Flask and Node.js',
        'Implemented AI-IoT integration solutions',
        'Created modern web applications with React and Next.js'
      ]
    }
  ],
  education: [
    {
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      institution: 'Your University',
      period: '2020 - 2024',
      grade: 'CGPA: X.XX'
    }
  ],
  skills: {
    'Machine Learning': ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
    'Backend Development': ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'MySQL', 'MongoDB'],
    'Frontend Development': ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
    'Tools & Technologies': ['Git', 'Docker', 'AWS', 'Vercel', 'Render', 'Cloudinary']
  },
  projects: [
    {
      name: 'AI-Powered Portfolio Website',
      description: 'Full-stack portfolio with dynamic content, PDF generation, and contact form',
      technologies: ['Next.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
      link: 'https://sandip-portfolio.vercel.app'
    }
  ]
};

// GET /api/cv - Generate and download CV
router.get('/', async (req, res) => {
  try {
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Sandip_Hembram_CV.pdf"');

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Pipe PDF to response
    doc.pipe(res);

    // Helper functions
    const addSection = (title, yPosition) => {
      doc.fontSize(16)
         .fillColor('#2563eb')
         .text(title, 50, yPosition)
         .moveTo(50, yPosition + 20)
         .lineTo(545, yPosition + 20)
         .strokeColor('#2563eb')
         .stroke();
      return yPosition + 35;
    };

    const addText = (text, x, y, options = {}) => {
      doc.fontSize(options.fontSize || 10)
         .fillColor(options.color || '#000000')
         .text(text, x, y, options);
    };

    let yPosition = 50;

    // Header Section
    doc.fontSize(24)
       .fillColor('#1f2937')
       .text(cvData.personal.name, 50, yPosition);
    
    yPosition += 30;
    doc.fontSize(14)
       .fillColor('#6b7280')
       .text(cvData.personal.title, 50, yPosition);

    yPosition += 25;
    doc.fontSize(10)
       .fillColor('#374151')
       .text(`Email: ${cvData.personal.email} | Phone: ${cvData.personal.phone}`, 50, yPosition)
       .text(`LinkedIn: ${cvData.personal.linkedin}`, 50, yPosition + 12)
       .text(`GitHub: ${cvData.personal.github} | Website: ${cvData.personal.website}`, 50, yPosition + 24);

    yPosition += 60;

    // Professional Summary
    yPosition = addSection('PROFESSIONAL SUMMARY', yPosition);
    addText(cvData.summary, 50, yPosition, { width: 495, align: 'justify' });
    yPosition += 50;

    // Experience Section
    yPosition = addSection('EXPERIENCE', yPosition);
    cvData.experience.forEach(exp => {
      doc.fontSize(12)
         .fillColor('#1f2937')
         .text(exp.title, 50, yPosition);
      
      doc.fontSize(11)
         .fillColor('#2563eb')
         .text(`${exp.company} | ${exp.period}`, 50, yPosition + 15);

      yPosition += 35;
      exp.description.forEach(desc => {
        addText(`• ${desc}`, 60, yPosition, { width: 485 });
        yPosition += 15;
      });
      yPosition += 10;
    });

    // Education Section
    yPosition = addSection('EDUCATION', yPosition);
    cvData.education.forEach(edu => {
      doc.fontSize(12)
         .fillColor('#1f2937')
         .text(`${edu.degree} in ${edu.field}`, 50, yPosition);
      
      doc.fontSize(10)
         .fillColor('#6b7280')
         .text(`${edu.institution} | ${edu.period} | ${edu.grade}`, 50, yPosition + 15);
      
      yPosition += 40;
    });

    // Skills Section
    yPosition = addSection('TECHNICAL SKILLS', yPosition);
    Object.entries(cvData.skills).forEach(([category, skills]) => {
      doc.fontSize(11)
         .fillColor('#1f2937')
         .text(`${category}:`, 50, yPosition);
      
      doc.fontSize(10)
         .fillColor('#374151')
         .text(skills.join(', '), 50, yPosition + 15, { width: 495 });
      
      yPosition += 35;
    });

    // Projects Section
    yPosition = addSection('KEY PROJECTS', yPosition);
    cvData.projects.forEach(project => {
      doc.fontSize(12)
         .fillColor('#1f2937')
         .text(project.name, 50, yPosition);
      
      doc.fontSize(10)
         .fillColor('#374151')
         .text(project.description, 50, yPosition + 15, { width: 495 });
      
      doc.fontSize(9)
         .fillColor('#6b7280')
         .text(`Technologies: ${project.technologies.join(', ')}`, 50, yPosition + 30);
      
      if (project.link) {
        doc.fontSize(9)
           .fillColor('#2563eb')
           .text(`Link: ${project.link}`, 50, yPosition + 42);
      }
      
      yPosition += 60;
    });

    // Footer
    doc.fontSize(8)
       .fillColor('#9ca3af')
       .text(`Generated on ${new Date().toLocaleDateString()}`, 50, 750)
       .text('This CV was automatically generated from my portfolio website', 300, 750);

    // Finalize PDF
    doc.end();

    console.log('CV generated successfully');

  } catch (error) {
    console.error('CV generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating CV',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/cv/data - Get CV data as JSON
router.get('/data', (req, res) => {
  try {
    res.json({
      success: true,
      data: cvData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('CV data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching CV data'
    });
  }
});

module.exports = router;
