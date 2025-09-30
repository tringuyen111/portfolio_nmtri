

export interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  client: string;
  date: string;
  deliverables: string[];
  technologies: string[];
  coverImage: string;
  detailImages: string[];
  url?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description:string;
  url?: string;
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

export interface AppSettings {
  fontFamilySans: string;
  fontFamilySerif: string;
  baseFontSize: number;
}

import type { LanguageContent } from './i18n';
export interface AppContent {
  en: LanguageContent;
  vn: LanguageContent;
  settings: AppSettings;
}