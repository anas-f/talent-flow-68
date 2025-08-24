import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Archive,
  Users,
  MapPin,
  Calendar,
  Briefcase
} from "lucide-react";

interface Job {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  remote: boolean;
  status: string;
  applicants: number;
  postedDate: string;
  salary: string;
  urgency: string;
}

export default function Jobs() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([
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
      urgency: "High"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      type: "Full-time",
      location: "Lyon, France",
      remote: false,
      status: "Active",
      applicants: 45,
      postedDate: "2024-01-10",
      salary: "€70k - €90k",
      urgency: "Medium"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      type: "Contract",
      location: "Remote",
      remote: true,
      status: "Draft",
      applicants: 0,
      postedDate: "2024-01-20",
      salary: "€45k - €55k",
      urgency: "Low"
    },
    {
      id: 4,
      title: "Backend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Marseille, France",
      remote: true,
      status: "Closed",
      applicants: 67,
      postedDate: "2023-12-15",
      salary: "€55k - €75k",
      urgency: "Medium"
    },
    {
      id: 5,
      title: "Data Scientist",
      department: "Analytics",
      type: "Full-time",
      location: "Paris, France",
      remote: true,
      status: "Active",
      applicants: 31,
      postedDate: "2024-01-12",
      salary: "€65k - €85k",
      urgency: "High"
    }
  ]);

  const handleDeleteJob = (id: number) => {
    if (window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      toast({
        title: "Job deleted",
        description: "The job posting has been successfully deleted.",
      });
    }
  };

  const handleEditJob = (id: number) => {
    // Navigate to edit page with job ID
    navigate(`/jobs/edit/${id}`);
  };

  const handleViewJob = (id: number) => {
    // Navigate to job details page
    navigate(`/jobs/${id}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="status-active">Active</Badge>;
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "Closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "High":
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case "Medium":
        return <Badge variant="default" className="text-xs">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary" className="text-xs">Low</Badge>;
      default:
        return null;
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter === "all" && typeFilter === "all") return true;
    if (statusFilter !== "all" && job.status.toLowerCase() !== statusFilter) return false;
    if (typeFilter !== "all" && job.type.toLowerCase() !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Manage your job openings and track applications
          </p>
        </div>
        <Button onClick={() => navigate('/jobs/add')}>
          <Plus className="mr-2 h-4 w-4" />
          New Job
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">3</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">1</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">166</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="hr-card">
        <CardHeader>
          <CardTitle className="text-lg">Job Listings</CardTitle>
          <CardDescription>Search and filter your job postings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Jobs Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{job.title}</p>
                          {getUrgencyBadge(job.urgency)}
                        </div>
                        <p className="text-sm text-muted-foreground">{job.salary}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        {job.department}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{job.location}</span>
                        {job.remote && (
                          <Badge variant="secondary" className="text-xs">Remote</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {job.applicants}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleViewJob(job.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleEditJob(job.id)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}