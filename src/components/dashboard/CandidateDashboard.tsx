import { useState } from 'react';
import { Upload, Download, MapPin, Clock, DollarSign, Star, Calendar, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CandidateDashboard() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  
  const extractedSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB'
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      type: 'Full-time',
      skills: ['React', 'TypeScript', 'GraphQL'],
      posted: '2 days ago',
      match: 95
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$100k - $130k',
      type: 'Full-time',
      skills: ['Node.js', 'React', 'MongoDB'],
      posted: '1 week ago',
      match: 87
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Austin, TX',
      salary: '$110k - $140k',
      type: 'Full-time',
      skills: ['AWS', 'Docker', 'Python'],
      posted: '3 days ago',
      match: 78
    }
  ];

  const applications = [
    { id: 1, company: 'TechCorp Inc.', position: 'Senior Frontend Developer', status: 'Interview Scheduled', date: '2024-01-15' },
    { id: 2, company: 'DataFlow Inc.', position: 'React Developer', status: 'Under Review', date: '2024-01-10' },
    { id: 3, company: 'NextGen Labs', position: 'UI Engineer', status: 'Applied', date: '2024-01-08' }
  ];

  const talentPrograms = [
    { id: 1, name: 'Advanced React Certification', deadline: '2024-02-15', participants: 127, difficulty: 'Advanced' },
    { id: 2, name: 'Cloud Architecture Challenge', deadline: '2024-02-20', participants: 89, difficulty: 'Expert' },
    { id: 3, name: 'Full Stack Bootcamp', deadline: '2024-03-01', participants: 234, difficulty: 'Intermediate' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled': return 'bg-success text-success-foreground';
      case 'Under Review': return 'bg-warning text-warning-foreground';
      case 'Applied': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-primary/10 text-primary border-primary/20';
      case 'Expert': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your job search today.</p>
      </div>

      {/* Resume Upload Section */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Resume Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!resumeUploaded ? (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Upload your resume</h3>
              <p className="text-muted-foreground mb-4">We'll extract your skills and match you with relevant opportunities</p>
              <Button 
                className="btn-primary"
                onClick={() => setResumeUploaded(true)}
              >
                Choose File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">resume_john_doe.pdf</span>
                </div>
                <Badge variant="secondary">Analyzed</Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Extracted Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job Listings */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Recommended Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobListings.map((job) => (
              <div key={job.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Progress value={job.match} className="w-16 h-2" />
                      <span className="text-xs text-primary font-medium">{job.match}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">match</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.posted}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button className="btn-primary">Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Status */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Application Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{app.company}</p>
                        <p className="text-sm text-muted-foreground">{app.position}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{app.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Talent Programs */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Talent Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {talentPrograms.map((program) => (
                <div key={program.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-foreground">{program.name}</h3>
                    <Badge className={getDifficultyColor(program.difficulty)}>
                      {program.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Deadline: {program.deadline}
                    </div>
                    <span>{program.participants} participants</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Join Program
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}