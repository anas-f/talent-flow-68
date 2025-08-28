import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, User, Settings, LogOut, Languages, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Skeleton for the sidebar navigation items
const SidebarSkeleton = () => (
  <div className="space-y-2 px-3 py-2">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center space-x-3 p-2 rounded-md">
        <Skeleton className="h-5 w-5 rounded-sm" />
        <Skeleton className="h-4 w-32" />
      </div>
    ))}
  </div>
);

// Skeleton for the header
const HeaderSkeleton = () => (
  <div className="h-16 border-b border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 flex items-center px-6">
    <div className="flex items-center gap-4 w-full">
      <Skeleton className="h-8 w-8 rounded-md md:hidden" />
      <Skeleton className="h-9 w-64 hidden md:block" />
      <div className="ml-auto flex items-center space-x-4">
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    </div>
  </div>
);

interface AppLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function AppLayout({ children, isLoading: propIsLoading = false }: AppLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Simulate loading state for the layout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  const showLoading = isLoading || propIsLoading;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar with loading state */}
        {showLoading ? (
          <div className="hidden md:flex flex-col w-64 h-screen border-r border-border/50 bg-card/30 p-4">
            <div className="flex items-center space-x-2 p-2 mb-6">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-6 w-32" />
            </div>
            <SidebarSkeleton />
          </div>
        ) : (
          <AppSidebar />
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header with loading state */}
          {showLoading ? (
            <HeaderSkeleton />
          ) : (
            <header className="h-16 border-b border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <div className="h-full px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                    <Menu className="h-5 w-5" />
                  </SidebarTrigger>
                  
                  {/* Global Search */}
                  <form onSubmit={handleSearch} className="relative w-96 hidden md:block">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs, candidates, interviews..."
                      className={cn(
                        "pl-10 bg-muted/50 border-border/50 focus:bg-background transition-all duration-300",
                        showLoading ? "opacity-50" : "opacity-100"
                      )}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      disabled={showLoading}
                    />
                  </form>
                </div>

                <div className="flex items-center gap-4">
                  {/* Language Selector */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-foreground"
                    disabled={showLoading}
                  >
                    <Languages className={cn("h-5 w-5", showLoading ? "opacity-50" : "opacity-100")} />
                    <span className="sr-only">Change language</span>
                  </Button>
                  
                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className={cn(
                          "relative h-8 w-8 rounded-full transition-opacity",
                          showLoading ? "opacity-50" : "opacity-100"
                        )}
                        disabled={showLoading}
                      >
                        <Avatar className="h-8 w-8">
                          {!showLoading && user?.avatar ? (
                            <AvatarImage 
                              src={user.avatar} 
                              alt={`${user.firstName} ${user.lastName}`.trim() || 'User'} 
                            />
                          ) : (
                            <AvatarFallback className="bg-muted">
                              {showLoading ? (
                                <Skeleton className="h-8 w-8 rounded-full" />
                              ) : (
                                <span className="text-sm">
                                  {user ? 
                                    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'U' 
                                    : 'U'
                                  }
                                </span>
                              )}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          {showLoading ? (
                            <>
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24" />
                            </>
                          ) : (
                            <>
                              <p className="text-sm font-medium leading-none">
                                {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User' : 'User'}
                              </p>
                              <p className="text-xs leading-none text-muted-foreground">
                                {user?.email || 'user@example.com'}
                              </p>
                            </>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => navigate('/profile')}
                        disabled={showLoading}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => navigate('/settings')}
                        disabled={showLoading}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => {
                          logout();
                          navigate('/login');
                        }}
                        disabled={showLoading}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
          )}

          {/* Main Content */}
          <main className={cn(
            "flex-1 overflow-y-auto p-6 transition-opacity duration-300",
            showLoading ? "opacity-50" : "opacity-100"
          )}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}