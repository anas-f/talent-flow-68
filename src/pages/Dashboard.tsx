import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Briefcase,
  Calendar,
  TrendingUp,
  Clock,
  Target,
  Plus,
  ArrowUp,
  ArrowDown,
  Eye,
  FileText,
  CheckCircle2
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      change: "+2",
      changeType: "increase",
      icon: Briefcase,
      description: "Currently hiring"
    },
    {
      title: "Total Applicants",
      value: "247",
      change: "+18",
      changeType: "increase", 
      icon: Users,
      description: "This month"
    },
    {
      title: "Interviews Scheduled",
      value: "8",
      change: "-3",
      changeType: "decrease",
      icon: Calendar,
      description: "This week"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-2 days",
      changeType: "decrease",
      icon: Clock,
      description: "Average"
    }
  ];

  const recentJobs = [
    {
      title: "Senior Frontend Developer",
      applicants: 23,
      status: "Active",
      posted: "2 days ago",
      urgency: "high"
    },
    {
      title: "Product Manager",
      applicants: 45,
      status: "Active", 
      posted: "1 week ago",
      urgency: "medium"
    },
    {
      title: "UX Designer",
      applicants: 31,
      status: "Draft",
      posted: "3 days ago",
      urgency: "low"
    }
  ];

  const pipelineStages = [
    { name: "Sourced", count: 45, percentage: 100 },
    { name: "Phone Screen", count: 32, percentage: 71 },
    { name: "Technical", count: 18, percentage: 40 },
    { name: "Final", count: 8, percentage: 18 },
    { name: "Offer", count: 3, percentage: 7 }
  ];

  const quickActions = [
    { label: "Add Job", icon: Plus, variant: "default" as const },
    { label: "Review Applications", icon: Eye, variant: "outline" as const },
    { label: "Schedule Interview", icon: Calendar, variant: "outline" as const },
    { label: "Generate Report", icon: FileText, variant: "outline" as const }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your recruitment.
          </p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Button key={action.label} variant={action.variant} size="sm">
              <action.icon className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="hr-card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {stat.changeType === "increase" ? (
                  <ArrowUp className="h-3 w-3 text-success" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-destructive" />
                )}
                <span className={stat.changeType === "increase" ? "text-success" : "text-destructive"}>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Jobs */}
        <Card className="hr-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Active Jobs</CardTitle>
                <CardDescription>Manage your current job openings</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{job.title}</h4>
                    <Badge 
                      variant={job.urgency === "high" ? "destructive" : job.urgency === "medium" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {job.urgency}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{job.applicants} applicants</span>
                    <span>•</span>
                    <span>{job.posted}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                    {job.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pipeline Overview */}
        <Card className="hr-card">
          <CardHeader>
            <CardTitle className="text-lg">Hiring Pipeline</CardTitle>
            <CardDescription>Candidate progression through stages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.name}</span>
                  <span className="text-muted-foreground">{stage.count} candidates</span>
                </div>
                  <div className="relative">
                    <Progress 
                      value={stage.percentage} 
                      className="h-2 bg-muted/50"
                    />
                    <div 
                      className="absolute top-0 left-0 h-2 bg-foreground rounded-full transition-all duration-500"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Top Performing Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">Senior Frontend Developer</p>
              <p className="text-sm text-muted-foreground">45 applications in 3 days</p>
              <Badge variant="secondary" className="text-xs">High Interest</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-5 h-5 text-foreground" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">8 scheduled this week</p>
              <p className="text-sm text-muted-foreground">3 today, 5 remaining</p>
              <Badge variant="outline" className="text-xs">On Track</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hr-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Recent Hires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">2 offers accepted</p>
              <p className="text-sm text-muted-foreground">This month: UI Designer, DevOps</p>
              <Badge className="text-xs bg-success/10 text-success">Success</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}