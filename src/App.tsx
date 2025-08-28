import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Applicants from "./pages/Applicants";
import Analytics from "./pages/Analytics";
import Interviews from "./pages/Interviews";
import Pipeline from "./pages/Pipeline";
import TalentPool from "./pages/TalentPool";
import Templates from "./pages/Templates";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import Users from "./pages/Users";
import CreateUser from "./pages/users/CreateUser";
import EditUser from "./pages/users/EditUser";
import CreateJob from "./pages/jobs/CreateJob";
import JobDetails from "./pages/jobs/JobDetails";
import EditJob from "./pages/jobs/EditJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/jobs" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Jobs />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/jobs/create" element={
                <ProtectedRoute>
                  <AppLayout>
                    <CreateJob />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/jobs/:id" element={
                <ProtectedRoute>
                  <AppLayout>
                    <JobDetails />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/jobs/:id/edit" element={
                <ProtectedRoute>
                  <AppLayout>
                    <EditJob />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/change-password" element={
                <ProtectedRoute>
                  <AppLayout>
                    <ChangePassword />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/users/create" element={
                <ProtectedRoute>
                  <AppLayout>
                    <CreateUser />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/users/:id/edit" element={
                <ProtectedRoute>
                  <AppLayout>
                    <EditUser />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/applicants" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Applicants />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Analytics />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/interviews" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Interviews />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/pipeline" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Pipeline />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/talent-pool" element={
                <ProtectedRoute>
                  <AppLayout>
                    <TalentPool />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/templates" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Templates />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Reports />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Users />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;