
export interface ResearchPaper {
  id: number;
  title: string;
  researcher: string;
  supervisor: string;
  graduationYear: number;
  category: string;
  abstract: string;
  fullText: string;
  pdfUrl: string;
  isFeatured?: boolean;
  status: 'pending' | 'approved';
}

export interface EditorialMember {
  id: number;
  name: string;
  title: string;
  specialization: string;
  role: string;
  email?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  status: 'unread' | 'archived';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  stats: {
    published: string;
    students: string;
    supervisors: string;
    issues?: string;
  };
  about: {
    vision: string;
    mission: string;
    goal1Title: string;
    goal1Text: string;
    goal2Title: string;
    goal2Text: string;
    goal3Title: string;
    goal3Text: string;
  };
  submission: {
    instructions: string;
    acceptedTypes: string;
    formattingReqs: string;
    contents: string;
  };
  contact: {
    address: string;
    email: string;
    phone: string;
    workingHours: string;
    facebookUrl: string;
    instagramUrl: string;
  };
  faq: FaqItem[];
}

export type ApiStatus = 'idle' | 'loading' | 'succeeded' | 'failed';