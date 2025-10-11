import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { learningPaths, LearningPath, Course } from '@/data/dashboard';

const LearningHub: React.FC = () => {
  const getDifficultyColor = (difficulty: LearningPath['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const getProgressIcon = (progress: number) => {
    if (progress >= 100) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (progress >= 50) return <Play className="h-4 w-4 text-blue-500" />;
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Learning Hub
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{path.title}</h3>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{path.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {path.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        {getProgressIcon(path.progress)}
                        <span>{path.progress}% Complete</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Progress value={path.progress} className="w-24 h-2" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Recommended Courses</h4>
                    <div className="space-y-2">
                      {path.courses.slice(0, 2).map((course: Course) => (
                        <div key={course.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm font-medium">{course.title}</span>
                            <span className="text-xs text-muted-foreground">({course.platform})</span>
                          </div>
                          <div className="text-xs text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-3 w-3 fill-current text-yellow-500" />
                              <span>{course.rating}</span>
                            </div>
                            <span className="text-muted-foreground">{course.duration}</span>
                          </div>
                        </div>
                      ))}
                      {path.courses.length > 2 && (
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          +{path.courses.length - 2} more courses
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="flex-1">
                    Continue Learning
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View All Courses
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-medium text-primary">AI Recommendation</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on your resume analysis, we recommend focusing on <strong>System Design</strong> and <strong>Cloud Computing</strong> to improve your job matching score by 25%.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningHub;
