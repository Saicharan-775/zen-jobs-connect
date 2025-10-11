import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Sparkles, Target, TrendingUp, Brain } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResumeUploader from './ResumeUploader';
import JobFeed from './JobFeed';
import Leaderboard from './Leaderboard';
import LearningHub from './LearningHub';
import ApplicationTracker from './ApplicationTracker';
import AIMentor from './AIMentor';

export default function CandidateDashboard() {
  const { theme, setTheme } = useTheme();
  const [skills, setSkills] = useState<string[]>([]);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const handleSkillsExtracted = (extractedSkills: string[]) => {
    setSkills(extractedSkills);
  };

  const handleResumeUploaded = () => {
    setResumeUploaded(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">AI Career Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              Welcome back! Your personalized career growth platform powered by AI.
            </p>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark Mode
              </>
            )}
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground">Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">85%</p>
                    <p className="text-sm text-muted-foreground">Profile Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">8</p>
                    <p className="text-sm text-muted-foreground">Skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">#3</p>
                    <p className="text-sm text-muted-foreground">Rank</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Resume Uploader */}
        <motion.div variants={itemVariants}>
          <ResumeUploader onSkillsExtracted={handleSkillsExtracted} onResumeUploaded={handleResumeUploaded} />
        </motion.div>

        {/* AI Mentor */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          {resumeUploaded ? (
            <AIMentor />
          ) : (
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Upload Your Resume First</h3>
                  <p className="text-muted-foreground">
                    Upload and analyze your resume to unlock personalized AI mentorship and career guidance.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Job Feed */}
        <motion.div variants={itemVariants}>
          <JobFeed />
        </motion.div>

        {/* Application Tracker and Learning Hub Side by Side */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ApplicationTracker />
          <LearningHub />
        </motion.div>

        {/* Leaderboard */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <Leaderboard />
        </motion.div>

        {/* Motivational Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center py-8"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-primary">Keep Growing!</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every application brings you closer to your dream job. Stay consistent, keep learning,
                and let our AI guide you towards career success. You've got this! 🚀
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
