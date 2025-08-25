import { API_CONFIG } from "@/config/api";

async function request(url: string, method = "GET", body: any = null) {
  const token = localStorage.getItem('authToken') || API_CONFIG.token;
  
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) throw new Error("API Error: " + response.status);
  return response.json();
}

// Exported API methods
export const api = {
  auth: (action: string, email: string, password: string) =>
    request(API_CONFIG.auth, "POST", { action, email, password }),

  getJobs: () => request(API_CONFIG.getJobs),

  addJob: (jobData: any) => request(API_CONFIG.addJob, "POST", jobData),

  getApplications: () => request(API_CONFIG.getApplications)
};