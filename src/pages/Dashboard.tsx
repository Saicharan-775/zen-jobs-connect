import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, User, Mail, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import supabase from '@/supabaseClient';
import { playSound } from '@/utils/sound';

// Import dashboard components
import JobFeed from '@/components/dashboard/JobFeed';
import ApplicationTracker from '@/components/dashboard/ApplicationTracker';
import CandidateDashboard from '@/components/dashboard/CandidateDashboard';
import LearningHub from '@/components/dashboard/LearningHub';
import Leaderboard from '@/components/dashboard/Leaderboard';

interface User {
  id: string;
  email: string;
  user_metadata: {
    firstName?: string;
    lastName?: string;
    role?: string;
  };
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      navigate('/auth');
      return;
    }
    setUser(user as User);
    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out.",
        variant: "destructive",
      });
    } else {
      playSound('toggle');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/auth');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const fullName = `${user.user_metadata.firstName || ''} ${user.user_metadata.lastName || ''}`.trim();
  const initials = fullName ? fullName.split(' ').map(n => n[0]).join('').toUpperCase() : user.email[0].toUpperCase();

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        

        {/* Bottom Section - Other Components */}
        <div className="grid grid-cols-1 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CandidateDashboard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <JobFeed />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ApplicationTracker />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
