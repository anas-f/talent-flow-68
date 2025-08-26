import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, TrendingUp, Users, Briefcase } from "lucide-react";
import { useApplicants } from "@/hooks/useApplicants";
import { useJobs } from "@/hooks/useJobs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Analytics() {
  const { data: applicants = [], isLoading: applicantsLoading } = useApplicants();
  const { data: jobs = [], isLoading: jobsLoading } = useJobs();

  const analytics = useMemo(() => {
    // Group applications by job title
    const applicationsByJob = applicants.reduce((acc, applicant) => {
      const jobTitle = applicant.appliedFor;
      if (!acc[jobTitle]) {
        acc[jobTitle] = {
          jobTitle,
          applications: 0,
          avgScore: 0,
          activeApplications: 0,
          rejectedApplications: 0,
          totalScore: 0
        };
      }
      acc[jobTitle].applications += 1;
      acc[jobTitle].totalScore += parseFloat(applicant.overallScore || '0');
      
      if (applicant.status === 'Active') {
        acc[jobTitle].activeApplications += 1;
      } else if (applicant.status === 'Rejected') {
        acc[jobTitle].rejectedApplications += 1;
      }
      
      return acc;
    }, {} as Record<string, any>);

    // Calculate averages and sort by applications count
    const jobAnalytics = Object.values(applicationsByJob).map((job: any) => ({
      ...job,
      avgScore: job.applications > 0 ? (job.totalScore / job.applications).toFixed(1) : '0.0'
    })).sort((a: any, b: any) => b.applications - a.applications);

    return jobAnalytics;
  }, [applicants]);

  const totalStats = useMemo(() => {
    return {
      totalJobs: jobs.length,
      totalApplications: applicants.length,
      avgApplicationsPerJob: jobs.length > 0 ? (applicants.length / jobs.length).toFixed(1) : '0',
      topPerformingJob: analytics[0]?.jobTitle || 'N/A'
    };
  }, [jobs, applicants, analytics]);

  const isLoading = applicantsLoading || jobsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in p-4 md:p-6 bg-background text-foreground">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Insights and statistics about your recruitment process
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Total Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">
              {totalStats.totalJobs}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">
              {totalStats.totalApplications}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Avg per Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">
              {totalStats.avgApplicationsPerJob}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Top Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-primary truncate">
              {totalStats.topPerformingJob}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Table */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Applications by Job Title</CardTitle>
          <CardDescription>Detailed breakdown of applications for each position</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Job Title</TableHead>
                  <TableHead className="text-center">Total Applications</TableHead>
                  <TableHead className="text-center">Active</TableHead>
                  <TableHead className="text-center">Rejected</TableHead>
                  <TableHead className="text-center">Avg Score</TableHead>
                  <TableHead className="text-center">Success Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.map((job: any, index) => {
                  const successRate = job.applications > 0 
                    ? ((job.activeApplications / job.applications) * 100).toFixed(1)
                    : '0.0';
                  
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{job.jobTitle}</TableCell>
                      <TableCell className="text-center">{job.applications}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                          {job.activeApplications}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                          {job.rejectedApplications}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                parseFloat(job.avgScore) >= 7 
                                  ? 'bg-success' 
                                  : parseFloat(job.avgScore) >= 5 
                                    ? 'bg-warning' 
                                    : 'bg-destructive'
                              }`}
                              style={{ 
                                width: `${(parseFloat(job.avgScore) / 10) * 100}%`
                              }}
                            />
                          </div>
                          <span className="text-sm">{job.avgScore}/10</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{successRate}%</TableCell>
                    </TableRow>
                  );
                })}
                {analytics.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}