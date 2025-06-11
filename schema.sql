-- Portfolio Database Schema
-- This schema supports the portfolio backend functionality

-- Create database (if needed)
-- CREATE DATABASE IF NOT EXISTS portfolio;
-- USE portfolio;

-- Contacts table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Projects table for storing custom projects (optional, can use static data)
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    long_description TEXT,
    technologies JSON,
    category VARCHAR(50),
    status ENUM('planning', 'in_progress', 'completed', 'archived') DEFAULT 'completed',
    featured BOOLEAN DEFAULT FALSE,
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    image_url VARCHAR(500),
    features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_slug (slug)
);

-- Skills table for storing skills data (optional, can use static data)
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level INT CHECK (level >= 0 AND level <= 100),
    description TEXT,
    icon VARCHAR(10),
    order_index INT DEFAULT 0,
    visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_visible (visible),
    INDEX idx_order (order_index)
);

-- Blog posts table (for future blog functionality)
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(500),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    tags JSON,
    meta_description VARCHAR(160),
    reading_time INT,
    views INT DEFAULT 0,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_published_at (published_at),
    INDEX idx_slug (slug)
);

-- Analytics table for tracking basic metrics
CREATE TABLE IF NOT EXISTS analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    event_data JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_event_type (event_type),
    INDEX idx_created_at (created_at),
    INDEX idx_ip_address (ip_address)
);

-- CV downloads tracking
CREATE TABLE IF NOT EXISTS cv_downloads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    download_type ENUM('pdf', 'json') DEFAULT 'pdf',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_created_at (created_at),
    INDEX idx_ip_address (ip_address)
);

-- Insert sample data

-- Sample skills data
INSERT IGNORE INTO skills (name, category, level, description, icon, order_index) VALUES
-- Machine Learning
('PyTorch', 'Machine Learning', 90, 'Deep learning framework for neural networks', '🔥', 1),
('TensorFlow', 'Machine Learning', 85, 'End-to-end ML platform', '🧠', 2),
('Scikit-learn', 'Machine Learning', 88, 'Machine learning library for Python', '📊', 3),
('Pandas', 'Machine Learning', 92, 'Data manipulation and analysis', '🐼', 4),
('NumPy', 'Machine Learning', 90, 'Numerical computing with Python', '🔢', 5),

-- Backend Development
('Node.js', 'Backend Development', 88, 'JavaScript runtime for server-side development', '🟢', 1),
('Express.js', 'Backend Development', 85, 'Web framework for Node.js', '⚡', 2),
('Flask', 'Backend Development', 82, 'Lightweight Python web framework', '🌶️', 3),
('MySQL', 'Backend Development', 80, 'Relational database management', '🗄️', 4),
('MongoDB', 'Backend Development', 75, 'NoSQL document database', '🍃', 5),

-- Frontend Development
('React', 'Frontend Development', 85, 'JavaScript library for building UIs', '⚛️', 1),
('Next.js', 'Frontend Development', 82, 'React framework for production', '▲', 2),
('JavaScript', 'Frontend Development', 88, 'Programming language for web development', '🟨', 3),
('TypeScript', 'Frontend Development', 78, 'Typed superset of JavaScript', '🔷', 4),
('Tailwind CSS', 'Frontend Development', 90, 'Utility-first CSS framework', '🎨', 5),

-- Tools & Technologies
('Git', 'Tools & Technologies', 85, 'Version control system', '📝', 1),
('Docker', 'Tools & Technologies', 70, 'Containerization platform', '🐳', 2),
('AWS', 'Tools & Technologies', 65, 'Cloud computing services', '☁️', 3),
('Vercel', 'Tools & Technologies', 80, 'Frontend deployment platform', '▲', 4),
('Render', 'Tools & Technologies', 75, 'Backend deployment platform', '🚀', 5);

-- Sample projects data
INSERT IGNORE INTO projects (name, slug, description, long_description, technologies, category, status, featured, github_url, demo_url, features) VALUES
('AI-Powered Portfolio Website', 'ai-portfolio-website', 
 'A modern, responsive portfolio website built with Next.js and Node.js', 
 'A comprehensive full-stack portfolio website featuring dynamic content loading, PDF CV generation, contact form with email integration, and GitHub API integration. Built with modern technologies and deployed on multiple platforms.',
 '["Next.js", "Node.js", "Express", "MySQL", "Tailwind CSS", "Vercel", "Render"]',
 'Full-Stack', 'completed', TRUE,
 'https://github.com/sandiphembram/portfolio',
 'https://sandip-portfolio.vercel.app',
 '["Responsive design with dark/light mode", "Dynamic GitHub projects integration", "PDF CV generation", "Contact form with email notifications", "Skills showcase with interactive elements", "SEO optimized"]'
),
('Machine Learning Project Template', 'ml-project-template',
 'A comprehensive template for ML projects with PyTorch and Flask',
 'A well-structured template for machine learning projects including data preprocessing, model training, evaluation, and deployment pipelines. Features modular code structure and Docker containerization.',
 '["Python", "PyTorch", "Flask", "Docker", "Scikit-learn", "Pandas"]',
 'Machine Learning', 'completed', TRUE,
 'https://github.com/sandiphembram/ml-template',
 NULL,
 '["Modular code structure", "Data preprocessing pipelines", "Model training and evaluation", "REST API for model serving", "Docker containerization", "Comprehensive documentation"]'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_date ON contacts (DATE(created_at));
CREATE INDEX IF NOT EXISTS idx_analytics_event_date ON analytics (event_type, DATE(created_at));
CREATE INDEX IF NOT EXISTS idx_cv_downloads_date ON cv_downloads (DATE(created_at));
