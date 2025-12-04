export type ProjectCategory = "AI/ML" | "Agents" | "Web" | "Computer Vision" | "Data";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  impact: string[];
  image: string;
  role: string;
  problem?: string;
  approach?: string;
  result?: string;
  architecture?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  links?: {
    github?: string;
    demo?: string;
  };
  isFlagship?: boolean;
}

export const projects: Project[] = [
  {
    slug: "ai-guard",
    title: "AI-Guard",
    tagline: "CI Quality Gatekeeper for AI-Generated Code",
    category: "Agents",
    description:
      "An intelligent CI/CD pipeline integration that automatically validates AI-generated code through comprehensive test generation, coverage analysis, and SARIF reporting.",
    tech: ["Python", "LangChain", "LangGraph", "GitHub Actions", "SARIF", "Pytest"],
    impact: [
      "Automated test generation for AI code",
      "Coverage analysis and reporting",
      "SARIF integration for security scanning",
      "Reduced manual code review time by 60%",
    ],
    image: "/images/ai-guard.jpg",
    role: "Lead Developer",
    problem:
      "AI-generated code often lacks proper testing and security validation, leading to potential bugs and vulnerabilities in production.",
    approach:
      "Built an agentic system that analyzes AI-generated code, automatically generates comprehensive test suites, calculates coverage metrics, and integrates with existing CI/CD pipelines through SARIF reporting.",
    result:
      "Successfully integrated into multiple projects, catching 85% of potential issues before code review, and reducing deployment time by 40%.",
    architecture: [
      "Code analysis module using AST parsing",
      "Test generation agent powered by LangChain",
      "Coverage calculation engine",
      "SARIF report generator",
      "GitHub Actions integration",
    ],
    metrics: [
      { label: "Test Coverage", value: "85%+" },
      { label: "Issues Caught", value: "85%" },
      { label: "Time Saved", value: "60%" },
    ],
    links: {
      github: "https://github.com/manavj99/ai-guard",
    },
    isFlagship: true,
  },
  {
    slug: "ai-pdf-chatbot",
    title: "AI PDF Chatbot",
    tagline: "Sub-second Semantic Search over PDFs",
    category: "Agents",
    description:
      "A high-performance chatbot system built with LangChain and LangGraph that enables sub-second semantic search over large PDF documents using advanced RAG techniques.",
    tech: ["LangChain", "LangGraph", "Python", "FastAPI", "Vector DB", "OpenAI"],
    impact: [
      "Sub-second query response time",
      "Accurate semantic search",
      "Handles large PDF documents efficiently",
      "Scalable architecture for production",
    ],
    image: "/images/pdf-chatbot.jpg",
    role: "Full-Stack Developer",
    problem:
      "Traditional PDF search is slow and keyword-based, making it difficult to find relevant information quickly.",
    approach:
      "Implemented a RAG (Retrieval-Augmented Generation) system using LangChain for document processing, vector embeddings for semantic search, and LangGraph for orchestration, enabling fast and accurate document queries.",
    result:
      "Achieved sub-second response times for queries over documents up to 1000 pages, with 95% accuracy in relevant information retrieval.",
    architecture: [
      "PDF parsing and chunking pipeline",
      "Vector embedding generation",
      "Semantic search engine",
      "LangGraph agent orchestration",
      "FastAPI backend",
      "React frontend",
    ],
    metrics: [
      { label: "Query Latency", value: "<1s" },
      { label: "Accuracy", value: "95%" },
      { label: "Max Document Size", value: "1000 pages" },
    ],
    links: {
      github: "https://github.com/manavj99/ai-pdf-chatbot",
    },
    isFlagship: true,
  },
  {
    slug: "face-mask-detection",
    title: "Face Mask Detection on Edge",
    tagline: "Real-time Detection on Raspberry Pi",
    category: "Computer Vision",
    description:
      "A lightweight CNN model deployed on Raspberry Pi for real-time face mask detection, optimized for edge computing constraints.",
    tech: ["PyTorch", "CNN", "Raspberry Pi", "OpenCV", "TensorFlow Lite"],
    impact: [
      "Real-time inference on edge devices",
      "Optimized model size (<5MB)",
      "95%+ accuracy in detection",
      "Low power consumption",
    ],
    image: "/images/mask-detection.jpg",
    role: "ML Engineer",
    problem:
      "Existing face mask detection systems require cloud connectivity or powerful hardware, limiting deployment in resource-constrained environments.",
    approach:
      "Designed and trained a lightweight CNN architecture, optimized for mobile/edge deployment using quantization and pruning techniques, and deployed on Raspberry Pi with real-time video processing.",
    result:
      "Successfully deployed on Raspberry Pi 4 with 30 FPS inference speed and 95% accuracy, enabling real-time mask detection in various environments.",
    architecture: [
      "Custom CNN architecture",
      "Model quantization and optimization",
      "OpenCV video processing pipeline",
      "Raspberry Pi deployment",
      "Real-time inference engine",
    ],
    metrics: [
      { label: "Accuracy", value: "95%" },
      { label: "FPS", value: "30" },
      { label: "Model Size", value: "<5MB" },
    ],
    links: {
      github: "https://github.com/manavj99/face-mask-detection",
    },
  },
  {
    slug: "kaggle-projects",
    title: "Kaggle Computer Vision Projects",
    tagline: "Plant Pathology, IceCube, Histopathology",
    category: "Computer Vision",
    description:
      "Multiple competitive computer vision projects on Kaggle, including plant disease classification, neutrino detection, and medical image analysis.",
    tech: ["PyTorch", "CNN", "Transfer Learning", "Data Augmentation", "Ensemble Methods"],
    impact: [
      "Top 10% rankings in multiple competitions",
      "Advanced CV techniques implementation",
      "Production-ready model architectures",
      "Comprehensive data analysis pipelines",
    ],
    image: "/images/kaggle.jpg",
    role: "ML Engineer",
    problem:
      "Various computer vision challenges requiring state-of-the-art techniques and efficient model architectures.",
    approach:
      "Applied transfer learning, advanced data augmentation, ensemble methods, and custom architectures to achieve competitive results across multiple Kaggle competitions.",
    result:
      "Achieved top 10% rankings in plant pathology, IceCube neutrino detection, and histopathology competitions, demonstrating expertise in diverse CV applications.",
    architecture: [
      "Data preprocessing pipelines",
      "Transfer learning with pre-trained models",
      "Custom CNN architectures",
      "Ensemble model strategies",
      "Evaluation and validation frameworks",
    ],
    metrics: [
      { label: "Competitions", value: "5+" },
      { label: "Best Ranking", value: "Top 10%" },
      { label: "Models Trained", value: "20+" },
    ],
    links: {
      github: "https://github.com/manavj99/kaggle-projects",
    },
  },
];

