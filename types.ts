
export type Language = 'fr' | 'en' | 'de';

export enum ProjectCategory {
  ALL = 'Toutes',
  GALLERY = 'Galerie',
  LOGOTYPE = 'Logotype',
  BRANDING = 'Brand Identity',
  SOCIAL = 'Social Media Management',
  PACKAGING = 'Packaging',
  UIUX = 'UI/UX Web Design'
}

export interface ProjectMedia {
  url: string;
  type: 'image' | 'video';
}

export interface Project {
  id: string;
  title: { fr: string; en: string; de: string };
  category: ProjectCategory;
  image: string; 
  mediaType: 'image' | 'video';
  description: { fr: string; en: string; de: string };
  problem: { fr: string; en: string; de: string };
  solution: { fr: string; en: string; de: string };
  caseStudy: { fr: string; en: string; de: string };
  gallery?: ProjectMedia[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: { fr: string; en: string; de: string };
  content: { fr: string; en: string; de: string };
  project?: { fr: string; en: string; de: string };
  avatar?: string;
  // New dynamic fields for client self-submission and moderation
  email?: string;
  company?: string;
  rating?: number;
  is_approved?: boolean;
  created_at?: string;
}

export interface BlogComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: { fr: string; en: string; de: string };
  content: { fr: string; en: string; de: string };
  date: string;
  image: string;
  mediaType: 'image' | 'video';
  likes: number;
  comments: BlogComment[];
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  date: string;
  time?: string; // Added time
  description?: string; // Added description
  services: string[];
  status: 'pending' | 'confirmed' | 'cancelled'; // Added cancelled
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  whatsapp: string;
}

export interface AppSettings {
  socialLinks: SocialLinks;
  logoTagline: { fr: string; en: string; de: string };
  isSeeded?: boolean;
  about?: {
    image: string;
    title: { fr: string; en: string; de: string };
    bio: { fr: string; en: string; de: string };
    pseudonym: { fr: string; en: string; de: string };
    quote: { fr: string; en: string; de: string };
  };
  services?: {
    title: { fr: string; en: string; de: string };
    headerDesc: { fr: string; en: string; de: string };
  };
  hero?: {
    title: { fr: string; en: string; de: string };
    subtitle: { fr: string; en: string; de: string };
    cta: { fr: string; en: string; de: string };
    consultation: { fr: string; en: string; de: string };
  };
  homeAbout?: {
    image: string;
    tag: { fr: string; en: string; de: string };
    title: { fr: string; en: string; de: string };
    quote: { fr: string; en: string; de: string };
    bio: { fr: string; en: string; de: string };
    btn: { fr: string; en: string; de: string };
  };
  homeServices?: {
    tag: { fr: string; en: string; de: string };
    title: { fr: string; en: string; de: string };
    btn: { fr: string; en: string; de: string };
  };
  homePortfolio?: {
    tag: { fr: string; en: string; de: string };
    title: { fr: string; en: string; de: string };
    btn: { fr: string; en: string; de: string };
  };
  homeBlog?: {
    tag: { fr: string; en: string; de: string };
    title: { fr: string; en: string; de: string };
    desc: { fr: string; en: string; de: string };
    btn: { fr: string; en: string; de: string };
  };
  homeTestimonials?: {
    tag: { fr: string; en: string; de: string };
    title: { fr: string; en: string; de: string };
  };
  homeCta?: {
    title: { fr: string; en: string; de: string };
    desc: { fr: string; en: string; de: string };
    btn: { fr: string; en: string; de: string };
  };
}

export interface AppState {
  projects: Project[];
  posts: BlogPost[];
  appointments: Appointment[];
  settings: AppSettings;
}
