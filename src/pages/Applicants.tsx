import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Award, 
  BarChart2, 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  MapPin, 
  Mail, 
  Phone, 
  Search, 
  User, 
  Users,
  Plus,
  Star,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
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

export default function Applicants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [cvPreviewError, setCvPreviewError] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Applicant; direction: 'asc' | 'desc' } | null>({
    key: 'rating',
    direction: 'desc'
  });
  
  // Pagination state
  const pageSize = 20; // Set page size to 20 as requested // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);
  
  const { theme } = useTheme();
  
  const handleViewProfile = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setCvPreviewError(false);
    setIsViewDialogOpen(true);
  };

  // Transform API response to match our Applicant interface
  const transformApplicant = (app: any): Applicant => {
    // Parse the Overall score (e.g., "9/10" -> 9)
    const rating = app.Overall ? parseInt(app.Overall.split('/')[0]) : 0;
    
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
      firstName: app['First Nmae'] || 'Unknown',
      lastName: app['Last Name'] || 'Unknown',
      email: app.Email || 'No email',
      phone: app.phone || 'No phone',
      currentRole: app['Curent Role'] || 'Not specified',
      appliedFor: app['Job Title'] || 'Not specified',
      experience: app.Experience ? `${app.Experience}/10` : 'Not specified',
      location: app.Location || 'Not specified',
      stage: 'Applied', // Default stage
      status: 'Active', // Default status
      appliedDate: new Date().toISOString().split('T')[0], // Current date as fallback
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

  // Fetch all applications at once for full dataset sorting
  const {
    data: allData,
    status: queryStatus,
    error,
    refetch
  } = useQuery({
    queryKey: ['applications', searchTerm, statusFilter, sortConfig],
    queryFn: async () => {
      try {
        const response = await api.getApplications();
        return response.map(transformApplicant);
      } catch (err) {
        throw new Error('Failed to fetch applications');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Calculate pagination
  const totalPages = Math.ceil((allData?.length || 0) / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  
  // Calculate statistics
  const totalApplicants = allData?.length || 0;
  const activeApplicants = allData?.filter(a => a.status === 'Active').length || 0;
  const newThisWeek = allData?.filter(a => {
    if (!a.appliedDate) return false;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(a.appliedDate) > weekAgo;
  }).length || 0;
  
  // For backward compatibility
  const allApplicants = allData || [];

  // Sort and filter the data
  const sortedAndFilteredApplicants = useMemo(() => {
    if (!allData) return [];
    
    let result = [...allData];
    
    // Filter
    result = result.filter((applicant) => {
      const matchesSearch = searchTerm === '' || 
        `${applicant.firstName} ${applicant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle undefined/null values
        if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
        
        // Handle string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        // Handle number comparison
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' 
            ? aValue - bValue 
            : bValue - aValue;
        }
        
        return 0;
      });
    }

    return result;
  }, [allData, searchTerm, statusFilter, sortConfig]);
  
  // Get current page data
  const currentPageData = useMemo(() => {
    return sortedAndFilteredApplicants.slice(startIndex, endIndex);
  }, [sortedAndFilteredApplicants, startIndex, endIndex]);

  // Update current page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, statusFilter, sortConfig]);

  // Handle search and filter changes
  useEffect(() => {
    // Refetch when search or filter changes
    const timer = setTimeout(() => {
      refetch();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, refetch]);

  const getStatusBadge = (status: string) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'Active':
        return <span className={`${baseStyles} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`}>{status}</span>;
      case 'Inactive':
        return <span className={`${baseStyles} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300`}>{status}</span>;
      case 'Hired':
        return <span className={`${baseStyles} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`}>{status}</span>;
      case 'Rejected':
        return <span className={`${baseStyles} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`}>{status}</span>;
      default:
        return <span className={`${baseStyles} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300`}>{status}</span>;
    }
  };

  const requestSort = (key: keyof Applicant) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof Applicant) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '↕';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const isLoading = queryStatus === 'pending';

  // Show loading state when fetching data
  if (isLoading && allApplicants.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top of the table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`space-y-6 animate-fade-in p-4 md:p-6 bg-background text-foreground`}>
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Applicants</h1>
        <p className="text-muted-foreground">
          Manage candidate applications and track their progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">
              {totalApplicants}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">
              {activeApplicants}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">
              {allData?.filter(a => a.status === 'On Hold').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">
              {newThisWeek}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search, Filter and Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row w-full gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applicants..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2 opacity-50" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Hold">In Process</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            <BarChart2 className="w-4 h-4 mr-2" />
            Analyze
          </Button>
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            disabled={queryStatus === 'pending'}
            className="w-full md:w-auto"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${queryStatus === 'pending' ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Applicant
          </Button>
        </div>
      </div>

      {/* Applicants Table */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Candidate Pipeline</CardTitle>
          <CardDescription>Search and filter candidate applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="w-[250px] cursor-pointer"
                    onClick={() => requestSort('firstName')}
                  >
                    Name {getSortIndicator('firstName')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort('appliedFor')}
                  >
                    Applied For {getSortIndicator('appliedFor')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    Status {getSortIndicator('status')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer w-40"
                    onClick={() => requestSort('overallScore')}
                  >
                    Overall Score {getSortIndicator('overallScore')}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">
                      {applicant.firstName} {applicant.lastName}
                    </TableCell>
                    <TableCell>{applicant.appliedFor}</TableCell>
                    <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              parseFloat(applicant.overallScore || '0') >= 7 
                                ? 'bg-green-500' 
                                : parseFloat(applicant.overallScore || '0') >= 5 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`}
                            style={{ 
                              width: `${(parseFloat(applicant.overallScore || '0') / 10) * 100}%`
                            }}
                          />
                        </div>
                        <span>
                          {applicant.overallScore && applicant.overallScore.endsWith('/10') 
                            ? applicant.overallScore 
                            : `${applicant.overallScore || '0'}/10`
                          }
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewProfile(applicant)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {queryStatus === 'pending' && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(endIndex, sortedAndFilteredApplicants.length)}
              </span>{' '}
              of <span className="font-medium">{sortedAndFilteredApplicants.length}</span> applicants
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show first, last, and pages around current page
                  let pageNum = i;
                  if (totalPages > 5) {
                    if (currentPage < 3) {
                      pageNum = i;
                    } else if (currentPage > totalPages - 4) {
                      pageNum = totalPages - 5 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="w-10 h-10 p-0"
                    >
                      {pageNum + 1}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
          {selectedApplicant && (
            <div className="flex flex-col h-full">
              {/* Header with name and score */}
              <div className="p-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {selectedApplicant.firstName} {selectedApplicant.lastName}
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedApplicant.currentRole || 'No role specified'}
                      {selectedApplicant.appliedFor && ` • Applied for ${selectedApplicant.appliedFor}`}
                    </p>
                  </div>
                  {selectedApplicant.overallScore && (
                    <div className="bg-muted/50 rounded-lg p-3 min-w-[120px]">
                      <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">
                          {parseFloat(selectedApplicant.overallScore).toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">/ 10</span>
                      </div>
                      <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full rounded-full ${
                            parseFloat(selectedApplicant.overallScore) >= 7 
                              ? 'bg-green-500' 
                              : parseFloat(selectedApplicant.overallScore) >= 5 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                          }`}
                          style={{ 
                            width: `${Math.min(100, (parseFloat(selectedApplicant.overallScore) / 10) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Main content with two columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 flex-1 overflow-auto">
                {/* Left Column - CV Preview */}
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      CV Preview
                    </h3>
                    {selectedApplicant.cvUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <a 
                          href={selectedApplicant.cvUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  {!cvPreviewError ? (
                    <div className="flex-1 border rounded-lg overflow-hidden">
                      <iframe 
                        src={getEmbeddableUrl(selectedApplicant.cvUrl) || ''}
                        className="w-full h-full min-h-[500px] border-0"
                        title="CV Preview"
                        allowFullScreen
                        onError={() => setCvPreviewError(true)}
                        onLoad={(e) => {
                          try {
                            const iframe = e.target as HTMLIFrameElement;
                            if (iframe.contentDocument?.title.includes('Error 404') || 
                                iframe.contentDocument?.title.includes('Google Drive')) {
                              setCvPreviewError(true);
                            }
                          } catch (error) {
                            console.log('Cross-origin iframe loaded');
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center border rounded-lg">
                      <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium text-muted-foreground">CV Preview Unavailable</h3>
                      <p className="text-sm text-muted-foreground mt-2 mb-4">
                        The CV cannot be previewed. You can still download it using the button above.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Right Column - Applicant Details */}
                <div className="h-full overflow-y-auto">
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-base font-medium flex items-center gap-2 mb-4">
                        <User className="h-4 w-4" />
                        Contact Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-muted p-2 rounded-lg mr-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <a 
                              href={`mailto:${selectedApplicant.email}`}
                              className="text-sm font-medium hover:underline break-all"
                            >
                              {selectedApplicant.email || 'Not provided'}
                            </a>
                          </div>
                        </div>
                        
                        {selectedApplicant.phone && (
                          <div className="flex items-start">
                            <div className="bg-muted p-2 rounded-lg mr-3">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Phone</p>
                              <a 
                                href={`tel:${selectedApplicant.phone}`}
                                className="text-sm font-medium hover:underline"
                              >
                                {selectedApplicant.phone}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {selectedApplicant.location && (
                          <div className="flex items-start">
                            <div className="bg-muted p-2 rounded-lg mr-3">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Location</p>
                              <p className="text-sm font-medium">
                                {selectedApplicant.location}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Skills & Competencies */}
                    {selectedApplicant.skills?.length > 0 && (
                      <div className="border rounded-lg p-4">
                        <h3 className="text-base font-medium flex items-center gap-2 mb-4">
                          <Award className="h-4 w-4" />
                          Skills & Competencies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplicant.skills.map((skill, index) => (
                            <div 
                              key={index}
                              className="px-2.5 py-1 text-xs bg-muted/50 rounded-sm text-foreground/80 font-normal border border-border/50"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Evaluation Summary */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-base font-medium flex items-center gap-2 mb-4">
                        <BarChart2 className="h-4 w-4" />
                        Evaluation Summary
                      </h3>
                      <div className="space-y-4">
                        {[
                          { key: 'technicalSkills', label: 'Technical Skills' },
                          { key: 'achievement', label: 'Achievements' },
                          { key: 'education', label: 'Education' },
                          { key: 'experience', label: 'Experience' }
                        ].map(({ key, label }) => (
                          selectedApplicant[key as keyof Applicant] && (
                            <div key={key} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{label}</span>
                                <span className="text-sm font-mono">
                                  {selectedApplicant[key as keyof Applicant].toString().endsWith('/10') 
                                    ? selectedApplicant[key as keyof Applicant]
                                    : `${selectedApplicant[key as keyof Applicant]}/10`}
                                </span>
                              </div>
                              <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    parseFloat(selectedApplicant[key as keyof Applicant] as string) >= 7 
                                      ? 'bg-green-500' 
                                      : parseFloat(selectedApplicant[key as keyof Applicant] as string) >= 5 
                                        ? 'bg-yellow-500' 
                                        : 'bg-red-500'
                                  }`}
                                  style={{ 
                                    width: `${Math.min(100, (parseFloat(selectedApplicant[key as keyof Applicant] as string) / 10) * 100)}%` 
                                  }}
                                />
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="p-6 border-t">
                <div className="text-sm text-muted-foreground">
                  Applied on {new Date(selectedApplicant.appliedDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}