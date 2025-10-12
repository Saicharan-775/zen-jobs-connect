export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  points: number;
  badges: string[];
  jobActivity: number;
  codingStats: number;
  achievements: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  skills: string[];
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  courses: Course[];
  progress: number;
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  url: string;
  duration: string;
  rating: number;
}

export interface Application {
  id: string;
  company: string;
  position: string;
  status: 'Applied' | 'Under Review' | 'Interview' | 'Selected' | 'Rejected';
  date: string;
  notes?: string;
}

export interface AIMentorSuggestion {
  id: string;
  type: 'skill' | 'experience' | 'networking' | 'resume';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
}

export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rank: 1,
    points: 2450,
    badges: ["Top Performer", "Code Master", "Job Seeker"],
    jobActivity: 95,
    codingStats: 88,
    achievements: 12
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rank: 2,
    points: 2230,
    badges: ["Rising Star", "Interview Pro"],
    jobActivity: 87,
    codingStats: 92,
    achievements: 10
  },
  {
    id: "3",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rank: 3,
    points: 2100,
    badges: ["Consistent", "Skill Builder"],
    jobActivity: 82,
    codingStats: 85,
    achievements: 8
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rank: 4,
    points: 1980,
    badges: ["Newcomer", "Fast Learner"],
    jobActivity: 78,
    codingStats: 80,
    achievements: 6
  },
  {
    id: "5",
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rank: 5,
    points: 1850,
    badges: ["Dedicated", "Team Player"],
    jobActivity: 75,
    codingStats: 78,
    achievements: 7
  },
  {
    id: "6",
    name: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rank: 6,
    points: 1720,
    badges: ["Problem Solver", "Mentor"],
    jobActivity: 72,
    codingStats: 76,
    achievements: 9
  },
  {
    id: "7",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    rank: 7,
    points: 1650,
    badges: ["Innovator", "Collaborator"],
    jobActivity: 68,
    codingStats: 74,
    achievements: 6
  },
  {
    id: "8",
    name: "Rachel Green",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rank: 8,
    points: 1580,
    badges: ["Creative", "Detail Oriented"],
    jobActivity: 65,
    codingStats: 72,
    achievements: 5
  },
  {
    id: "9",
    name: "Tom Anderson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rank: 9,
    points: 1520,
    badges: ["Reliable", "Hard Worker"],
    jobActivity: 62,
    codingStats: 70,
    achievements: 4
  },
  {
    id: "10",
    name: "Nina Patel",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rank: 10,
    points: 1480,
    badges: ["Ambitious", "Quick Learner"],
    jobActivity: 60,
    codingStats: 68,
    achievements: 3
  }
];

export const learningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Frontend Development Mastery",
    description: "Complete path to become a frontend expert",
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
    duration: "3 months",
    difficulty: "Intermediate",
    progress: 65,
    courses: [
      {
        id: "c1",
        title: "Advanced React Patterns",
        platform: "Udemy",
        url: "#",
        duration: "8 hours",
        rating: 4.8
      },
      {
        id: "c2",
        title: "TypeScript Fundamentals",
        platform: "Coursera",
        url: "#",
        duration: "12 hours",
        rating: 4.6
      }
    ]
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    description: "Essential for technical interviews",
    skills: ["Algorithms", "Data Structures", "Problem Solving"],
    duration: "2 months",
    difficulty: "Advanced",
    progress: 30,
    courses: [
      {
        id: "c3",
        title: "DSA for Interviews",
        platform: "LeetCode",
        url: "#",
        duration: "20 hours",
        rating: 4.9
      }
    ]
  },
  {
    id: "3",
    title: "Cloud Computing with AWS",
    description: "Master cloud infrastructure and services",
    skills: ["AWS", "Cloud", "DevOps"],
    duration: "4 months",
    difficulty: "Intermediate",
    progress: 45,
    courses: [
      {
        id: "c4",
        title: "AWS Certified Solutions Architect",
        platform: "AWS",
        url: "#",
        duration: "40 hours",
        rating: 4.7
      }
    ]
  }
];

export const applications: Application[] = [
  {
    id: "1",
    company: "TechCorp Inc.",
    position: "Senior Frontend Developer",
    status: "Interview",
    date: "2024-01-15",
    notes: "Technical interview scheduled for next week"
  },
  {
    id: "2",
    company: "DataFlow Inc.",
    position: "React Developer",
    status: "Under Review",
    date: "2024-01-10"
  },
  {
    id: "3",
    company: "NextGen Labs",
    position: "UI Engineer",
    status: "Applied",
    date: "2024-01-08"
  },
  {
    id: "4",
    company: "CloudTech Solutions",
    position: "Full Stack Developer",
    status: "Selected",
    date: "2024-01-05",
    notes: "Offer received, negotiating salary"
  },
  {
    id: "5",
    company: "StartupXYZ",
    position: "Frontend Engineer",
    status: "Rejected",
    date: "2024-01-03"
  }
];

export const aiMentorSuggestions: AIMentorSuggestion[] = [
  {
    id: "1",
    type: "skill",
    title: "Improve System Design Knowledge",
    description: "Your resume shows strong frontend skills, but system design could use more depth for senior roles.",
    priority: "high",
    progress: 25
  },
  {
    id: "2",
    type: "experience",
    title: "Add More Leadership Experience",
    description: "Consider taking on team lead roles or mentoring junior developers to build leadership skills.",
    priority: "medium",
    progress: 40
  },
  {
    id: "3",
    type: "networking",
    title: "Expand Professional Network",
    description: "Connect with 5 new professionals in your field this month through LinkedIn or meetups.",
    priority: "medium",
    progress: 60
  },
  {
    id: "4",
    type: "resume",
    title: "Optimize Resume Keywords",
    description: "Add more industry-specific keywords to improve ATS compatibility.",
    priority: "low",
    progress: 80
  }
];

export const talentPrograms = [
  {
    id: 1,
    name: 'Advanced React Certification',
    deadline: '2024-02-15',
    participants: 127,
    difficulty: 'Advanced',
    description: 'Master advanced React concepts and patterns'
  },
  {
    id: 2,
    name: 'Cloud Architecture Challenge',
    deadline: '2024-02-20',
    participants: 89,
    difficulty: 'Expert',
    description: 'Design scalable cloud architectures'
  },
  {
    id: 3,
    name: 'Full Stack Bootcamp',
    deadline: '2024-03-01',
    participants: 234,
    difficulty: 'Intermediate',
    description: 'Complete full-stack development training'
  },
  {
    id: 4,
    name: 'AI/ML Hackathon',
    deadline: '2024-02-25',
    participants: 156,
    difficulty: 'Advanced',
    description: 'Build innovative AI solutions'
  }
];
