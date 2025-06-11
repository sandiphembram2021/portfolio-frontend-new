// GitHub API helper functions
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'sandiphembram2021';

// Featured repositories as specified in SRS
const FEATURED_REPOS = [
  'ppi-tui-predictor',
  'solar-ai-assistant', 
  'surgical-nav-ai'
];

// GitHub API headers
const getHeaders = () => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Website'
  };
  
  // Add authorization if token is available
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  
  return headers;
};

// Fetch user profile information
export async function getGitHubProfile() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
      headers: getHeaders(),
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const profile = await response.json();
    
    return {
      name: profile.name,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      location: profile.location,
      blog: profile.blog,
      company: profile.company,
      html_url: profile.html_url
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

// Fetch all repositories
export async function getAllRepositories() {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: getHeaders(),
        next: { revalidate: 1800 } // Cache for 30 minutes
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    
    return repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      homepage: repo.homepage,
      language: repo.language,
      languages_url: repo.languages_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      topics: repo.topics || [],
      private: repo.private
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

// Fetch featured repositories only
export async function getFeaturedRepositories() {
  try {
    const allRepos = await getAllRepositories();
    
    // Filter for featured repositories
    const featuredRepos = allRepos.filter(repo => 
      FEATURED_REPOS.includes(repo.name)
    );
    
    // Sort by the order in FEATURED_REPOS array
    featuredRepos.sort((a, b) => {
      const indexA = FEATURED_REPOS.indexOf(a.name);
      const indexB = FEATURED_REPOS.indexOf(b.name);
      return indexA - indexB;
    });
    
    // Fetch languages for each featured repo
    const reposWithLanguages = await Promise.all(
      featuredRepos.map(async (repo) => {
        const languages = await getRepositoryLanguages(repo.name);
        return {
          ...repo,
          languages
        };
      })
    );
    
    return reposWithLanguages;
  } catch (error) {
    console.error('Error fetching featured repositories:', error);
    return [];
  }
}

// Fetch languages for a specific repository
export async function getRepositoryLanguages(repoName) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const languages = await response.json();
    
    // Convert to array and calculate percentages
    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    
    return Object.entries(languages).map(([language, bytes]) => ({
      name: language,
      bytes,
      percentage: ((bytes / total) * 100).toFixed(1)
    })).sort((a, b) => b.bytes - a.bytes);
    
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    return [];
  }
}

// Get repository README content
export async function getRepositoryReadme(repoName) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    const readme = await response.json();
    
    // Decode base64 content
    const content = Buffer.from(readme.content, 'base64').toString('utf-8');
    
    return {
      content,
      download_url: readme.download_url,
      html_url: readme.html_url
    };
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
}
