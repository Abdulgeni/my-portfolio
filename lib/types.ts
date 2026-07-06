export interface Project {
  title: string;
  tech: string[];
  description: string;
  github: string;
  live?: string;
  category: 'AI Engineering' | 'Full Stack' | 'Workflow Automation';
}

export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Service {
  title: string;
  description: string;
  stat: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
