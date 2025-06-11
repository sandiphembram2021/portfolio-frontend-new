import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'checking...',
        email: 'checking...',
        github: 'checking...'
      }
    };

    // Check database connection
    try {
      const { testConnection } = await import('../../../lib/db');
      await testConnection();
      healthStatus.services.database = 'healthy';
    } catch (error) {
      healthStatus.services.database = 'unhealthy';
      healthStatus.status = 'degraded';
    }

    // Check email service
    try {
      if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
        healthStatus.services.email = 'configured';
      } else {
        healthStatus.services.email = 'not configured';
      }
    } catch (error) {
      healthStatus.services.email = 'error';
    }

    // Check GitHub API
    try {
      if (process.env.GITHUB_TOKEN) {
        healthStatus.services.github = 'configured';
      } else {
        healthStatus.services.github = 'not configured';
      }
    } catch (error) {
      healthStatus.services.github = 'error';
    }

    return NextResponse.json(healthStatus, {
      status: healthStatus.status === 'healthy' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      },
      { status: 503 }
    );
  }
}
