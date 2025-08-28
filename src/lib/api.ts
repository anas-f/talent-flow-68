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

  getJobs: async () => {
    const jobs = await request(API_CONFIG.getJobs);
    return Array.isArray(jobs) ? jobs : [];
  },
  
  getJob: async (id: number) => {
    const job = await request(API_CONFIG.getJob(id));
    return job || null;
  },

  addJob: async (jobData: any) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken') || API_CONFIG.token;
    
    // Map form data to API expected format
    const apiJobData = {
      "Intitulé du Poste": jobData.title,
      "Description du Poste": jobData.description,
      "Type d'Emploi": jobData.type,
      "Localisation": jobData.location,
      "Département": jobData.department,
      "Télétravail": jobData.remote === true || jobData.remote === 'true',
      "Salaire": jobData.salary,
      "Statut": jobData.status || 'draft',
      "Urgence": jobData.urgency || 'medium',
      "Exigences": jobData.requirements ? jobData.requirements.split('\n').filter((r: string) => r.trim() !== '') : [],
      "Date de publication": new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD
      "Date d'échéance": jobData.expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Use provided date or default to 30 days from now
    };
    
    // Make the request with explicit headers
    const response = await fetch(API_CONFIG.addJob, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(apiJobData)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  },
  
  getApplications: () => request(API_CONFIG.getApplications)
};