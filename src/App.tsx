import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import CandidateDashboard from "./components/dashboard/CandidateDashboard";
import RecruiterDashboard from "./components/dashboard/RecruiterDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Main App Routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="dashboard/candidate" element={<CandidateDashboard />} />
            <Route path="dashboard/recruiter" element={<RecruiterDashboard />} />
            <Route path="dashboard/admin" element={<AdminDashboard />} />
            <Route path="jobs" element={<div className="p-6"><h1 className="text-2xl font-bold">Jobs Page Coming Soon</h1></div>} />
            <Route path="talent-programs" element={<div className="p-6"><h1 className="text-2xl font-bold">Talent Programs Page Coming Soon</h1></div>} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
