import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { learningPaths, type LearningPath, type Course } from '@/data/dashboard';

const LearningHub = () => {
  const getDifficultyColor = (difficulty: LearningPath['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700';
      case 'Advanced':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-300 dark:border-amber-700';
      case 'Expert':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-300 dark:border-rose-700';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-300 dark:border-gray-700';
    }
  };

  const getProgressStatus = (progress: number) => {
    if (progress >= 100) return { icon: <CheckCircle className="h-3.5 w-3.5" />, text: 'Completed', color: 'text-emerald-600 dark:text-emerald-400' };
    if (progress >= 50) return { icon: <Play className="h-3.5 w-3.5" />, text: 'In Progress', color: 'text-blue-600 dark:text-blue-400' };
    return { icon: <Clock className="h-3.5 w-3.5" />, text: 'Not Started', color: 'text-amber-600 dark:text-amber-400' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Learning Hub</h2>
          <p className="text-sm text-muted-foreground">Enhance your skills with curated learning paths</p>
        </div>
      </div>

      {/* Learning Path Cards - Horizontal Layout */}
      <div className="space-y-4">
        {learningPaths.map((path, index) => {
          const progressStatus = getProgressStatus(path.progress);
          
          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 group">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Left Section - Main Info */}
                    <div className="flex-1 p-4 space-y-3">
                      {/* Heading */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                            {path.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {path.description}
                          </p>
                        </div>
                        <Badge className={getDifficultyColor(path.difficulty)} variant="outline">
                          {path.difficulty}
                        </Badge>
                      </div>

                      {/* Progress */}
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-1.5 text-xs font-medium ${progressStatus.color}`}>
                          {progressStatus.icon}
                          <span>{progressStatus.text}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{path.duration}</span>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <Progress value={path.progress} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{path.progress}%</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-muted-foreground">Skills:</span>
                        {path.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs px-2 py-0 font-medium">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Right Section - Courses */}
                    <div className="md:w-80 lg:w-96 p-4 bg-muted/20 border-t md:border-t-0 md:border-l border-border/50">
                      {/* Course Suggestions */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                          Recommended Courses
                        </h4>
                        <div className="space-y-1.5">
                          {path.courses.slice(0, 3).map((course: Course) => (
                            <div 
                              key={course.id} 
                              className="flex items-start gap-2 p-2 rounded bg-background/50 hover:bg-background transition-colors cursor-pointer group/course"
                            >
                              <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-foreground group-hover/course:text-primary transition-colors line-clamp-1">
                                  {course.title}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
                                  <span>{course.platform}</span>
                                  <span>•</span>
                                  <span>{course.duration}</span>
                                  <span>•</span>
                                  <div className="flex items-center gap-0.5">
                                    <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                                    <span>{course.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {path.courses.length > 3 && (
                            <p className="text-xs text-muted-foreground pl-3">
                              +{path.courses.length - 3} more courses
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* AI Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                  AI Recommendation
                  <Badge variant="secondary" className="text-xs">Personalized</Badge>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Based on your resume analysis, we recommend focusing on <strong className="text-foreground">System Design</strong> and <strong className="text-foreground">Cloud Computing</strong> to improve your job matching score by 25%.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LearningHub;