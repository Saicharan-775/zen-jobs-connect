import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Filters {
  role: string;
  experience: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  postedAfter: string;
  skills: string[];
}

interface JobFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleSkillChange = (skill: string, checked: boolean) => {
    const newSkills = checked
      ? [...filters.skills, skill]
      : filters.skills.filter(s => s !== skill);
    onFiltersChange({ ...filters, skills: newSkills });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      role: '',
      experience: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      postedAfter: '',
      skills: [],
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          placeholder="e.g. Frontend Developer"
          value={filters.role}
          onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="experience">Experience</Label>
        <Select value={filters.experience} onValueChange={(value) => onFiltersChange({ ...filters, experience: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2 years">0-2 years</SelectItem>
            <SelectItem value="2-4 years">2-4 years</SelectItem>
            <SelectItem value="4-6 years">4-6 years</SelectItem>
            <SelectItem value="7+ years">7+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="e.g. San Francisco"
          value={filters.location}
          onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="salaryMin">Min Salary</Label>
          <Input
            id="salaryMin"
            type="number"
            placeholder="50000"
            value={filters.salaryMin}
            onChange={(e) => onFiltersChange({ ...filters, salaryMin: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="salaryMax">Max Salary</Label>
          <Input
            id="salaryMax"
            type="number"
            placeholder="150000"
            value={filters.salaryMax}
            onChange={(e) => onFiltersChange({ ...filters, salaryMax: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="postedAfter">Posted After</Label>
        <Input
          id="postedAfter"
          type="date"
          value={filters.postedAfter}
          onChange={(e) => onFiltersChange({ ...filters, postedAfter: e.target.value })}
        />
      </div>
      <div>
        <Label>Skills</Label>
        <div className="space-y-2">
          {['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'AWS'].map(skill => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={skill}
                checked={filters.skills.includes(skill)}
                onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
              />
              <Label htmlFor={skill}>{skill}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        onClick={clearAllFilters}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default JobFilters;
