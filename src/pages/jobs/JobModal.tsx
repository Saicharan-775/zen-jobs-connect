import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Job } from '@/data/jobs';

interface JobModalProps {
  selectedJob: Job | null;
  savedJobs: string[];
  onSaveJob: (jobId: string) => void;
  onClose: () => void;
  onViewJob: (job: Job) => void;
  jobs: Job[];
}

const JobModal: React.FC<JobModalProps> = ({
  selectedJob,
  savedJobs,
  onSaveJob,
  onClose,
  onViewJob,
  jobs
}) => {
  if (!selectedJob) return null;

  return (
    <Dialog open={!!selectedJob} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{selectedJob.title}</span>
            <motion.div
              whileTap={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSaveJob(selectedJob.id)}
                className={savedJobs.includes(selectedJob.id) ? 'text-red-500' : ''}
              >
                <motion.div
                  animate={{
                    scale: savedJobs.includes(selectedJob.id) ? [1, 1.2, 1] : 1,
                    color: savedJobs.includes(selectedJob.id) ? '#ef4444' : '#6b7280'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart className={`h-4 w-4 ${savedJobs.includes(selectedJob.id) ? 'fill-current' : ''}`} />
                </motion.div>
              </Button>
            </motion.div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={selectedJob.logo} alt={selectedJob.company} />
              <AvatarFallback>{selectedJob.company[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
              <p className="text-lg text-muted-foreground">{selectedJob.company}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedJob.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {selectedJob.salary}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {selectedJob.experience}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(selectedJob.postedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {selectedJob.skills.map(skill => (
                <Badge key={skill} variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-muted-foreground leading-relaxed">{selectedJob.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Related Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.filter(job => job.id !== selectedJob.id && job.skills.some(skill => selectedJob.skills.includes(skill))).slice(0, 3).map(job => (
                <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onViewJob(job)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback>{job.company[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="flex-1">Apply Now</Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
