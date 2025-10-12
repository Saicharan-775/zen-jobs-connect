import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, ArrowRight, Briefcase, BarChart3, Sparkles, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import supabase from '@/supabaseClient';
import { playSound } from '@/utils/sound';

// Import resume components
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import AIMentor from '@/components/dashboard/AIMentor';

interface User {
  id: string;
  email: string;
  user_metadata: {
    firstName?: string;
    lastName?: string;
    role?: string;
  };
}

export default function ResumeUpload() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
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

  const handleResumeUploaded = () => {
    setResumeUploaded(true);
    setShowAnalysis(true);
    playSound('success');
  };

  const handleResumeRemoved = () => {
    setResumeUploaded(false);
    setShowAnalysis(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.user_metadata?.firstName || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3 bg-primary/10 rounded-full px-6 py-3">
              <Upload className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold text-foreground">Resume Upload Center</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome back, {userName}!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume to unlock personalized AI insights and take control of your career journey
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            onClick={() => navigate('/jobs')}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 px-8 py-3 text-lg hover:bg-primary/5 transition-all duration-200"
          >
            <Briefcase className="h-5 w-5" />
            <span>Browse Jobs</span>
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 px-8 py-3 text-lg hover:bg-primary/5 transition-all duration-200"
          >
            <BarChart3 className="h-5 w-5" />
            <span>View Dashboard</span>
          </Button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 h-[600px]">
          {/* Resume Uploader */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span>Resume Analysis & AI Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResumeUploader onResumeUploaded={handleResumeUploaded} onResumeRemoved={handleResumeRemoved} />
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Mentor or Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <span>AI Career Mentor</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {resumeUploaded ? (
                  <AIMentor />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-12"
                  >
                    <div className="mb-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full">
                      <Target className="h-16 w-16 text-primary/60" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Upload Resume
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Upload your resume to get personalized AI career insights and recommendations.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Lightbulb className="h-4 w-4" />
                      <span>AI analysis awaits</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>


      </div>
    </div>
  );
}
