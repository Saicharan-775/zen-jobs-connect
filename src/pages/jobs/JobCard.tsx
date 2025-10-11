import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Job } from '@/data/jobs';

interface JobCardProps {
  job: Job;
  savedJobs: string[];
  onSaveJob: (jobId: string) => void;
  onViewJob: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, savedJobs, onSaveJob, onViewJob }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.02 }}
    className="cursor-pointer"
    onClick={() => onViewJob(job)}
  >
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow min-h-[320px] relative">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={job.logo} alt={job.company} />
              <AvatarFallback>{job.company[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <motion.div
        className="absolute top-2 right-2"
        whileTap={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => { e.stopPropagation(); onSaveJob(job.id); }}
          className={`h-8 w-8 ${savedJobs.includes(job.id) ? 'text-red-500' : ''}`}
        >
          <motion.div
            animate={{
              scale: savedJobs.includes(job.id) ? [1, 1.2, 1] : 1,
              color: savedJobs.includes(job.id) ? '#ef4444' : '#6b7280'
            }}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`h-4 w-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
          </motion.div>
        </Button>
      </motion.div>
      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="space-y-2 flex-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-1" />
            {job.salary}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(job.postedDate).toLocaleDateString()}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {job.skills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="default" className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
        <Button className="w-full mt-4" size="sm">
          Apply Now
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default JobCard;
