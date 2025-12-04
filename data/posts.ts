export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  image?: string;
  content?: string;
}

export const posts: Post[] = [
  {
    slug: "building-ai-guard",
    title: "Building AI-Guard: A CI Quality Gatekeeper",
    date: "2024-03-15",
    summary:
      "How I built an intelligent CI/CD integration that automatically validates AI-generated code through test generation and coverage analysis.",
    tags: ["AI", "CI/CD", "LangChain", "DevOps"],
    image: "/images/ai-guard-case.jpg",
  },
  {
    slug: "rag-architecture-deep-dive",
    title: "RAG Architecture Deep Dive: Sub-second PDF Search",
    date: "2024-02-20",
    summary:
      "Exploring the architecture behind building a high-performance RAG system that enables sub-second semantic search over large documents.",
    tags: ["RAG", "LangChain", "Vector DB", "Architecture"],
    image: "/images/rag-architecture.jpg",
  },
  {
    slug: "edge-ai-optimization",
    title: "Optimizing AI Models for Edge Deployment",
    date: "2024-01-10",
    summary:
      "Techniques for deploying deep learning models on resource-constrained devices like Raspberry Pi, including quantization and pruning.",
    tags: ["Edge AI", "Optimization", "PyTorch", "Raspberry Pi"],
    image: "/images/edge-ai.jpg",
  },
  {
    slug: "kaggle-cv-strategies",
    title: "Winning Strategies for Kaggle Computer Vision Competitions",
    date: "2023-12-05",
    summary:
      "Lessons learned from achieving top 10% rankings in multiple Kaggle competitions, covering data augmentation, ensemble methods, and more.",
    tags: ["Kaggle", "Computer Vision", "Deep Learning", "Competitions"],
    image: "/images/kaggle-strategies.jpg",
  },
];

