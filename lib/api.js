import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions

// Contact API
export const contactAPI = {
  // Submit contact form
  submit: async (formData) => {
    try {
      const response = await api.post('/api/contact', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },

  // Get contact statistics (optional)
  getStats: async () => {
    try {
      const response = await api.get('/api/contact/stats');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch contact stats');
    }
  }
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.featured) params.append('featured', 'true');
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/api/projects?${params}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch projects');
    }
  },

  // Get specific project
  getById: async (id) => {
    try {
      const response = await api.get(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch project details');
    }
  },

  // Get project categories
  getCategories: async () => {
    try {
      const response = await api.get('/api/projects/meta/categories');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch project categories');
    }
  }
};

// Skills API
export const skillsAPI = {
  // Get all skills
  getAll: async () => {
    try {
      const response = await api.get('/api/skills');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch skills');
    }
  },

  // Get skills by category
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/api/skills/${category}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch skills category');
    }
  }
};

// GitHub API
export const githubAPI = {
  // Get repositories
  getRepos: async () => {
    try {
      const response = await api.get('/api/github/repos');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch GitHub repositories');
    }
  },

  // Get specific repository
  getRepo: async (name) => {
    try {
      const response = await api.get(`/api/github/repo/${name}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch repository details');
    }
  },

  // Get user profile
  getUser: async () => {
    try {
      const response = await api.get('/api/github/user');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch GitHub user profile');
    }
  },

  // Get GitHub statistics
  getStats: async () => {
    try {
      const response = await api.get('/api/github/stats');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch GitHub statistics');
    }
  }
};

// CV API
export const cvAPI = {
  // Download CV as PDF
  download: async () => {
    try {
      const response = await api.get('/api/cv', {
        responseType: 'blob',
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Sandip_Hembram_CV.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'CV downloaded successfully' };
    } catch (error) {
      throw new Error('Failed to download CV');
    }
  },

  // Get CV data as JSON
  getData: async () => {
    try {
      const response = await api.get('/api/cv/data');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch CV data');
    }
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    try {
      const response = await api.get('/api/health');
      return response.data;
    } catch (error) {
      throw new Error('Health check failed');
    }
  }
};

// Utility functions
export const utils = {
  // Check if API is available
  isAPIAvailable: async () => {
    try {
      await healthAPI.check();
      return true;
    } catch (error) {
      return false;
    }
  },

  // Get API base URL
  getBaseURL: () => API_BASE_URL,

  // Format error message
  formatError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }
};

export default api;
