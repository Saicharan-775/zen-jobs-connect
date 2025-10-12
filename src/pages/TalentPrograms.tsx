import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import supabase from '@/supabaseClient';

// Import components
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

export default function TalentPrograms() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.user_metadata?.firstName || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-3 bg-primary/10 rounded-full px-6 py-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold text-foreground">Talent Programs</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Welcome to Talent Programs, {userName}!</h1>
          <p className="mt-2 text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your skills and advance your career with our comprehensive learning resources and development programs.
          </p>
        </motion.div>

        {/* Back to Dashboard Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="flex items-center space-x-2 px-6 py-3 hover:bg-primary/5 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Button>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LearningHub />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Leaderboard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
