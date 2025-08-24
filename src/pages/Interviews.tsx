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
  Calendar,
  Clock,
  Users,
  MapPin,
  Video,
  Phone
} from "lucide-react";

export default function Interviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const interviews = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      position: "Senior Frontend Developer",
      type: "Technical Interview",
      interviewer: "John Smith",
      date: "2024-01-24",
      time: "14:00",
      duration: "60 min",
      location: "Room A / Video Call",
      status: "Scheduled",
      notes: "Focus on React architecture",
      stage: "Technical"
    },
    {
      id: 2,
      candidate: "Jean Dupont",
      position: "Product Manager",
      type: "Final Interview",
      interviewer: "Marie Claire",
      date: "2024-01-25",
      time: "10:00",
      duration: "45 min",
      location: "Office - Room B",
      status: "Scheduled",
      notes: "Leadership and strategy discussion",
      stage: "Final"
    },
    {
      id: 3,
      candidate: "Marie Martin",
      position: "UX Designer",
      type: "Portfolio Review",
      interviewer: "Alex Turner",
      date: "2024-01-23",
      time: "15:30",
      duration: "90 min",
      location: "Video Call",
      status: "Completed",
      notes: "Portfolio review and design process",
      stage: "Technical"
    },
    {
      id: 4,
      candidate: "Clara Bernard",
      position: "Data Scientist",
      type: "HR Interview",
      interviewer: "Sophie Martin",
      date: "2024-01-26",
      time: "11:00",
      duration: "30 min",
      location: "Phone Call",
      status: "Scheduled",
      notes: "Cultural fit assessment",
      stage: "HR"
    },
    {
      id: 5,
      candidate: "Lucas Petit",
      position: "Backend Developer",
      type: "Technical Interview",
      interviewer: "David Lee",
      date: "2024-01-22",
      time: "16:00",
      duration: "75 min",
      location: "Office - Room C",
      status: "Cancelled",
      notes: "Candidate unavailable",
      stage: "Technical"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Badge className="status-active">Scheduled</Badge>;
      case "Completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "Rescheduled":
        return <Badge className="status-pending">Rescheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Technical Interview":
        return <Badge variant="default">Technical</Badge>;
      case "Final Interview":
        return <Badge className="bg-foreground text-background">Final</Badge>;
      case "HR Interview":
        return <Badge variant="outline">HR</Badge>;
      case "Portfolio Review":
        return <Badge variant="secondary">Portfolio</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getLocationIcon = (location: string) => {
    if (location.includes("Video") || location.includes("Call")) {
      return location.includes("Video") ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />;
    }
    return <MapPin className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interviews</h1>
          <p className="text-muted-foreground mt-1">
            Schedule and manage candidate interviews
          </p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">23</div>
          </CardContent>
        </Card>
      </div>

      {/* Interviews Table */}
      <Card className="hr-card">
        <CardHeader>
          <CardTitle className="text-lg">Interview Schedule</CardTitle>
          <CardDescription>Manage upcoming and past interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search interviews..."
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
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="portfolio">Portfolio</SelectItem>
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
                  <TableHead>Position</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Interviewer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow key={interview.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{interview.candidate}</p>
                        <p className="text-sm text-muted-foreground">{interview.position}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{interview.position}</p>
                        <Badge variant="outline" className="text-xs">{interview.stage}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(interview.type)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{new Date(interview.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{interview.time} ({interview.duration})</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {interview.interviewer}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getLocationIcon(interview.location)}
                        <span className="text-sm">{interview.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(interview.status)}</TableCell>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Add to Calendar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Cancel Interview
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