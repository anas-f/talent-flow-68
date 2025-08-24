import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin, Briefcase, Users, DollarSign, FileText, Clock, Edit } from "lucide-react";

// Mock data - in a real app, this would come from an API
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Paris, France",
    remote: true,
    status: "Active",
    applicants: 23,
    postedDate: "2024-01-15",
    salary: "€60k - €80k",
    urgency: "High",
    description: "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces and implementing features for our web applications.",
    requirements: [
      "5+ years of experience with React.js",
      "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
      "Experience with popular React.js workflows (such as Redux or Context API)",
      "Familiarity with RESTful APIs and modern front-end build pipelines and tools",
      "Experience with common front-end development tools such as Babel, Webpack, NPM, etc.",
      "Ability to understand business requirements and translate them into technical requirements"
    ]
  },
  // Add more mock jobs as needed
];

export default function ViewJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, you would fetch the job details using the ID
  const job = mockJobs.find(job => job.id === Number(id));

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

  const getStatusBadge = (status: string) => {
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

  const getUrgencyBadge = (urgency: string) => {
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
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="mr-2 h-4 w-4" />
                      {job.department}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {job.remote ? `${job.location} (Remote)` : job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="mr-2 h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {getStatusBadge(job.status)}
                  {getUrgencyBadge(job.urgency)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Job Description</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Requirements</h3>
                  <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
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
