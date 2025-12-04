export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  description?: string;
}

export const gallery: GalleryItem[] = [
  {
    id: "exp-01",
    title: "Experiment 01",
    caption: "CI Pipeline Visualization",
    image: "/images/gallery/ci-pipeline.jpg",
    description: "Visual representation of the AI-Guard CI/CD pipeline architecture",
  },
  {
    id: "exp-02",
    title: "Experiment 02",
    caption: "LangGraph Agent Flow",
    image: "/images/gallery/langgraph-flow.jpg",
    description: "Agent orchestration flow diagram for the PDF chatbot system",
  },
  {
    id: "exp-03",
    title: "Experiment 03",
    caption: "Neural Network Architecture",
    image: "/images/gallery/nn-architecture.jpg",
    description: "Custom CNN architecture for face mask detection",
  },
  {
    id: "exp-04",
    title: "Experiment 04",
    caption: "Data Pipeline Visualization",
    image: "/images/gallery/data-pipeline.jpg",
    description: "ETL pipeline architecture for data engineering projects",
  },
  {
    id: "exp-05",
    title: "Experiment 05",
    caption: "Model Training Dashboard",
    image: "/images/gallery/training-dashboard.jpg",
    description: "Real-time monitoring of model training metrics",
  },
  {
    id: "exp-06",
    title: "Experiment 06",
    caption: "Vector Embedding Space",
    image: "/images/gallery/embedding-space.jpg",
    description: "Visualization of document embeddings in vector space",
  },
];

