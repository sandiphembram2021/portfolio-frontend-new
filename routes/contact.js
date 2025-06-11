const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { dbHelpers } = require('../config/database');
const router = express.Router();

// Email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Save to database
    try {
      const result = await dbHelpers.run(
        'INSERT INTO contacts (name, email, subject, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, subject, message, req.ip, req.get('User-Agent')]
      );

      console.log('Contact saved to database:', result.id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with email sending even if database fails
    }

    // Send email notification
    try {
      const transporter = createTransporter();
      
      // Email to you (notification)
      const notificationEmail = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h3>Message:</h3>
              <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #ecfdf5; border-radius: 8px;">
              <p style="margin: 0; color: #065f46;">
                <strong>Reply to:</strong> ${email}
              </p>
            </div>
          </div>
        `
      };

      // Auto-reply email to sender
      const autoReplyEmail = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Thank you for contacting me!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank You for Your Message!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>I typically respond within 24-48 hours. In the meantime, feel free to:</p>
            <ul>
              <li>Check out my projects on <a href="https://github.com/your-username" style="color: #2563eb;">GitHub</a></li>
              <li>Connect with me on <a href="https://linkedin.com/in/your-profile" style="color: #2563eb;">LinkedIn</a></li>
              <li>Download my <a href="https://sandip-portfolio.vercel.app/api/cv" style="color: #2563eb;">CV</a></li>
            </ul>
            
            <p>Best regards,<br><strong>Sandip Hembram</strong></p>
            <p style="color: #6b7280; font-size: 14px;">ML Engineer & Full-Stack Developer</p>
          </div>
        `
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(notificationEmail),
        transporter.sendMail(autoReplyEmail)
      ]);

      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the request if email fails
    }

    res.json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/contact/stats - Get contact statistics (optional)
router.get('/stats', async (req, res) => {
  try {
    const totalMessages = await dbHelpers.get('SELECT COUNT(*) as count FROM contacts');
    const recentMessages = await dbHelpers.get(`
      SELECT COUNT(*) as count FROM contacts
      WHERE created_at >= datetime('now', '-30 days')
    `);
    const weeklyMessages = await dbHelpers.get(`
      SELECT COUNT(*) as count FROM contacts
      WHERE created_at >= datetime('now', '-7 days')
    `);

    res.json({
      success: true,
      stats: {
        total_messages: totalMessages?.count || 0,
        messages_last_30_days: recentMessages?.count || 0,
        messages_last_7_days: weeklyMessages?.count || 0
      }
    });
  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics'
    });
  }
});

module.exports = router;
