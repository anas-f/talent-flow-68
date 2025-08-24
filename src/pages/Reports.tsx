import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Download,
  Calendar,
  Filter,
  Share2
} from "lucide-react";

export default function Reports() {
  const reportMetrics = [
    { title: "Total Hires", value: "23", change: "+15%", period: "This Quarter" },
    { title: "Time to Fill", value: "18 days", change: "-12%", period: "Average" },
    { title: "Cost per Hire", value: "€3,200", change: "-8%", period: "Average" },
    { title: "Source Effectiveness", value: "LinkedIn", change: "42%", period: "Top Performer" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive recruitment analytics and performance insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button className="bg-foreground text-background">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportMetrics.map((metric, index) => (
          <Card key={metric.title} className="hr-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-success">{metric.change}</span>
                <span>{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hr-card">
          <CardHeader>
            <CardTitle>Hiring Funnel Performance</CardTitle>
            <CardDescription>Conversion rates across recruitment stages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { stage: "Applications", count: 450, rate: 100 },
              { stage: "Phone Screen", count: 180, rate: 40 },
              { stage: "Technical", count: 90, rate: 20 },
              { stage: "Final", count: 45, rate: 10 },
              { stage: "Offers", count: 23, rate: 5 }
            ].map((item) => (
              <div key={item.stage} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.stage}</span>
                  <span>{item.count} ({item.rate}%)</span>
                </div>
                <Progress value={item.rate} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hr-card">
          <CardHeader>
            <CardTitle>Source Performance</CardTitle>
            <CardDescription>Candidate sources by effectiveness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { source: "LinkedIn", candidates: 145, hires: 12, rate: 8.3 },
              { source: "Company Website", candidates: 89, hires: 7, rate: 7.9 },
              { source: "Referrals", candidates: 67, hires: 4, rate: 6.0 },
              { source: "Job Boards", candidates: 234, hires: 8, rate: 3.4 }
            ].map((item) => (
              <div key={item.source} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.source}</p>
                  <p className="text-sm text-muted-foreground">{item.candidates} candidates</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.hires} hires</p>
                  <p className="text-sm text-muted-foreground">{item.rate}% rate</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}