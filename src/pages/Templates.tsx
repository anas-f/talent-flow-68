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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Copy,
  Archive,
  FileText,
  Mail,
  Briefcase,
  Calendar,
  Star
} from "lucide-react";

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const jobTemplates = [
    {
      id: 1,
      name: "Senior Frontend Developer",
      category: "Engineering",
      description: "Template for senior frontend development roles",
      skills: ["React", "TypeScript", "Next.js"],
      level: "Senior",
      type: "Full-time",
      usageCount: 12,
      lastUsed: "2024-01-20",
      createdBy: "HR Team"
    },
    {
      id: 2,
      name: "Product Manager",
      category: "Product",
      description: "Standard template for product management positions",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      level: "Mid-Senior",
      type: "Full-time",
      usageCount: 8,
      lastUsed: "2024-01-18",
      createdBy: "Hiring Manager"
    },
    {
      id: 3,
      name: "UX Designer",
      category: "Design",
      description: "Template for user experience design roles",
      skills: ["Figma", "User Research", "Prototyping"],
      level: "Mid-Level",
      type: "Full-time",
      usageCount: 6,
      lastUsed: "2024-01-15",
      createdBy: "Design Lead"
    }
  ];

  const emailTemplates = [
    {
      id: 1,
      name: "Application Acknowledgment",
      category: "Automated",
      subject: "Thank you for your application",
      description: "Automated response to new applications",
      usageCount: 147,
      lastUsed: "2024-01-22",
      createdBy: "HR Team"
    },
    {
      id: 2,
      name: "Interview Invitation",
      category: "Interview",
      subject: "Interview invitation for {{position}}",
      description: "Standard interview scheduling email",
      usageCount: 34,
      lastUsed: "2024-01-21",
      createdBy: "Recruitment Team"
    },
    {
      id: 3,
      name: "Rejection - After Interview",
      category: "Rejection",
      subject: "Update on your application",
      description: "Polite rejection after interview process",
      usageCount: 23,
      lastUsed: "2024-01-19",
      createdBy: "HR Manager"
    },
    {
      id: 4,
      name: "Offer Letter",
      category: "Offer",
      subject: "Job Offer - {{position}} at {{company}}",
      description: "Standard job offer letter template",
      usageCount: 8,
      lastUsed: "2024-01-17",
      createdBy: "HR Director"
    }
  ];

  const evaluationTemplates = [
    {
      id: 1,
      name: "Technical Interview Scorecard",
      category: "Technical",
      description: "Standard scorecard for technical interviews",
      criteria: ["Technical Skills", "Problem Solving", "Code Quality"],
      usageCount: 45,
      lastUsed: "2024-01-22",
      createdBy: "Engineering Team"
    },
    {
      id: 2,
      name: "Cultural Fit Assessment",
      category: "Culture",
      description: "Evaluation template for cultural alignment",
      criteria: ["Team Collaboration", "Values Alignment", "Communication"],
      usageCount: 67,
      lastUsed: "2024-01-21",
      createdBy: "HR Team"
    },
    {
      id: 3,
      name: "Leadership Assessment",
      category: "Leadership",
      description: "Template for evaluating leadership potential",
      criteria: ["Strategic Thinking", "Team Building", "Decision Making"],
      usageCount: 15,
      lastUsed: "2024-01-18",
      createdBy: "Executive Team"
    }
  ];

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, string> = {
      "Engineering": "bg-blue-100 text-blue-800",
      "Product": "bg-green-100 text-green-800", 
      "Design": "bg-purple-100 text-purple-800",
      "Automated": "bg-gray-100 text-gray-800",
      "Interview": "bg-yellow-100 text-yellow-800",
      "Rejection": "bg-red-100 text-red-800",
      "Offer": "bg-green-100 text-green-800",
      "Technical": "bg-blue-100 text-blue-800",
      "Culture": "bg-orange-100 text-orange-800",
      "Leadership": "bg-indigo-100 text-indigo-800"
    };
    
    return (
      <Badge className={variants[category] || "bg-gray-100 text-gray-800"}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground mt-1">
            Manage job descriptions, email templates, and evaluation forms
          </p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Job Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Email Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">15</div>
          </CardContent>
        </Card>
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">247</div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Tabs */}
      <Card className="hr-card">
        <CardHeader>
          <CardTitle className="text-lg">Template Library</CardTitle>
          <CardDescription>Browse and manage all your recruitment templates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="jobs" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Job Templates
              </TabsTrigger>
              <TabsTrigger value="emails" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Templates
              </TabsTrigger>
              <TabsTrigger value="evaluations" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Evaluation Forms
              </TabsTrigger>
            </TabsList>

            {/* Job Templates */}
            <TabsContent value="jobs" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search job templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Skills Required</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobTemplates.map((template) => (
                      <TableRow key={template.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{template.name}</p>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(template.category)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {template.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {template.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{template.level}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{template.usageCount} times</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {new Date(template.lastUsed).toLocaleDateString()}
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
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Template
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
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
            </TabsContent>

            {/* Email Templates */}
            <TabsContent value="emails" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search email templates..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="automated">Automated</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="rejection">Rejection</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Subject Line</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailTemplates.map((template) => (
                      <TableRow key={template.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{template.name}</p>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(template.category)}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {template.subject}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{template.usageCount} times</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {new Date(template.lastUsed).toLocaleDateString()}
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
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Template
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Evaluation Templates */}
            <TabsContent value="evaluations" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search evaluation forms..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Form Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Evaluation Criteria</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evaluationTemplates.map((template) => (
                      <TableRow key={template.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{template.name}</p>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(template.category)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {template.criteria.slice(0, 2).map((criterion) => (
                              <Badge key={criterion} variant="secondary" className="text-xs">
                                {criterion}
                              </Badge>
                            ))}
                            {template.criteria.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.criteria.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{template.usageCount} times</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {new Date(template.lastUsed).toLocaleDateString()}
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
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Form
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}