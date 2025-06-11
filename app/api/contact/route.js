import { NextResponse } from 'next/server';
import { insertOne, testConnection } from '../../../lib/db.js';
import { sendContactNotification } from '../../../lib/email.js';

// Validation helper
function validateContactData(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  // Length limits
  if (data.name && data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (data.email && data.email.length > 100) {
    errors.push('Email must be less than 100 characters');
  }
  
  if (data.subject && data.subject.length > 150) {
    errors.push('Subject must be less than 150 characters');
  }
  
  if (data.message && data.message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }
  
  return errors;
}

// Sanitize input data
function sanitizeData(data) {
  return {
    name: data.name?.trim(),
    email: data.email?.trim().toLowerCase(),
    subject: data.subject?.trim(),
    message: data.message?.trim()
  };
}

// POST /api/contact
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Sanitize input
    const sanitizedData = sanitizeData(body);
    
    // Validate input
    const validationErrors = validateContactData(sanitizedData);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }
    
    // Test database connection
    const dbTest = await testConnection();
    if (!dbTest.success) {
      console.error('Database connection failed:', dbTest.message);
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }
    
    // Save to database
    const dbResult = await insertOne('contact_messages', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message
    });
    
    // Send email notification
    const emailResult = await sendContactNotification(sanitizedData);
    
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Still return success since message was saved to database
      return NextResponse.json({
        success: true,
        message: 'Message saved successfully, but email notification failed',
        data: {
          id: dbResult.insertId,
          emailSent: false,
          emailError: emailResult.error
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.',
      data: {
        id: dbResult.insertId,
        emailSent: true,
        notificationId: emailResult.notificationId,
        autoReplyId: emailResult.autoReplyId
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process your message. Please try again later.'
    }, { status: 500 });
  }
}

// GET /api/contact - For testing purposes (optional)
export async function GET() {
  try {
    const dbTest = await testConnection();
    
    return NextResponse.json({
      success: true,
      message: 'Contact API is working',
      database: dbTest.success ? 'Connected' : 'Disconnected',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'API test failed',
      message: error.message
    }, { status: 500 });
  }
}

// Handle unsupported methods
export async function PUT() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
