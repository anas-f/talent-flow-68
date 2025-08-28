import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Save, X } from "lucide-react";
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
  title?: string;
  description?: string;
  type?: string;
  location?: string;
}

export default function EditJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<Partial<Job>>({});
  
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
        setFormData({
          title: mappedJob.title || mappedJob["Intitulé du Poste"],
          description: mappedJob.description || mappedJob["Description du Poste"],
          type: mappedJob.type || mappedJob["Type d'Emploi"],
          location: mappedJob.location || mappedJob["Localisation"],
          status: mappedJob.status || (mappedJob["Active"] ? 'Active' : 'Inactive'),
          salary: mappedJob.salary,
          urgency: mappedJob.urgency
        });
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to load job details");
        navigate('/jobs');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id, navigate]);

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    
    try {
      setIsUpdating(true);
      const apiData = {
        "Intitulé du Poste": formData.title || job["Intitulé du Poste"],
        "Description du Poste": formData.description || job["Description du Poste"],
        "Type d'Emploi": formData.type || job["Type d'Emploi"],
        "Localisation": formData.location || job["Localisation"],
        "Active": formData.status === 'Active',
      };
      
      await api.updateJob(job.ID, apiData);
      toast.success("Job updated successfully");
      navigate(`/jobs/${id}`);
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/jobs/${id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Job Details
        </Button>
        
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/jobs/${id}`)}
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Job</CardTitle>
          <CardDescription>Update the job details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateJob} className="space-y-6">
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

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/jobs/${id}`)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}