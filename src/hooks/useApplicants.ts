import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  appliedFor: string;
  experience: string;
  location: string;
  stage: string;
  status: string;
  appliedDate: string;
  skills: string[];
  rating: number;
  source: string;
  cvUrl?: string;
  overallScore?: string;
  technicalSkills?: string;
  achievement?: string;
  education?: string;
  reasoning?: string[];
}

// Transform API response to match our Applicant interface
const transformApplicant = (app: any): Applicant => {
  // Parse the Overall score (e.g., "9/10" -> 9 or 8 -> 8)
  let rating = 0;
  if (app.Overall) {
    if (typeof app.Overall === 'string') {
      // Handle both "9/10" and "8" formats
      const score = app.Overall.split('/')[0];
      rating = parseFloat(score) || 0;
    } else {
      // Handle numeric values
      rating = Number(app.Overall) || 0;
    }
  }
  
  // Parse the skills array from the JSON string
  let skills: string[] = [];
  try {
    if (app.Reasoning) {
      skills = JSON.parse(app.Reasoning);
    }
  } catch (e) {
    console.error('Error parsing skills:', e);
  }

  return {
    id: app.row_number,
    firstName: app['First Name'] || 'Unknown',
    lastName: app['Last Name'] || 'Unknown',
    email: app.Email || 'No email',
    phone: app.phone || 'No phone',
    currentRole: app['Curent Role'] || 'Not specified',
    appliedFor: app['Job Title'] || 'Not specified',
    experience: app.Experience ? `${app.Experience}/10` : 'Not specified',
    location: app.Location || 'Not specified',
    stage: 'Applied', // Default stage
    status: 'Active', // Default status
    appliedDate: app.date || new Date().toISOString().split('T')[0], // Use API date or current date as fallback
    skills: skills,
    rating: parseFloat(app.Overall) || 0,
    source: 'Application', // Default source
    cvUrl: app.CV,
    overallScore: app.Overall,
    technicalSkills: app['Technical Skills'],
    achievement: app.Achievement,
    education: app.Education,
    reasoning: skills
  };
};

export function useApplicants() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      try {
        const response = await api.getApplications();
        const transformed = response.map(transformApplicant);
        return transformed;
      } catch (err) {
        console.error('Error fetching applications:', err);
        throw new Error('Failed to fetch applications');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}