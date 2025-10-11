export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  skills: string[];
  salary: string;
  location: string;
  postedDate: string;
  description: string;
  experience: string;
  popularity?: number; // for trending/recommended
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Google",
    logo: "https://logo.clearbit.com/google.com",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    salary: "$80,000 - $100,000",
    location: "San Francisco, CA",
    postedDate: "2024-01-15",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using modern web technologies.",
    experience: "2-4 years",
    popularity: 95
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    skills: ["Node.js", "Python", "PostgreSQL"],
    salary: "$90,000 - $120,000",
    location: "New York, NY",
    postedDate: "2024-01-10",
    description: "Join our backend team to develop scalable APIs and manage databases. Experience with microservices is a plus.",
    experience: "3-5 years",
    popularity: 88
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    skills: ["React", "Node.js", "MongoDB"],
    salary: "$85,000 - $110,000",
    location: "Austin, TX",
    postedDate: "2024-01-12",
    description: "Full stack role involving both frontend and backend development. Work on exciting projects with cutting-edge tech.",
    experience: "2-4 years",
    popularity: 92
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    skills: ["AWS", "Docker", "Kubernetes"],
    salary: "$95,000 - $130,000",
    location: "Seattle, WA",
    postedDate: "2024-01-08",
    description: "Manage our cloud infrastructure and CI/CD pipelines. Ensure high availability and scalability of our services.",
    experience: "4-6 years",
    popularity: 85
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    salary: "$70,000 - $90,000",
    location: "Los Angeles, CA",
    postedDate: "2024-01-14",
    description: "Create beautiful and intuitive user interfaces. Collaborate with developers to bring designs to life.",
    experience: "1-3 years",
    popularity: 78
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    skills: ["Python", "Machine Learning", "SQL"],
    salary: "$100,000 - $140,000",
    location: "Boston, MA",
    postedDate: "2024-01-11",
    description: "Analyze large datasets and build predictive models. Work with cross-functional teams to drive data-driven decisions.",
    experience: "3-5 years",
    popularity: 90
  },
  {
    id: "7",
    title: "Mobile App Developer",
    company: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    skills: ["React Native", "iOS", "Android"],
    salary: "$85,000 - $115,000",
    location: "Denver, CO",
    postedDate: "2024-01-13",
    description: "Develop cross-platform mobile applications. Experience with native development is a bonus.",
    experience: "2-4 years",
    popularity: 82
  },
  {
    id: "8",
    title: "Product Manager",
    company: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
    skills: ["Agile", "Analytics", "Leadership"],
    salary: "$110,000 - $150,000",
    location: "Chicago, IL",
    postedDate: "2024-01-09",
    description: "Lead product development from ideation to launch. Work closely with engineering and design teams.",
    experience: "5+ years",
    popularity: 87
  },
  {
    id: "9",
    title: "QA Engineer",
    company: "Facebook",
    logo: "https://logo.clearbit.com/facebook.com",
    skills: ["Selenium", "Jest", "CI/CD"],
    salary: "$75,000 - $95,000",
    location: "Phoenix, AZ",
    postedDate: "2024-01-16",
    description: "Ensure product quality through comprehensive testing. Automate test suites and improve processes.",
    experience: "2-4 years",
    popularity: 75
  },
  {
    id: "10",
    title: "Security Engineer",
    company: "Cisco",
    logo: "https://logo.clearbit.com/cisco.com",
    skills: ["Cybersecurity", "Penetration Testing", "Compliance"],
    salary: "$105,000 - $135,000",
    location: "Washington, DC",
    postedDate: "2024-01-07",
    description: "Protect our systems from threats. Conduct security audits and implement best practices.",
    experience: "4-6 years",
    popularity: 80
  },
  {
    id: "11",
    title: "Junior Developer",
    company: "GitHub",
    logo: "https://logo.clearbit.com/github.com",
    skills: ["JavaScript", "HTML", "CSS"],
    salary: "$50,000 - $70,000",
    location: "Remote",
    postedDate: "2024-01-17",
    description: "Entry-level position for aspiring developers. Learn and grow in a fast-paced environment.",
    experience: "0-2 years",
    popularity: 70
  },
  {
    id: "12",
    title: "Senior Software Engineer",
    company: "Uber",
    logo: "https://logo.clearbit.com/uber.com",
    skills: ["Java", "Spring", "Microservices"],
    salary: "$120,000 - $160,000",
    location: "San Jose, CA",
    postedDate: "2024-01-06",
    description: "Lead development of enterprise applications. Mentor junior developers and architect solutions.",
    experience: "7+ years",
    popularity: 93
  }
];
