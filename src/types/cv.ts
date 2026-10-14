// src/types/cv.ts

export type FontFamilyType = string;

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  secondaryPhone?: string;
  location: string;
  locationLine2?: string;
  photoUrl: string;
  photoShape: 'circle' | 'square' | 'rounded';
  showPhoto: boolean;
}

export interface ExtrasInfo {
  linkedin?: string;
  portfolio?: string;
  customLinks?: Array<{
    label: string;
    url: string;
    urlLine2?: string;
  }>;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  // Campos opcionales por compatibilidad con respuestas de IA
  position?: string;
  responsibilities?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  type: 'técnica' | 'blanda' | string;
  category?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
  language?: string;
  proficiency?: string;
}

export interface Reference {
  id: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  contact?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  technologies?: string[];
}

export interface CVData {
  personal: PersonalInfo;
  profile: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  references: Reference[];
  extras: ExtrasInfo;
  styles: {
    fontFamily: string;
    accentColor: string;
  };
  // Propiedades opcionales para soportar el parser de Gemini / Linter
  contact?: PersonalInfo;
  summary?: string;
  experiences?: Experience[];
  certifications?: Certification[];
  projects?: Project[];
  fontFamily?: string;
  colorScheme?: string;
  templateId?: string;
}

export const INITIAL_CV_DATA: CVData = {
  personal: {
    fullName: 'Carlos Mendoza',
    title: 'Ingeniero de Sistemas',
    email: 'carlos.mendoza@email.com',
    secondaryEmail: '',
    phone: '+1 (809) 555-0192',
    secondaryPhone: '',
    location: 'Santo Domingo, R.D.',
    locationLine2: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    photoShape: 'circle',
    showPhoto: true,
  },
  profile: 'Ingeniero de Sistemas con más de 6 años de experiencia liderando proyectos de transformación digital y desarrollo de software escalable en el sector corporativo de República Dominicana.',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  references: [],
  extras: {
    linkedin: '',
    portfolio: '',
    customLinks: []
  },
  styles: {
    fontFamily: 'Poppins',
    accentColor: '#111827',
  },
};