const express = require('express');
const axios = require('axios');
const router = express.Router();

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'sandiphembram';

// Create axios instance with GitHub token
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Authorization': GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : undefined,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App'
  }
});

// Cache for GitHub data (simple in-memory cache)
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// GET /api/github/repos - Get user repositories
router.get('/repos', async (req, res) => {
  try {
    const cacheKey = `repos_${GITHUB_USERNAME}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    const response = await githubApi.get(`/users/${GITHUB_USERNAME}/repos`, {
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: 50,
        type: 'owner'
      }
    });

    // Filter and format repositories
    const repos = response.data
      .filter(repo => !repo.fork && !repo.archived)
      .map(repo => ({
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
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        topics: repo.topics || [],
        visibility: repo.visibility,
        default_branch: repo.default_branch
      }))
      .slice(0, 20); // Limit to top 20 repos

    setCachedData(cacheKey, repos);

    res.json({
      success: true,
      data: repos,
      total: repos.length,
      cached: false
    });

  } catch (error) {
    console.error('GitHub repos error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Error fetching GitHub repositories',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/github/repo/:name - Get specific repository details
router.get('/repo/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const cacheKey = `repo_${GITHUB_USERNAME}_${name}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    // Get repository details
    const [repoResponse, languagesResponse, readmeResponse] = await Promise.allSettled([
      githubApi.get(`/repos/${GITHUB_USERNAME}/${name}`),
      githubApi.get(`/repos/${GITHUB_USERNAME}/${name}/languages`),
      githubApi.get(`/repos/${GITHUB_USERNAME}/${name}/readme`)
    ]);

    if (repoResponse.status === 'rejected') {
      throw repoResponse.reason;
    }

    const repo = repoResponse.value.data;
    const languages = languagesResponse.status === 'fulfilled' ? languagesResponse.value.data : {};
    const readme = readmeResponse.status === 'fulfilled' ? readmeResponse.value.data : null;

    const repoDetails = {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      homepage: repo.homepage,
      language: repo.language,
      languages,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      topics: repo.topics || [],
      license: repo.license,
      default_branch: repo.default_branch,
      readme: readme ? {
        content: readme.content,
        encoding: readme.encoding,
        download_url: readme.download_url
      } : null
    };

    setCachedData(cacheKey, repoDetails);

    res.json({
      success: true,
      data: repoDetails,
      cached: false
    });

  } catch (error) {
    console.error('GitHub repo details error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Error fetching repository details',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/github/user - Get user profile
router.get('/user', async (req, res) => {
  try {
    const cacheKey = `user_${GITHUB_USERNAME}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    const response = await githubApi.get(`/users/${GITHUB_USERNAME}`);
    const user = response.data;

    const userProfile = {
      id: user.id,
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      bio: user.bio,
      company: user.company,
      location: user.location,
      email: user.email,
      blog: user.blog,
      twitter_username: user.twitter_username,
      public_repos: user.public_repos,
      public_gists: user.public_gists,
      followers: user.followers,
      following: user.following,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    setCachedData(cacheKey, userProfile);

    res.json({
      success: true,
      data: userProfile,
      cached: false
    });

  } catch (error) {
    console.error('GitHub user error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Error fetching GitHub user profile',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

// GET /api/github/stats - Get GitHub statistics
router.get('/stats', async (req, res) => {
  try {
    const cacheKey = `stats_${GITHUB_USERNAME}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    // Get user and repos data
    const [userResponse, reposResponse] = await Promise.all([
      githubApi.get(`/users/${GITHUB_USERNAME}`),
      githubApi.get(`/users/${GITHUB_USERNAME}/repos`, {
        params: { per_page: 100, type: 'owner' }
      })
    ]);

    const user = userResponse.data;
    const repos = reposResponse.data.filter(repo => !repo.fork);

    // Calculate statistics
    const languages = {};
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });

    const stats = {
      profile: {
        name: user.name,
        username: user.login,
        avatar_url: user.avatar_url,
        followers: user.followers,
        following: user.following
      },
      repositories: {
        total: user.public_repos,
        own: repos.length,
        forked: user.public_repos - repos.length
      },
      activity: {
        total_stars: totalStars,
        total_forks: totalForks,
        total_commits: 'N/A' // Would need additional API calls
      },
      languages: Object.entries(languages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .reduce((obj, [lang, count]) => {
          obj[lang] = count;
          return obj;
        }, {}),
      recent_activity: repos
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 5)
        .map(repo => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          updated_at: repo.pushed_at,
          stars: repo.stargazers_count
        }))
    };

    setCachedData(cacheKey, stats);

    res.json({
      success: true,
      data: stats,
      cached: false
    });

  } catch (error) {
    console.error('GitHub stats error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Error fetching GitHub statistics',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

module.exports = router;
