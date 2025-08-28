import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useJobs } from "@/hooks/useJobs";
import { RefreshCw, BarChart2, Plus, Search as SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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
  Briefcase,
  FileText
} from "lucide-react";

import { Job } from "@/hooks/useJobs";

interface JobTableItem extends Job {
  applicants: number;
  postedDate: string;
}

export default function Jobs() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Use the useJobs hook to fetch and cache jobs data
  const { 
    data: allJobs = [], 
    isLoading, 
    refetch, 
    isRefetching 
  } = useJobs();

  const jobs: JobTableItem[] = useMemo(() => {
    return allJobs.map(job => ({
      ...job,
      applicants: 0, // Default value, can be updated if available
      postedDate: new Date().toISOString().split('T')[0] // Default to today if not available
    }));
  }, [allJobs]);

  // Loading skeleton for stats cards
  const LoadingStatsCards = () => (
    <div className="grid gap-4 md:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <Card key={item} className="animate-pulse">
          <CardHeader className="pb-3">
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-1/2 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Loading skeleton for jobs table
  const LoadingTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 border-b">
          {[1, 2, 3, 4, 5, 6].map((col) => (
            <Skeleton key={col} className="h-4 w-full" />
          ))}
        </div>
        {[...Array(5)].map((_, row) => (
          <div key={row} className="grid grid-cols-12 gap-4 p-4 border-b">
            {[...Array(6)].map((_, col) => (
              <Skeleton key={`${row}-${col}`} className="h-4 w-full" />
            ))}
          </div>
        ))}
        <div className="flex justify-between items-center p-4">
          <Skeleton className="h-4 w-32" />
          <div className="flex space-x-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );

  // Handle refresh
  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Refreshed",
        description: "Job listings have been updated.",
      });
    } catch (error) {
      console.error('Error refreshing jobs:', error);
      toast({
        title: "Error",
        description: "Failed to refresh jobs. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        (job.title?.toLowerCase().includes(searchLower) ||
        job.department?.toLowerCase().includes(searchLower) ||
        job.location?.toLowerCase().includes(searchLower) ||
        job.description?.toLowerCase().includes(searchLower));
        
      const matchesStatus = statusFilter === "all" || job.status?.toLowerCase() === statusFilter.toLowerCase();
      const matchesType = typeFilter === "all" || job.type?.toLowerCase() === typeFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [jobs, searchTerm, statusFilter, typeFilter]);

  // Calculate stats for the dashboard
  const stats = useMemo(() => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job => job.status === 'Active').length;
    const draftJobs = jobs.filter(job => job.status === 'Draft').length;
    const closedJobs = jobs.filter(job => job.status === 'Closed').length;
    
    return { totalJobs, activeJobs, draftJobs, closedJobs };
  }, [jobs]);

  const handleDeleteJob = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      try {
        // TODO: Call API to delete the job
        // await api.deleteJob(id);
        
        // Refresh the jobs list
        await refetch();
        
        toast({
          title: "Job deleted",
          description: "The job posting has been successfully deleted.",
        });
      } catch (error) {
        console.error('Error deleting job:', error);
        toast({
          title: "Error",
          description: "Failed to delete the job. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleEditJob = (job: JobTableItem) => {
    // Implement edit functionality
    console.log('Edit job:', job);
  };

  const handleViewJob = (job: JobTableItem) => {
    if (job) {
      navigate(`/jobs/${job.id}`);
    } else {
      toast({
        title: "Error",
        description: "Job not found. Please refresh the page and try again.",
        variant: "destructive"
      });
    }
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
    const urgencyLower = (urgency || '').toLowerCase();
    
    if (urgencyLower.includes('élevé') || urgencyLower.includes('eleve')) {
      return <Badge variant="destructive" className="text-xs">Élevé</Badge>;
    } else if (urgencyLower.includes('moyen')) {
      return <Badge variant="default" className="text-xs bg-orange-500 hover:bg-orange-600 text-white">Moyen</Badge>;
    } else if (urgencyLower.includes('faible')) {
      return <Badge variant="secondary" className="text-xs">Faible</Badge>;
    }
    
    return <Badge variant="outline" className="text-xs">Non spécifié</Badge>;
  };

  // Filtering and sorting is now handled in the useMemo hook above

  // Show loading state when fetching data
  if (isLoading && allJobs.length === 0) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <LoadingStatsCards />
        <LoadingTable />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Jobs</h1>
            <p className="text-muted-foreground mt-1">
              {allJobs.length} total jobs
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/jobs/add')}
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New Job
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      {isLoading ? (
        <LoadingStatsCards />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hr-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
            </CardContent>
          </Card>
          <Card className="hr-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.activeJobs}</div>
            </CardContent>
          </Card>
          <Card className="hr-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.draftJobs}</div>
            </CardContent>
          </Card>
          <Card className="hr-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {allJobs.reduce((sum, job) => sum + (job.applicants || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Job Listings</CardTitle>
              <CardDescription>Search and filter your job postings</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefetching}
              className={`h-8 w-8 p-0 transition-all duration-300 ${isRefetching ? 'scale-90' : 'hover:scale-105'}`}
              title="Refresh jobs"
            >
              <RefreshCw className={`h-4 w-4 transition-transform duration-300 ${isRefetching ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                  <TableHead className="w-[300px]">Intitulé du Poste</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Type de Poste</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Candidats</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex items-center justify-center">
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        Loading jobs...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <FileText className="h-8 w-8 mb-2 opacity-50" />
                        No jobs found.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <TableRow key={job.id} className="group hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{job.title}</div>
                          {job.urgency && (
                            <div className="ml-2">
                              {getUrgencyBadge(job.urgency)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {job.department || 'Non spécifié'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="whitespace-nowrap">
                          {job.type || 'Non spécifié'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {job.location || 'Non spécifiée'}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{job.applicants || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem 
                                onClick={() => handleViewJob(job)}
                                className="cursor-pointer"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleEditJob(job)}
                                className="cursor-pointer"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive cursor-pointer"
                                onClick={() => handleDeleteJob(job.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}