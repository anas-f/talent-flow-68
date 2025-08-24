import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import ViewJob from "./pages/ViewJob";
import Applicants from "./pages/Applicants";
import Interviews from "./pages/Interviews";
import Pipeline from "./pages/Pipeline";
import TalentPool from "./pages/TalentPool";
import Templates from "./pages/Templates";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/add" element={<AddJob />} />
              <Route path="/jobs/:id" element={<ViewJob />} />
              <Route path="/jobs/edit/:id" element={<AddJob />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/interviews" element={<Interviews />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/talent-pool" element={<TalentPool />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
