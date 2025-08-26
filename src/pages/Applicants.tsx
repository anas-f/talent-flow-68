import { useState, useMemo, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { ApplicantsTable } from "@/components/applicants/ApplicantsTable";
import { ApplicantsStats } from "@/components/applicants/ApplicantsStats";
import { ApplicantFilters } from "@/components/applicants/ApplicantFilters";
import { useApplicants } from "@/hooks/useApplicants";
import { getEmbeddableUrl } from "@/utils/fileHelpers";
import { 
  BarChart2, 
  FileText, 
  Download, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award 
} from "lucide-react";

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
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [cvPreviewError, setCvPreviewError] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Applicant; direction: 'asc' | 'desc' } | null>({
    key: 'rating',
    direction: 'desc'
  });
  
  // Pagination state
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(0);
  
  const { theme } = useTheme();
  
  const handleViewProfile = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setCvPreviewError(false);
    setIsViewDialogOpen(true);
  };

  // Fetch applications using the custom hook
  const {
    data: allData = [],
    isLoading,
    error,
    refetch
  } = useApplicants();

  // Calculate pagination
  const totalPages = Math.ceil(allData.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;

  // Sort and filter the data
  const sortedAndFilteredApplicants = useMemo(() => {
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

  const requestSort = (key: keyof Applicant) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Show loading state when fetching data
  if (isLoading && allData.length === 0) {
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
      <ApplicantsStats applicants={allData} />

      {/* Search, Filter and Actions */}
      <ApplicantFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onRefresh={refetch}
        isLoading={isLoading}
      />

      <div className="flex items-center justify-end mb-4">
        <Button variant="outline" onClick={() => window.location.href = '/analytics'}>
          <BarChart2 className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Applicants Table */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Candidate Pipeline</CardTitle>
          <CardDescription>Search and filter candidate applications</CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicantsTable
            applicants={currentPageData}
            onViewProfile={handleViewProfile}
            sortConfig={sortConfig}
            onSort={requestSort}
            isLoading={isLoading}
          />
          
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