import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Applicant {
  id: number;
  status: string;
  appliedDate: string;
}

interface ApplicantsStatsProps {
  applicants: Applicant[];
}

export function ApplicantsStats({ applicants }: ApplicantsStatsProps) {
  const totalApplicants = applicants.length;
  const activeApplicants = applicants.filter(a => a.status === 'Active').length;
  const inProcessApplicants = applicants.filter(a => a.status === 'On Hold').length;
  
  const newThisWeek = applicants.filter(a => {
    if (!a.appliedDate) return false;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(a.appliedDate) > weekAgo;
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold text-primary">
            {totalApplicants}
          </div>
        </CardContent>
      </Card>
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Active</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold text-primary">
            {activeApplicants}
          </div>
        </CardContent>
      </Card>
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">In Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold text-primary">
            {inProcessApplicants}
          </div>
        </CardContent>
      </Card>
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold text-primary">
            {newThisWeek}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}