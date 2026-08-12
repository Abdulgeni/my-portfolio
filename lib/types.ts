export interface DevelopmentPhase {
  phase: 'Concept' | 'MVP' | 'Production' | 'Scale';
  status: 'completed' | 'active' | 'upcoming';
  duration?: string;
  summary: string;
  techHighlights?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'AI / RAG' | 'FULL STACK' | 'SYSTEMS & AUTOMATION';
  stack: string[];
  metricPrimary: string;
  metricSecondary: string;
  githubUrl: string;
  liveUrl?: string;
  shortDescription: string;
  problem: string;
  approach: string;
  result: string;
  previewImage?: string;
  developmentPhases?: DevelopmentPhase[];
}

export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  badgeCount?: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  projectTitle: string;
  rating: number;
  impactMetric: string;
}
