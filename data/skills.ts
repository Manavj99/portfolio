export type SkillCategory = "AI/ML" | "Backend" | "Frontend" | "DevOps/Cloud" | "Data & Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 1-5
  description: string;
  usedInProjects: number;
}

export const skills: Skill[] = [
  // AI/ML
  {
    name: "PyTorch",
    category: "AI/ML",
    level: 5,
    description: "Deep learning framework for building neural networks",
    usedInProjects: 8,
  },
  {
    name: "TensorFlow",
    category: "AI/ML",
    level: 4,
    description: "End-to-end machine learning platform",
    usedInProjects: 5,
  },
  {
    name: "LangChain",
    category: "AI/ML",
    level: 5,
    description: "Framework for building LLM applications",
    usedInProjects: 6,
  },
  {
    name: "LangGraph",
    category: "AI/ML",
    level: 4,
    description: "Stateful agent orchestration framework",
    usedInProjects: 4,
  },
  {
    name: "Computer Vision",
    category: "AI/ML",
    level: 4,
    description: "Image processing and object detection",
    usedInProjects: 5,
  },
  {
    name: "NLP",
    category: "AI/ML",
    level: 4,
    description: "Natural language processing and understanding",
    usedInProjects: 6,
  },
  // Backend
  {
    name: "Python",
    category: "Backend",
    level: 5,
    description: "Primary language for ML and backend development",
    usedInProjects: 15,
  },
  {
    name: "Node.js",
    category: "Backend",
    level: 4,
    description: "JavaScript runtime for server-side development",
    usedInProjects: 8,
  },
  {
    name: "FastAPI",
    category: "Backend",
    level: 4,
    description: "Modern Python web framework",
    usedInProjects: 5,
  },
  {
    name: "SQL",
    category: "Backend",
    level: 4,
    description: "Database querying and management",
    usedInProjects: 10,
  },
  {
    name: "REST APIs",
    category: "Backend",
    level: 5,
    description: "Designing and implementing RESTful services",
    usedInProjects: 12,
  },
  // Frontend
  {
    name: "React",
    category: "Frontend",
    level: 5,
    description: "UI library for building interactive interfaces",
    usedInProjects: 10,
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: 5,
    description: "React framework for production",
    usedInProjects: 8,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 5,
    description: "Typed superset of JavaScript",
    usedInProjects: 12,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 5,
    description: "Utility-first CSS framework",
    usedInProjects: 10,
  },
  // DevOps/Cloud
  {
    name: "AWS",
    category: "DevOps/Cloud",
    level: 4,
    description: "Cloud infrastructure and services",
    usedInProjects: 6,
  },
  {
    name: "Docker",
    category: "DevOps/Cloud",
    level: 4,
    description: "Containerization platform",
    usedInProjects: 7,
  },
  {
    name: "CI/CD",
    category: "DevOps/Cloud",
    level: 4,
    description: "Continuous integration and deployment",
    usedInProjects: 5,
  },
  {
    name: "Git",
    category: "DevOps/Cloud",
    level: 5,
    description: "Version control system",
    usedInProjects: 20,
  },
  // Data & Tools
  {
    name: "Pandas",
    category: "Data & Tools",
    level: 5,
    description: "Data manipulation and analysis",
    usedInProjects: 10,
  },
  {
    name: "NumPy",
    category: "Data & Tools",
    level: 5,
    description: "Numerical computing library",
    usedInProjects: 12,
  },
  {
    name: "Jupyter",
    category: "Data & Tools",
    level: 5,
    description: "Interactive computing environment",
    usedInProjects: 15,
  },
];

