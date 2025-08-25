import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  Archive,
  Users,
  MapPin,
  Phone,
  Mail,
  FileText,
  Calendar,
  Star
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
}

export default function Applicants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.getApplications();
      
      // Transform API response to match our Applicant interface
      const transformedApplicants = response.map((app: any, index: number) => ({
        id: app.id || index + 1,
        firstName: app.first_name || app.firstName || "Unknown",
        lastName: app.last_name || app.lastName || "User",
        email: app.email || "no-email@example.com",
        phone: app.phone || app.telephone || "+33 1 00 00 00 00",
        currentRole: app.current_role || app.currentRole || "Not specified",
        appliedFor: app.applied_for || app.position || "Unknown Position",
        experience: app.experience || "Not specified",
        location: app.location || app.ville || "Remote",
        stage: app.stage || "Applied",
        status: app.status || "Active",
        appliedDate: app.applied_date || app.created_at || new Date().toISOString().split('T')[0],
        skills: app.skills || app.competences || [],
        rating: app.rating || 0,
        source: app.source || "Direct Application"
      }));
      
      setApplicants(transformedApplicants);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch applications. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="status-active">Active</Badge>;
      case "On Hold":
        return <Badge className="status-pending">On Hold</Badge>;
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "Phone Screen":
        return <Badge variant="outline">Phone Screen</Badge>;
      case "Technical Interview":
        return <Badge variant="default">Technical</Badge>;
      case "Final Interview":
        return <Badge className="bg-foreground text-background">Final</Badge>;
      case "Offer Extended":
        return <Badge className="bg-success text-success-foreground">Offer</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{stage}</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "fill-foreground text-foreground" : "text-muted-foreground"
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applicants</h1>
          <p className="text-muted-foreground mt-1">
            Manage candidate applications and track their progress
          </p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Applicant
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicants.length}</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{applicants.filter(a => a.status === 'Active').length}</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{applicants.filter(a => a.status === 'On Hold').length}</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{applicants.filter(a => {
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return new Date(a.appliedDate) > weekAgo;
            }).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Applicants Table */}
      <Card className="hr-card">
        <CardHeader>
          <CardTitle className="text-lg">Candidate Pipeline</CardTitle>
          <CardDescription>Search and filter candidate applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search applicants..."
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
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="phone">Phone Screen</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Applied For</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading applications...
                    </TableCell>
                  </TableRow>
                ) : applicants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  applicants.map((applicant) => (
                  <TableRow key={applicant.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{applicant.firstName} {applicant.lastName}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {applicant.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {applicant.phone}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{applicant.appliedFor}</p>
                        <p className="text-sm text-muted-foreground">{applicant.currentRole}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {applicant.experience}
                      </div>
                    </TableCell>
                    <TableCell>{getStageBadge(applicant.stage)}</TableCell>
                    <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                    <TableCell>{getRatingStars(applicant.rating)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{applicant.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            View Resume
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
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