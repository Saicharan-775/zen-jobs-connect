import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Job } from '@/data/jobs';

interface SidebarSectionProps {
  title: string;
  jobs: Job[];
  onViewJob: (job: Job) => void;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, jobs, onViewJob }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {jobs.map(job => (
        <div key={job.id} className="flex items-center space-x-3 p-2 rounded hover:bg-accent cursor-pointer" onClick={() => onViewJob(job)}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={job.logo} alt={job.company} />
            <AvatarFallback>{job.company[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{job.title}</p>
            <p className="text-xs text-muted-foreground truncate">{job.company}</p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default SidebarSection;
