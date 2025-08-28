import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useJobTitles() {
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobTitles = async () => {
    try {
      setIsLoading(true);
      const jobs = await api.getJobs();
      // Extract job titles from the jobs array
      const titles = jobs.map((job: any) => job["Intitulé du Poste"]).filter(Boolean);
      setJobTitles(titles);
    } catch (err) {
      console.error('Error fetching job titles:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch job titles'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobTitles();
  }, []);

  return { jobTitles, isLoading, error, refresh: fetchJobTitles };
}
