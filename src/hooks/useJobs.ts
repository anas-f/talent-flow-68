import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  status: string;
  postedDate: string;
  applicants: number;
  description?: string;
  requirements?: string[];
  salary?: string;
  urgency?: 'low' | 'medium' | 'high';
}

// Transform API response to match our Job interface
const transformJob = (job: any): Job => {
  return {
    id: job.id || Math.random(),
    title: job.title || job.job_title || 'Untitled',
    company: job.company || 'Unknown Company',
    location: job.location || 'Remote',
    type: job.type || job.job_type || 'Full-time',
    status: job.status || 'Active',
    postedDate: job.posted_date || job.createdAt || new Date().toISOString().split('T')[0],
    applicants: job.applicants || 0,
    description: job.description,
    requirements: job.requirements || [],
    salary: job.salary,
    urgency: job.urgency || 'medium'
  };
};

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      try {
        const response = await api.getJobs();
        return response.map(transformJob);
      } catch (err) {
        throw new Error('Failed to fetch jobs');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}