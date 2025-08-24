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
  Mail,
  Phone,
  Star,
  Tag,
  Calendar
} from "lucide-react";

export default function TalentPool() {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const talents = [
    {
      id: 1,
      firstName: "Alexandre",
      lastName: "Dubois",
      email: "alexandre.dubois@email.com",
      phone: "+33 1 23 45 67 89",
      currentRole: "Senior React Developer",
      company: "TechCorp",
      location: "Paris, France",
      experience: "6 years",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      rating: 4.7,
      availability: "3 months",
      salary: "€75k",
      addedDate: "2024-01-10",
      source: "LinkedIn",
      tags: ["Passive", "Senior", "Frontend"],
      notes: "Strong technical background, interested in fintech"
    },
    {
      id: 2,
      firstName: "Sophie",
      lastName: "Martinez",
      email: "sophie.martinez@email.com",
      phone: "+33 1 98 76 54 32",
      currentRole: "Product Design Lead",
      company: "Design Studio",
      location: "Lyon, France",
      experience: "8 years",
      skills: ["Figma", "User Research", "Design Systems", "Leadership"],
      rating: 4.9,
      availability: "6 months",
      salary: "€65k",
      addedDate: "2024-01-08",
      source: "Referral",
      tags: ["Passive", "Lead", "Design"],
      notes: "Excellent design skills, team leadership experience"
    },
    {
      id: 3,
      firstName: "Thomas",
      lastName: "Leroy",
      email: "thomas.leroy@email.com",
      phone: "+33 1 11 22 33 44",
      currentRole: "DevOps Engineer",
      company: "CloudTech",
      location: "Remote",
      experience: "5 years",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      rating: 4.5,
      availability: "1 month",
      salary: "€70k",
      addedDate: "2024-01-15",
      source: "Company Website",
      tags: ["Active", "DevOps", "Remote"],
      notes: "Looking for new challenges in cloud architecture"
    },
    {
      id: 4,
      firstName: "Camille",
      lastName: "Rousseau",
      email: "camille.rousseau@email.com",
      phone: "+33 1 55 66 77 88",
      currentRole: "Data Scientist",
      company: "AI Labs",
      location: "Toulouse, France",
      experience: "4 years",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      rating: 4.6,
      availability: "4 months",
      salary: "€68k",
      addedDate: "2024-01-12",
      source: "Conference",
      tags: ["Passive", "ML", "Analytics"],
      notes: "PhD in AI, strong research background"
    },
    {
      id: 5,
      firstName: "Julien",
      lastName: "Bernard",
      email: "julien.bernard@email.com",
      phone: "+33 1 44 55 66 77",
      currentRole: "Backend Architect",
      company: "Enterprise Corp",
      location: "Marseille, France",
      experience: "10 years",
      skills: ["Java", "Spring", "Microservices", "PostgreSQL"],
      rating: 4.8,
      availability: "2 months",
      salary: "€85k",
      addedDate: "2024-01-05",
      source: "LinkedIn",
      tags: ["Active", "Senior", "Backend"],
      notes: "Architecture expertise, looking for technical leadership role"
    }
  ];

  const getAvailabilityBadge = (availability: string) => {
    if (availability.includes("1 month") || availability.includes("2 month")) {
      return <Badge className="bg-success text-success-foreground">Available Soon</Badge>;
    } else if (availability.includes("3 month") || availability.includes("4 month")) {
      return <Badge className="status-pending">Medium Term</Badge>;
    } else {
      return <Badge variant="outline">Long Term</Badge>;
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
          <h1 className="text-3xl font-bold">Talent Pool</h1>
          <p className="text-muted-foreground mt-1">
            Manage passive candidates and future prospects
          </p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Talent
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Talents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">34</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Passive Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">89</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
          </CardContent>
        </Card>
      </div>

      {/* Talent Pool Table */}
      <Card className="hr-card">
        <CardHeader>
          <CardTitle className="text-lg">Talent Database</CardTitle>
          <CardDescription>Search and manage your talent pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search talents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="lyon">Lyon</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
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
                  <TableHead>Talent</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {talents.map((talent) => (
                  <TableRow key={talent.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{talent.firstName} {talent.lastName}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {talent.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {talent.phone}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{talent.currentRole}</p>
                        <p className="text-sm text-muted-foreground">{talent.company}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {talent.experience}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {talent.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {talent.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{talent.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{talent.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getAvailabilityBadge(talent.availability)}
                        <p className="text-xs text-muted-foreground">{talent.availability}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRatingStars(talent.rating)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {talent.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
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