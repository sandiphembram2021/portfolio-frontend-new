import puppeteer from 'puppeteer';
import { getFeaturedRepositories, getGitHubProfile } from './github.js';
import { PROFILE_IMAGES } from './cloudinary.js';

// Personal information from environment variables
const getPersonalInfo = () => ({
  fullName: process.env.NEXT_PUBLIC_FULL_NAME || 'Sandip Hembram',
  title: process.env.NEXT_PUBLIC_TITLE || 'ML Engineer | Backend Developer | UI/UX Designer',
  email: process.env.NEXT_PUBLIC_EMAIL || 'sandiphembram2021@gmail.com',
  phone: process.env.NEXT_PUBLIC_PHONE || '9832382762',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || 'https://linkedin.com/in/sandip-hembram-400099261',
  github: process.env.NEXT_PUBLIC_GITHUB || 'https://github.com/sandiphembram2021'
});

// Skills data as specified in SRS
const getSkillsData = () => [
  {
    category: 'Roles',
    skills: ['ML Engineer', 'Backend Developer (Flask)', 'UI/UX Designer', 'AI-IoT Developer']
  },
  {
    category: 'Tools & Libraries',
    skills: ['PyTorch', 'TensorFlow', 'Flask']
  },
  {
    category: 'Technologies',
    skills: ['API Integration', 'LLM Integration', 'MySQL', 'Git', 'Tailwind CSS']
  }
];

// Generate HTML content for CV
const generateCVHTML = async () => {
  const personalInfo = getPersonalInfo();
  const skills = getSkillsData();
  const projects = await getFeaturedRepositories();
  const githubProfile = await getGitHubProfile();
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${personalInfo.fullName} - CV</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
        }
        
        .name {
          font-size: 36px;
          font-weight: bold;
          color: #1e40af;
          margin-bottom: 10px;
        }
        
        .title {
          font-size: 18px;
          color: #64748b;
          margin-bottom: 20px;
        }
        
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          font-size: 14px;
        }
        
        .contact-item {
          color: #475569;
        }
        
        .section {
          margin-bottom: 35px;
        }
        
        .section-title {
          font-size: 24px;
          color: #1e40af;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
          margin-bottom: 20px;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .skill-category {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }
        
        .skill-category h4 {
          color: #1e40af;
          margin-bottom: 12px;
          font-size: 16px;
        }
        
        .skill-list {
          list-style: none;
        }
        
        .skill-list li {
          padding: 4px 0;
          color: #475569;
          position: relative;
          padding-left: 15px;
        }
        
        .skill-list li:before {
          content: "•";
          color: #2563eb;
          position: absolute;
          left: 0;
        }
        
        .projects-grid {
          display: grid;
          gap: 25px;
        }
        
        .project {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 25px;
          background: #ffffff;
        }
        
        .project-title {
          font-size: 20px;
          color: #1e40af;
          margin-bottom: 10px;
          font-weight: bold;
        }
        
        .project-description {
          color: #64748b;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
        }
        
        .tech-tag {
          background: #eff6ff;
          color: #1e40af;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .project-links {
          font-size: 14px;
          color: #2563eb;
        }
        
        .about-section {
          background: #f8fafc;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 35px;
        }
        
        .about-text {
          color: #475569;
          line-height: 1.7;
        }
        
        .stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #1e40af;
        }
        
        .stat-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
        }
        
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #64748b;
          font-size: 12px;
        }
        
        @media print {
          .container {
            padding: 20px;
          }
          
          .section {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="name">${personalInfo.fullName}</div>
          <div class="title">${personalInfo.title}</div>
          <div class="contact-info">
            <div class="contact-item">📧 ${personalInfo.email}</div>
            <div class="contact-item">📱 ${personalInfo.phone}</div>
            <div class="contact-item">💼 LinkedIn</div>
            <div class="contact-item">🔗 GitHub</div>
          </div>
        </div>
        
        <!-- About Section -->
        ${githubProfile ? `
        <div class="about-section">
          <h3 class="section-title">About</h3>
          <p class="about-text">
            ${githubProfile.bio || 'Passionate ML Engineer and Backend Developer with expertise in AI/IoT solutions, Flask development, and modern UI/UX design. Experienced in building scalable applications and implementing cutting-edge machine learning solutions.'}
          </p>
          <div class="stats">
            <div class="stat-item">
              <div class="stat-number">${githubProfile.public_repos}</div>
              <div class="stat-label">Public Repos</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${githubProfile.followers}</div>
              <div class="stat-label">Followers</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">${projects.length}</div>
              <div class="stat-label">Featured Projects</div>
            </div>
          </div>
        </div>
        ` : ''}
        
        <!-- Skills Section -->
        <div class="section">
          <h3 class="section-title">Skills & Expertise</h3>
          <div class="skills-grid">
            ${skills.map(category => `
              <div class="skill-category">
                <h4>${category.category}</h4>
                <ul class="skill-list">
                  ${category.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Projects Section -->
        <div class="section">
          <h3 class="section-title">Featured Projects</h3>
          <div class="projects-grid">
            ${projects.map(project => `
              <div class="project">
                <div class="project-title">${project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                <div class="project-description">
                  ${project.description || 'Advanced project showcasing modern development practices and innovative solutions.'}
                </div>
                ${project.languages && project.languages.length > 0 ? `
                  <div class="project-tech">
                    ${project.languages.slice(0, 5).map(lang => `
                      <span class="tech-tag">${lang.name}</span>
                    `).join('')}
                  </div>
                ` : ''}
                <div class="project-links">
                  🔗 ${project.html_url}
                  ${project.homepage ? ` | 🌐 Live Demo` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString()} | This CV is automatically updated with the latest project information</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate PDF from HTML
export async function generateCV() {
  let browser;
  
  try {
    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Generate HTML content
    const htmlContent = await generateCVHTML();
    
    // Set content and wait for load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    return pdfBuffer;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
