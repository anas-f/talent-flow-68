import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  GitPullRequest, 
  RefreshCw, 
  Settings, 
  TrendingUp, 
  Users 
} from "lucide-react";

export default function Pipeline() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 bg-blue-100 rounded-full mb-6">
          <GitBranch className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Pipeline View Coming Soon</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          We're working hard to bring you a powerful pipeline view to track candidates through your hiring process. 
          This feature will help you visualize and manage your recruitment workflow more effectively.
        </p>
        
        <div className="flex gap-4 mb-12">
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Check Back Soon
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Notify Me
          </Button>
        </div>

        {/* Example Card */}
        <Card className="w-full max-w-4xl border-dashed border-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Example Pipeline View</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Preview</span>
                <Badge variant="outline" className="text-xs">Coming Soon</Badge>
              </div>
            </div>
            <CardDescription>
              This is a preview of what the pipeline view will look like
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 overflow-hidden rounded-lg bg-muted/30 p-4">
              {/* Column Headers */}
              <div className="absolute top-4 left-0 right-0 flex h-8 px-4">
                {['Applied', 'Screening', 'Interview', 'Offer', 'Hired'].map((stage, i) => (
                  <div key={i} className="flex-1 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                      {stage}
                      <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
                        {[12, 8, 5, 3, 2][i]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Candidate Cards */}
              <div className="absolute top-16 left-4 right-4 grid grid-cols-5 gap-4">
                {[0, 1, 2, 3, 4].map((col) => (
                  <div key={col} className="space-y-2">
                    {[0, 1].map((row) => (
                      <div 
                        key={`${col}-${row}`} 
                        className="h-16 rounded-md bg-background border border-muted-foreground/20 p-2 opacity-50"
                      >
                        <div className="h-2 w-3/4 bg-muted-foreground/20 rounded-full mb-1"></div>
                        <div className="h-2 w-1/2 bg-muted-foreground/20 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Watermark Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 bg-background/80 rounded-lg border border-muted-foreground/20">
                  <GitPullRequest className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">Pipeline View</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">Coming in the next update</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Features Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 w-full max-w-5xl">
          {[
            {
              icon: <GitBranch className="h-6 w-6 text-blue-600" />,
              title: "Visual Workflow",
              description: "Drag and drop candidates through your hiring stages with ease."
            },
            {
              icon: <Users className="h-6 w-6 text-green-600" />,
              title: "Team Collaboration",
              description: "Work together with your hiring team in real-time."
            },
            {
              icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
              title: "Analytics",
              description: "Track your hiring metrics and improve your process."
            }
          ].map((feature, i) => (
            <div key={i} className="text-center p-6 border rounded-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                {feature.icon}
              </div>
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
