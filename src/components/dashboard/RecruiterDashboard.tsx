import { useState } from 'react';
import { Plus, Users, Eye, MessageSquare, Trophy, Star, MapPin, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function RecruiterDashboard() {
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
    skills: ''
  });

  const postedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      type: 'Full-time',
      applicants: 23,
      posted: '3 days ago',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$130k - $160k',
      type: 'Full-time',
      applicants: 45,
      posted: '1 week ago',
      status: 'Active'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      salary: '$90k - $120k',
      type: 'Full-time',
      applicants: 12,
      posted: '5 days ago',
      status: 'Draft'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', score: 2840, domain: 'Frontend Development', badge: 'gold' },
    { rank: 2, name: 'Michael Rodriguez', score: 2650, domain: 'Backend Engineering', badge: 'silver' },
    { rank: 3, name: 'Emily Johnson', score: 2480, domain: 'Data Science', badge: 'bronze' },
    { rank: 4, name: 'David Kim', score: 2350, domain: 'DevOps', badge: null },
    { rank: 5, name: 'Lisa Wang', score: 2200, domain: 'Product Management', badge: null },
    { rank: 6, name: 'Alex Thompson', score: 2100, domain: 'UI/UX Design', badge: null },
    { rank: 7, name: 'Ryan Mitchell', score: 1980, domain: 'Mobile Development', badge: null },
    { rank: 8, name: 'Jennifer Lee', score: 1850, domain: 'QA Engineering', badge: null }
  ];

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case 'gold': return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 'silver': return <Trophy className="h-4 w-4 text-gray-400" />;
      case 'bronze': return <Trophy className="h-4 w-4 text-amber-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Draft': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Posting job:', jobForm);
    setIsPostJobOpen(false);
    // Reset form
    setJobForm({
      title: '',
      company: '',
      location: '',
      type: '',
      salary: '',
      description: '',
      requirements: '',
      skills: ''
    });
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recruiter Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your job postings and discover top talent.</p>
        </div>
        
        <Dialog open={isPostJobOpen} onOpenChange={setIsPostJobOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post a New Job</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePostJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g., Senior Frontend Developer"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                    placeholder="Company name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g., San Francisco, CA or Remote"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Select value={jobForm.type} onValueChange={(value) => setJobForm({ ...jobForm, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    placeholder="e.g., $120k - $150k"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Required Skills</Label>
                  <Input
                    id="skills"
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  placeholder="List the required qualifications, experience, and skills..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="btn-primary">
                  Post Job
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsPostJobOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-success/10 rounded-lg">
                <Eye className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-warning/10 rounded-lg">
                <MessageSquare className="h-6 w-6 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-accent/50 rounded-lg">
                <Star className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Company Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Posted Jobs */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Your Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {postedJobs.map((job) => (
                <div key={job.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
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
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">{job.applicants}</span>
                      <span className="text-muted-foreground">applicants</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button size="sm" className="btn-primary">Manage</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Talent Leaderboard */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Talent Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Domain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.slice(0, 6).map((candidate) => (
                  <TableRow key={candidate.rank}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getBadgeIcon(candidate.badge)}
                        #{candidate.rank}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{candidate.name}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{candidate.score}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {candidate.domain}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">View Full Leaderboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}