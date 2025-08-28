import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Calendar, MapPin, Briefcase, Users, DollarSign, FileText, Clock, Edit, Loader2, Save, X } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Job {
  ID: number;
  "Intitulé du Poste": string;
  "Description du Poste": string;
  "Type d'Emploi": string;
  "Localisation": string;
  "Active": boolean;
  // Add other fields from the API response as needed
  status?: string;
  salary?: string;
  urgency?: string;
  requirements?: string[];
  // Add computed properties for display
  title?: string;
  description?: string;
  type?: string;
  location?: string;
}

export default function ViewJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Job>>({});
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const response = await api.getJob(Number(id));
        // Handle array response (API returns an array with one job object)
        const jobData = Array.isArray(response) ? response[0] : response;
        
        // Map API fields to our component's expected format
        const mappedJob = {
          ...jobData,
          title: jobData["Intitulé du Poste"],
          description: jobData["Description du Poste"],
          type: jobData["Type d'Emploi"],
          location: jobData["Localisation"],
          status: jobData["Active"] ? 'Active' : 'Inactive',
          // Add default values for optional fields
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

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    
    try {
      setIsUpdating(true);
      // Map form data back to API format
      const apiData = {
        "Intitulé du Poste": formData.title || job["Intitulé du Poste"],
        "Description du Poste": formData.description || job["Description du Poste"],
        "Type d'Emploi": formData.type || job["Type d'Emploi"],
        "Localisation": formData.location || job["Localisation"],
        "Active": formData.status === 'Active',
        // Add other fields as needed
      };
      
      const updatedJob = await api.updateJob(job.ID, apiData);
      setJob(prev => ({
        ...prev,
        ...updatedJob,
        title: apiData["Intitulé du Poste"],
        description: apiData["Description du Poste"],
        type: apiData["Type d'Emploi"],
        location: apiData["Localisation"],
        status: apiData["Active"] ? 'Active' : 'Inactive'
      }));
      
      toast.success("Job updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleInputChange = (field: keyof Job, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const startEditing = () => {
    if (!job) return;
    
    setFormData({
      title: job.title || job["Intitulé du Poste"],
      description: job.description || job["Description du Poste"],
      type: job.type || job["Type d'Emploi"],
      location: job.location || job["Localisation"],
      status: job.status || (job["Active"] ? 'Active' : 'Inactive'),
      salary: job.salary,
      urgency: job.urgency
    });
    
    setIsEditing(true);
  };
  
  const cancelEditing = () => {
    setIsEditing(false);
    setFormData({});
  };

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
        
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={startEditing}
            disabled={isLoading || isUpdating}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Job
          </Button>
        ) : (
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={cancelEditing}
              disabled={isUpdating}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleUpdateJob}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              {isEditing ? (
                <form onSubmit={handleUpdateJob} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={formData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter job title"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Select
                        value={formData.type || ''}
                        onValueChange={(value) => handleInputChange('type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Temps plein (CDI)">Full Time (Permanent)</SelectItem>
                          <SelectItem value="Temps partiel">Part Time</SelectItem>
                          <SelectItem value="Contrat à durée déterminée">Fixed Term</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Enter location"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        checked={formData.status === 'Active'}
                        onCheckedChange={(checked) => 
                          handleInputChange('status', checked ? 'Active' : 'Inactive')
                        }
                      />
                      <Label htmlFor="status">
                        {formData.status === 'Active' ? 'Active' : 'Inactive'}
                      </Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter job description"
                      rows={6}
                      required
                    />
                  </div>
                </form>
              ) : (
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
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {!isEditing && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Job Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {job.description || job["Description du Poste"] || 'No description available.'}
                    </p>
                  </div>
                )}

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

          <Card className="border-dashed border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                Hiring Pipeline
              </CardTitle>
              <CardDescription>Track candidates through the hiring process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-4">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  We're working on bringing you a powerful hiring pipeline to help you track candidates through your recruitment process. Stay tuned for updates!
                </p>
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
                  <span className="text-sm font-medium">{new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Job Type</span>
                  <span className="text-sm font-medium">{job.type}</span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium">
                    {job.remote ? 'Remote - ' : ''}{job.location}
                  </span>
                </div>
                <Separator />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Department</span>
                  <span className="text-sm font-medium">{job.department}</span>
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
                  <span className="text-sm font-medium">{job.applicants}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Edit Job Posting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                View Applicants (23)
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
