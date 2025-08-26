import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
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

interface ApplicantsTableProps {
  applicants: Applicant[];
  onViewProfile: (applicant: Applicant) => void;
  sortConfig: { key: keyof Applicant; direction: 'asc' | 'desc' } | null;
  onSort: (key: keyof Applicant) => void;
  isLoading: boolean;
}

export function ApplicantsTable({ 
  applicants, 
  onViewProfile, 
  sortConfig, 
  onSort, 
  isLoading 
}: ApplicantsTableProps) {
  const getStatusBadge = (status: string) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'Active':
        return <span className={`${baseStyles} bg-success/10 text-success`}>{status}</span>;
      case 'Inactive':
        return <span className={`${baseStyles} bg-muted text-muted-foreground`}>{status}</span>;
      case 'Hired':
        return <span className={`${baseStyles} bg-primary/10 text-primary`}>{status}</span>;
      case 'Rejected':
        return <span className={`${baseStyles} bg-destructive/10 text-destructive`}>{status}</span>;
      default:
        return <span className={`${baseStyles} bg-muted text-muted-foreground`}>{status}</span>;
    }
  };

  const getSortIndicator = (key: keyof Applicant) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '↕';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="w-[200px] cursor-pointer"
              onClick={() => onSort('firstName')}
            >
              Name {getSortIndicator('firstName')}
            </TableHead>
            <TableHead className="w-[150px]">Phone Number</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => onSort('appliedFor')}
            >
              Applied For {getSortIndicator('appliedFor')}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => onSort('status')}
            >
              Status {getSortIndicator('status')}
            </TableHead>
            <TableHead 
              className="cursor-pointer w-40"
              onClick={() => onSort('overallScore')}
            >
              Overall Score {getSortIndicator('overallScore')}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell className="font-medium">
                {applicant.firstName} {applicant.lastName}
              </TableCell>
              <TableCell>{applicant.phone || 'N/A'}</TableCell>
              <TableCell>{applicant.email}</TableCell>
              <TableCell>{applicant.appliedFor}</TableCell>
              <TableCell>{getStatusBadge(applicant.status)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        parseFloat(applicant.overallScore || '0') >= 7 
                          ? 'bg-success' 
                          : parseFloat(applicant.overallScore || '0') >= 5 
                            ? 'bg-warning' 
                            : 'bg-destructive'
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
                  onClick={() => onViewProfile(applicant)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}