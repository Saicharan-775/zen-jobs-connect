import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { jobs, Job } from '@/data/jobs';
import JobCard from '@/pages/jobs/JobCard';
import JobModal from '@/pages/jobs/JobModal';

const JobFeed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'relevant'>('relevant');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Simulate personalized recommendations based on user profile
  const personalizedJobs = useMemo(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });

    // Sort with personalization (simulate based on user skills)
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case 'popular':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'relevant': {
          // Simulate relevance based on assumed user skills
          const userSkills = ['React', 'TypeScript', 'Node.js'];
          const aRelevance = a.skills.filter(skill => userSkills.includes(skill)).length;
          const bRelevance = b.skills.filter(skill => userSkills.includes(skill)).length;
          return bRelevance - aRelevance;
        }
        default:
          return 0;
      }
    }).slice(0, 6); // Show only top 6 for dashboard
  }, [searchQuery, sortBy]);

  const handleSaveJob = (jobId: string) => {
    const newSaved = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];
    setSavedJobs(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Personalized Job Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <div className="flex gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Jobs</SheetTitle>
                </SheetHeader>
                <p className="text-sm text-muted-foreground">Advanced filters available on the full Jobs page.</p>
              </SheetContent>
            </Sheet>
            <Select value={sortBy} onValueChange={(value: 'latest' | 'popular' | 'relevant') => setSortBy(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Relevant</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="mb-4">
          <p className="text-muted-foreground text-sm">{personalizedJobs.length} personalized recommendations</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {personalizedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              savedJobs={savedJobs}
              onSaveJob={handleSaveJob}
              onViewJob={handleViewJob}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full sm:w-auto">
            View All Jobs
          </Button>
        </div>

        {/* Job Details Modal */}
        <JobModal
          selectedJob={selectedJob}
          savedJobs={savedJobs}
          onSaveJob={handleSaveJob}
          onClose={() => setSelectedJob(null)}
          onViewJob={handleViewJob}
          jobs={jobs}
        />
      </CardContent>
    </Card>
  );
};

export default JobFeed;
