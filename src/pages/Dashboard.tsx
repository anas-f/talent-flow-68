import { useMemo } from "react";
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
import { useApplicants } from "@/hooks/useApplicants";
import { useJobs } from "@/hooks/useJobs";

export default function Dashboard() {
  const { data: applicants = [], isLoading: applicantsLoading } = useApplicants();
  const { data: jobs = [], isLoading: jobsLoading } = useJobs();

  const stats = useMemo(() => {
    const activeJobs = jobs.filter(job => job.status === 'Active').length;
    const totalApplicants = applicants.length;
    const newThisWeek = applicants.filter(a => {
      if (!a.appliedDate) return false;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(a.appliedDate) > weekAgo;
    }).length;

    return [
      {
        title: "Active Jobs",
        value: activeJobs.toString(),
        change: "+2",
        changeType: "increase",
        icon: Briefcase,
        description: "Currently hiring"
      },
      {
        title: "Total Applicants",
        value: totalApplicants.toString(),
        change: `+${newThisWeek}`,
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
        title: "Applications/Job",
        value: jobs.length > 0 ? (totalApplicants / jobs.length).toFixed(1) : "0",
        change: "+2.1",
        changeType: "increase",
        icon: Clock,
        description: "Average"
      }
    ];
  }, [applicants, jobs]);

  const recentJobs = useMemo(() => {
    return jobs.slice(0, 3).map(job => ({
      title: job.title,
      applicants: applicants.filter(app => app.appliedFor === job.title).length,
      status: job.status,
      posted: new Date(job.postedDate).toLocaleDateString(),
      urgency: job.urgency || "medium"
    }));
  }, [jobs, applicants]);

  const pipelineStages = useMemo(() => {
    const totalApplicants = applicants.length;
    const activeApplicants = applicants.filter(a => a.status === 'Active').length;
    const rejectedApplicants = applicants.filter(a => a.status === 'Rejected').length;
    
    return [
      { name: "Applied", count: totalApplicants, percentage: 100 },
      { name: "Active", count: activeApplicants, percentage: totalApplicants > 0 ? (activeApplicants / totalApplicants) * 100 : 0 },
      { name: "In Review", count: Math.floor(activeApplicants * 0.6), percentage: totalApplicants > 0 ? (activeApplicants * 0.6 / totalApplicants) * 100 : 0 },
      { name: "Interview", count: Math.floor(activeApplicants * 0.3), percentage: totalApplicants > 0 ? (activeApplicants * 0.3 / totalApplicants) * 100 : 0 },
      { name: "Final", count: Math.floor(activeApplicants * 0.1), percentage: totalApplicants > 0 ? (activeApplicants * 0.1 / totalApplicants) * 100 : 0 }
    ];
  }, [applicants]);

  const quickActions = [
    { label: "Add Job", icon: Plus, variant: "default" as const },
    { label: "Review Applications", icon: Eye, variant: "outline" as const },
    { label: "Schedule Interview", icon: Calendar, variant: "outline" as const },
    { label: "View Analytics", icon: FileText, variant: "outline" as const }
  ];

  const isLoading = applicantsLoading || jobsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <p className="font-medium">
                {recentJobs[0]?.title || 'No jobs available'}
              </p>
              <p className="text-sm text-muted-foreground">
                {recentJobs[0]?.applicants || 0} applications
              </p>
              <Badge variant="secondary" className="text-xs">
                {recentJobs[0]?.urgency === 'high' ? 'High Interest' : 'Active'}
              </Badge>
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
              Active Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">
                {applicants.filter(a => a.status === 'Active').length} active
              </p>
              <p className="text-sm text-muted-foreground">
                Out of {applicants.length} total applications
              </p>
              <Badge className="text-xs bg-success/10 text-success">
                {applicants.length > 0 ? Math.round((applicants.filter(a => a.status === 'Active').length / applicants.length) * 100) : 0}% active rate
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}