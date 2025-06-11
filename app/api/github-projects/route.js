import { NextResponse } from 'next/server';
import { getFeaturedRepositories, getAllRepositories, getGitHubProfile } from '../../../lib/github.js';

// GET /api/github-projects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'featured'; // 'featured' or 'all'
    
    let repositories;
    
    if (type === 'all') {
      repositories = await getAllRepositories();
    } else {
      repositories = await getFeaturedRepositories();
    }
    
    // Get GitHub profile info
    const profile = await getGitHubProfile();
    
    return NextResponse.json({
      success: true,
      data: {
        repositories,
        profile,
        count: repositories.length,
        type
      }
    });
    
  } catch (error) {
    console.error('GitHub API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch GitHub repositories',
      message: error.message
    }, { status: 500 });
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}

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
