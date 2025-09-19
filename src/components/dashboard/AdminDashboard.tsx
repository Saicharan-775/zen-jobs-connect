import { useState } from 'react';
import { Plus, Users, Award, Calendar, FileText, Star, Trophy, Eye, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminDashboard() {
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  
  const [programForm, setProgramForm] = useState({
    name: '',
    description: '',
    difficulty: '',
    deadline: '',
    maxParticipants: '',
    requirements: '',
    prizes: ''
  });

  const talentPrograms = [
    {
      id: 1,
      name: 'Advanced React Certification',
      participants: 127,
      submissions: 89,
      deadline: '2024-02-15',
      status: 'Active',
      difficulty: 'Advanced'
    },
    {
      id: 2,
      name: 'Cloud Architecture Challenge',
      participants: 89,
      submissions: 45,
      deadline: '2024-02-20',
      status: 'Active',
      difficulty: 'Expert'
    },
    {
      id: 3,
      name: 'Full Stack Bootcamp',
      participants: 234,
      submissions: 180,
      deadline: '2024-03-01',
      status: 'Draft',
      difficulty: 'Intermediate'
    }
  ];

  const submissions = [
    {
      id: 1,
      candidateName: 'Sarah Chen',
      program: 'Advanced React Certification',
      submissionLink: 'github.com/sarahchen/react-project',
      submittedDate: '2024-01-20',
      score: null,
      status: 'Pending Review'
    },
    {
      id: 2,
      candidateName: 'Michael Rodriguez',
      program: 'Cloud Architecture Challenge',
      submissionLink: 'github.com/mrodriguez/cloud-project',
      submittedDate: '2024-01-19',
      score: 85,
      status: 'Reviewed'
    },
    {
      id: 3,
      candidateName: 'Emily Johnson',
      program: 'Advanced React Certification',
      submissionLink: 'github.com/ejohnson/react-app',
      submittedDate: '2024-01-18',
      score: 92,
      status: 'Reviewed'
    },
    {
      id: 4,
      candidateName: 'David Kim',
      program: 'Full Stack Bootcamp',
      submissionLink: 'github.com/dkim/fullstack-app',
      submittedDate: '2024-01-17',
      score: null,
      status: 'Pending Review'
    }
  ];

  const leaderboardStats = [
    { domain: 'Frontend Development', participants: 456, avgScore: 78.5 },
    { domain: 'Backend Engineering', participants: 389, avgScore: 82.1 },
    { domain: 'Data Science', participants: 234, avgScore: 75.8 },
    { domain: 'DevOps', participants: 178, avgScore: 80.3 },
    { domain: 'Mobile Development', participants: 145, avgScore: 77.2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Draft': return 'bg-warning text-warning-foreground';
      case 'Completed': return 'bg-primary text-primary-foreground';
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

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'Reviewed': return 'bg-success text-success-foreground';
      case 'Pending Review': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating program:', programForm);
    setIsCreateProgramOpen(false);
    // Reset form
    setProgramForm({
      name: '',
      description: '',
      difficulty: '',
      deadline: '',
      maxParticipants: '',
      requirements: '',
      prizes: ''
    });
  };

  const handleAssignScore = (submissionId: number) => {
    const score = prompt('Enter score (0-100):');
    if (score && !isNaN(Number(score))) {
      console.log(`Assigning score ${score} to submission ${submissionId}`);
      // Update submission with score
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage talent programs and review submissions.</p>
        </div>
        
        <Dialog open={isCreateProgramOpen} onOpenChange={setIsCreateProgramOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Talent Program</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProgram} className="space-y-4">
              <div>
                <Label htmlFor="name">Program Name</Label>
                <Input
                  id="name"
                  value={programForm.name}
                  onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                  placeholder="e.g., Advanced React Certification"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  placeholder="Describe the program objectives and what participants will learn..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={programForm.difficulty} onValueChange={(value) => setProgramForm({ ...programForm, difficulty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={programForm.maxParticipants}
                    onChange={(e) => setProgramForm({ ...programForm, maxParticipants: e.target.value })}
                    placeholder="e.g., 100"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={programForm.deadline}
                  onChange={(e) => setProgramForm({ ...programForm, deadline: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={programForm.requirements}
                  onChange={(e) => setProgramForm({ ...programForm, requirements: e.target.value })}
                  placeholder="List the prerequisites and requirements for participation..."
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="prizes">Prizes & Benefits</Label>
                <Textarea
                  id="prizes"
                  value={programForm.prizes}
                  onChange={(e) => setProgramForm({ ...programForm, prizes: e.target.value })}
                  placeholder="Describe prizes, certificates, or other benefits..."
                  rows={2}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="btn-primary">
                  Create Program
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateProgramOpen(false)}>
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
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Active Programs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-success/10 rounded-lg">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">1,402</p>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-warning/10 rounded-lg">
                <FileText className="h-6 w-6 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">314</p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-accent/50 rounded-lg">
                <Trophy className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">78.4</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Talent Programs */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Talent Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {talentPrograms.map((program) => (
                <div key={program.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{program.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getDifficultyColor(program.difficulty)}>
                          {program.difficulty}
                        </Badge>
                        <Badge className={getStatusColor(program.status)}>
                          {program.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{program.participants} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{program.submissions} submissions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{program.deadline}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="btn-primary">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Stats */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Domain Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">{stat.domain}</h4>
                    <p className="text-sm text-muted-foreground">{stat.participants} participants</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{stat.avgScore}</p>
                    <p className="text-xs text-muted-foreground">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions Review */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Submissions Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Submission</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.candidateName}</TableCell>
                  <TableCell>
                    <div className="max-w-32 truncate">{submission.program}</div>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={`https://${submission.submissionLink}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      {submission.submissionLink}
                    </a>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{submission.submittedDate}</TableCell>
                  <TableCell>
                    {submission.score !== null ? (
                      <span className="font-semibold text-primary">{submission.score}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getSubmissionStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {submission.status === 'Pending Review' && (
                        <Button 
                          size="sm" 
                          className="btn-primary"
                          onClick={() => handleAssignScore(submission.id)}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Score
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}