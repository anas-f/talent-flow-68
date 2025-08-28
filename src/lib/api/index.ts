// Re-export all API modules for easy access
export * from './auth';
export * from './jobs';
export * from './applications';
export * from './users';
export * from './base';

// Import the updated API structure
import { authApi } from './auth';
import { jobsApi } from './jobs';
import { applicationsApi } from './applications';
import { usersApi } from './users';

// Export the old API interface for backward compatibility
export const api = {
  // Auth methods
  auth: authApi.login,
  
  // Jobs methods
  getJobs: jobsApi.getAll,
  getJob: jobsApi.getById,
  addJob: jobsApi.create,
  updateJob: jobsApi.update,
  
  // Applications methods
  getApplications: applicationsApi.getAll,
  
  // Users methods (for future use)
  getUsers: usersApi.getAll,
  getUser: usersApi.getById,
  createUser: usersApi.create,
  updateUser: usersApi.update,
  deleteUser: usersApi.delete
};