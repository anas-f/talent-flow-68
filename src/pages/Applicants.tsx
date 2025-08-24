import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

export default function Applicants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  const applicants = [
    {
      id: 1,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@email.com",
      phone: "+33 1 23 45 67 89",
      currentRole: "Frontend Developer",
      appliedFor: "Senior Frontend Developer",
      experience: "5 years",
      location: "Paris, France",
      stage: "Technical Interview",
      status: "Active",
      appliedDate: "2024-01-15",
      skills: ["React", "TypeScript", "Node.js"],
      rating: 4.5,
      source: "LinkedIn"
    },
    {
      id: 2,
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phone: "+33 1 98 76 54 32",
      currentRole: "Product Manager",
      appliedFor: "Senior Product Manager",
      experience: "7 years",
      location: "Lyon, France",
      stage: "Final Interview",
      status: "Active",
      appliedDate: "2024-01-12",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      rating: 4.8,
      source: "Company Website"
    },
    {
      id: 3,
      firstName: "Marie",
      lastName: "Martin",
      email: "marie.martin@email.com",
      phone: "+33 1 11 22 33 44",
      currentRole: "UX Designer",
      appliedFor: "Senior UX Designer",
      experience: "4 years",
      location: "Remote",
      stage: "Phone Screen",
      status: "On Hold",
      appliedDate: "2024-01-18",
      skills: ["Figma", "User Research", "Prototyping"],
      rating: 4.2,
      source: "Referral"
    },
    {
      id: 4,
      firstName: "Pierre",
      lastName: "Dubois",
      email: "pierre.dubois@email.com",
      phone: "+33 1 55 66 77 88",
      currentRole: "Backend Developer",
      appliedFor: "Backend Developer",
      experience: "3 years",
      location: "Marseille, France",
      stage: "Rejected",
      status: "Inactive",
      appliedDate: "2024-01-08",
      skills: ["Python", "Django", "PostgreSQL"],
      rating: 3.2,
      source: "Job Board"
    },
    {
      id: 5,
      firstName: "Clara",
      lastName: "Bernard",
      email: "clara.bernard@email.com",
      phone: "+33 1 44 55 66 77",
      currentRole: "Data Scientist",
      appliedFor: "Senior Data Scientist",
      experience: "6 years",
      location: "Paris, France",
      stage: "Offer Extended",
      status: "Active",
      appliedDate: "2024-01-10",
      skills: ["Python", "Machine Learning", "Statistics"],
      rating: 4.9,
      source: "LinkedIn"
    }
  ];

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
            <div className="text-2xl font-bold">247</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">189</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">43</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">15</div>
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
                {applicants.map((applicant) => (
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