import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { jobs, Job } from '@/data/jobs';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import JobModal from './JobModal';
import SidebarSection from './SidebarSection';

const Jobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'relevant'>('latest');
  const [filters, setFilters] = useState({
    role: '',
    experience: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    postedAfter: '',
    skills: [] as string[],
  });
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) setSavedJobs(JSON.parse(saved));

    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) setRecentlyViewed(JSON.parse(viewed));
  }, []);

  const handleSaveJob = (jobId: string) => {
    const newSaved = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];
    setSavedJobs(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    const newViewed = [job, ...recentlyViewed.filter(j => j.id !== job.id)].slice(0, 5);
    setRecentlyViewed(newViewed);
    localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
  };

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole = !filters.role || job.title.toLowerCase().includes(filters.role.toLowerCase());
      const matchesExperience = !filters.experience || job.experience.includes(filters.experience);
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesSalary = (!filters.salaryMin || parseInt(job.salary.replace(/[^0-9]/g, '')) >= parseInt(filters.salaryMin)) &&
                           (!filters.salaryMax || parseInt(job.salary.replace(/[^0-9]/g, '')) <= parseInt(filters.salaryMax));
      const matchesPosted = !filters.postedAfter || new Date(job.postedDate) >= new Date(filters.postedAfter);
      const matchesSkills = filters.skills.length === 0 || filters.skills.some(skill => job.skills.includes(skill));

      return matchesSearch && matchesRole && matchesExperience && matchesLocation && matchesSalary && matchesPosted && matchesSkills;
    });

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case 'popular':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'relevant': {
          // Simulate relevance by matching search terms
          const aRelevance = (a.title + a.company + a.skills.join('')).toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
          const bRelevance = (b.title + b.company + b.skills.join('')).toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
          return bRelevance - aRelevance;
        }
        default:
          return 0;
      }
    });
  }, [searchQuery, filters, sortBy]);

  const recommendedJobs = useMemo(() => {
    // Simple recommendation: jobs with similar skills to recently viewed
    const recentSkills = recentlyViewed.flatMap(job => job.skills);
    return jobs.filter(job => job.skills.some(skill => recentSkills.includes(skill))).slice(0, 5);
  }, [recentlyViewed]);

  const trendingJobs = useMemo(() => {
    return [...jobs].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 5);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or skills..."
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
                <JobFilters filters={filters} onFiltersChange={setFilters} />
              </SheetContent>
            </Sheet>
            <Select value={sortBy} onValueChange={(value: 'latest' | 'popular' | 'relevant') => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="relevant">Relevant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            <SidebarSection title="Recommended for You" jobs={recommendedJobs} onViewJob={handleViewJob} />
            <SidebarSection title="Trending Jobs" jobs={trendingJobs} onViewJob={handleViewJob} />
            <SidebarSection title="Recently Viewed" jobs={recentlyViewed} onViewJob={handleViewJob} />
          </div>

          {/* Jobs Feed */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-muted-foreground">{filteredJobs.length} jobs found</p>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
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
              <AnimatePresence>
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedJobs={savedJobs}
                    onSaveJob={handleSaveJob}
                    onViewJob={handleViewJob}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
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
      </div>
    </div>
  );
};

export default Jobs;
