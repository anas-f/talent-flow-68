import { API_CONFIG } from "@/config/api";
import { request } from "./base";

export const jobsApi = {
  getAll: async () => {
    const jobs = await request(API_CONFIG.getJobs);
    return Array.isArray(jobs) ? jobs : [];
  },
  
  getById: async (id: number) => {
    const job = await request(API_CONFIG.getJob(id));
    return job || null;
  },

  create: async (jobData: any) => {
    const token = localStorage.getItem('authToken') || API_CONFIG.token;
    
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
      "Date de publication": new Date().toISOString().split('T')[0],
      "Date d'échéance": jobData.expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
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
  
  update: async (id: number, jobData: any) => {
    const token = localStorage.getItem('authToken') || API_CONFIG.token;
    
    const response = await fetch(API_CONFIG.updateJob(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }
};