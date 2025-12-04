export interface TimelineItem {
  season: string;
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export const timeline: TimelineItem[] = [
  {
    season: "Season 1",
    title: "Early Education & Foundation",
    role: "Student",
    period: "2018 - 2022",
    description:
      "Undergraduate studies in Information Technology, building foundational knowledge in software development and computer science principles.",
    highlights: [
      "Bachelor of Engineering in IT from University of Mumbai",
      "Core coursework in algorithms, data structures, and software engineering",
      "Early projects in web development and databases",
      "Active participation in coding competitions and hackathons",
    ],
  },
  {
    season: "Season 2",
    title: "Kent State University",
    role: "Graduate Student & Research Assistant",
    period: "2022 - 2024",
    description:
      "Master's program in Computer Science with focus on AI/ML, along with professional roles as Cloud & Security Engineer and Data Engineer.",
    highlights: [
      "Master of Science in Computer Science",
      "Cloud & Security Engineer - Infrastructure and security implementations",
      "Data Engineer - Built data pipelines and ETL processes",
      "Research Assistant - AI/ML research projects",
      "Advanced coursework in machine learning, deep learning, and distributed systems",
    ],
  },
  {
    season: "Season 3",
    title: "AI Projects & Professional Growth",
    role: "AI/ML Engineer",
    period: "2023 - Present",
    description:
      "Focus on building production AI systems, agentic applications, and contributing to open-source projects. Internships and freelance work in AI/ML.",
    highlights: [
      "Developed AI-Guard CI/CD integration system",
      "Built multiple LangChain/LangGraph agentic applications",
      "Computer vision projects on Kaggle (top 10% rankings)",
      "Edge AI deployment on Raspberry Pi",
      "Open-source contributions to AI tooling",
    ],
  },
];

