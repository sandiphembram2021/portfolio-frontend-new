-- Portfolio Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    INDEX idx_created_at (created_at),
    INDEX idx_email (email)
);

-- Optional: Skills table for dynamic management
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    proficiency_level INT DEFAULT 5,
    icon_name VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample skills data
INSERT INTO skills (name, category, proficiency_level, icon_name) VALUES
('PyTorch', 'ML/AI', 5, 'brain'),
('TensorFlow', 'ML/AI', 5, 'cpu'),
('Flask', 'Backend', 5, 'server'),
('API Integration', 'Backend', 5, 'link'),
('LLM Integration', 'AI', 4, 'message-square'),
('MySQL', 'Database', 4, 'database'),
('Git', 'Tools', 5, 'git-branch'),
('Tailwind CSS', 'Frontend', 4, 'palette'),
('React.js', 'Frontend', 4, 'component'),
('Node.js', 'Backend', 4, 'hexagon');

-- Optional: Projects table for dynamic management
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    technologies JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
