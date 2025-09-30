
export interface Project {
  id: number;
  title: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  coverImage: string;
  detailImages: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  id: number;
  title: string;
  skills: string[];
}

export interface NavLink {
  text: string;
  href: string;
}

export interface HeroData {
    kicker: string;
    title: string;
    paragraphs: string[];
    imageUrl: string;
}

export type ContactMethodType = 'linkedin' | 'email' | 'phone';

export interface ContactMethod {
  type: ContactMethodType;
  label: string;
  url: string;
}
