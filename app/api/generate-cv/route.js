import { NextResponse } from 'next/server';
import { generateCV } from '../../../lib/pdf-generator.js';

// GET /api/generate-cv
export async function GET(request) {
  try {
    console.log('Starting CV generation...');
    
    // Generate PDF buffer
    const pdfBuffer = await generateCV();
    
    // Create filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Sandip_Hembram_CV_${currentDate}.pdf`;
    
    console.log('CV generated successfully, size:', pdfBuffer.length, 'bytes');
    
    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('CV generation error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to generate CV',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// POST /api/generate-cv - Alternative endpoint for form submissions
export async function POST(request) {
  try {
    // You could accept custom data here for personalized CVs
    const body = await request.json().catch(() => ({}));
    
    console.log('Starting CV generation via POST...');
    
    // Generate PDF buffer
    const pdfBuffer = await generateCV();
    
    // Create filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Sandip_Hembram_CV_${currentDate}.pdf`;
    
    console.log('CV generated successfully via POST, size:', pdfBuffer.length, 'bytes');
    
    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('CV generation error (POST):', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to generate CV',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
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
