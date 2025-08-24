// API Configuration - Easy to switch to real endpoints later
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout', 
      REGISTER: '/auth/register',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email'
    },
    USERS: {
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      CHANGE_PASSWORD: '/users/change-password',
      PREFERENCES: '/users/preferences'
    },
    JOBS: {
      LIST: '/jobs',
      CREATE: '/jobs',
      UPDATE: '/jobs',
      DELETE: '/jobs',
      SEARCH: '/jobs/search'
    },
    APPLICANTS: {
      LIST: '/applicants',
      CREATE: '/applicants', 
      UPDATE: '/applicants',
      DELETE: '/applicants',
      SEARCH: '/applicants/search'
    },
    INTERVIEWS: {
      LIST: '/interviews',
      CREATE: '/interviews',
      UPDATE: '/interviews', 
      DELETE: '/interviews'
    }
  }
};

// Mock API delay for realistic feel
export const API_DELAY = 500;