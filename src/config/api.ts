// API Configuration
export const API_CONFIG = {
  auth: "https://n8n.srv862351.hstgr.cloud/webhook/auth-webhook",
  getJobs: "https://n8n.srv862351.hstgr.cloud/webhook/get-job",
  getJob: (id: number) => `https://n8n.srv862351.hstgr.cloud/webhook/get-job?id=${id}`,
  addJob: "https://n8n.srv862351.hstgr.cloud/webhook-test/add-update-job",
  updateJob: (id: number) => `https://n8n.srv862351.hstgr.cloud/webhook/update-job?id=${id}`,
  getApplications: "https://n8n.srv862351.hstgr.cloud/webhook/get-applications",
  // User management endpoints
  users: "https://n8n.srv862351.hstgr.cloud/webhook/users",
  user: (id: string) => `https://n8n.srv862351.hstgr.cloud/webhook/users/${id}`,
  token: "YOUR_BEARER_TOKEN_HERE"
};