import nodemailer from 'nodemailer';

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send contact form notification email
export async function sendContactNotification(contactData) {
  try {
    const transporter = createTransporter();
    
    const { name, email, subject, message } = contactData;
    
    // Email to yourself (notification)
    const notificationEmail = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'sandiphembram2021@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Quick Actions:</strong>
              <a href="mailto:${email}?subject=Re: ${subject}" style="color: #2563eb; text-decoration: none; margin-left: 10px;">Reply to ${name}</a>
            </p>
          </div>
          
          <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from your portfolio website contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </footer>
        </div>
      `
    };
    
    // Auto-reply email to the sender
    const autoReplyEmail = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Thank you for contacting Sandip Hembram`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Thank You for Your Message!
          </h2>
          
          <p style="color: #374151; line-height: 1.6;">Hi ${name},</p>
          
          <p style="color: #374151; line-height: 1.6;">
            Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            In the meantime, feel free to connect with me on:
          </p>
          
          <div style="margin: 20px 0;">
            <a href="https://linkedin.com/in/sandip-hembram-400099261" style="display: inline-block; margin-right: 15px; color: #2563eb; text-decoration: none;">LinkedIn</a>
            <a href="https://github.com/sandiphembram2021" style="display: inline-block; margin-right: 15px; color: #2563eb; text-decoration: none;">GitHub</a>
            <a href="mailto:sandiphembram2021@gmail.com" style="display: inline-block; color: #2563eb; text-decoration: none;">Email</a>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            Best regards,<br>
            <strong>Sandip Hembram</strong><br>
            ML Engineer | Backend Developer | UI/UX Designer
          </p>
          
          <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This is an automated response. Please do not reply to this email.</p>
          </footer>
        </div>
      `
    };
    
    // Send both emails
    const [notificationResult, autoReplyResult] = await Promise.all([
      transporter.sendMail(notificationEmail),
      transporter.sendMail(autoReplyEmail)
    ]);
    
    return {
      success: true,
      notificationId: notificationResult.messageId,
      autoReplyId: autoReplyResult.messageId
    };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Test email configuration
export async function testEmailConfig() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return { success: true, message: 'Email configuration is valid' };
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return { success: false, message: error.message };
  }
}
