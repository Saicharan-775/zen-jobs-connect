import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import Index from "./pages/Index";
import Jobs from "./pages/jobs/Jobs";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import ForgotPassword from "./components/auth/ForgotPassword";
import EmailVerificationPending from "./components/auth/EmailVerificationPending";
import Dashboard from "./pages/Dashboard";
import TransitionScreen from "./pages/TransitionScreen";
import ResumeUpload from "./pages/ResumeUpload";
import TalentPrograms from "./pages/TalentPrograms";
import ProtectedRoute from "./components/ProtectedRoute";
import CandidateDashboard from "./components/dashboard/CandidateDashboard";
import RecruiterDashboard from "./components/dashboard/RecruiterDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Layout from "./components/layout/Layout";
import supabase from "./supabaseClient";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/email-verification" element={<EmailVerificationPending />} />

            {/* Transition Route */}
            <Route path="/transition" element={<TransitionScreen />} />

            {/* Main App Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="dashboard/candidate" element={<ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />
              <Route path="dashboard/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
              <Route path="dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
              <Route path="talent-programs" element={<ProtectedRoute><TalentPrograms /></ProtectedRoute>} />
              <Route path="resume-upload" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
