import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, RefreshCw, Settings, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Loading skeleton for interview cards
const InterviewSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="animate-pulse">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function Interviews() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Refreshed",
        description: "Interview data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh interview data.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 animate-fade-in">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-4 w-96 mt-2" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
          <InterviewSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Interviews</h1>
            <p className="text-muted-foreground mt-1">
              Schedule, track, and manage candidate interviews
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`gap-2 ${isRefreshing ? 'opacity-70' : ''}`}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Interview
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/20">
          <div className="p-4 bg-blue-100 rounded-full mb-6">
            <Calendar className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Interview Management Coming Soon</h1>
          <p className="text-muted-foreground max-w-2xl mb-8">
            We're working on an enhanced interview management system to help you schedule, 
            track, and manage candidate interviews more effectively. This feature will include 
            calendar integration, automated reminders, and interview feedback collection.
          </p>
          
          <div className="flex gap-4 mb-12">
            <Button onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Check Back Soon'}
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Notify Me
            </Button>
          </div>
        </div>

        {/* Example Card */}
        <Card className="w-full max-w-4xl border-dashed border-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Example Interview Schedule</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Preview</span>
                <Badge variant="outline" className="text-xs">Coming Soon</Badge>
              </div>
            </div>
            <CardDescription>
              This is a preview of what the interview management will look like
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 border rounded-lg bg-muted/20">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium">Interactive Interview Calendar</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Schedule, reschedule, and manage interviews with an intuitive calendar interface.
                  Get automatic reminders and follow-ups for all your interviews.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}