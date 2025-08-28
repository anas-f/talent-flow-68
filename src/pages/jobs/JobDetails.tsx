import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin, Briefcase, Users, DollarSign, FileText, Clock, Edit, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Job {
  ID: number;
  "Intitulé du Poste": string;
  "Description du Poste": string;
  "Type d'Emploi": string;
  "Localisation": string;
  "Active": boolean;
  status?: string;
  salary?: string;
  urgency?: string;
  requirements?: string[];
  postedDate?: string;
  remote?: boolean;
  department?: string;
  applicants?: number;
  title?: string;
  description?: string;
  type?: string;
  location?: string;
}

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const response = await api.getJob(Number(id));
        const jobData = Array.isArray(response) ? response[0] : response;
        
        const mappedJob = {
          ...jobData,
          title: jobData["Intitulé du Poste"],
          description: jobData["Description du Poste"],
          type: jobData["Type d'Emploi"],
          location: jobData["Localisation"],
          status: jobData["Active"] ? 'Active' : 'Inactive',
          requirements: jobData.requirements || [],
          salary: jobData.salary || 'N/A',
          urgency: jobData.urgency || 'medium'
        };
        
        setJob(mappedJob);
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to load job details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Job not found</h2>
          <p className="text-muted-foreground mt-2">The job you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/jobs')} 
            className="mt-6"
          >
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status?: string) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;
    
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      case 'paused':
        return <Badge variant="outline">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency?: string) => {
    if (!urgency) return <Badge variant="outline">Normal Priority</Badge>;
    
    switch (urgency.toLowerCase()) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Low Priority</Badge>;
      default:
        return <Badge variant="outline">{urgency} Priority</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate(`/jobs/${id}/edit`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Job
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{job.title || job["Intitulé du Poste"] || 'Untitled Position'}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="mr-2 h-4 w-4" />
                      {job.type || job["Type d'Emploi"] || 'N/A'}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {job.location || job["Localisation"] || 'Location not specified'}
                    </div>
                    {job.salary && job.salary !== 'N/A' && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="mr-2 h-4 w-4" />
                        {job.salary}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {getStatusBadge(job.status)}
                  {job.urgency && getUrgencyBadge(job.urgency)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Job Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {job.description || job["Description du Poste"] || 'No description available.'}
                  </p>
                </div>

                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Requirements</h3>
                    <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Posted on</span>
                  <span className="text-sm font-medium">{job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'N/A'}</span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Job Type</span>
                  <span className="text-sm font-medium">{job.type || job["Type d'Emploi"] || 'N/A'}</span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">
                    {job.remote ? 'Remote - ' : ''}{job.location || job["Localisation"] || 'N/A'}
                  </span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Department</span>
                  <span className="text-sm font-medium">{job.department || 'N/A'}</span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Salary</span>
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Applicants</span>
                  <span className="text-sm font-medium">{job.applicants || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate(`/jobs/${id}/edit`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Job Posting
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/applicants')}
              >
                <Users className="mr-2 h-4 w-4" />
                View Applicants ({job.applicants || 0})
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View Job Description
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                View Activity Log
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}