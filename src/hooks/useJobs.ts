import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Job {
  id: number;
  title: string;
  department: string;
  description: string;
  requirements: string | string[];
  responsibilities?: string | string[];
  experienceLevel?: string;
  location: string;
  type: string;
  salary?: string;
  status: string;
  urgency?: string;
  applicants?: number;
  postedDate?: string;
  expirationDate?: string;
  'Date de publication'?: string;
  [key: string]: any; // For any additional dynamic properties
}

// Transform API response to match our Job interface
const transformJob = (job: any): Job => {
  // Helper to get value with fallbacks
  const getValue = (keys: string[], defaultValue: string = '') => {
    for (const key of keys) {
      if (job[key] !== undefined && job[key] !== null && job[key] !== '') {
        return job[key];
      }
    }
    return defaultValue;
  };

  // Handle department specifically to handle trailing space in key
  const department = getValue(["Département", "Département ", "department"], "Non spécifié").trim();
  
  return {
    id: getValue(["ID", "id"], ""),
    title: getValue(["Intitulé du Poste", "title"], "Sans titre"),
    department: getValue(["Département"], "-"),
    description: getValue(["Description du Poste", "description"], ""),
    requirements: getValue(["Compétences Requises", "requirements"], ""),
    responsibilities: getValue(["Responsabilités", "responsibilities"], ""),
    experienceLevel: getValue(["Niveau d'Expérience", "experienceLevel"], "Non spécifié"),
    location: getValue(["Localisation", "location"], "Non spécifiée"),
    type: getValue(["Type de Poste", "type"], "Non spécifié"),
    salary: getValue(["Fourchette de salaire", "salary"], "Non spécifiée"),
    status: getValue(["Statut", "status"], "Brouillon"),
    urgency: (getValue(["Urgence", "urgency"], "moyenne") || "").toLowerCase(),
    applicants: parseInt(getValue(["applicants", "candidats", "Candidats"], "0")),
    postedDate: getValue(["Date de publication", "postedDate"], new Date().toISOString().split('T')[0]),
    expirationDate: getValue(["Date d'échéance", "expirationDate"], null),
    // Keep original data for reference
    ...job
  };
};

export function useJobs() {
  return useQuery<Job[], Error>({
    queryKey: ['jobs'],
    queryFn: async () => {
      try {
        const response = await api.getJobs();
        return Array.isArray(response) ? response.map(transformJob) : [];
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        throw new Error('Failed to fetch jobs');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useJob(jobId?: number) {
  return useQuery<Job | null, Error>({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) return null;
      try {
        const response = await api.getJob(jobId);
        return response ? transformJob(response) : null;
      } catch (err) {
        console.error(`Failed to fetch job ${jobId}:`, err);
        throw new Error(`Failed to fetch job ${jobId}`);
      }
    },
    enabled: !!jobId
  });
}