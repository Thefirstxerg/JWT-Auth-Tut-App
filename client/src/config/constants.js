/**
 * Application constants and configuration
 * Contains API endpoints, toast configurations, and other app-wide settings
 */

// API Configuration
export const API_BASE_URL = 'http://localhost:4000';

export const API_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/signup`,
  LOGIN: `${API_BASE_URL}/login`,
  VERIFY: `${API_BASE_URL}`,
};

// Toast Configuration - Standardized positions for consistent UX
export const TOAST_CONFIG = {
  SUCCESS: {
    position: "top-right",
  },
  ERROR: {
    position: "top-right",
  },
  INFO: {
    position: "top-right",
  },
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
};